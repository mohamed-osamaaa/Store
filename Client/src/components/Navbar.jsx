import {
    useEffect,
    useState,
} from 'react';

import { ShoppingCartIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

function Navbar() {
    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
        const handleScroll = () => {
            setOpacity(window.scrollY > 50 ? 0.7 : 1);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className="bg-slate-700 text-white py-4 shadow-md fixed top-0 left-0 w-full z-40 transition-opacity duration-300"
            style={{ opacity }}
        >
            <div className="container mx-auto flex items-center justify-between px-28">
                <Link to="/">
                    <div className="flex items-center space-x-2 text-xl font-semibold cursor-pointer">
                        <ShoppingCartIcon className="w-6 h-6" />
                        <span>Store</span>
                    </div>
                </Link>
                <nav>
                    <ul className="flex space-x-6 text-lg">
                        <li className="hover:text-gray-200 cursor-pointer">
                            <ShoppingCartIcon className="w-6 h-6" />
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;
