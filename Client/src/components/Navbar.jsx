import { ShoppingCartIcon } from 'lucide-react';

function Navbar() {
    return (
        <header className="bg-blue-600 text-white py-4 shadow-md">
            <div className="container mx-auto flex items-center justify-between px-4">
                <div className="flex items-center space-x-2 text-xl font-semibold">
                    <ShoppingCartIcon className="w-6 h-6" />
                    <span>Store</span>
                </div>
                <nav>
                    <ul className="flex space-x-6 text-lg">
                        <li className="hover:text-gray-200 cursor-pointer">Home</li>
                        <li className="hover:text-gray-200 cursor-pointer">Shop</li>
                        <li className="hover:text-gray-200 cursor-pointer">About</li>
                        <li className="hover:text-gray-200 cursor-pointer">Contact</li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;