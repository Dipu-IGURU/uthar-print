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
        
        // Add ticket to the list
        addTicketToList({
            ...ticketData,
            ticketId
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
                background-color: white;
                border-radius: 10px;
                padding: 40px;
                text-align: center;
                max-width: 400px;
                width: 90%;
                position: relative;
                z-index: 1001;
                color: #333;
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
                color: #666;
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

// My Tickets functionality
let userTickets = [
    {
        id: 'TKT-001234',
        title: 'Print Quality Issue',
        urgency: 'High',
        department: 'PRINTING',
        orderId: 'ORD-5678',
        status: 'Open',
        submittedDate: '2024-01-15',
        description: 'Colors are not matching the original design'
    },
    {
        id: 'TKT-001235',
        title: 'Delivery Delay',
        urgency: 'Medium',
        department: 'DELIVERY',
        orderId: 'ORD-5679',
        status: 'In Progress',
        submittedDate: '2024-01-14',
        description: 'Package not delivered on promised date'
    },
    {
        id: 'TKT-001236',
        title: 'Artwork Revision Required',
        urgency: 'Low',
        department: 'ARTWORK',
        orderId: 'ORD-5680',
        status: 'Resolved',
        submittedDate: '2024-01-12',
        description: 'Need to update logo in the design'
    }
];

function initializeMyTicketsPage() {
    loadTickets();
}

function loadTickets() {
    const ticketsTableBody = document.getElementById('tickets-tbody');
    const noTicketsDiv = document.getElementById('no-tickets');
    const ticketsTable = document.querySelector('.tickets-table');
    
    if (!ticketsTableBody) return;
    
    // Check if there are any tickets
    if (userTickets.length === 0) {
        ticketsTable.style.display = 'none';
        noTicketsDiv.style.display = 'block';
        return;
    }
    
    // Show table and hide no tickets message
    ticketsTable.style.display = 'table';
    noTicketsDiv.style.display = 'none';
    
    // Clear existing rows
    ticketsTableBody.innerHTML = '';
    
    // Populate table with tickets
    userTickets.forEach(ticket => {
        const row = createTicketRow(ticket);
        ticketsTableBody.appendChild(row);
    });
}

function createTicketRow(ticket) {
    const row = document.createElement('tr');
    
    row.innerHTML = `
        <td><strong>${ticket.id}</strong></td>
        <td>
            <div style="font-weight: 500; color: #333;">${ticket.title}</div>
            <div style="font-size: 12px; color: #999; margin-top: 2px;">
                Submitted: ${formatDate(ticket.submittedDate)}
            </div>
        </td>
        <td>
            <span class="urgency-badge ${ticket.urgency.toLowerCase()}">${ticket.urgency}</span>
        </td>
        <td>
            <span style="background-color: #e3f2fd; color: #1976d2; padding: 4px 8px; border-radius: 12px; font-size: 11px; font-weight: 600;">
                ${ticket.department}
            </span>
        </td>
        <td>${ticket.orderId || '-'}</td>
        <td>
            <span class="status-badge ${ticket.status.toLowerCase().replace(' ', '-')}">${ticket.status}</span>
        </td>
        <td>
            <button class="btn-view-ticket" onclick="viewTicketDetails('${ticket.id}')">
                <i class="fas fa-eye"></i>
                View
            </button>
        </td>
    `;
    
    return row;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function viewTicketDetails(ticketId) {
    const ticket = userTickets.find(t => t.id === ticketId);
    if (!ticket) return;
    
    // Create and show ticket details modal
    showTicketDetailsModal(ticket);
}

function showTicketDetailsModal(ticket) {
    const modal = document.createElement('div');
    modal.className = 'ticket-details-modal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closeTicketDetailsModal()"></div>
        <div class="modal-content ticket-details-content">
            <div class="modal-header">
                <h2>Ticket Details</h2>
                <button class="btn-close" onclick="closeTicketDetailsModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="ticket-info">
                <div class="info-row">
                    <div class="info-label">Ticket ID:</div>
                    <div class="info-value"><strong>${ticket.id}</strong></div>
                </div>
                
                <div class="info-row">
                    <div class="info-label">Title:</div>
                    <div class="info-value">${ticket.title}</div>
                </div>
                
                <div class="info-row">
                    <div class="info-label">Status:</div>
                    <div class="info-value">
                        <span class="status-badge ${ticket.status.toLowerCase().replace(' ', '-')}">${ticket.status}</span>
                    </div>
                </div>
                
                <div class="info-row">
                    <div class="info-label">Urgency:</div>
                    <div class="info-value">
                        <span class="urgency-badge ${ticket.urgency.toLowerCase()}">${ticket.urgency}</span>
                    </div>
                </div>
                
                <div class="info-row">
                    <div class="info-label">Department:</div>
                    <div class="info-value">${ticket.department}</div>
                </div>
                
                <div class="info-row">
                    <div class="info-label">Order ID:</div>
                    <div class="info-value">${ticket.orderId || 'N/A'}</div>
                </div>
                
                <div class="info-row">
                    <div class="info-label">Submitted Date:</div>
                    <div class="info-value">${formatDate(ticket.submittedDate)}</div>
                </div>
                
                <div class="info-row full-width">
                    <div class="info-label">Description:</div>
                    <div class="info-value description">${ticket.description}</div>
                </div>
            </div>
            
            <div class="modal-actions">
                <button class="btn-close-modal" onclick="closeTicketDetailsModal()">Close</button>
            </div>
        </div>
    `;
    
    // Add modal styles
    const modalStyles = `
        <style>
            .ticket-details-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 1000;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
            }
            
            .ticket-details-content {
                background-color: white;
                border-radius: 10px;
                max-width: 600px;
                width: 100%;
                max-height: 80vh;
                overflow-y: auto;
                position: relative;
                z-index: 1001;
                color: #333;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20px 30px;
                border-bottom: 1px solid #e9ecef;
                background-color: #f8f9fa;
                border-radius: 10px 10px 0 0;
            }
            
            .modal-header h2 {
                color: #333;
                margin: 0;
                font-size: 20px;
                font-weight: 600;
            }
            
            .btn-close {
                background: none;
                border: none;
                font-size: 18px;
                color: #666;
                cursor: pointer;
                padding: 5px;
                border-radius: 50%;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s ease;
            }
            
            .btn-close:hover {
                background-color: #e9ecef;
                color: #333;
            }
            
            .ticket-info {
                padding: 30px;
            }
            
            .info-row {
                display: flex;
                margin-bottom: 15px;
                align-items: flex-start;
            }
            
            .info-row.full-width {
                flex-direction: column;
            }
            
            .info-label {
                font-weight: 600;
                color: #495057;
                min-width: 120px;
                margin-right: 15px;
            }
            
            .info-value {
                color: #666;
                flex: 1;
            }
            
            .info-value.description {
                margin-top: 8px;
                padding: 15px;
                background-color: #f8f9fa;
                border-radius: 5px;
                border-left: 3px solid #00bcd4;
                line-height: 1.6;
            }
            
            .modal-actions {
                padding: 20px 30px;
                border-top: 1px solid #e9ecef;
                text-align: right;
                background-color: #f8f9fa;
                border-radius: 0 0 10px 10px;
            }
            
            .btn-close-modal {
                background-color: #6c757d;
                color: white;
                border: none;
                border-radius: 5px;
                padding: 10px 20px;
                font-size: 14px;
                font-weight: 500;
                cursor: pointer;
                transition: background-color 0.3s ease;
            }
            
            .btn-close-modal:hover {
                background-color: #545b62;
            }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', modalStyles);
    document.body.appendChild(modal);
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function closeTicketDetailsModal() {
    const modal = document.querySelector('.ticket-details-modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}

function navigateToRaiseTicket() {
    // Navigate to raise ticket page
    const raiseTicketLink = document.querySelector('a[href="#raise-ticket-page"]');
    if (raiseTicketLink) {
        raiseTicketLink.click();
    }
}

// Add ticket to the list (called when a new ticket is submitted)
function addTicketToList(ticketData) {
    const newTicket = {
        id: ticketData.ticketId,
        title: ticketData.title,
        urgency: ticketData.urgency,
        department: ticketData.department,
        orderId: ticketData.orderNumber || '',
        status: 'Open',
        submittedDate: new Date().toISOString().split('T')[0],
        description: ticketData.description
    };
    
    userTickets.unshift(newTicket); // Add to beginning of array
    
    // Refresh the tickets display if we're on the my tickets page
    const myTicketsPage = document.getElementById('my-tickets-page');
    if (myTicketsPage && myTicketsPage.classList.contains('active')) {
        loadTickets();
    }
}

// Order Cancellation functionality
let cancelableOrders = [
    {
        id: 'ORD-001',
        product: {
            name: 'Custom Business Cards',
            description: 'Premium Card Stock - 500 pieces',
            image: 'fas fa-id-card'
        },
        total: '$45.99',
        status: 'Processing',
        canCancel: true
    },
    {
        id: 'ORD-002',
        product: {
            name: 'Marketing Flyers',
            description: 'A4 Glossy Paper - 1000 pieces',
            image: 'fas fa-file-alt'
        },
        total: '$89.50',
        status: 'Processing',
        canCancel: true
    },
    {
        id: 'ORD-003',
        product: {
            name: 'Company Brochures',
            description: 'Tri-fold Design - 200 pieces',
            image: 'fas fa-book-open'
        },
        total: '$125.00',
        status: 'Shipped',
        canCancel: false
    }
];

function initializeOrderCancellationPage() {
    const cancelOrderInput = document.getElementById('cancel-order-id-input');
    if (cancelOrderInput) {
        cancelOrderInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchCancelOrder();
            }
        });
    }
}

function searchCancelOrder() {
    const orderIdInput = document.getElementById('cancel-order-id-input');
    const orderId = orderIdInput.value.trim();
    const orderResults = document.getElementById('cancel-order-results');
    
    if (!orderId) {
        showNotification('Please enter an Order ID', 'error');
        return;
    }
    
    // Show loading state
    orderResults.innerHTML = `
        <div class="loading-cancel">
            <i class="fas fa-spinner"></i>
            <div>Searching for order...</div>
        </div>
    `;
    
    // Simulate API call with delay
    setTimeout(() => {
        // Filter orders based on search (case insensitive)
        const filteredOrders = cancelableOrders.filter(order => 
            order.id.toLowerCase().includes(orderId.toLowerCase())
        );
        
        if (filteredOrders.length === 0) {
            orderResults.innerHTML = `
                <div class="no-cancel-orders">
                    <i class="fas fa-search"></i>
                    <div>No orders found with ID: ${orderId}</div>
                    <div style="margin-top: 10px; font-size: 12px; color: #999;">
                        Please check your Order ID and try again.
                    </div>
                </div>
            `;
        } else {
            displayCancelOrders(filteredOrders);
        }
    }, 1500);
}

function displayCancelOrders(orders) {
    const orderResults = document.getElementById('cancel-order-results');
    
    const ordersHTML = orders.map(order => `
        <div class="cancel-order-row">
            <div class="cancel-product-details">
                <div class="cancel-product-image">
                    <i class="${order.product.image}"></i>
                </div>
                <div class="cancel-product-info">
                    <h4>${order.product.name}</h4>
                    <p>${order.product.description}</p>
                    <div class="order-status ${order.status.toLowerCase()}">${order.status}</div>
                </div>
            </div>
            <div class="cancel-order-id">${order.id}</div>
            <div class="cancel-order-total">${order.total}</div>
            <div class="cancel-order-action">
                ${order.canCancel ? 
                    `<button class="btn-cancel-order" onclick="confirmCancelOrder('${order.id}')">Cancel Order</button>` :
                    `<span class="cancel-status">Cannot Cancel</span>`
                }
            </div>
        </div>
    `).join('');
    
    orderResults.innerHTML = ordersHTML;
}

function confirmCancelOrder(orderId) {
    const order = cancelableOrders.find(o => o.id === orderId);
    if (!order) return;
    
    // Show confirmation modal
    const modal = document.createElement('div');
    modal.className = 'cancel-confirmation-modal';
    modal.innerHTML = `
        <div class="cancel-modal-content">
            <h3>Cancel Order Confirmation</h3>
            <p>Are you sure you want to cancel order <strong>${orderId}</strong>?</p>
            <p><strong>${order.product.name}</strong><br>
            ${order.product.description}<br>
            Total: ${order.total}</p>
            <p style="color: #dc3545; font-size: 12px;">
                <i class="fas fa-exclamation-triangle"></i>
                This action cannot be undone.
            </p>
            <div class="modal-buttons">
                <button class="btn-confirm-cancel" onclick="processCancelOrder('${orderId}')">
                    Yes, Cancel Order
                </button>
                <button class="btn-cancel-modal" onclick="closeCancelModal()">
                    No, Keep Order
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
}

function processCancelOrder(orderId) {
    // Find and update the order
    const orderIndex = cancelableOrders.findIndex(o => o.id === orderId);
    if (orderIndex !== -1) {
        cancelableOrders[orderIndex].status = 'Cancelled';
        cancelableOrders[orderIndex].canCancel = false;
    }
    
    // Close modal
    closeCancelModal();
    
    // Show success message
    showNotification(`Order ${orderId} has been cancelled successfully`, 'success');
    
    // Refresh the display
    const orderResults = document.getElementById('cancel-order-results');
    if (orderResults.innerHTML.includes(orderId)) {
        // Re-search to update the display
        const searchInput = document.getElementById('cancel-order-id-input');
        if (searchInput.value) {
            setTimeout(() => {
                searchCancelOrder();
            }, 1000);
        }
    }
    
    // Log cancellation (in real app, this would be sent to server)
    console.log('Order cancelled:', {
        orderId,
        cancelledAt: new Date().toISOString(),
        reason: 'Customer request'
    });
}

function closeCancelModal() {
    const modal = document.querySelector('.cancel-confirmation-modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}

// Initialize raise ticket form when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add existing initialization code here
    initializeRaiseTicketForm();
    initializeMyTicketsPage();
    initializeOrderCancellationPage();
});