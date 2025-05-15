// Sample job data
const jobs = [
    {
        id: 1,
        title: 'Senior Frontend Developer',
        company: 'Tech Corp',
        logo: '<i class="fab fa-google text-3xl"></i>',
        location: 'New York, NY',
        salary: '$120,000 - $150,000',
        type: 'Full-time',
        experience: 'Senior Level',
        description: 'We are looking for an experienced Frontend Developer to join our team...',
        requirements: [
            'Expert in React and TypeScript',
            'Experience with Next.js',
            'Strong understanding of web performance',
            '5+ years of experience'
        ],
        skills: ['React', 'TypeScript', 'Next.js', 'TailwindCSS'],
        posted: '2 days ago'
    },
    {
        id: 2,
        title: 'Product Designer',
        company: 'Design Studio',
        logo: '<i class="fab fa-figma text-3xl"></i>',
        location: 'Remote',
        salary: '$90,000 - $120,000',
        type: 'Full-time',
        experience: 'Mid Level',
        description: 'Join our creative team as a Product Designer...',
        requirements: [
            'Strong portfolio of UI/UX work',
            'Experience with Figma',
            'Understanding of design systems',
            '3+ years of experience'
        ],
        skills: ['UI/UX', 'Figma', 'Design Systems', 'Prototyping'],
        posted: '1 week ago'
    },
    {
        id: 3,
        title: 'Backend Developer',
        company: 'Cloud Solutions',
        logo: '<i class="fab fa-aws text-3xl"></i>',
        location: 'San Francisco, CA',
        salary: '$130,000 - $160,000',
        type: 'Contract',
        experience: 'Senior Level',
        description: 'Looking for a skilled Backend Developer with cloud expertise...',
        requirements: [
            'Expert in Node.js and Python',
            'AWS certification preferred',
            'Experience with microservices',
            '5+ years of experience'
        ],
        skills: ['Node.js', 'Python', 'AWS', 'Microservices'],
        posted: '3 days ago'
    }
];

// Function to create a job card
function createJobCard(job) {
    return `
        <div class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <div class="flex items-start justify-between">
                <div class="flex items-start space-x-4">
                    <div class="w-12 h-12 bg-primary bg-opacity-10 rounded-xl flex items-center justify-center text-primary">
                        ${job.logo}
                    </div>
                    <div>
                        <h3 class="text-xl font-semibold text-gray-800 hover:text-primary transition-colors duration-300">
                            ${job.title}
                        </h3>
                        <p class="text-gray-600 mb-2">${job.company}</p>
                        <div class="flex flex-wrap gap-2 mb-3">
                            <span class="inline-flex items-center text-sm text-gray-600">
                                <i class="fas fa-map-marker-alt text-primary mr-1"></i>
                                ${job.location}
                            </span>
                            <span class="inline-flex items-center text-sm text-gray-600">
                                <i class="fas fa-briefcase text-primary mr-1"></i>
                                ${job.type}
                            </span>
                            <span class="inline-flex items-center text-sm text-gray-600">
                                <i class="fas fa-clock text-primary mr-1"></i>
                                ${job.posted}
                            </span>
                        </div>
                        <div class="flex flex-wrap gap-2">
                            ${job.skills.map(skill => `
                                <span class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                                    ${skill}
                                </span>
                            `).join('')}
                        </div>
                    </div>
                </div>
                <div class="text-right">
                    <div class="text-primary font-semibold mb-2">${job.salary}</div>
                    <button class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors duration-300">
                        Apply Now
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Function to apply filters and return filtered jobs
function applyFilters(jobs) {
    // Get all checked filters
    const selectedTypes = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
        .map(checkbox => checkbox.nextElementSibling.textContent.trim().toLowerCase());

    // Get salary range filters
    const selectedSalaryRanges = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
        .map(checkbox => checkbox.nextElementSibling.textContent.trim())
        .filter(text => text.includes('$'));

    // Get experience level filters
    const selectedExperience = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
        .map(checkbox => checkbox.nextElementSibling.textContent.trim())
        .filter(text => text.includes('Level'));

    return jobs.filter(job => {
        // If no filters are selected, show all jobs
        if (selectedTypes.length === 0 && selectedSalaryRanges.length === 0 && selectedExperience.length === 0) {
            return true;
        }

        const matchesType = selectedTypes.length === 0 || selectedTypes.includes(job.type.toLowerCase());
        const matchesExperience = selectedExperience.length === 0 || selectedExperience.includes(job.experience);
        
        // Check salary range
        let matchesSalary = true;
        if (selectedSalaryRanges.length > 0) {
            const jobSalary = parseInt(job.salary.replace(/[^0-9]/g, ''));
            matchesSalary = selectedSalaryRanges.some(range => {
                const [min, max] = range.match(/\d+/g).map(num => parseInt(num + '000'));
                return jobSalary >= min && (!max || jobSalary <= max);
            });
        }

        return matchesType && matchesExperience && matchesSalary;
    });
}

// Function to sort jobs
function sortJobs(jobs, sortBy) {
    return [...jobs].sort((a, b) => {
        switch (sortBy) {
            case 'salary-high':
                return parseInt(b.salary.replace(/[^0-9]/g, '')) - parseInt(a.salary.replace(/[^0-9]/g, ''));
            case 'salary-low':
                return parseInt(a.salary.replace(/[^0-9]/g, '')) - parseInt(b.salary.replace(/[^0-9]/g, ''));
            case 'recent':
                return a.posted.includes('day') ? -1 : 1;
            default:
                return 0;
        }
    });
}

// Function to render job listings
function renderJobs(jobsToRender = jobs) {
    const jobListingsContainer = document.getElementById('jobListings');
    if (!jobListingsContainer) return;

    // Apply filters
    let filteredJobs = applyFilters(jobsToRender);

    // Apply sorting
    const sortSelect = document.querySelector('select');
    if (sortSelect) {
        filteredJobs = sortJobs(filteredJobs, sortSelect.value);
    }

    // Update the UI
    jobListingsContainer.innerHTML = filteredJobs.map(job => createJobCard(job)).join('');

    // Update job count
    const jobCount = document.createElement('div');
    jobCount.className = 'text-gray-600 mt-4';
    jobCount.textContent = `Showing ${filteredJobs.length} jobs`;
    jobListingsContainer.insertAdjacentElement('beforebegin', jobCount);
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    renderJobs();

    // Handle filter changes
    const filterCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            renderJobs();
        });
    });

    // Handle sort changes
    const sortSelect = document.querySelector('select');
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            renderJobs();
        });
    }

    // Handle clear filters
    const clearFiltersBtn = document.querySelector('button[class*="clear-filters"]');
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', () => {
            filterCheckboxes.forEach(checkbox => checkbox.checked = false);
            renderJobs();
        });
    }
});
