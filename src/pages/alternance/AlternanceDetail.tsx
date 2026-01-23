import React, { useEffect, useState } from "react";
import {
    ArrowLeft,
    Clock,
    Calendar,
    Building2,
    MapPin,
    ExternalLink,
    Linkedin,
    Share2,
    Bookmark,
    Tag,
    ChevronDown,
    ChevronUp,
    GraduationCap,
    Mail,
    Heart,
    MessageCircle,
    Repeat2,
    User2,
    ChevronLeft,
    ChevronRight,
    X,
    ZoomIn,
} from "lucide-react";
import LoadingSpinner from "@components/ui/LoadingSpinner";
import { useParams, useSearchParams } from "react-router-dom";
import ScrollButtons from "@components/ui/ScrollButtons";
import { getAlternance } from "../../services/alternanceService";
import { Alternance } from "../../types/alternance";
import Linkify from "linkify-react";
import { useNavigatePage } from "@components/ui/useNavigatePage";
import { useTranslation } from "react-i18next";

// Helper to proxy LinkedIn images through CORS proxy
const getProxiedImageUrl = (url: string) => {
    if (!url) return '';
    // LinkedIn images need CORS proxy
    if (url.includes('linkedin.com') || url.includes('licdn.com')) {
        return `https://corsproxy.io/?url=${encodeURIComponent(url)}`;
    }
    return url;
};

const AlternanceDetail: React.FC = () => {
    const navigate = useNavigatePage();
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const PreviousPageNumber = searchParams.get("prevPage");
    const { t } = useTranslation();

    const [alternance, setAlternance] = useState<Alternance>();
    const [loading, setLoading] = useState(true);
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

    // Carousel and lightbox state
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxImageIndex, setLightboxImageIndex] = useState(0);

    useEffect(() => {
        document.title = "Universe | Alternance";
        fetchAlternanceDetails();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const fetchAlternanceDetails = async () => {
        try {
            setLoading(true);
            if (id) {
                const response = await getAlternance(id);
                if (response.success) {
                    setAlternance(response.data);
                }
            }
        } catch (error) {
            console.error("Error fetching alternance details:", error);
        } finally {
            setLoading(false);
        }
    };


    const handleViewOriginalPost = () => {
        if (alternance?.externalUrl) {
            window.open(alternance.externalUrl, '_blank', 'noopener,noreferrer');
        }
    };

    const handleShare = async () => {
        const shareUrl = window.location.href;
        if (navigator.share) {
            try {
                await navigator.share({
                    title: alternance?.title || 'Offre d\'alternance',
                    text: alternance?.description?.substring(0, 100) + '...',
                    url: shareUrl,
                });
            } catch (error) {
                console.log('Share cancelled');
            }
        } else {
            navigator.clipboard.writeText(shareUrl);
            alert('Lien copié !');
        }
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return null;
        return new Date(dateString).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    if (loading) {
        return <LoadingSpinner loading={loading} fullScreen />;
    }

    if (!alternance) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center px-4">
                <div className="text-center max-w-md">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-teal-100 to-emerald-100 dark:from-teal-900/50 dark:to-emerald-900/50 flex items-center justify-center">
                        <GraduationCap className="w-12 h-12 text-teal-600 dark:text-teal-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">{t('alternanceDetail.alternanceNotFound')}</h2>
                    <p className="text-slate-600 dark:text-slate-400 mb-6">{t('alternanceDetail.notFoundDesc')}</p>
                    <button
                        onClick={() => navigate("/alternances")}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        {t('alternanceDetail.backToAlternances')}
                    </button>
                </div>
            </div>
        );
    }

    // Get banner image: prioritize bannerImage, then first content image (don't use companyLogo for banner)
    const bannerImage = alternance.bannerImage || alternance.contentImages?.[0]?.url;
    const proxiedBannerImage = bannerImage ? getProxiedImageUrl(bannerImage) : null;

    // Carousel navigation handlers
    const goToNextImage = () => {
        if (alternance.contentImages && alternance.contentImages.length > 1) {
            setCurrentImageIndex((prev) =>
                prev === alternance.contentImages!.length - 1 ? 0 : prev + 1
            );
        }
    };

    const goToPrevImage = () => {
        if (alternance.contentImages && alternance.contentImages.length > 1) {
            setCurrentImageIndex((prev) =>
                prev === 0 ? alternance.contentImages!.length - 1 : prev - 1
            );
        }
    };

    const openLightbox = (index: number) => {
        setLightboxImageIndex(index);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
    };

    const goToNextLightboxImage = () => {
        if (alternance.contentImages && alternance.contentImages.length > 1) {
            setLightboxImageIndex((prev) =>
                prev === alternance.contentImages!.length - 1 ? 0 : prev + 1
            );
        }
    };

    const goToPrevLightboxImage = () => {
        if (alternance.contentImages && alternance.contentImages.length > 1) {
            setLightboxImageIndex((prev) =>
                prev === 0 ? alternance.contentImages!.length - 1 : prev - 1
            );
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
            {/* Lightbox Modal */}
            {lightboxOpen && alternance.contentImages && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
                    onClick={closeLightbox}
                >
                    {/* Close Button */}
                    <button
                        onClick={closeLightbox}
                        className="absolute top-4 right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    {/* Navigation Arrows */}
                    {alternance.contentImages.length > 1 && (
                        <>
                            <button
                                onClick={(e) => { e.stopPropagation(); goToPrevLightboxImage(); }}
                                className="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
                            >
                                <ChevronLeft className="w-8 h-8" />
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); goToNextLightboxImage(); }}
                                className="absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
                            >
                                <ChevronRight className="w-8 h-8" />
                            </button>
                        </>
                    )}

                    {/* Image */}
                    <img
                        src={getProxiedImageUrl(alternance.contentImages[lightboxImageIndex].url)}
                        alt={`Image ${lightboxImageIndex + 1}`}
                        className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    />

                    {/* Image Counter */}
                    {alternance.contentImages.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium">
                            {lightboxImageIndex + 1} / {alternance.contentImages.length}
                        </div>
                    )}
                </div>
            )}

            {/* Floating Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-teal-200/20 to-emerald-200/20 dark:from-teal-700/10 dark:to-emerald-700/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
                <div className="absolute top-1/2 right-10 w-96 h-96 bg-gradient-to-br from-green-200/20 to-teal-200/20 dark:from-green-700/10 dark:to-teal-700/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }}></div>
                <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-gradient-to-br from-emerald-200/20 to-green-200/20 dark:from-emerald-700/10 dark:to-green-700/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s' }}></div>
            </div>

            {/* Hero Banner Section */}
            <div className="relative pt-20">
                <div className="relative w-full h-[45vh] sm:h-[50vh] lg:h-[55vh] overflow-hidden">
                    {proxiedBannerImage ? (
                        <img
                            src={proxiedBannerImage}
                            alt={alternance.title ?? "Alternance banner"}
                            className="h-full w-full object-cover scale-105 hover:scale-100 transition-transform duration-700"
                        />
                    ) : (
                        <div className={`h-full w-full bg-gradient-to-br from-teal-500 to-emerald-600 flex flex-col items-center justify-center text-white relative overflow-hidden`}>
                            <div className="absolute inset-0 opacity-30">
                                <div className="absolute top-10 left-10 w-32 h-32 border border-white/30 rounded-full"></div>
                                <div className="absolute bottom-20 right-20 w-48 h-48 border border-white/20 rounded-full"></div>
                                <div className="absolute top-1/2 left-1/3 w-24 h-24 border border-white/20 rounded-full"></div>
                            </div>
                            <GraduationCap className="w-20 h-20 mb-4 opacity-80 animate-bounce" style={{ animationDuration: '3s' }} />
                            <p className="text-2xl sm:text-3xl font-bold">{t('alternanceDetail.opportunityAlternance')}</p>
                            <p className="text-white/70 mt-2">{t('alternanceDetail.launchCareer')}</p>
                        </div>
                    )}

                    {/* Gradient Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/30 to-transparent" />

                    {/* Back Button */}
                    <div className="absolute top-6 left-4 sm:left-8 z-20">
                        <button
                            onClick={() => navigate(`/alternances/${PreviousPageNumber || ''}`)}
                            className="group inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-4 sm:px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:bg-white/20 hover:border-white/30 transition-all duration-300"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                            <span className="hidden sm:inline">{t('alternanceDetail.backToAlternances')}</span>
                        </button>
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute top-6 right-4 sm:right-8 z-20 flex items-center gap-2 sm:gap-3">
                        <button
                            onClick={handleShare}
                            className="p-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg hover:bg-white/20 hover:border-white/30 transition-all duration-300"
                            title="Partager"
                        >
                            <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                        <button
                            className="p-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg hover:bg-white/20 hover:border-white/30 transition-all duration-300"
                            title="Sauvegarder"
                        >
                            <Bookmark className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                    </div>

                    {/* Hero Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8 lg:p-12">
                        <div className="max-w-5xl mx-auto">
                            <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6">
                                {/* Author Profile Image - prioritize author image, then company logo */}
                                <div className="flex-shrink-0">
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-2xl border-2 border-white/30 overflow-hidden bg-white/10 backdrop-blur-sm shadow-2xl transform hover:scale-105 transition-transform duration-300">
                                        {alternance.authorProfile?.imageUrl ? (
                                            <img
                                                src={`https://corsproxy.io/?url=${encodeURIComponent(alternance.authorProfile.imageUrl)}`}
                                                alt={alternance.authorProfile.name || 'Author'}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : alternance.companyLogo ? (
                                            <img
                                                src={alternance.companyLogo}
                                                alt="Company logo"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-teal-500 to-emerald-600">
                                                <Building2 className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Title and Info */}
                                <div className="flex-1 min-w-0 text-white">
                                    <div className="flex flex-wrap items-center gap-2 mb-2 sm:mb-3">
                                        {alternance.source === 'linkedin' && (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0077B5]/80 backdrop-blur-sm text-xs sm:text-sm font-medium">
                                                <Linkedin className="w-3 h-3" />
                                                LinkedIn
                                            </span>
                                        )}
                                        {alternance.sector && (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-xs sm:text-sm font-medium border border-white/20">
                                                <Tag className="w-3 h-3" />
                                                {alternance.sector}
                                            </span>
                                        )}
                                    </div>

                                    <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-2 sm:mb-3 line-clamp-2">
                                        {alternance.title || 'Offre d\'alternance'}
                                    </h1>

                                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm text-white/80">
                                        <span className="inline-flex items-center gap-1.5 font-semibold">
                                            <Building2 className="w-4 h-4" />
                                            {alternance.company || 'Entreprise non spécifiée'}
                                        </span>
                                        {alternance.location && (
                                            <span className="inline-flex items-center gap-1.5">
                                                <MapPin className="w-4 h-4" />
                                                {alternance.location}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                {/* Not Yet Open Notice - Compact */}
                {alternance.isOpen === false && (
                    <div className="mb-4 flex items-center gap-3 p-3 bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 rounded-lg">
                        <span className="text-xl">🔒</span>
                        <div className="flex-1">
                            <span className="text-sm font-semibold text-amber-900 dark:text-amber-100">
                                {t('alternance.notYetOpen')} -
                            </span>
                            <span className="text-sm text-amber-800 dark:text-amber-200 ml-1">
                                {t('alternance.notYetOpenDescription')}
                            </span>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

                    {/* Left Column - Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Description Section */}
                        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-slate-200/50 dark:border-slate-700/50 shadow-xl overflow-hidden">
                            <div className="p-6 sm:p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center">
                                        <GraduationCap className="w-5 h-5 text-white" />
                                    </div>
                                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                                        À propos de l'offre
                                    </h2>
                                </div>

                                <div className="prose prose-slate dark:prose-invert max-w-none relative">
                                    <div
                                        className={`leading-relaxed whitespace-pre-line text-slate-600 dark:text-slate-300 [&_a]:text-teal-600 dark:[&_a]:text-teal-400 [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-teal-700 dark:hover:[&_a]:text-teal-300 text-sm sm:text-base transition-all duration-300 ease-in-out overflow-hidden ${isDescriptionExpanded ? '' : 'max-h-[200px]'}`}
                                    >
                                        <Linkify
                                            options={{
                                                target: "_blank",
                                                rel: "noopener noreferrer",
                                            }}
                                        >
                                            <p>{alternance.description || 'Aucune description disponible.'}</p>
                                        </Linkify>
                                    </div>

                                    {/* Gradient fade overlay when collapsed */}
                                    {!isDescriptionExpanded && alternance.description && alternance.description.length > 300 && (
                                        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-slate-800 to-transparent pointer-events-none" />
                                    )}
                                </div>

                                {/* Show more/less button */}
                                {alternance.description && alternance.description.length > 300 && (
                                    <button
                                        onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                                        className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 bg-teal-50 dark:bg-teal-900/30 hover:bg-teal-100 dark:hover:bg-teal-900/50 rounded-xl transition-all duration-200"
                                    >
                                        {isDescriptionExpanded ? (
                                            <>
                                                <span>{t('alternanceDetail.showLess')}</span>
                                                <ChevronUp className="w-4 h-4" />
                                            </>
                                        ) : (
                                            <>
                                                <span>{t('alternanceDetail.showMore')}</span>
                                                <ChevronDown className="w-4 h-4" />
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Requirements Section */}
                        {alternance.requirements && (
                            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-slate-200/50 dark:border-slate-700/50 shadow-xl overflow-hidden">
                                <div className="p-6 sm:p-8">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                                            <Tag className="w-5 h-5 text-white" />
                                        </div>
                                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                                            {t('alternanceDetail.prerequisites')}
                                        </h2>
                                    </div>
                                    <div className="text-slate-600 dark:text-slate-300 whitespace-pre-line">
                                        {alternance.requirements}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Image Carousel (for LinkedIn posts with images) */}
                        {alternance.contentImages && alternance.contentImages.length > 0 && (
                            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-slate-200/50 dark:border-slate-700/50 shadow-xl overflow-hidden">
                                <div className="p-6 sm:p-8">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                                        {t('alternanceDetail.images')} ({alternance.contentImages.length})
                                    </h3>

                                    {/* Carousel Container */}
                                    <div className="relative group">
                                        {/* Main Image Display */}
                                        <div
                                            className="relative aspect-video rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-700 cursor-pointer"
                                            onClick={() => openLightbox(currentImageIndex)}
                                        >
                                            <img
                                                src={getProxiedImageUrl(alternance.contentImages[currentImageIndex].url)}
                                                alt={`Image ${currentImageIndex + 1}`}
                                                className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                                            />

                                            {/* Zoom Overlay */}
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors duration-300">
                                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 rounded-full bg-white/20 backdrop-blur-sm">
                                                    <ZoomIn className="w-6 h-6 text-white" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Navigation Arrows (only show if multiple images) */}
                                        {alternance.contentImages.length > 1 && (
                                            <>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); goToPrevImage(); }}
                                                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-slate-800/80 shadow-lg hover:bg-white dark:hover:bg-slate-700 transition-all duration-200 opacity-0 group-hover:opacity-100"
                                                >
                                                    <ChevronLeft className="w-5 h-5 text-slate-700 dark:text-slate-200" />
                                                </button>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); goToNextImage(); }}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-slate-800/80 shadow-lg hover:bg-white dark:hover:bg-slate-700 transition-all duration-200 opacity-0 group-hover:opacity-100"
                                                >
                                                    <ChevronRight className="w-5 h-5 text-slate-700 dark:text-slate-200" />
                                                </button>
                                            </>
                                        )}
                                    </div>

                                    {/* Thumbnail Dots & Counter */}
                                    {alternance.contentImages.length > 1 && (
                                        <div className="mt-4 flex items-center justify-center gap-2">
                                            {alternance.contentImages.map((_, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => setCurrentImageIndex(index)}
                                                    className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${index === currentImageIndex
                                                        ? 'bg-teal-500 w-6'
                                                        : 'bg-slate-300 dark:bg-slate-600 hover:bg-teal-400'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    )}

                                    {/* Thumbnail Preview Strip (for more than 3 images) */}
                                    {alternance.contentImages.length > 3 && (
                                        <div className="mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600">
                                            {alternance.contentImages.map((image, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => setCurrentImageIndex(index)}
                                                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${index === currentImageIndex
                                                        ? 'border-teal-500 ring-2 ring-teal-500/50'
                                                        : 'border-transparent hover:border-slate-300 dark:hover:border-slate-600'
                                                        }`}
                                                >
                                                    <img
                                                        src={getProxiedImageUrl(image.url)}
                                                        alt={`Thumbnail ${index + 1}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Engagement Stats (only for LinkedIn posts with actual engagement data) */}
                        {alternance.source === 'linkedin' && alternance.scraperMeta?.engagement &&
                            ((alternance.scraperMeta.engagement.reactions || 0) > 0 ||
                                (alternance.scraperMeta.engagement.comments || 0) > 0 ||
                                (alternance.scraperMeta.engagement.shares || 0) > 0) && (
                                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-slate-200/50 dark:border-slate-700/50 shadow-xl overflow-hidden">
                                    <div className="p-6 sm:p-8">
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">{t('alternanceDetail.engagement')}</h3>
                                        <div className="flex flex-wrap gap-4">
                                            {(alternance.scraperMeta.engagement.reactions || 0) > 0 && (
                                                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400">
                                                    <Heart className="w-5 h-5" />
                                                    <span className="font-semibold">{alternance.scraperMeta.engagement.reactions}</span>
                                                    <span className="text-sm">{t('alternanceDetail.reactions')}</span>
                                                </div>
                                            )}
                                            {(alternance.scraperMeta.engagement.comments || 0) > 0 && (
                                                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                                                    <MessageCircle className="w-5 h-5" />
                                                    <span className="font-semibold">{alternance.scraperMeta.engagement.comments}</span>
                                                    <span className="text-sm">{t('alternanceDetail.comments')}</span>
                                                </div>
                                            )}
                                            {(alternance.scraperMeta.engagement.shares || 0) > 0 && (
                                                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                                                    <Repeat2 className="w-5 h-5" />
                                                    <span className="font-semibold">{alternance.scraperMeta.engagement.shares}</span>
                                                    <span className="text-sm">{t('alternanceDetail.shares')}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}


                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="space-y-6">
                        {/* Quick Info Card */}
                        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-slate-200/50 dark:border-slate-700/50 shadow-xl overflow-hidden sticky top-24">
                            <div className="p-6">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">{t('alternanceDetail.information')}</h3>

                                <div className="space-y-4">
                                    {alternance.duration && (
                                        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                                            <div className="w-10 h-10 rounded-lg bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center">
                                                <Clock className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-500 dark:text-slate-400">{t('alternanceDetail.duration')}</p>
                                                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                                                    {alternance.duration}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {alternance.contactEmail && (
                                        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                                            <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
                                                <Mail className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-500 dark:text-slate-400">{t('alternanceDetail.contact')}</p>
                                                <a href={`mailto:${alternance.contactEmail}`} className="text-sm font-semibold text-teal-600 dark:text-teal-400 hover:underline">
                                                    {alternance.contactEmail}
                                                </a>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                                        <div className="w-10 h-10 rounded-lg bg-slate-200 dark:bg-slate-600 flex items-center justify-center">
                                            <Calendar className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">{t('alternanceDetail.publishedOn')}</p>
                                            <p className="text-sm font-semibold text-slate-900 dark:text-white">
                                                {formatDate(alternance.createdAt)}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* View External URL Button - Show based on URL type */}
                                {alternance.externalUrl && (
                                    <div className="mt-6 space-y-3">
                                        {/* Check if it's a LinkedIn URL */}
                                        {(alternance.externalUrl.includes('linkedin.com') || alternance.source === 'linkedin') ? (
                                            <>
                                                <button
                                                    onClick={handleViewOriginalPost}
                                                    className="w-full group inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-[#0077B5] to-[#00A0DC] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-300"
                                                >
                                                    <Linkedin className="w-5 h-5" />
                                                    {t('alternanceDetail.viewOnLinkedIn')}
                                                    <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                                                </button>
                                                <p className="text-xs text-center text-slate-500 dark:text-slate-400">
                                                    {t('alternanceDetail.opensOriginalPost')}
                                                </p>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={handleViewOriginalPost}
                                                    className="w-full group inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-300"
                                                >
                                                    <ExternalLink className="w-5 h-5" />
                                                    {t('alternanceDetail.viewAlternance')}
                                                    <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                                                </button>
                                                <p className="text-xs text-center text-slate-500 dark:text-slate-400">
                                                    {t('alternanceDetail.opensExternalLink')}
                                                </p>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Author Card - Only show for LinkedIn posts with author profile */}
                        {alternance.source === 'linkedin' && alternance.authorProfile?.name && (
                            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-slate-200/50 dark:border-slate-700/50 shadow-xl overflow-hidden">
                                <div className="p-6">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Publié par</h3>

                                    <a
                                        href={alternance.authorProfile.profileUrl ?? "#"}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-300 group"
                                    >
                                        <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-slate-200 dark:ring-slate-600 group-hover:ring-teal-500 transition-all duration-300">
                                            {alternance.authorProfile.imageUrl ? (
                                                <img
                                                    src={`https://corsproxy.io/?url=${encodeURIComponent(alternance.authorProfile.imageUrl)}`}
                                                    alt={alternance.authorProfile.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center">
                                                    <User2 className="w-6 h-6 text-white" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-slate-900 dark:text-white truncate group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                                                {alternance.authorProfile.name}
                                            </p>
                                            {alternance.authorProfile.headline && (
                                                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                                                    {alternance.authorProfile.headline}
                                                </p>
                                            )}
                                            {alternance.authorProfile.profileUrl && (
                                                <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-1">
                                                    <Linkedin className="w-3 h-3" />
                                                    Voir le profil
                                                </p>
                                            )}
                                        </div>
                                        <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-teal-500 transition-colors" />
                                    </a>
                                </div>
                            </div>
                        )}


                    </div>
                </div>
            </div>

            <ScrollButtons />
        </div>
    );
};

export default AlternanceDetail;
