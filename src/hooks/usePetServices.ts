import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import type { PetServiceData } from '../interface/PetServiceData';

const API_URL = 'http://localhost:8080/api/pets';

export function usePetServices() {
  const queryClient = useQueryClient();

  const activeQuery = useQuery({
    queryKey: ['pet-services-active'],
    queryFn: async () => {
      const response = await axios.get<PetServiceData[]>(`${API_URL}/active`);
      return response.data;
    }
  });

  const historyQuery = useQuery({
    queryKey: ['pet-services-history'],
    queryFn: async () => {
      const response = await axios.get<PetServiceData[]>(`${API_URL}/history`);
      return response.data;
    }
  });

  const createMutation = useMutation({
    mutationFn: async (data: PetServiceData) => {
      const response = await axios.post<PetServiceData>(API_URL, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pet-services-active'] });
    }
  });

  const completeMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await axios.put<PetServiceData>(`${API_URL}/${id}/complete`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pet-services-active'] });
      queryClient.invalidateQueries({ queryKey: ['pet-services-history'] });
    }
  });

  return {
    activeServices: activeQuery.data,
    loadingActive: activeQuery.isLoading,
    errorActive: activeQuery.isError,
    
    historyServices: historyQuery.data,
    loadingHistory: historyQuery.isLoading,
    errorHistory: historyQuery.isError,

    createService: createMutation.mutateAsync,
    isCreating: createMutation.isPending,

    completeService: completeMutation.mutateAsync,
    isCompleting: completeMutation.isPending
  };
}
