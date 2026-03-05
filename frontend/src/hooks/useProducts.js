import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
} from "../lib/api";

export const useProducts = () => {
  const result = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
  return result;
};

export const useCreateProduct = () => {
  const result = useMutation({ mutationFn: createProduct });
  return result;
};

export const useProduct = (id) => {
  const result = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    enabled: !!id, // double bang operator - convert the given value in the boolean value
  });
  return result;
};

export const useDeleteProduct = () => {
  const result = useMutation({
    mutationFn: (id) => deleteProduct(id),
  });
  return result;
};

