// Form validation and submission handling
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('applicationForm');
    const fileInput = document.getElementById('resume');
    const dropZone = fileInput.closest('div.border-dashed');

    // File upload handling
    function handleFileUpload(file) {
        if (file) {
            const maxSize = 10 * 1024 * 1024; // 10MB
            const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            
            if (file.size > maxSize) {
                alert('File size should not exceed 10MB');
                fileInput.value = '';
                return false;
            }
            
            if (!allowedTypes.includes(file.type)) {
                alert('Please upload PDF, DOC, or DOCX files only');
                fileInput.value = '';
                return false;
            }

            const text = dropZone.querySelector('p.text-xs');
            text.textContent = `Selected file: ${file.name}`;
            return true;
        }
    }

    // Drag and drop handling
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, unhighlight, false);
    });

    function highlight(e) {
        dropZone.classList.add('border-primary', 'bg-primary/5');
    }

    function unhighlight(e) {
        dropZone.classList.remove('border-primary', 'bg-primary/5');
    }

    dropZone.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const file = dt.files[0];
        handleFileUpload(file);
    }

    // File input change handler
    fileInput.addEventListener('change', function(e) {
        handleFileUpload(e.target.files[0]);
    });

    // Form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Basic form validation
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value) {
                isValid = false;
                field.classList.add('border-red-500');
                
                // Add error message
                const errorDiv = field.parentElement.querySelector('.error-message');
                if (!errorDiv) {
                    const error = document.createElement('div');
                    error.className = 'error-message text-red-500 text-sm mt-1';
                    error.textContent = 'This field is required';
                    field.parentElement.appendChild(error);
                }
            } else {
                field.classList.remove('border-red-500');
                const errorDiv = field.parentElement.querySelector('.error-message');
                if (errorDiv) {
                    errorDiv.remove();
                }
            }
        });

        if (!isValid) {
            return;
        }

        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Submitting...';

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-500 translate-y-0';
            successMessage.innerHTML = `
                <div class="flex items-center space-x-2">
                    <i class="fas fa-check-circle"></i>
                    <span>Application submitted successfully!</span>
                </div>
            `;
            document.body.appendChild(successMessage);

            // Reset form
            form.reset();
            const fileText = dropZone.querySelector('p.text-xs');
            fileText.textContent = 'PDF, DOC, DOCX up to 10MB';

            // Remove success message after 3 seconds
            setTimeout(() => {
                successMessage.classList.add('translate-y-[-100%]');
                setTimeout(() => successMessage.remove(), 500);
            }, 3000);

        } catch (error) {
            // Show error message
            alert('An error occurred. Please try again.');
        } finally {
            // Reset button state
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
    });

    // Clear error styling on input
    requiredFields.forEach(field => {
        field.addEventListener('input', function() {
            this.classList.remove('border-red-500');
            const errorDiv = this.parentElement.querySelector('.error-message');
            if (errorDiv) {
                errorDiv.remove();
            }
        });
    });
});
