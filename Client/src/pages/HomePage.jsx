import { useEffect } from 'react';

import {
    PackageIcon,
    Plus,
} from 'lucide-react';

import ProductCard from '../components/ProductCard';
import { useProductStore } from '../store/useProductStore';

function HomePage() {
    const { products, product, getAllProducts, error, loading } = useProductStore();
    useEffect(() => {
        getAllProducts();
    }, [getAllProducts]);

    return (
        <div className='bg-gray-800 w-full px-52 min-h-screen mt-7'>
            <div className="flex items-center justify-center pt-16 mb-7">
                <button className="cursor-pointer flex items-center gap-2 rounded-lg bg-green-500 px-6 py-3 text-gray-800 font-medium shadow-md transition-all duration-300">
                    <Plus className="w-5 h-5" />
                    Add Product
                </button>
            </div>
            {error && (
                <div className="mb-8 flex items-center justify-center rounded-lg bg-red-500 px-4 py-2 text-white text-center">
                    {error}
                </div>
            )}
            {/* <div className='grid grid-flow-row auto-rows-max'>

            </div> */}
            {products.length === 0 && !loading && (
                <div className="flex flex-col justify-center items-center h-96 space-y-4">
                    <div className="bg-base-100 rounded-full p-6">
                        <PackageIcon className="size-12" />
                    </div>
                    <div className="text-center space-y-2">
                        <h3 className="text-2xl font-semibold ">No products found</h3>
                        <p className="text-gray-500 max-w-sm">
                            Get started by adding your first product to the inventory
                        </p>
                    </div>
                </div>
            )}

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="loading loading-spinner loading-lg" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default HomePage;
