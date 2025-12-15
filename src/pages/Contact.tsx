import React, { useEffect, useState } from 'react';
import { Mail, Send, User, MessageSquare, Sparkles, ArrowRight, Phone, MapPin } from 'lucide-react';
import { apiFetch } from '@services/api';

const Contact: React.FC = () => {

      useEffect(() => {
        document.title = 'Universe | Contact';
      }, []);
      
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isHovered, setIsHovered] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();

            setIsSubmitting(true);
            setError('');
    
            try {
                const data = await apiFetch<any> (`/api/feedback/contact`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    json: formData
                });
    
                if (data.success) {
                    setSubmitted(true);
                } else {
                    setError(data.error || 'Failed to send feedback');
                }
            } catch (err) {
                console.error('Error sending feedback:', err);
                setError('Failed to send contact mail. Please try again.');
            } finally {
                setIsSubmitting(false);
            }
        };

    return (
     <>
        {submitted && (
                <div className="fixed bottom-4 right-4 z-50 animate-fade-in-up">
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl p-4 w-72 border border-green-200 dark:border-green-700">
                        <div className="text-center">
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-1">Merci!</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Votre email a été envoyé</p>
                        </div>
                    </div>
                </div>
            )
        }

        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 pt-24 pb-16">
            {/* Floating background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-32 h-32 bg-teal-200/30 dark:bg-teal-500/20 rounded-full blur-xl animate-float"></div>
                <div className="absolute top-40 right-20 w-24 h-24 bg-blue-200/30 dark:bg-blue-500/20 rounded-full blur-xl animate-float animation-delay-1000"></div>
                <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-cyan-200/20 dark:bg-cyan-500/15 rounded-full blur-xl animate-float animation-delay-500"></div>
                <div className="absolute top-1/2 right-1/3 w-20 h-20 bg-emerald-200/25 dark:bg-emerald-500/15 rounded-full blur-xl animate-float animation-delay-1500"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center space-y-4 mb-16 animate-fade-in-up">
                    <div className="inline-flex items-center space-x-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-teal-200/50 dark:border-teal-700/50 rounded-full px-4 py-2 shadow-lg">
                        <Mail className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Get In Touch</span>
                    </div>

                    <h1 className="text-5xl font-bold text-slate-900 dark:text-white">
                        Contact{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-blue-600 to-cyan-600 dark:from-teal-400 dark:via-blue-400 dark:to-cyan-400">
                            Us
                        </span>
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                        Have questions, feedback, or just want to say hello? We'd love to hear from you!
                    </p>
                </div>

                {/* Main Content - Two Column Layout */}
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column - Image & Info */}
                    <div className="order-2 lg:order-1 animate-fade-in-left">
                        {/* Contact Illustration */}
                        <div className="relative mb-8">
                            <div className="absolute inset-0 bg-gradient-to-br from-teal-400/20 to-blue-400/20 rounded-3xl blur-2xl"></div>
                            <div className="relative overflow-hidden rounded-3xl border border-slate-200/50 dark:border-slate-700/50 shadow-2xl">
                                <img
                                    src="/contactbanner.png"
                                    alt="Contact Illustration"
                                    className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent"></div>
                            </div>
                        </div>

                        {/* Contact Info Cards */}
                        <div className="space-y-4">
                            <div className="group flex items-center space-x-4 p-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    <Mail className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Mazen Jebali</h3>
                                    <p className="text-slate-900 dark:text-white font-semibold">jebali.mazen@gmail.com</p>
                                </div>
                            </div>
                            <div className="group flex items-center space-x-4 p-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    <Mail className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Abdallah Ben Salem</h3>
                                    <p className="text-slate-900 dark:text-white font-semibold">abdallahbenselam@gmail.com</p>
                                </div>
                            </div>
                            <div className="group flex items-center space-x-4 p-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    <Phone className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Our Team</h3>
                                    <p className="text-slate-900 dark:text-white font-semibold">Available 24/7 via Email</p>
                                </div>
                            </div>

                            <div className="group flex items-center space-x-4 p-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    <MapPin className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Location</h3>
                                    <p className="text-slate-900 dark:text-white font-semibold">El Haouria, Nabeul, Tunisia 🇹🇳</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Contact Form */}
                    <div className="order-1 lg:order-2 animate-fade-in-right">
                        <div className="relative">
                            {/* Glow effect behind the form */}
                            <div className="absolute inset-0 bg-gradient-to-br from-teal-400/30 via-blue-400/20 to-cyan-400/30 rounded-3xl blur-2xl"></div>

                            {/* Form Card */}
                            <div className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl border border-slate-200/50 dark:border-slate-700/50 shadow-2xl p-8 md:p-10">
                                {/* Decorative corner elements */}
                                <div className="absolute top-4 right-4">
                                    <Sparkles className="w-6 h-6 text-teal-400 dark:text-teal-500 animate-pulse" />
                                </div>

                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                                        Send us a Message
                                    </h2>
                                    <p className="text-slate-600 dark:text-slate-400">
                                        Fill out the form below and we'll get back to you as soon as possible.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Name Input */}
                                    <div className="group">
                                        <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                            Your Name
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <User className="h-5 w-5 text-slate-400 dark:text-slate-500 group-focus-within:text-teal-500 transition-colors" />
                                            </div>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="Full Name"
                                                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all duration-300"
                                            />
                                        </div>
                                    </div>

                                    {/* Email Input */}
                                    <div className="group">
                                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                            Email Address
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <Mail className="h-5 w-5 text-slate-400 dark:text-slate-500 group-focus-within:text-teal-500 transition-colors" />
                                            </div>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="you@example.com"
                                                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all duration-300"
                                            />
                                        </div>
                                    </div>

                                    {/* Subject Input */}
                                    <div className="group">
                                        <label htmlFor="subject" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                            Subject
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <MessageSquare className="h-5 w-5 text-slate-400 dark:text-slate-500 group-focus-within:text-teal-500 transition-colors" />
                                            </div>
                                            <input
                                                type="text"
                                                id="subject"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="How can we help?"
                                                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all duration-300"
                                            />
                                        </div>
                                    </div>

                                    {/* Message Textarea */}
                                    <div className="group">
                                        <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                            Your Message
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            required
                                            rows={5}
                                            placeholder="Tell us what's on your mind..."
                                            className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all duration-300 resize-none"
                                        />
                                    </div>

                                    {/* Error Message */}
                                        {error && (
                                        <p className="text-xs text-red-500 mt-1">{error}</p>
                                    )}
                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        onMouseEnter={() => setIsHovered(true)}
                                        onMouseLeave={() => setIsHovered(false)}
                                        className="group relative w-full overflow-hidden bg-gradient-to-r from-teal-600 via-teal-500 to-cyan-600 hover:from-teal-700 hover:via-teal-600 hover:to-cyan-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300"
                                    >
                                        {/* Animated gradient overlay */}
                                        <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 transition-transform duration-700 ${isHovered ? 'translate-x-full' : '-translate-x-full'}`}></div>

                                        <span className="relative flex items-center justify-center space-x-3">
                                            <Send className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                                            <span>Send Message</span>
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                        </span>
                                    </button>
                                </form>

                                {/* Note about email client */}
                                <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
                                    <span className="inline-flex items-center space-x-1">
                                        <Mail className="w-4 h-4" />
                                        <span>This will open your default email client</span>
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div></>
    );
};

export default Contact;
