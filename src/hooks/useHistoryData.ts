import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { HistoryData } from "../interface/HistoryData";

const API_URL = "http://localhost:8080";

const fetchHistory = async (): Promise<HistoryData[]> => {
  const response = await axios.get(`${API_URL}/history`);
  return response.data;
};

export function useHistoryData() {
  const query = useQuery({
    queryFn: fetchHistory,
    queryKey: ["history-data"],
    retry: 2
  });

  return {
    ...query,
    data: query.data
  };
}
