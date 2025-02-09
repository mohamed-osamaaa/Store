import React from 'react';

function AddProduct() {
    return (
        <div className='bg-gray-800 w-full px-52 min-h-screen mt-7 z-50'>
            <h1>Add new product</h1>
            <form>
                <label>Product Name:</label>
                <input type="text" name="name" />
                <label>Product Price:</label>
                <input type="number" name="price" />
                <label>Image:</label>
                <input type="image" name="imageURL" />
            </form>
        </div>
    )
}

export default AddProduct;