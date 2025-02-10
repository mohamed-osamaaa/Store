import {
    EditIcon,
    Trash2Icon,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

import { useProductStore } from '../store/useProductStore';

function ProductCard({ product }) {
    const { deleteProduct, loading } = useProductStore();


    const handleDelete = async () => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: `You won't be able to revert this!\nDelete \"${product.name}\"?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        });

        if (!result.isConfirmed) return;

        setIsDeleting(true);
        try {
            await deleteProduct(product._id);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden transition hover:shadow-lg">
            {/* PRODUCT IMAGE */}
            <div className="relative w-full h-56">
                <img
                    src={product.imageURL}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </div>

            <div className="p-4">
                {/* PRODUCT INFO */}
                <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
                <p className="text-xl font-bold text-blue-600">${Number(product.price).toFixed(2)}</p>

                {/* CARD ACTIONS */}
                <div className="flex justify-end gap-3 mt-4">
                    <Link to={`/product/${product._id}`} className="p-2 text-blue-500 hover:text-blue-700">
                        <EditIcon className="w-5 h-5" />
                    </Link>
                    <button
                        className={`p-2 text-red-500 hover:text-red-700 transition ${isDeleting ? "opacity-50 cursor-not-allowed" : ""}`}
                        onClick={handleDelete}
                        disabled={isDeleting || loading}
                    >
                        {isDeleting ? "Deleting..." : <Trash2Icon className="w-5 h-5" />}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
