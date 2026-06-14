import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { ProductData } from "../interface/ProductData";

const API_URL = "http://localhost:8080";

const fetchData = async (): Promise<ProductData[]> => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
};

export function useProductData() {
  const query = useQuery({
    queryFn: fetchData,
    queryKey: ["product-data"],
    retry: 2
  });

  return {
    ...query,
    data: query.data
  };
}
