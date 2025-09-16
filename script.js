// Password visibility toggle functionality
function togglePassword() {
    const passwordInput = document.getElementById('new-password');
    const toggleIcon = document.querySelector('.password-toggle');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    }
}

// Form submission handlers
document.addEventListener('DOMContentLoaded', function() {
    // Personal Information Form
    const personalForm = document.querySelector('.main-content .section:first-child form');
    personalForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Validate required fields
        if (!data.fullname || !data.mobile) {
            alert('Please fill in all required fields (Full Name and Mobile Number)');
            return;
        }
        
        // Simulate API call
        console.log('Updating personal information:', data);
        alert('Personal information updated successfully!');
    });
    
    // Delivery Address Form
    const addressForm = document.querySelector('.main-content .section:nth-child(2) form');
    addressForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Validate required fields
        if (!data['delivery-name'] || !data['delivery-email'] || !data['phone-code'] || !data['postcode'] || !data.address) {
            alert('Please fill in all required fields for delivery address');
            return;
        }
        
        // Simulate API call
        console.log('Updating delivery address:', data);
        alert('Delivery address updated successfully!');
    });
    
    // Password Update Form
    const passwordForm = document.querySelector('.main-content .section:last-child form');
    passwordForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Validate password
        if (!data['new-password'] || data['new-password'].length < 6) {
            alert('Please enter a password with at least 6 characters');
            return;
        }
        
        // Simulate API call
        console.log('Updating password');
        alert('Password updated successfully!');
        
        // Clear the password field
        document.getElementById('new-password').value = '';
    });
    
    // Navigation menu functionality
    const navLinks = document.querySelectorAll('.navigation a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.parentElement.classList.remove('active'));
            
            // Add active class to clicked link
            this.parentElement.classList.add('active');
            
            // Hide all pages
            const allPages = document.querySelectorAll('.page-content');
            allPages.forEach(page => page.classList.remove('active'));
            
            // Show the selected page
            const pageId = this.getAttribute('href').substring(1); // Remove the # symbol
            const targetPage = document.getElementById(pageId);
            if (targetPage) {
                targetPage.classList.add('active');
                console.log('Successfully navigated to:', this.textContent);
            } else {
                console.error('Page not found:', pageId);
            }
        });
    });
    
    // Dashboard and Logout button functionality
    const dashboardBtn = document.querySelector('.btn-dashboard');
    const logoutBtn = document.querySelector('.btn-logout');
    
    dashboardBtn.addEventListener('click', function() {
        console.log('Dashboard clicked');
        // Here you would navigate to dashboard
        alert('Redirecting to Dashboard...');
    });
    
    logoutBtn.addEventListener('click', function() {
        console.log('Logout clicked');
        // Here you would handle logout
        if (confirm('Are you sure you want to logout?')) {
            alert('Logged out successfully!');
            // Redirect to login page or clear session
        }
    });
    
    // Same address checkbox functionality
    const sameAddressCheckbox = document.getElementById('same-address');
    const deliveryNameInput = document.getElementById('delivery-name');
    const deliveryEmailInput = document.getElementById('delivery-email');
    const phoneCodeInput = document.getElementById('phone-code');
    const postcodeInput = document.getElementById('postcode');
    const addressTextarea = document.getElementById('address');
    
    sameAddressCheckbox.addEventListener('change', function() {
        if (this.checked) {
            // Copy personal information to delivery address
            const fullName = document.getElementById('fullname').value;
            const email = document.getElementById('email').value;
            const mobile = document.getElementById('mobile').value;
            
            if (fullName) deliveryNameInput.value = fullName;
            if (email) deliveryEmailInput.value = email;
            if (mobile) phoneCodeInput.value = mobile;
        } else {
            // Clear delivery address fields
            deliveryNameInput.value = '';
            deliveryEmailInput.value = '';
            phoneCodeInput.value = '';
            postcodeInput.value = '';
            addressTextarea.value = '';
        }
    });
    
    // Auto-fill delivery address when personal info is updated
    const personalInputs = ['fullname', 'mobile'];
    personalInputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        input.addEventListener('blur', function() {
            if (sameAddressCheckbox.checked) {
                if (inputId === 'fullname') {
                    deliveryNameInput.value = this.value;
                } else if (inputId === 'mobile') {
                    phoneCodeInput.value = this.value;
                }
            }
        });
    });
    
    // Form validation helpers
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function validatePhone(phone) {
        const re = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        return re.test(phone);
    }
    
    // Real-time validation
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && !validateEmail(this.value)) {
                this.style.borderColor = '#dc3545';
                this.style.boxShadow = '0 0 0 2px rgba(220, 53, 69, 0.25)';
            } else {
                this.style.borderColor = '#ddd';
                this.style.boxShadow = 'none';
            }
        });
    });
    
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && !validatePhone(this.value)) {
                this.style.borderColor = '#dc3545';
                this.style.boxShadow = '0 0 0 2px rgba(220, 53, 69, 0.25)';
            } else {
                this.style.borderColor = '#ddd';
                this.style.boxShadow = 'none';
            }
        });
    });
    
    // Add loading states to buttons
    function addLoadingState(button, text = 'Updating...') {
        const originalText = button.textContent;
        button.textContent = text;
        button.disabled = true;
        button.style.opacity = '0.7';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            button.style.opacity = '1';
        }, 2000);
    }
    
    // Add loading states to form submissions
    const updateButtons = document.querySelectorAll('.btn-update');
    updateButtons.forEach(button => {
        button.addEventListener('click', function() {
            addLoadingState(this);
        });
    });
    
    // Track Order search functionality
    const orderIdInput = document.getElementById('order-id-input');
    if (orderIdInput) {
        orderIdInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchOrder();
            }
        });
    }
});

// Track Order functionality
function searchOrder() {
    const orderIdInput = document.getElementById('order-id-input');
    const orderId = orderIdInput.value.trim();
    const orderResults = document.getElementById('order-results');
    
    if (!orderId) {
        showNotification('Please enter an Order ID', 'error');
        return;
    }
    
    // Show loading state
    orderResults.innerHTML = `
        <div class="loading">
            <i class="fas fa-spinner"></i>
            <div>Searching for order...</div>
        </div>
    `;
    
    // Simulate API call with delay
    setTimeout(() => {
        // Mock order data - in real app, this would come from API
        const mockOrders = [
            {
                id: 'ORD-001',
                product: {
                    name: 'Custom T-Shirt',
                    description: 'Blue Cotton T-Shirt',
                    image: 'fas fa-tshirt'
                },
                total: '$29.99',
                status: 'Processing'
            },
            {
                id: 'ORD-002',
                product: {
                    name: 'Business Cards',
                    description: 'Premium Card Stock',
                    image: 'fas fa-id-card'
                },
                total: '$45.50',
                status: 'Shipped'
            }
        ];
        
        // Filter orders based on search (case insensitive)
        const filteredOrders = mockOrders.filter(order => 
            order.id.toLowerCase().includes(orderId.toLowerCase())
        );
        
        if (filteredOrders.length === 0) {
            orderResults.innerHTML = `
                <div class="no-orders">
                    <i class="fas fa-search"></i>
                    <div>No orders found with ID: ${orderId}</div>
                    <div style="margin-top: 10px; font-size: 12px; color: #999;">
                        Please check your Order ID and try again.
                    </div>
                </div>
            `;
        } else {
            displayOrders(filteredOrders);
        }
    }, 1500);
}

function displayOrders(orders) {
    const orderResults = document.getElementById('order-results');
    
    const ordersHTML = orders.map(order => `
        <div class="order-row">
            <div class="order-product-details">
                <div class="product-image">
                    <i class="${order.product.image}"></i>
                </div>
                <div class="product-info">
                    <h4>${order.product.name}</h4>
                    <p>${order.product.description}</p>
                </div>
            </div>
            <div class="order-id">${order.id}</div>
            <div class="order-total">${order.total}</div>
            <div class="order-action">
                <button class="btn-view" onclick="viewOrderDetails('${order.id}')">View</button>
            </div>
        </div>
    `).join('');
    
    orderResults.innerHTML = ordersHTML;
}

function viewOrderDetails(orderId) {
    showNotification(`Viewing details for order: ${orderId}`, 'success');
    // In a real app, this would open a modal or navigate to order details page
    console.log('Viewing order details for:', orderId);
}

function askForHelp() {
    showNotification('Redirecting to help center...', 'success');
    // In a real app, this would open a help ticket form or redirect to support
    console.log('Asking for help');
}

// Additional utility functions
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background-color: ${type === 'success' ? '#28a745' : '#dc3545'};
        color: white;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Raise Ticket functionality
let selectedFiles = [];

function initializeRaiseTicketForm() {
    const raiseTicketForm = document.getElementById('raise-ticket-form');
    const fileInput = document.getElementById('ticket-file');
    const fileUploadInfo = document.querySelector('.file-upload-info');
    const filePreview = document.getElementById('file-preview');
    
    if (!raiseTicketForm) return;
    
    // Handle form submission
    raiseTicketForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleTicketSubmission(this);
    });
    
    // Handle file upload
    if (fileInput) {
        fileInput.addEventListener('change', function(e) {
            handleFileUpload(e.target.files);
        });
    }
    
    // Auto-fill user data if available
    autoFillUserData();
}

function handleTicketSubmission(form) {
    const formData = new FormData(form);
    const ticketData = Object.fromEntries(formData);
    
    // Add selected files to ticket data
    ticketData.files = selectedFiles;
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'mobile', 'title', 'department', 'urgency', 'description'];
    const missingFields = requiredFields.filter(field => !ticketData[field] || ticketData[field].trim() === '');
    
    if (missingFields.length > 0) {
        showNotification(`Please fill in the following required fields: ${missingFields.join(', ')}`, 'error');
        return;
    }
    
    // Validate email format
    if (!validateEmail(ticketData.email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Validate phone number
    if (!validatePhone(ticketData.mobile)) {
        showNotification('Please enter a valid phone number', 'error');
        return;
    }
    
    // Show loading state
    const submitButton = form.querySelector('.btn-raise-ticket');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'SUBMITTING...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Generate ticket ID
        const ticketId = 'TKT-' + Date.now().toString().slice(-6);
        
        // Log ticket data (in real app, this would be sent to server)
        console.log('Ticket submitted:', {
            ...ticketData,
            ticketId,
            submittedAt: new Date().toISOString()
        });
        
        // Show success message
        showTicketSubmissionSuccess(ticketId);
        
        // Reset form
        form.reset();
        selectedFiles = [];
        updateFilePreview();
        updateFileUploadInfo();
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
    }, 2000);
}

function handleFileUpload(files) {
    const maxFiles = 5;
    const maxFileSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    Array.from(files).forEach(file => {
        // Check file count
        if (selectedFiles.length >= maxFiles) {
            showNotification(`Maximum ${maxFiles} files allowed`, 'error');
            return;
        }
        
        // Check file size
        if (file.size > maxFileSize) {
            showNotification(`File "${file.name}" is too large. Maximum size is 10MB`, 'error');
            return;
        }
        
        // Check file type
        if (!allowedTypes.includes(file.type)) {
            showNotification(`File type "${file.type}" is not allowed`, 'error');
            return;
        }
        
        // Check for duplicates
        if (selectedFiles.some(f => f.name === file.name && f.size === file.size)) {
            showNotification(`File "${file.name}" is already selected`, 'error');
            return;
        }
        
        // Add file to selected files
        selectedFiles.push(file);
    });
    
    updateFilePreview();
    updateFileUploadInfo();
}

function removeFile(index) {
    selectedFiles.splice(index, 1);
    updateFilePreview();
    updateFileUploadInfo();
}

function updateFilePreview() {
    const filePreview = document.getElementById('file-preview');
    if (!filePreview) return;
    
    if (selectedFiles.length === 0) {
        filePreview.innerHTML = '';
        return;
    }
    
    const previewHTML = selectedFiles.map((file, index) => {
        const fileIcon = getFileIcon(file.type);
        const fileName = file.name.length > 20 ? file.name.substring(0, 17) + '...' : file.name;
        
        return `
            <div class="file-preview-item">
                <i class="${fileIcon}"></i>
                <span title="${file.name}">${fileName}</span>
                <i class="fas fa-times remove-file" onclick="removeFile(${index})" title="Remove file"></i>
            </div>
        `;
    }).join('');
    
    filePreview.innerHTML = previewHTML;
}

function updateFileUploadInfo() {
    const fileUploadInfo = document.querySelector('.file-upload-info');
    if (!fileUploadInfo) return;
    
    if (selectedFiles.length === 0) {
        fileUploadInfo.textContent = 'No file chosen';
        fileUploadInfo.style.color = '#999';
    } else {
        const totalSize = selectedFiles.reduce((sum, file) => sum + file.size, 0);
        const totalSizeMB = (totalSize / (1024 * 1024)).toFixed(2);
        fileUploadInfo.textContent = `${selectedFiles.length} file(s) selected (${totalSizeMB} MB)`;
        fileUploadInfo.style.color = '#00bcd4';
    }
}

function getFileIcon(fileType) {
    if (fileType.startsWith('image/')) return 'fas fa-image';
    if (fileType === 'application/pdf') return 'fas fa-file-pdf';
    if (fileType.includes('word')) return 'fas fa-file-word';
    return 'fas fa-file';
}

function autoFillUserData() {
    // Auto-fill with existing user data if available
    const userEmail = document.getElementById('email');
    const userName = document.getElementById('fullname');
    const userMobile = document.getElementById('mobile');
    
    const ticketEmail = document.getElementById('ticket-email');
    const ticketName = document.getElementById('ticket-name');
    const ticketMobile = document.getElementById('ticket-mobile');
    
    if (userEmail && ticketEmail && userEmail.value) {
        ticketEmail.value = userEmail.value;
    }
    
    if (userName && ticketName && userName.value) {
        ticketName.value = userName.value;
    }
    
    if (userMobile && ticketMobile && userMobile.value) {
        ticketMobile.value = userMobile.value;
    }
}

function showTicketSubmissionSuccess(ticketId) {
    // Create success modal
    const modal = document.createElement('div');
    modal.className = 'ticket-success-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h2>Ticket Submitted Successfully!</h2>
            <p>Your ticket has been created with ID: <strong>${ticketId}</strong></p>
            <p>We will review your request and get back to you soon.</p>
            <button class="btn-close-modal" onclick="closeTicketModal()">Close</button>
        </div>
    `;
    
    // Add modal styles
    const modalStyles = `
        <style>
            .ticket-success-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 1000;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.8);
            }
            
            .modal-content {
                background-color: #2a2a2a;
                border-radius: 10px;
                padding: 40px;
                text-align: center;
                max-width: 400px;
                width: 90%;
                position: relative;
                z-index: 1001;
                color: white;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            }
            
            .success-icon {
                font-size: 60px;
                color: #4caf50;
                margin-bottom: 20px;
            }
            
            .modal-content h2 {
                color: #00bcd4;
                margin-bottom: 15px;
                font-size: 24px;
            }
            
            .modal-content p {
                color: #ccc;
                margin-bottom: 15px;
                line-height: 1.6;
            }
            
            .modal-content strong {
                color: #00bcd4;
            }
            
            .btn-close-modal {
                background-color: #00bcd4;
                color: white;
                border: none;
                border-radius: 5px;
                padding: 12px 30px;
                font-size: 14px;
                font-weight: 600;
                cursor: pointer;
                margin-top: 20px;
                transition: background-color 0.3s ease;
            }
            
            .btn-close-modal:hover {
                background-color: #00acc1;
            }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', modalStyles);
    document.body.appendChild(modal);
    
    // Auto-close after 5 seconds
    setTimeout(() => {
        closeTicketModal();
    }, 5000);
}

function closeTicketModal() {
    const modal = document.querySelector('.ticket-success-modal');
    if (modal) {
        modal.remove();
    }
}

// Initialize raise ticket form when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add existing initialization code here
    initializeRaiseTicketForm();
});