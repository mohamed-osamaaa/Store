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
    const [productData, setProductData] = useState({ productName: '', price: '', imageURL: null });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleImageChange = (e) => {
        setProductData({ ...productData, imageURL: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!productData.productName || !productData.price || !productData.imageURL) {
            toast.error('All fields are required!');
            return;
        }
        await createProduct(e, productData, productData.imageURL);
    };

    return (
        <div className='bg-gray-900 w-full h-auto flex justify-center items-center p-8'>
            <div className='bg-gray-800 p-8 rounded-lg w-[500px] h-auto shadow-lg'>
                <h1 className='text-white text-3xl font-semibold mb-6 text-center'>Add New Product</h1>
                <form onSubmit={handleSubmit} className='flex flex-col gap-6'>

                    {/* Product Name */}
                    <div>
                        <label className='block text-gray-300 mb-2'>Product Name:</label>
                        <div className='relative flex items-center'>
                            <Package2Icon className="absolute left-3 text-gray-400 size-6" />
                            <input
                                type='text'
                                name='productName'
                                placeholder='Enter Product Name'
                                value={productData.productName}
                                onChange={handleChange}
                                className='w-full pl-12 p-3 rounded bg-gray-700 text-white outline-none text-lg'
                            />
                        </div>
                    </div>

                    {/* Product Price */}
                    <div>
                        <label className='block text-gray-300 mb-2'>Product Price:</label>
                        <div className='relative flex items-center'>
                            <DollarSignIcon className="absolute left-3 text-gray-400 size-6" />
                            <input
                                type='number'
                                name='price'
                                placeholder='0.00'
                                value={productData.price}
                                onChange={handleChange}
                                className='w-full pl-12 p-3 rounded bg-gray-700 text-white outline-none text-lg'
                            />
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className='block text-gray-300 mb-2'>Image:</label>
                        <div className='relative flex items-center'>
                            <ImageIcon className="absolute left-3 text-gray-400 size-6" />
                            <input
                                type='file'
                                name='imageURL'
                                accept='image/*'
                                onChange={handleImageChange}
                                className='w-full pl-12 p-3 rounded bg-gray-700 text-white outline-none text-lg'
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type='submit'
                        className='w-full p-3 bg-green-500 text-white text-lg rounded-lg transition hover:bg-green-600 disabled:bg-gray-500'
                        disabled={loading}
                    >
                        {loading ? 'Adding...' : 'Add Product'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddProduct;
