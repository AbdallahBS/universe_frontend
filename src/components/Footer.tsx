import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, MapPin, Phone, Facebook, Linkedin, Github, ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
    const navigate = useNavigate();
    const currentYear = new Date().getFullYear();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const footerLinks = {
        platform: [
            { name: 'Home', path: '/' },
            { name: 'Internships', path: '/internships' },
            { name: 'Engineering Cycle', path: '/cycle-ingenieur' },
        ],
        company: [
            { name: 'About Us', path: '/about' },
            { name: 'Contact', path: '/contact' },
        ],
        legal: [
            { name: 'Terms of Service', path: '#' },
            { name: 'Privacy Policy', path: '#' },
        ],
    };

    const socialLinks = [
        { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
        { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
        { icon: Github, href: 'https://github.com', label: 'GitHub' },
    ];

    return (
        <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
            </div>

            {/* Main Footer Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Section */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center space-x-2 mb-4">
                            <img
                                src="/logo.png"
                                alt="Universe"
                                className="w-16 h-16 object-contain brightness-0 invert"
                            />
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                            Your gateway to discovering opportunities, exploring engineering programs, and building your future career.
                        </p>
                    </div>

                    {/* Platform Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">pages</h3>
                        <ul className="space-y-3">
                            {footerLinks.platform.map((link) => (
                                <li key={link.name}>
                                    <button
                                        onClick={() => navigate(link.path)}
                                        className="text-slate-400 hover:text-teal-400 transition-colors duration-200 text-sm"
                                    >
                                        {link.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">Company</h3>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <button
                                        onClick={() => navigate(link.path)}
                                        className="text-slate-400 hover:text-teal-400 transition-colors duration-200 text-sm"
                                    >
                                        {link.name}
                                    </button>
                                </li>
                            ))}
                            {footerLinks.legal.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.path}
                                        className="text-slate-400 hover:text-teal-400 transition-colors duration-200 text-sm"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-center space-x-3">
                                <Mail className="w-5 h-5 text-purple-400 flex-shrink-0" />
                                <span className="text-slate-400 text-sm">abdallah.benselam@gmail.com</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                                <span className="text-slate-400 text-sm">jebali.mazen@gmail.com</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <MapPin className="w-5 h-5 text-teal-400 flex-shrink-0" />
                                <span className="text-slate-400 text-sm">El Haouria, Nabeul, Tunisia 🇹🇳</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone className="w-5 h-5 text-purple-400 flex-shrink-0" />
                                <span className="text-slate-400 text-sm">+216 20 580 395</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                                <span className="text-slate-400 text-sm">+216 25 829 328</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-700/50 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        {/* Copyright */}
                        <p className="text-slate-500 text-sm">
                            © {currentYear} Universe. All rights reserved
                        </p>

                        {/* Back to Top Button */}
                        <button
                            onClick={scrollToTop}
                            className="group flex items-center space-x-2 text-slate-400 hover:text-teal-400 transition-colors duration-200"
                        >
                            <span className="text-sm">Back to top</span>
                            <div className="w-8 h-8 rounded-lg bg-slate-800 group-hover:bg-teal-600 flex items-center justify-center transition-all duration-300 group-hover:-translate-y-1">
                                <ArrowUp className="w-4 h-4" />
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
