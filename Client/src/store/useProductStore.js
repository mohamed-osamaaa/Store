import toast from "react-hot-toast";
import { create } from "zustand";

import { axiosInstance } from "../lib/axios";

export const useProductStore = create((set, get) => ({
    products: [],
    product: null,

    // Fetch all products
    getAllProducts: async () => {
        try {
            const res = await axiosInstance.get("/products");
            set({ products: res.data });
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to fetch products"
            );
        }
    },

    // Fetch a single product by ID
    getProduct: async (productId) => {
        try {
            const res = await axiosInstance.get(`/products/${productId}`);
            set({ product: res.data });
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to fetch product"
            );
        }
    },

    // Create a new product
    createProduct: async (productData, imageFile) => {
        try {
            const formData = new FormData();
            Object.keys(productData).forEach((key) => {
                formData.append(key, productData[key]);
            });
            if (imageFile) {
                formData.append("imageURL", imageFile);
            }

            const res = await axiosInstance.post("/products", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            set((state) => ({ products: [...state.products, res.data] }));
            toast.success("Product created successfully");
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to create product"
            );
        }
    },

    // Update a product
    updateProduct: async (productId, updatedData, imageFile) => {
        try {
            const formData = new FormData();
            Object.keys(updatedData).forEach((key) => {
                formData.append(key, updatedData[key]);
            });
            if (imageFile) {
                formData.append("imageURL", imageFile);
            }

            const res = await axiosInstance.put(
                `/products/${productId}`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            set((state) => ({
                products: state.products.map((product) =>
                    product._id === productId ? res.data : product
                ),
            }));
            toast.success("Product updated successfully");
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to update product"
            );
        }
    },

    // Delete a product
    deleteProduct: async (productId) => {
        try {
            await axiosInstance.delete(`/products/${productId}`);
            set((state) => ({
                products: state.products.filter(
                    (product) => product._id !== productId
                ),
            }));
            toast.success("Product deleted successfully");
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to delete product"
            );
        }
    },
}));
