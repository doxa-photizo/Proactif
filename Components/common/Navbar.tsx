
import Link from "next/link";
import { useRouter } from "next/router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";






const Navbar: React.FC = () => {

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useRouter();

    const links = [
        { path: "/", label: "Home" },
        { path: "/about", label: "About" },
        { path: "/programs", label: "Programs" },
        { path: "/team", label: "Team" },
        { path: "/contact", label: "Contact" },
    ];

    const isActive = (path: string) => {
        if (path === "/") return location.pathname === "/";
        return location.pathname.startsWith(path);
    };




    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <Link href="/" className="flex items-center h-full py-2">
                        <img
                            src="/pics/Proactif Logo.png"
                            alt="ProActif Logo"
                            className="h-50 w-auto object-contain relative top-[12px] -left-[36px]"
                        />
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        {links.map((link) => (
                            <Link
                                key={link.path}
                                href={link.path}
                                className={`text-sm font-medium transition-colors relative ${isActive(link.path)
                                    ? "text-red-600"
                                    : "text-gray-700 hover:text-red-600"
                                    }`}
                            >
                                {link.label}
                                {isActive(link.path) && (
                                    <motion.div
                                        layoutId="activeNav"
                                        className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-red-600"
                                    />
                                )}
                            </Link>
                        ))}
                        <Link
                            href="/contact"
                            className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                        >
                            Donate
                        </Link>
                    </div>

                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 text-gray-700"
                    >
                        {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
                    </button>
                </div>
            </nav>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t border-gray-200 bg-white overflow-hidden"
                    >
                        <div className="px-4 py-4 space-y-3">
                            {links.map((link) => (
                                <Link
                                    key={link.path}
                                    href={link.path}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`block px-4 py-2 rounded-lg text-sm font-medium ${isActive(link.path)
                                        ? "bg-red-50 text-red-600"
                                        : "text-gray-700 hover:bg-gray-50"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <Link
                                href="/contact"
                                onClick={() => setMobileMenuOpen(false)}
                                className="block px-4 py-2.5 bg-red-600 text-white rounded-lg text-center text-sm font-medium"
                            >
                                Donate
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;