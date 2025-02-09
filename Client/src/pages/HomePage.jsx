import {
    useCallback,
    useEffect,
    useState,
} from 'react';

import {
    PackageIcon,
    Plus,
} from 'lucide-react';

import AddProduct from '../components/AddProduct';
import ProductCard from '../components/ProductCard';
import { useProductStore } from '../store/useProductStore';

function HomePage() {
    const { products, getAllProducts, error, loading } = useProductStore();
    const [showAddProduct, setShowAddProduct] = useState(false);


    const fetchProducts = useCallback(() => {
        getAllProducts();
    }, [getAllProducts]);

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="bg-gray-800 w-full px-10 md:px-20 lg:px-52 min-h-screen mt-7">
            {/* ADD PRODUCT BUTTON */}
            <div className="flex items-center justify-center pt-16 mb-7">
                <button
                    onClick={() => setShowAddProduct(true)}
                    className="flex items-center gap-2 rounded-lg bg-green-500 px-6 py-3 text-gray-800 font-medium shadow-md transition-all duration-300 hover:bg-green-600"
                >
                    <Plus className="w-5 h-5" />
                    Add Product
                </button>
            </div>

            {showAddProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="relative bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md">
                        {/* Close Button */}
                        <button
                            className="absolute top-3 right-3 text-gray-300 hover:text-gray-500"
                            onClick={() => setShowAddProduct(false)}
                        >
                            ✖
                        </button>

                        {/* Add Product Form */}
                        <AddProduct closeModal={() => setShowAddProduct(false)} />
                    </div>
                </div>
            )}

            {/* ERROR MESSAGE */}
            {error && (
                <div className="mb-8 flex items-center justify-center rounded-lg bg-red-500 px-4 py-2 text-white text-center">
                    {error}
                </div>
            )}

            {/* NO PRODUCTS MESSAGE */}
            {products.length === 0 && !loading && (
                <div className="flex flex-col justify-center items-center h-96 space-y-4">
                    <div className="bg-gray-100 rounded-full p-6">
                        <PackageIcon className="size-12 text-gray-600" />
                    </div>
                    <div className="text-center space-y-2">
                        <h3 className="text-2xl font-semibold text-white">No products found</h3>
                        <p className="text-gray-400 max-w-sm">
                            Get started by adding your first product to the inventory.
                        </p>
                    </div>
                </div>
            )}

            {/* LOADING STATE */}
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default HomePage;
