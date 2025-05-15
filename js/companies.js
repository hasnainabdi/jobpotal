// Sample company data
const companies = [
    {
        id: 1,
        name: 'Google',
        logo: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
        industry: 'Technology',
        location: 'Mountain View, CA',
        size: '50,000+ employees',
        description: 'A leading technology company specializing in internet-related services and products.',
        benefits: ['Competitive salary', 'Health insurance', 'Remote work options', 'Professional development'],
        openPositions: 45,
        rating: 4.8,
        featured: true
    },
    {
        id: 2,
        name: 'Microsoft',
        logo: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31',
        industry: 'Technology',
        location: 'Redmond, WA',
        size: '100,000+ employees',
        description: 'Global technology corporation that develops, manufactures, and sells computer software and consumer electronics.',
        benefits: ['Flexible hours', 'Stock options', 'Healthcare', 'Education reimbursement'],
        openPositions: 38,
        rating: 4.7,
        featured: true
    },
    {
        id: 3,
        name: 'Apple',
        logo: 'https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png',
        industry: 'Technology',
        location: 'Cupertino, CA',
        size: '80,000+ employees',
        description: 'Innovative technology company known for its consumer electronics, software, and services.',
        benefits: ['Health and wellness', '401(k) matching', 'Parental leave', 'Employee discounts'],
        openPositions: 52,
        rating: 4.9,
        featured: true
    },
    {
        id: 4,
        name: 'Amazon',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
        industry: 'E-commerce',
        location: 'Seattle, WA',
        size: '200,000+ employees',
        description: 'World\'s largest e-commerce company, cloud computing leader, and technology innovator.',
        benefits: ['Sign-on bonus', 'Career growth', 'Healthcare', 'Relocation assistance'],
        openPositions: 65,
        rating: 4.6,
        featured: true
    },
    {
        id: 5,
        name: 'Meta',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg',
        industry: 'Technology',
        location: 'Menlo Park, CA',
        size: '40,000+ employees',
        description: 'Social technology company building the future of connection and virtual reality.',
        benefits: ['Competitive pay', 'Wellness programs', 'Food service', 'Transportation'],
        openPositions: 28,
        rating: 4.5,
        featured: true
    },
    {
        id: 6,
        name: 'Netflix',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png',
        industry: 'Entertainment',
        location: 'Los Gatos, CA',
        size: '10,000+ employees',
        description: 'Leading streaming entertainment service and content production company.',
        benefits: ['Unlimited PTO', 'Stock options', 'Family support', 'Learning stipend'],
        openPositions: 15,
        rating: 4.7,
        featured: true
    }
];

// Function to create a company card
function createCompanyCard(company) {
    return `
        <div class="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-300 border border-gray-100 group">
            <div class="flex items-center mb-6">
                <div class="w-20 h-20 rounded-lg bg-white flex items-center justify-center mr-4 border border-gray-100 p-2">
                    <img src="${company.logo}" alt="${company.name} logo" class="w-full h-full object-contain">
                </div>
                <div class="flex-1">
                    <h3 class="font-bold text-xl text-gray-800 group-hover:text-primary transition-colors duration-300">${company.name}</h3>
                    <p class="text-gray-600 flex items-center mt-1">
                        <i class="fas fa-building text-gray-400 mr-2"></i>
                        ${company.industry}
                    </p>
                    <div class="flex items-center mt-2">
                        <div class="flex items-center bg-yellow-50 text-yellow-600 px-2 py-1 rounded-full text-sm">
                            <i class="fas fa-star text-yellow-400 mr-1"></i>
                            <span class="font-medium">${company.rating}</span>
                        </div>
                        <span class="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium ml-2">
                            ${company.openPositions} open positions
                        </span>
                    </div>
                </div>
            </div>
            <p class="text-gray-600 mb-6 line-clamp-2">${company.description}</p>
            <div class="grid grid-cols-2 gap-4 mb-6">
                <div class="flex items-center text-gray-600">
                    <i class="fas fa-map-marker-alt text-gray-400 mr-2"></i>
                    <span>${company.location}</span>
                </div>
                <div class="flex items-center text-gray-600">
                    <i class="fas fa-users text-gray-400 mr-2"></i>
                    <span>${company.size}</span>
                </div>
            </div>
            <div class="flex flex-wrap gap-2 mb-6">
                ${company.benefits.map(benefit => `
                    <span class="bg-gray-50 text-gray-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors duration-200">
                        ${benefit}
                    </span>
                `).join('')}
            </div>
            <div class="mt-4">
                <a href="#" class="inline-flex items-center justify-center w-full px-4 py-2.5 text-sm font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary hover:text-white transition-all duration-200">
                    <i class="fas fa-briefcase mr-2"></i>
                    View all positions
                </a>
            </div>
        </div>
    `;
}

// Function to filter companies based on search and filters
function filterCompanies(searchTerm = '', filters = {}) {
    return companies.filter(company => {
        // Search term matching
        const matchesSearch = !searchTerm || 
            company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
            company.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            company.location.toLowerCase().includes(searchTerm.toLowerCase());

        // Industry filter
        const matchesIndustry = !filters.industry || 
            company.industry.toLowerCase() === filters.industry.toLowerCase();

        // Location filter
        const matchesLocation = !filters.location || 
            company.location.toLowerCase().includes(filters.location.toLowerCase());

        // Size filter
        const matchesSize = !filters.size || company.size.includes(filters.size);

        // Open positions filter
        const matchesOpenings = !filters.minOpenings || 
            company.openPositions >= filters.minOpenings;

        // Rating filter
        const matchesRating = !filters.minRating || 
            company.rating >= filters.minRating;

        return matchesSearch && matchesIndustry && matchesLocation && 
               matchesSize && matchesOpenings && matchesRating;
    });
}

// Function to sort companies
function sortCompanies(companies, sortBy) {
    return [...companies].sort((a, b) => {
        switch (sortBy) {
            case 'name':
            case 'Alphabetical':
                return a.name.localeCompare(b.name);
            case 'rating':
            case 'Most Popular':
                return b.rating - a.rating;
            case 'openings':
            case 'Most Jobs':
                return b.openPositions - a.openPositions;
            case 'size':
                return parseInt(b.size) - parseInt(a.size);
            case 'featured':
                return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
            default:
                return 0;
        }
    });
}

// Function to render featured companies
function renderFeaturedCompanies() {
    const featuredCompaniesContainer = document.getElementById('featuredCompanies');
    if (!featuredCompaniesContainer) return;

    const featuredCompanies = companies.filter(company => company.featured);
    featuredCompaniesContainer.innerHTML = featuredCompanies
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 3)
        .map(company => createCompanyCard(company))
        .join('');

    // Update featured companies count
    const featuredCount = document.getElementById('featuredCount');
    if (featuredCount) {
        featuredCount.textContent = featuredCompanies.length;
    }
}

// Function to render company grid
function renderCompanyGrid(filters = {}, sortBy = 'featured') {
    const companyGridContainer = document.getElementById('companyGrid');
    if (!companyGridContainer) return;

    // Get filtered and sorted companies
    const filteredCompanies = filterCompanies(filters.searchTerm || '', filters);
    const sortedCompanies = sortCompanies(filteredCompanies, sortBy);

    // Render companies
    companyGridContainer.innerHTML = sortedCompanies
        .map(company => createCompanyCard(company))
        .join('');

    // Update company count
    const companyCount = document.getElementById('companyCount');
    if (companyCount) {
        companyCount.textContent = filteredCompanies.length;
    }

    // Update total jobs count
    const totalJobsCount = document.getElementById('totalJobsCount');
    if (totalJobsCount) {
        const totalJobs = filteredCompanies.reduce((sum, company) => sum + company.openPositions, 0);
        totalJobsCount.textContent = totalJobs;
    }
}

// Function to handle search and filters
function handleSearch() {
    const searchInput = document.getElementById('searchInput');
    const industrySelect = document.getElementById('industryFilter');
    const locationSelect = document.getElementById('locationFilter');
    const sortSelect = document.getElementById('sortFilter');

    const filters = {
        searchTerm: searchInput?.value || '',
        industry: industrySelect?.value || '',
        location: locationSelect?.value || ''
    };

    renderCompanyGrid(filters, sortSelect?.value || 'featured');
}

// Helper function to get current filter values
function getCurrentFilters() {
    return {
        searchTerm: document.getElementById('searchInput')?.value || '',
        industry: document.getElementById('industryFilter')?.value || '',
        location: document.getElementById('locationFilter')?.value || '',
        sortBy: document.getElementById('sortFilter')?.value || 'featured'
    };
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Initial render
    renderFeaturedCompanies();
    renderCompanyGrid();

    // Get all interactive elements
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const industryFilter = document.getElementById('industryFilter');
    const locationFilter = document.getElementById('locationFilter');
    const sortFilter = document.getElementById('sortFilter');
    const loadMoreBtn = document.getElementById('loadMoreBtn');

    // Search events
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            // Debounce search for better performance
            clearTimeout(searchInput.debounceTimer);
            searchInput.debounceTimer = setTimeout(handleSearch, 300);
        });

        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
    }

    if (searchButton) {
        searchButton.addEventListener('click', handleSearch);
    }

    // Filter events with instant update
    [industryFilter, locationFilter, sortFilter].forEach(filter => {
        if (filter) {
            filter.addEventListener('change', handleSearch);
        }
    });

    // Load more functionality
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            const currentCount = document.querySelectorAll('#companyGrid > div').length;
            renderCompanyGrid({
                ...getCurrentFilters(),
                offset: currentCount,
                limit: 6
            });
        });
    }
});
