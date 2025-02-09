import React, { useState } from 'react';

import {
    DollarSignIcon,
    ImageIcon,
    Package2Icon,
} from 'lucide-react';
import toast from 'react-hot-toast';

import { useProductStore } from '../store/useProductStore';

function AddProduct() {
    const { createProduct, loading } = useProductStore();
    const [productData, setProductData] = useState({ name: '', price: '', image: null });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleImageChange = (e) => {
        setProductData({ ...productData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!productData.name || !productData.price || !productData.image) {
            toast.error('All fields are required!');
            return;
        }
        await createProduct(e, productData, productData.image);
    };

    return (
        <div className='bg-gray-900 w-full px-10 md:px-20 lg:px-52 py-10 min-h-screen flex flex-col items-center'>
            <h1 className='text-white text-2xl font-semibold mb-6'>Add New Product</h1>
            <form onSubmit={handleSubmit} className='bg-gray-800 p-6 rounded-lg w-full max-w-lg shadow-md'>
                <div className='mb-4'>
                    <label className='block text-gray-300 mb-2'>Product Name:</label>
                    <div className='relative flex items-center'>
                        <Package2Icon className="absolute left-3 text-gray-400 size-5" />
                        <input
                            type='text'
                            name='name'
                            placeholder='Enter Product Name'
                            value={productData.name}
                            onChange={handleChange}
                            className='w-full pl-10 p-2 rounded bg-gray-700 text-white outline-none'
                        />
                    </div>
                </div>

                <div className='mb-4'>
                    <label className='block text-gray-300 mb-2'>Product Price:</label>
                    <div className='relative flex items-center'>
                        <DollarSignIcon className="absolute left-3 text-gray-400 size-5" />
                        <input
                            type='number'
                            name='price'
                            placeholder='0.00'
                            value={productData.price}
                            onChange={handleChange}
                            className='w-full pl-10 p-2 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>
                </div>

                <div className='mb-4'>
                    <label className='block text-gray-300 mb-2'>Image:</label>
                    <div className='relative flex items-center'>
                        <ImageIcon className="absolute left-3 text-gray-400 size-5" />
                        <input
                            type='file'
                            name='imageURL'
                            accept='image/*'
                            onChange={handleImageChange}
                            className='w-full pl-10 p-2 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>
                </div>

                <button
                    type='submit'
                    className='w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:bg-gray-500'
                    disabled={loading}
                >
                    {loading ? 'Adding...' : 'Add Product'}
                </button>
            </form>
        </div>
    );
}

export default AddProduct;
