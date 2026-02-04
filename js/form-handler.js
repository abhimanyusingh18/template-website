// ============================================
// FORM VALIDATION & HANDLING
// ============================================

document.addEventListener('DOMContentLoaded', function () {

    const forms = document.querySelectorAll('form[data-validate="true"]');

    forms.forEach(form => {
        form.addEventListener('submit', function (e) {
            let isValid = true;

            // Clear previous errors
            const errorMessages = form.querySelectorAll('.form-error');
            errorMessages.forEach(msg => {
                msg.style.display = 'none';
            });

            const formGroups = form.querySelectorAll('.form-group');
            formGroups.forEach(group => {
                group.classList.remove('error');
            });

            // Validate each required field
            const requiredFields = form.querySelectorAll('[required]');

            requiredFields.forEach(field => {
                const formGroup = field.closest('.form-group');
                const errorElement = formGroup ? formGroup.querySelector('.form-error') : null;

                // Check if empty
                if (!field.value.trim()) {
                    isValid = false;
                    if (formGroup) formGroup.classList.add('error');
                    if (errorElement) {
                        errorElement.textContent = 'This field is required';
                        errorElement.style.display = 'block';
                    }
                    return;
                }

                // Email validation
                if (field.type === 'email') {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(field.value)) {
                        isValid = false;
                        if (formGroup) formGroup.classList.add('error');
                        if (errorElement) {
                            errorElement.textContent = 'Please enter a valid email address';
                            errorElement.style.display = 'block';
                        }
                    }
                }

                // Phone validation (10 digits)
                if (field.type === 'tel' || field.name === 'phone') {
                    const phoneRegex = /^[0-9]{10}$/;
                    const cleanedPhone = field.value.replace(/\D/g, '');

                    if (!phoneRegex.test(cleanedPhone)) {
                        isValid = false;
                        if (formGroup) formGroup.classList.add('error');
                        if (errorElement) {
                            errorElement.textContent = 'Please enter a valid 10-digit phone number';
                            errorElement.style.display = 'block';
                        }
                    }
                }
            });

            // If form is invalid, prevent submission
            if (!isValid) {
                e.preventDefault();

                // Scroll to first error
                const firstError = form.querySelector('.form-group.error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            } else {
                // Show loading state on submit button
                const submitBtn = form.querySelector('button[type="submit"]');
                if (submitBtn) {
                    const originalText = submitBtn.textContent;
                    submitBtn.textContent = 'Sending...';
                    submitBtn.disabled = true;

                    // Note: FormSubmit.co will handle the actual submission
                    // The button will be re-enabled after page reload or redirect
                }
            }
        });

        // Real-time validation on blur
        const inputs = form.querySelectorAll('input, textarea, select');

        inputs.forEach(input => {
            input.addEventListener('blur', function () {
                const formGroup = this.closest('.form-group');
                const errorElement = formGroup ? formGroup.querySelector('.form-error') : null;

                if (!this.value.trim() && this.hasAttribute('required')) {
                    if (formGroup) formGroup.classList.add('error');
                    if (errorElement) {
                        errorElement.textContent = 'This field is required';
                        errorElement.style.display = 'block';
                    }
                } else {
                    if (formGroup) formGroup.classList.remove('error');
                    if (errorElement) errorElement.style.display = 'none';
                }

                // Email validation on blur
                if (this.type === 'email' && this.value.trim()) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(this.value)) {
                        if (formGroup) formGroup.classList.add('error');
                        if (errorElement) {
                            errorElement.textContent = 'Please enter a valid email address';
                            errorElement.style.display = 'block';
                        }
                    }
                }

                // Phone validation on blur
                if ((this.type === 'tel' || this.name === 'phone') && this.value.trim()) {
                    const phoneRegex = /^[0-9]{10}$/;
                    const cleanedPhone = this.value.replace(/\D/g, '');

                    if (!phoneRegex.test(cleanedPhone)) {
                        if (formGroup) formGroup.classList.add('error');
                        if (errorElement) {
                            errorElement.textContent = 'Please enter a valid 10-digit phone number';
                            errorElement.style.display = 'block';
                        }
                    }
                }
            });

            // Remove error on input
            input.addEventListener('input', function () {
                const formGroup = this.closest('.form-group');
                if (formGroup && formGroup.classList.contains('error') && this.value.trim()) {
                    formGroup.classList.remove('error');
                    const errorElement = formGroup.querySelector('.form-error');
                    if (errorElement) errorElement.style.display = 'none';
                }
            });
        });

        // Phone number formatting (allow only numbers)
        const phoneInputs = form.querySelectorAll('input[type="tel"], input[name="phone"]');

        phoneInputs.forEach(input => {
            input.addEventListener('input', function (e) {
                // Remove all non-digit characters
                let value = this.value.replace(/\D/g, '');

                // Limit to 10 digits
                if (value.length > 10) {
                    value = value.slice(0, 10);
                }

                this.value = value;
            });
        });
    });

    // ============================================
    // SUCCESS MESSAGE HANDLING
    // ============================================
    // Check if there's a success parameter in URL (from FormSubmit redirect)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
        // Show success message
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `
      <div style="
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        color: white;
        padding: 1.5rem 2rem;
        border-radius: 0.75rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideDown 0.5s ease;
        max-width: 90%;
        text-align: center;
      ">
        <h3 style="margin: 0 0 0.5rem 0; font-size: 1.25rem;">✓ Success!</h3>
        <p style="margin: 0; opacity: 0.95;">Thank you for your enquiry. We'll get back to you soon!</p>
      </div>
    `;

        document.body.appendChild(successDiv);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            successDiv.style.opacity = '0';
            successDiv.style.transform = 'translateX(-50%) translateY(-20px)';
            setTimeout(() => {
                successDiv.remove();
                // Clean up URL
                window.history.replaceState({}, document.title, window.location.pathname);
            }, 500);
        }, 5000);

        // Add animation
        const style = document.createElement('style');
        style.textContent = `
      @keyframes slideDown {
        from {
          opacity: 0;
          transform: translateX(-50%) translateY(-30px);
        }
        to {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
      }
    `;
        document.head.appendChild(style);
    }

});
