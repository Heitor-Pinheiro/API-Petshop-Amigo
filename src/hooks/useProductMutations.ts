import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { ProductData } from "../interface/ProductData";

const API_URL = "http://localhost:8080";

const createProduct = async (data: ProductData): Promise<any> => {
  const response = await axios.post(`${API_URL}/products`, data);
  return response.data;
};

const updateProduct = async (payload: { id: number; data: ProductData }): Promise<any> => {
  const response = await axios.put(`${API_URL}/products/${payload.id}`, payload.data);
  return response.data;
};

const deleteProduct = async (id: number): Promise<any> => {
  const response = await axios.delete(`${API_URL}/products/${id}`);
  return response.data;
};

const sellProduct = async (payload: { id: number; quantity: number }): Promise<any> => {
  const response = await axios.post(`${API_URL}/products/${payload.id}/sell`, { quantity: payload.quantity });
  return response.data;
};

export function useProductMutations() {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product-data"] });
      queryClient.invalidateQueries({ queryKey: ["history-data"] });
    }
  });

  const updateMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product-data"] });
      queryClient.invalidateQueries({ queryKey: ["history-data"] });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product-data"] });
      queryClient.invalidateQueries({ queryKey: ["history-data"] });
    }
  });

  const sellMutation = useMutation({
    mutationFn: sellProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product-data"] });
      queryClient.invalidateQueries({ queryKey: ["history-data"] });
    }
  });

  return {
    createProduct: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    updateProduct: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    deleteProduct: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
    sellProduct: sellMutation.mutateAsync,
    isSelling: sellMutation.isPending
  };
}
