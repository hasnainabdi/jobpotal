// Sample job data (in a real application, this would come from an API)
const jobs = [
    {
        title: 'Senior Frontend Developer',
        company: 'Tech Corp',
        logo: '<i class="fas fa-code"></i>',
        location: 'New York, NY',
        salary: '$120,000 - $150,000',
        type: 'Full-time',
        category: 'tech',
        skills: ['React', 'TypeScript', 'Next.js', 'TailwindCSS'],
        posted: '2 days ago'
    },
    {
        title: 'Backend Engineer',
        company: 'Software Solutions',
        logo: '<i class="fas fa-server"></i>',
        location: 'San Francisco, CA',
        salary: '$130,000 - $160,000',
        type: 'Remote',
        category: 'tech',
        skills: ['Node.js', 'Python', 'AWS', 'MongoDB'],
        posted: '3 days ago'
    },
    {
        title: 'UI/UX Designer',
        company: 'Creative Agency',
        logo: '<i class="fas fa-paint-brush"></i>',
        location: 'Los Angeles, CA',
        salary: '$90,000 - $120,000',
        type: 'Hybrid',
        category: 'design',
        skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping'],
        posted: '1 week ago'
    },
    {
        title: 'DevOps Engineer',
        company: 'Cloud Systems',
        logo: '<i class="fas fa-cloud"></i>',
        location: 'Remote',
        salary: '$140,000 - $180,000',
        type: 'Full-time',
        category: 'tech',
        skills: ['Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
        posted: '5 days ago'
    },
    {
        title: 'Mobile App Developer',
        company: 'App Innovators',
        logo: '<i class="fas fa-mobile-alt"></i>',
        location: 'Boston, MA',
        salary: '$110,000 - $140,000',
        type: 'Contract',
        category: 'tech',
        skills: ['React Native', 'iOS', 'Android', 'Firebase'],
        posted: '1 day ago'
    },
    {
        title: 'Marketing Manager',
        company: 'Growth Co',
        logo: '<i class="fas fa-bullhorn"></i>',
        location: 'Chicago, IL',
        salary: '$85,000 - $110,000',
        type: 'Part-time',
        category: 'marketing',
        skills: ['SEO', 'Content Strategy', 'Social Media', 'Analytics'],
        posted: '4 days ago'
    },
    {
        title: 'Data Scientist',
        company: 'Data Analytics Co',
        logo: '<i class="fas fa-chart-line"></i>',
        location: 'Chicago, IL',
        salary: '$125,000 - $165,000',
        type: 'Full-time',
        category: 'tech',
        skills: ['Python', 'Machine Learning', 'SQL'],
        posted: '1 week ago'
    }
];

// Function to create a job card
function createJobCard(job, index) {
    const skills = job.skills || ['JavaScript', 'React', 'Node.js'];
    return `
        <div class="bg-white p-6 rounded-xl border-2 border-gray-100 hover:border-primary transition-all duration-300 group"
             style="animation: fade-in-up 0.5s ease-out forwards; animation-delay: ${index * 0.2}s;">
            <!-- Header -->
            <div class="flex items-start justify-between mb-4">
                <div class="flex items-center space-x-4">
                    <div class="w-12 h-12 bg-primary bg-opacity-10 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                        ${job.logo}
                    </div>
                    <div>
                        <h4 class="text-lg font-bold text-gray-800 group-hover:text-primary transition-colors duration-300">${job.title}</h4>
                        <p class="text-gray-600 flex items-center gap-2">
                            ${job.company}
                            <span class="inline-block w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                            <span class="text-primary font-medium">${job.type}</span>
                        </p>
                    </div>
                </div>
                <button class="text-gray-400 hover:text-red-500 transition-colors duration-300">
                    <i class="far fa-heart text-xl"></i>
                </button>
            </div>

            <!-- Job Details -->
            <div class="grid grid-cols-2 gap-4 mb-4">
                <div class="flex items-center space-x-2 text-gray-600">
                    <div class="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center">
                        <i class="fas fa-map-marker-alt text-primary"></i>
                    </div>
                    <span>${job.location}</span>
                </div>
                <div class="flex items-center space-x-2 text-gray-600">
                    <div class="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center">
                        <i class="fas fa-dollar-sign text-primary"></i>
                    </div>
                    <span>${job.salary}</span>
                </div>
            </div>

            <!-- Skills -->
            <div class="flex flex-wrap gap-2 mb-4">
                ${skills.map(skill => `
                    <span class="px-3 py-1 bg-gray-50 text-gray-600 rounded-lg text-sm">${skill}</span>
                `).join('')}
            </div>

            <!-- Footer -->
            <div class="flex justify-between items-center pt-4 border-t border-gray-100">
                <div class="text-sm text-gray-500">
                    <i class="far fa-clock mr-1"></i> Posted 2 days ago
                </div>
                <button class="bg-primary bg-opacity-10 text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2">
                    Apply Now
                    <i class="fas fa-arrow-right transition-transform group-hover:translate-x-1"></i>
                </button>
            </div>
        </div>
    `;
}

// Function to filter jobs
function filterJobs(searchText = '', category = '', location = '') {
    return jobs.filter(job => {
        const matchesSearch = searchText === '' ||
            job.title.toLowerCase().includes(searchText.toLowerCase()) ||
            job.company.toLowerCase().includes(searchText.toLowerCase()) ||
            job.skills.some(skill => skill.toLowerCase().includes(searchText.toLowerCase()));

        const matchesCategory = category === '' || job.category === category;
        const matchesLocation = location === '' || job.type.toLowerCase() === location.toLowerCase();

        return matchesSearch && matchesCategory && matchesLocation;
    });
}

// Function to display jobs
function displayJobs(filteredJobs = jobs) {
    const jobListings = document.getElementById('jobListings');
    if (filteredJobs.length === 0) {
        jobListings.innerHTML = `
            <div class="col-span-full text-center py-8">
                <div class="text-5xl mb-4"><i class="fas fa-search text-gray-300"></i></div>
                <h4 class="text-xl font-semibold text-gray-600 mb-2">No jobs found</h4>
                <p class="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
        `;
        return;
    }
    jobListings.innerHTML = filteredJobs.map((job, index) => createJobCard(job, index)).join('');
}

// Function to update active filters
function updateActiveFilters(filters) {
    const activeFilters = document.getElementById('activeFilters');
    activeFilters.innerHTML = Object.entries(filters)
        .filter(([_, value]) => value !== '')
        .map(([key, value]) => `
            <span class="bg-primary bg-opacity-10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-2">
                ${value} <i class="fas fa-times cursor-pointer hover:text-red-500" data-filter="${key}"></i>
            </span>
        `).join('');
}

// Animate number counter
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value + '+';
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Initial display
    displayJobs();

    // Search and filter functionality
    const searchInput = document.querySelector('input[type="search"]');
    const categorySelect = document.querySelector('select:first-of-type');
    const locationSelect = document.querySelector('select:last-of-type');
    const filterButton = document.querySelector('button:has(.fa-filter)');

    let currentFilters = {
        search: '',
        category: '',
        location: ''
    };

    function applyFilters() {
        const filteredJobs = filterJobs(
            currentFilters.search,
            currentFilters.category,
            currentFilters.location
        );
        displayJobs(filteredJobs);
        updateActiveFilters(currentFilters);
    }

    searchInput?.addEventListener('input', (e) => {
        currentFilters.search = e.target.value;
        applyFilters();
    });

    categorySelect?.addEventListener('change', (e) => {
        currentFilters.category = e.target.value;
        applyFilters();
    });

    locationSelect?.addEventListener('change', (e) => {
        currentFilters.location = e.target.value;
        applyFilters();
    });

    filterButton?.addEventListener('click', () => {
        applyFilters();
    });

    // Handle removing filters
    document.getElementById('activeFilters')?.addEventListener('click', (e) => {
        if (e.target.classList.contains('fa-times')) {
            const filterType = e.target.dataset.filter;
            currentFilters[filterType] = '';
            // Reset corresponding select element
            if (filterType === 'category') categorySelect.value = '';
            if (filterType === 'location') locationSelect.value = '';
            applyFilters();
        }
    });

    // Animate stats when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statsElements = document.querySelectorAll('.hover-lift .text-4xl');
                statsElements.forEach((el, index) => {
                    const finalValue = parseInt(el.textContent);
                    setTimeout(() => {
                        animateValue(el, 0, finalValue, 2000);
                    }, index * 200);
                });
                observer.disconnect();
            }
        });
    });

    const statsSection = document.querySelector('.hover-lift');
    if (statsSection) {
        observer.observe(statsSection);
    }

    // Add hover effect to category cards
    const categoryCards = document.querySelectorAll('.hover-lift');
    categoryCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
});
