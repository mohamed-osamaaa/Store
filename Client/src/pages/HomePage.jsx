import { useEffect } from 'react';

import { Plus } from 'lucide-react';

import { useProductStore } from '../store/useProductStore';

function HomePage() {
    const { getAllProducts } = useProductStore();
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
            <div className='flex flex-row'>

            </div>
        </div>
    );
}

export default HomePage;
