/**
 * Alternance (Work-Study/Apprenticeship) Types
 */

export interface Alternance {
    _id?: string;
    title?: string;
    company?: string;
    location?: string;
    type?: 'apprenticeship' | 'professionalization_contract' | 'other';
    duration?: string;
    description?: string;
    requirements?: string;
    salary?: string;
    startDate?: string;
    applicationDeadline?: string;
    contactEmail?: string;
    companyLogo?: string;
    externalUrl?: string;

    // Content Images (for LinkedIn posts or manual uploads)
    contentImages?: {
        url: string;
        width?: number;
        height?: number;
    }[];

    // Author/Company Profile
    authorProfile?: {
        name?: string;
        headline?: string;
        profileUrl?: string;
        imageUrl?: string;
    };

    status?: 'pending' | 'approved' | 'rejected';
    isActive?: boolean;
    createdBy?: string;
    tags?: string[];
    category?: string;
    sector?: string;
    source?: 'manual' | 'linkedin' | 'other';
    scraperMeta?: {
        activity_id?: string;
        posted_at?: string;
        author_profile?: string;
        engagement?: {
            reactions?: number;
            comments?: number;
            shares?: number;
        };
    };
    createdAt?: string;
    updatedAt?: string;
}

export interface AlternanceFormData {
    title?: string;
    company?: string;
    location?: string;
    type?: 'apprenticeship' | 'professionalization_contract' | 'other';
    duration?: string;
    description?: string;
    requirements?: string;
    salary?: string;
    startDate?: string;
    applicationDeadline?: string;
    contactEmail?: string;
    companyLogo?: string;
    externalUrl?: string;
    isActive?: boolean;
    tags?: string[];
    category?: string;
    sector?: string;
}

export interface AlternancePagination {
    page: number;
    limit: number;
    total: number;
    pages: number;
}

export interface AlternanceListResponse {
    alternances: Alternance[];
    pagination: AlternancePagination;
}

export interface AlternanceFilters {
    search?: string;
    type?: string;
    category?: string;
    status?: 'pending' | 'approved' | 'rejected';
    isActive?: boolean;
    fromDate?: string;
    toDate?: string;
}

export interface AlternanceStats {
    totalCount: number;
    activeCount: number;
    inactiveCount: number;
    apprenticeshipCount: number;
    professionalContractCount: number;
    pendingCount: number;
    approvedCount: number;
    rejectedCount: number;
}
