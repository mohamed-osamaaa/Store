import {
    useEffect,
    useState,
} from 'react';

import { ArrowLeftIcon } from 'lucide-react';
import {
    Link,
    useNavigate,
    useParams,
} from 'react-router-dom';
import Swal from 'sweetalert2';

import { useProductStore } from '../store/useProductStore';

function ProductPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const {
        product,
        getProduct,
        updateProduct,
        deleteProduct,
        loading,
        error,
    } = useProductStore();
    const [productData, setProductData] = useState({
        productName: "",
        price: "",
        imageURL: "",
    });
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        getProduct(id);
    }, [id, getProduct]);

    useEffect(() => {
        if (product) {
            console.log("Product fetched:", product);
            setProductData({
                productName: product.productName || "",
                price: product.price || "",
                imageURL: product.imageURL || "",
            });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData((productData) => ({ ...productData, [name]: value }));
    };
    const handleImageChange = (e) => {
        setProductData({ ...productData, imageURL: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateProduct(product._id, productData);
        Swal.fire("Success", "Product updated successfully", "success");
    };

    const handleDelete = async () => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: `You won't be able to revert this!\nDelete \"${product.productName}\"?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        });

        if (!result.isConfirmed) return;

        setIsDeleting(true);
        try {
            await deleteProduct(product._id);
            navigate("/");
        } finally {
            setIsDeleting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-4xl mx-auto px-6 py-8">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-800 min-h-screen text-white mt-14">
            <div className="max-w-4xl mx-auto py-8 px-4">
                <Link
                    to="/"
                    className="flex items-center space-x-2 bg-slate-700 p-2 rounded-sm"
                >
                    <ArrowLeftIcon className="size-5" />
                    <span>Back to products</span>
                </Link>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                        <img
                            src={product?.imageURL}
                            className="w-full h-auto object-cover rounded-lg"
                            alt="Product"
                        />
                    </div>
                    <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
                        <form onSubmit={handleSubmit}>
                            <h1 className="text-2xl font-semibold mb-4 text-center">
                                Edit Product
                            </h1>
                            <label className="block text-gray-300 mb-2">
                                Product Name:
                            </label>
                            <input
                                type="text"
                                name="productName"
                                value={productData.productName}
                                onChange={handleChange}
                                className="w-full p-3 rounded bg-gray-700 text-white outline-none text-lg mb-4"
                            />
                            <label className="block text-gray-300 mb-2">
                                Product Price:
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={productData.price}
                                onChange={handleChange}
                                className="w-full p-3 rounded bg-gray-700 text-white outline-none text-lg mb-4"
                            />
                            <label className="block text-gray-300 mb-2">
                                Image:
                            </label>
                            <input
                                type="file"
                                name="imageURL"
                                accept='image/*'
                                onChange={handleImageChange}
                                className="w-full p-3 rounded bg-gray-700 text-white outline-none text-lg mb-4"
                            />
                            <button
                                type="submit"
                                className="w-full p-3 bg-green-500 text-white text-lg rounded-lg transition hover:bg-green-600 disabled:bg-gray-500 mb-4"
                            >
                                Save Changes
                            </button>
                            <button
                                type="button"
                                className="w-full p-3 bg-red-500 text-white text-lg rounded-lg transition hover:bg-red-600"
                                onClick={handleDelete}
                                disabled={isDeleting}
                            >
                                {isDeleting ? "Deleting..." : "Delete Product"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductPage;
