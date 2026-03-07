import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  getMyProducts,
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

export const useMyProducts = () => {
  const result = useQuery({
    queryKey: ["myProduct"],
    queryFn: getMyProducts,
  });
  return result;
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  const result = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["myProduct"],
      });
    },
  });
  return result;
};
