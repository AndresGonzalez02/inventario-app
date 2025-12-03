// Global Variables
let products = [];
let filteredProducts = [];
let editingProductId = null;
let productsToDelete = null;
let lowStockFilter = false;

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    updateBrandFilter();
    updateDashboard();
    showMobileView();
    setupEventListeners();
});

function setupEventListeners() {
    // Image upload drag and drop
    const imageUpload = document.getElementById('imageUpload');
    imageUpload.addEventListener('dragover', handleDragOver);
    imageUpload.addEventListener('drop', handleDrop);
    imageUpload.addEventListener('click', () => document.getElementById('productImage').click());
}

// Load products from localStorage
function loadProducts() {
    const stored = localStorage.getItem('inventoryProducts');
    if (stored) {
        products = JSON.parse(stored);
    }
    filteredProducts = [...products];
    renderProducts();
}

// Save products to localStorage
function saveProducts() {
    localStorage.setItem('inventoryProducts', JSON.stringify(products));
}

// Render products in table and cards
function renderProducts() {
    renderTable();
    renderMobileCards();
    updateDashboard();
    updateBrandFilter();
}

// Render table view
function renderTable() {
    const tbody = document.getElementById('productsTableBody');
    tbody.innerHTML = '';

    filteredProducts.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div class="product-cell">
                    ${product.image ? 
                        `<img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.style.display='none'">` :
                        `<div class="product-image no-image">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                <polyline points="21,15 16,10 5,21"></polyline>
                            </svg>
                        </div>`
                    }
                    <div class="product-info">
                        <h4>${escapeHtml(product.name)}</h4>
                        ${product.quantity <= 10 ? '<span class="low-stock-badge">Stock Bajo</span>' : ''}
                    </div>
                </div>
            </td>
            <td>${escapeHtml(product.reference)}</td>
            <td>${escapeHtml(product.brand)}</td>
            <td>${product.quantity}</td>
            <td>$${parseFloat(product.price).toFixed(2)}</td>
            <td>$${(product.quantity * parseFloat(product.price)).toFixed(2)}</td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn" onclick="editProduct(${product.id})" title="Editar">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                    </button>
                    <button class="action-btn delete" onclick="deleteProduct(${product.id})" title="Eliminar">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3,6 5,6 21,6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });

    if (filteredProducts.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" class="text-center" style="padding: 48px; color: #6B7280;">
                    ${products.length === 0 ? 
                        'No hay productos agregados. ¡Agrega tu primer producto!' : 
                        'No se encontraron productos con los filtros aplicados.'
                    }
                </td>
            </tr>
        `;
    }
}

// Render mobile cards
function renderMobileCards() {
    const container = document.getElementById('mobileCards');
    container.innerHTML = '';

    filteredProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'mobile-card';
        card.innerHTML = `
            <div class="mobile-card-header">
                ${product.image ? 
                    `<img src="${product.image}" alt="${product.name}" class="mobile-card-image" onerror="this.style.display='none'">` :
                    `<div class="mobile-card-image no-image">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                            <circle cx="8.5" cy="8.5" r="1.5"></circle>
                            <polyline points="21,15 16,10 5,21"></polyline>
                        </svg>
                    </div>`
                }
                <div class="mobile-card-title">
                    <h3>${escapeHtml(product.name)}</h3>
                    <p class="reference">${escapeHtml(product.reference)}</p>
                    ${product.quantity <= 10 ? '<span class="low-stock-badge">Stock Bajo</span>' : ''}
                </div>
            </div>
            <div class="mobile-card-details">
                <div class="detail-item">
                    <span class="detail-label">Marca:</span>
                    <span class="detail-value">${escapeHtml(product.brand)}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Cantidad:</span>
                    <span class="detail-value">${product.quantity}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Precio:</span>
                    <span class="detail-value">$${parseFloat(product.price).toFixed(2)}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Valor Total:</span>
                    <span class="detail-value">$${(product.quantity * parseFloat(product.price)).toFixed(2)}</span>
                </div>
            </div>
            <div class="mobile-card-actions">
                <button class="action-btn" onclick="editProduct(${product.id})">Editar</button>
                <button class="action-btn delete" onclick="deleteProduct(${product.id})">Eliminar</button>
            </div>
        `;
        container.appendChild(card);
    });

    if (filteredProducts.length === 0) {
        container.innerHTML = `
            <div class="text-center" style="padding: 48px; color: #6B7280;">
                ${products.length === 0 ? 
                    'No hay productos agregados. ¡Agrega tu primer producto!' : 
                    'No se encontraron productos con los filtros aplicados.'
                }
            </div>
        `;
    }
}

// Update dashboard statistics
function updateDashboard() {
    const totalProducts = products.length;
    const totalValue = products.reduce((sum, product) => sum + (product.quantity * parseFloat(product.price)), 0);
    const lowStockCount = products.filter(product => product.quantity <= 10).length;

    document.getElementById('totalProducts').textContent = totalProducts;
    document.getElementById('totalValue').textContent = `$${totalValue.toFixed(2)}`;
    document.getElementById('lowStock').textContent = lowStockCount;
}

// Update brand filter dropdown
function updateBrandFilter() {
    const select = document.querySelector('.filter-select');
    const brands = [...new Set(products.map(p => p.brand))].sort();
    
    const currentValue = select.value;
    select.innerHTML = '<option value="">Todas las marcas</option>';
    
    brands.forEach(brand => {
        const option = document.createElement('option');
        option.value = brand;
        option.textContent = brand;
        select.appendChild(option);
    });
    
    select.value = currentValue;
}

// Filter products
function filterProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const brandFilter = document.querySelector('.filter-select').value;
    
    filteredProducts = products.filter(product => {
        const matchesSearch = !searchTerm || 
            product.name.toLowerCase().includes(searchTerm) ||
            product.reference.toLowerCase().includes(searchTerm) ||
            product.brand.toLowerCase().includes(searchTerm);
            
        const matchesBrand = !brandFilter || product.brand === brandFilter;
        const matchesStock = !lowStockFilter || product.quantity <= 10;
        
        return matchesSearch && matchesBrand && matchesStock;
    });
    
    renderProducts();
}

// Clear all filters
function clearFilters() {
    document.getElementById('searchInput').value = '';
    document.querySelector('.filter-select').value = '';
    lowStockFilter = false;
    updateFilterButtons();
    filterProducts();
}

// Toggle low stock filter
function toggleLowStockFilter() {
    lowStockFilter = !lowStockFilter;
    updateFilterButtons();
    filterProducts();
}

// Update filter button states
function updateFilterButtons() {
    const lowStockBtn = document.querySelector('.filter-btn[onclick="toggleLowStockFilter()"]');
    if (lowStockFilter) {
        lowStockBtn.classList.add('active');
    } else {
        lowStockBtn.classList.remove('active');
    }
}

// Filter by brand
function filterByBrand() {
    filterProducts();
}

// Modal functions
function openModal(productId = null) {
    editingProductId = productId;
    const modal = document.getElementById('productModal');
    const title = document.getElementById('modalTitle');
    
    if (productId) {
        const product = products.find(p => p.id === productId);
        title.textContent = 'Editar Producto';
        populateForm(product);
    } else {
        title.textContent = 'Agregar Producto';
        clearForm();
    }
    
    modal.classList.add('show');
    modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('productModal');
    modal.classList.remove('show');
    modal.style.display = 'none';
    clearForm();
    editingProductId = null;
}

// Populate form for editing
function populateForm(product) {
    document.getElementById('productName').value = product.name;
    document.getElementById('productReference').value = product.reference;
    document.getElementById('productBrand').value = product.brand;
    document.getElementById('productQuantity').value = product.quantity;
    document.getElementById('productPrice').value = product.price;
    
    if (product.image) {
        showImagePreview(product.image);
    }
}

// Clear form
function clearForm() {
    document.getElementById('productForm').reset();
    removeImage();
}

// Save product
function saveProduct(event) {
    event.preventDefault();
    
    // Get form data
    const name = document.getElementById('productName').value.trim();
    const reference = document.getElementById('productReference').value.trim();
    const brand = document.getElementById('productBrand').value.trim();
    const quantity = parseInt(document.getElementById('productQuantity').value);
    const price = parseFloat(document.getElementById('productPrice').value);
    const imageFile = document.getElementById('productImage').files[0];
    
    // Validate required fields
    if (!name || !reference || !brand || isNaN(quantity) || isNaN(price)) {
        showNotification('Por favor completa todos los campos obligatorios', 'error');
        return;
    }
    
    if (quantity < 0 || price < 0) {
        showNotification('Cantidad y precio deben ser números positivos', 'error');
        return;
    }
    
    const productData = {
        name: name,
        reference: reference,
        brand: brand,
        quantity: quantity,
        price: price
    };

    if (editingProductId) {
        // Update existing product
        const productIndex = products.findIndex(p => p.id === editingProductId);
        if (productIndex !== -1) {
            // Get existing image if no new image selected
            if (!imageFile && products[productIndex].image) {
                productData.image = products[productIndex].image;
            }
            // Add new image if selected
            else if (imageFile) {
                productData.image = URL.createObjectURL(imageFile);
            }
            
            products[productIndex] = { ...products[productIndex], ...productData };
            showNotification('Producto actualizado exitosamente', 'success');
        } else {
            showNotification('Error: Producto no encontrado', 'error');
            return;
        }
    } else {
        // Add new product
        const newProduct = {
            id: Date.now(),
            ...productData
        };
        
        if (imageFile) {
            newProduct.image = URL.createObjectURL(imageFile);
        }
        
        products.push(newProduct);
        showNotification('Producto agregado exitosamente', 'success');
    }
    
    // Save to localStorage and update UI
    saveProducts();
    filteredProducts = [...products];
    renderProducts();
    closeModal();
}

// Edit product
function editProduct(id) {
    openModal(id);
}

// Delete product
function deleteProduct(id) {
    productsToDelete = id;
    const modal = document.getElementById('deleteModal');
    modal.classList.add('show');
    modal.style.display = 'flex';
}

function closeDeleteModal() {
    const modal = document.getElementById('deleteModal');
    modal.classList.remove('show');
    modal.style.display = 'none';
    productsToDelete = null;
}

function confirmDelete() {
    if (productsToDelete) {
        products = products.filter(p => p.id !== productsToDelete);
        productsToDelete = null;
        saveProducts();
        filteredProducts = [...products];
        renderProducts();
        showNotification('Producto eliminado exitosamente', 'success');
        closeDeleteModal();
    }
}

// Image handling
function previewImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            showImagePreview(e.target.result);
        };
        reader.readAsDataURL(file);
    }
}

function showImagePreview(src) {
    const preview = document.getElementById('imagePreview');
    const placeholder = document.getElementById('uploadPlaceholder');
    const img = document.getElementById('previewImg');
    
    img.src = src;
    preview.style.display = 'block';
    placeholder.style.display = 'none';
}

function removeImage() {
    const preview = document.getElementById('imagePreview');
    const placeholder = document.getElementById('uploadPlaceholder');
    const input = document.getElementById('productImage');
    
    preview.style.display = 'none';
    placeholder.style.display = 'flex';
    input.value = '';
}

function handleDragOver(event) {
    event.preventDefault();
    event.currentTarget.style.borderColor = '#0057FF';
    event.currentTarget.style.background = '#F9FAFB';
}

function handleDrop(event) {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
        const input = document.getElementById('productImage');
        input.files = event.dataTransfer.files;
        previewImage({ target: { files: [file] } });
    }
    event.currentTarget.style.borderColor = '#D1D5DB';
    event.currentTarget.style.background = '';
}

// Export functions
function exportToExcel() {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(products.map(p => ({
        'Nombre': p.name,
        'Referencia': p.reference,
        'Marca': p.brand,
        'Cantidad': p.quantity,
        'Precio': `$${parseFloat(p.price).toFixed(2)}`,
        'Valor Total': `$${(p.quantity * parseFloat(p.price)).toFixed(2)}`,
        'Stock Bajo': p.quantity <= 10 ? 'Sí' : 'No'
    })));
    
    XLSX.utils.book_append_sheet(wb, ws, 'Inventario');
    XLSX.writeFile(wb, `inventario_${new Date().toISOString().split('T')[0]}.xlsx`);
    showNotification('Archivo Excel descargado exitosamente', 'success');
}

function exportToCSV() {
    const headers = ['Nombre', 'Referencia', 'Marca', 'Cantidad', 'Precio', 'Valor Total', 'Stock Bajo'];
    const rows = products.map(p => [
        p.name,
        p.reference,
        p.brand,
        p.quantity,
        `$${parseFloat(p.price).toFixed(2)}`,
        `$${(p.quantity * parseFloat(p.price)).toFixed(2)}`,
        p.quantity <= 10 ? 'Sí' : 'No'
    ]);
    
    const csvContent = [headers, ...rows]
        .map(row => row.map(field => `"${field}"`).join(','))
        .join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `inventario_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    showNotification('Archivo CSV descargado exitosamente', 'success');
}

function exportToPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(20);
    doc.text('Sistema de Inventario', 20, 20);
    
    // Date
    doc.setFontSize(12);
    doc.text(`Fecha: ${new Date().toLocaleDateString('es-ES')}`, 20, 30);
    
    // Summary
    const totalProducts = products.length;
    const totalValue = products.reduce((sum, product) => sum + (product.quantity * parseFloat(product.price)), 0);
    const lowStockCount = products.filter(product => product.quantity <= 10).length;
    
    doc.text(`Total Productos: ${totalProducts}`, 20, 45);
    doc.text(`Valor Total: $${totalValue.toFixed(2)}`, 20, 55);
    doc.text(`Productos con Stock Bajo: ${lowStockCount}`, 20, 65);
    
    // Table
    doc.autoTable({
        head: [['Nombre', 'Referencia', 'Marca', 'Cantidad', 'Precio', 'Valor Total']],
        body: products.map(p => [
            p.name,
            p.reference,
            p.brand,
            p.quantity.toString(),
            `$${parseFloat(p.price).toFixed(2)}`,
            `$${(p.quantity * parseFloat(p.price)).toFixed(2)}`
        ]),
        startY: 80,
        styles: { fontSize: 8 },
        headStyles: { fillColor: [0, 87, 255] }
    });
    
    doc.save(`inventario_${new Date().toISOString().split('T')[0]}.pdf`);
    showNotification('Archivo PDF descargado exitosamente', 'success');
}

// Notification system
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    const messageElement = document.getElementById('notificationMessage');
    
    messageElement.textContent = message;
    notification.className = `notification ${type}`;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Utility functions
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showMobileView() {
    // Show mobile view on smaller screens
    if (window.innerWidth <= 768) {
        document.querySelector('.desktop-table').style.display = 'none';
        document.querySelector('.mobile-cards').style.display = 'block';
    } else {
        document.querySelector('.desktop-table').style.display = 'block';
        document.querySelector('.mobile-cards').style.display = 'none';
    }
}

// Handle window resize
window.addEventListener('resize', showMobileView);

// Esta función ya no se usa - fue reemplazada por saveProduct() en el onsubmit

// Add sample data for demonstration
function addSampleData() {
    const sampleProducts = [
        {
            id: 1,
            name: 'Laptop HP Pavilion',
            reference: 'HP-PAV-001',
            brand: 'HP',
            quantity: 15,
            price: 899.99,
            image: null
        },
        {
            id: 2,
            name: 'Mouse Inalámbrico',
            reference: 'LOG-MOU-002',
            brand: 'Logitech',
            quantity: 5,
            price: 29.99,
            image: null
        },
        {
            id: 3,
            name: 'Teclado Mecánico',
            reference: 'COR-TEC-003',
            brand: 'Corsair',
            quantity: 25,
            price: 149.99,
            image: null
        }
    ];
    
    products = sampleProducts;
    saveProducts();
    filteredProducts = [...products];
    renderProducts();
    showNotification('Datos de ejemplo agregados', 'success');
}

// Add sample data button (for demonstration)
function addSampleDataButton() {
    if (products.length === 0) {
        addSampleData();
    } else {
        showNotification('Ya tienes productos en el inventario', 'error');
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // This ensures the event listeners are set up only once
    console.log('Inventory App initialized');
});
