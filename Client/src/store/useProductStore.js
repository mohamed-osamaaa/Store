import toast from "react-hot-toast";
import { create } from "zustand";

import { axiosInstance } from "../lib/axios";

export const useProductStore = create((set, get) => ({
    products: [],
    loading: false,
    error: null,
    product: null,

    // Fetch all products
    getAllProducts: async () => {
        set({ loading: true });
        try {
            const res = await axiosInstance.get("/products");
            set({ products: res.data });
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to fetch products"
            );
            set({ error: "Something went wrong", products: [] });
        } finally {
            set({ loading: false });
        }
    },

    // Fetch a single product by ID
    getProduct: async (productId) => {
        set({ loading: true });
        try {
            const res = await axiosInstance.get(`/products/${productId}`);
            set({ product: res.data });
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to fetch product"
            );
            set({ error: "Something went wrong", product: null });
        } finally {
            set({ loading: false });
        }
    },

    // Create a new product
    createProduct: async (e, productData, imageFile) => {
        e.preventDefault();
        set({ loading: true });
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
        } finally {
            set({ loading: false });
        }
    },

    // Update a product
    updateProduct: async (productId, productData, imageFile) => {
        set({ loading: true });
        try {
            const formData = new FormData();
            Object.keys(productData).forEach((key) => {
                formData.append(key, productData[key]);
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
        } finally {
            set({ loading: false });
        }
    },

    // Delete a product
    deleteProduct: async (productId) => {
        set({ loading: true });
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
        } finally {
            set({ loading: false });
        }
    },
}));
