import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";





const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="size-10 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold">P</span>
                            </div>
                            <div>
                                <div className="font-bold text-white">ProActif Global</div>
                                <div className="text-xs">LBG</div>
                            </div>
                        </div>
                        <p className="text-sm">
                            Empowering youth and transforming communities through health, advocacy, and socio-economic development.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-white mb-4">Quick Links</h3>
                        <div className="space-y-2 text-sm">
                            <Link href="/" className="block hover:text-red-400 transition-colors">Home</Link>
                            <Link href="/about" className="block hover:text-red-400 transition-colors">About Us</Link>
                            <Link href="/programs" className="block hover:text-red-400 transition-colors">Programs</Link>
                            <Link href="/team" className="block hover:text-red-400 transition-colors">Our Team</Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold text-white mb-4">Programs</h3>
                        <div className="space-y-2 text-sm">
                            <div className="hover:text-red-400 transition-colors cursor-pointer">HyƐ Fa YƆ Campaign</div>
                            <div className="hover:text-red-400 transition-colors cursor-pointer">Skills Acquisition Program</div>
                            <div className="hover:text-red-400 transition-colors cursor-pointer">Ask Dr. Enimil</div>
                            <div className="hover:text-red-400 transition-colors cursor-pointer">Myth Busters Campaign</div>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold text-white mb-4">Contact</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-start gap-2">
                                <MapPin className="size-4 mt-0.5 flex-shrink-0" />
                                <span>Kumasi, Ghana</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail className="size-4 flex-shrink-0" />
                                <span>info@proactifglobal.org</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="size-4 flex-shrink-0" />
                                <span>+233 XX XXX XXXX</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm">
                        © 2026 ProActif Global LBG. All rights reserved.
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-red-400 transition-colors">
                            <FaFacebook className="size-5" />
                        </a>
                        <a href="#" className="hover:text-red-400 transition-colors">
                            <FaTwitter className="size-5" />
                        </a>
                        <a href="#" className="hover:text-red-400 transition-colors">
                            <FaInstagram className="size-5" />
                        </a>
                        <a href="#" className="hover:text-red-400 transition-colors">
                            <FaLinkedin className="size-5" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;