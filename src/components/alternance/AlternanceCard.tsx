import React from 'react';
import {
    MapPin,
    Clock,
    Building2,
    Calendar,
    ArrowRight,
    Euro
} from 'lucide-react';
import { Alternance } from '../../types/alternance';

interface AlternanceCardProps {
    alternance: Alternance;
    onClick?: () => void;
    index?: number;
}

const AlternanceCard: React.FC<AlternanceCardProps> = ({ alternance, onClick, index = 0 }) => {
    const getTypeLabel = (type?: string) => {
        switch (type) {
            case 'apprenticeship': return 'Apprentissage';
            case 'professionalization_contract': return 'Contrat Pro';
            case 'other': return 'Autre';
            default: return 'Alternance';
        }
    };

    const getTypeColor = (type?: string) => {
        switch (type) {
            case 'apprenticeship':
                return 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800';
            case 'professionalization_contract':
                return 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800';
            default:
                return 'bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800';
        }
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return null;
        return new Date(dateString).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    return (
        <div
            onClick={onClick}
            className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden cursor-pointer transform hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 animate-fade-in-up"
            style={{ animationDelay: `${index * 80}ms` }}
        >
            {/* Header with gradient accent */}
            <div className="relative h-3 bg-gradient-to-r from-teal-500 via-emerald-500 to-green-500"></div>

            {/* Content */}
            <div className="p-6">
                {/* Type Badge & Company Logo */}
                <div className="flex items-start justify-between mb-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${getTypeColor(alternance.type)}`}>
                        {getTypeLabel(alternance.type)}
                    </span>

                    {alternance.companyLogo ? (
                        <img
                            src={alternance.companyLogo}
                            alt={alternance.company || 'Company'}
                            className="w-12 h-12 rounded-lg object-cover border border-slate-200 dark:border-slate-600"
                        />
                    ) : (
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-lg">
                            <Building2 className="w-6 h-6 text-white" />
                        </div>
                    )}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300 mb-2 line-clamp-2">
                    {alternance.title || 'Offre d\'alternance'}
                </h3>

                {/* Company */}
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 mb-3">
                    <Building2 className="w-4 h-4 flex-shrink-0" />
                    <span className="font-medium truncate">{alternance.company || 'Entreprise non spécifiée'}</span>
                </div>

                {/* Location & Duration */}
                <div className="flex flex-wrap gap-3 mb-4">
                    {alternance.location && (
                        <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                            <MapPin className="w-4 h-4" />
                            <span>{alternance.location}</span>
                        </div>
                    )}
                    {alternance.duration && (
                        <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                            <Clock className="w-4 h-4" />
                            <span>{alternance.duration}</span>
                        </div>
                    )}
                </div>

                {/* Description */}
                {alternance.description && (
                    <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 mb-4">
                        {alternance.description}
                    </p>
                )}

                {/* Salary & Start Date */}
                <div className="flex flex-wrap gap-3 mb-4">
                    {alternance.salary && (
                        <div className="flex items-center gap-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                            <Euro className="w-4 h-4" />
                            <span>{alternance.salary}</span>
                        </div>
                    )}
                    {alternance.startDate && (
                        <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                            <Calendar className="w-4 h-4" />
                            <span>Début: {formatDate(alternance.startDate)}</span>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
                    {alternance.sector && (
                        <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-md">
                            {alternance.sector}
                        </span>
                    )}
                    <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-semibold text-sm group-hover:gap-3 transition-all duration-300 ml-auto">
                        <span>Voir détails</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AlternanceCard;
