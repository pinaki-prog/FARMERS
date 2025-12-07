// --- Navigation & UI Utilities icha nahi au karibini---

// Sticky Header Effect maja asuchi ethire
window.addEventListener('scroll', () => {
    const header = document.getElementById('main-header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle maja hi maja
const menuBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.getElementById('nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Change icon from bars to x
    const icon = menuBtn.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
    } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    }
});

// Toast Notification System (replaces alerts seta bekar lagu thila)
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.classList.add('toast');
    
    const icon = type === 'success' ? '<i class="fa-solid fa-circle-check"></i>' : '<i class="fa-solid fa-circle-info"></i>';
    
    toast.innerHTML = `${icon} <span>${message}</span>`;
    container.appendChild(toast);

    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}


// --- Growth Tracker maja maja---
document.getElementById('growth-tracker-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const cropType = document.getElementById('crop-type').value;
    const plantDateVal = document.getElementById('plant-date').value;

    if (!plantDateVal) {
        showToast('Please select a planting date.', 'error');
        return;
    }

    const plantDate = new Date(plantDateVal);
    const currentDate = new Date();
    
    // Calculate days he he
    const diffTime = Math.abs(currentDate - plantDate);
    const daysElapsed = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Simulate stages he ha ha ha
    let growthStage = 'Seedling';
    let progress = 10;
    
    if (daysElapsed > 90) { growthStage = 'Harvest Ready'; progress = 100; }
    else if (daysElapsed > 60) { growthStage = 'Maturation'; progress = 80; }
    else if (daysElapsed > 30) { growthStage = 'Vegetative'; progress = 50; }
    else if (daysElapsed > 10) { growthStage = 'Sprouting'; progress = 25; }

    const resultDiv = document.getElementById('growth-tracker-result');
    resultDiv.classList.remove('hidden');
    resultDiv.innerHTML = `
        <h3><i class="fa-solid fa-chart-simple"></i> Status Report</h3>
        <p><strong>Crop:</strong> ${cropType}</p>
        <p><strong>Age:</strong> ${daysElapsed} days</p>
        <p><strong>Stage:</strong> ${growthStage}</p>
        <div class="progress-container">
            <div class="progress-bar" style="width: ${progress}%"></div>
        </div>
    `;
    
    showToast(`Tracking updated for ${cropType}`);
});


// --- Community Forums yo hoo hoo ---
const forumPosts = [
    { title: 'Best fertilizer for wheat?', content: 'I am looking for organic options for this season.', user: 'FarmerJohn' },
    { title: 'Rainfall predictions', content: 'Does anyone have the forecast for the next month?', user: 'AgriExpert' }
]; 

document.getElementById('forum-post-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const postTitle = document.getElementById('post-title').value;
    const postContent = document.getElementById('post-content').value;

    const newPost = { title: postTitle, content: postContent, user: 'You' };
    forumPosts.unshift(newPost); // Add to top
    renderForumPosts();
    
    // Clear form
    document.getElementById('post-title').value = '';
    document.getElementById('post-content').value = '';
    showToast('Post added successfully!');
});

function renderForumPosts() {
    const forumPostsContainer = document.getElementById('forum-posts');
    forumPostsContainer.innerHTML = '';

    forumPosts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('forum-post');
        postDiv.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <small style="color: #888; margin-top: 5px; display:block;">Posted by: ${post.user}</small>
        `;
        forumPostsContainer.appendChild(postDiv);
    });
}
renderForumPosts();


// --- Marketplace ---
// Using Placeholder images that actually load au kare taki bhala lagiba
const products = [
    { id: 1, name: 'Organic Seeds Pack', price: 25.00, image: 'https://images.unsplash.com/photo-1591989332589-9636d9368551?w=300&fit=crop' },
    { id: 2, name: 'Eco Fertilizer (5kg)', price: 45.50, image: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=300&fit=crop' },
    { id: 3, name: 'Garden Trowel', price: 12.99, image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&fit=crop' },
    { id: 4, name: 'Irrigation Kit', price: 89.99, image: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=300&fit=crop' }
];

function renderProductListings() {
    const productContainer = document.getElementById('product-listings');
    productContainer.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="price">$${product.price.toFixed(2)}</p>
                <button onclick="addToCart(${product.id}, '${product.name}')" class="small-btn">
                    <i class="fa-solid fa-cart-plus"></i> Add to Cart
                </button>
            </div>
        `;
        productContainer.appendChild(productCard);
    });
}

function addToCart(productId, productName) {
    showToast(`${productName} added to cart!`);
}
renderProductListings();


// --- Disease Identification ---
// Enhanced with image preview better visibility better kama
const diseaseInput = document.getElementById('disease-image');
const diseasePreview = document.getElementById('disease-preview-area');

diseaseInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            diseasePreview.innerHTML = `<img src="${e.target.result}" style="max-width: 100%; height: 150px; object-fit: contain; margin-top: 10px; border-radius: 8px;">`;
        }
        reader.readAsDataURL(file);
    }
});

document.getElementById('disease-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const cropName = document.getElementById('crop-name').value;
    
    if(!diseaseInput.files[0]) {
        showToast('Please upload an image first.', 'error');
        return;
    }

    showToast('Analyzing image...', 'info');

    // Simulate AI delay
    setTimeout(() => {
        const resultDiv = document.getElementById('disease-result');
        resultDiv.classList.remove('hidden');
        resultDiv.innerHTML = `
            <h3>Analysis Complete</h3>
            <p><strong>Crop:</strong> ${cropName}</p>
            <p><strong>Detected Issue:</strong> Early Blight (Confidence: 94%)</p>
            <p><strong>Recommendation:</strong> Apply organic copper fungicide.</p>
        `;
    }, 1500);
});


// --- Soil Testing ---
document.getElementById('soil-test-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const soilSample = document.getElementById('soil-sample').files[0];

    if(!soilSample) {
        showToast('Please select a file.', 'error');
        return;
    }

    showToast('Uploading and scanning report...', 'info');

    setTimeout(() => {
        const resultDiv = document.getElementById('soil-test-result');
        resultDiv.classList.remove('hidden');
        resultDiv.innerHTML = `
            <h3><i class="fa-solid fa-clipboard-check"></i> Report Analyzed</h3>
            <p><strong>File:</strong> ${soilSample.name}</p>
            <p><strong>pH Level:</strong> 6.5 (Optimal)</p>
            <p><strong>Nitrogen:</strong> Low - Recommend adding nitrogen-rich compost.</p>
        `;
    }, 2000);
});


// --- Financial Tools must ---
document.getElementById('cost-calculator-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const cropType = document.getElementById('crop-type-calc').value;
    const area = parseFloat(document.getElementById('area').value);
    const costPerAcre = parseFloat(document.getElementById('cost-per-acre').value);

    if (isNaN(area) || isNaN(costPerAcre)) {
        showToast('Please enter valid numbers.', 'error');
        return;
    }

    const totalCost = area * costPerAcre;

    const resultDiv = document.getElementById('cost-calculation-result');
    resultDiv.classList.remove('hidden');
    resultDiv.innerHTML = `
        <h3>Estimation for ${cropType}</h3>
        <p><strong>Area:</strong> ${area} acres</p>
        <p style="font-size: 1.5rem; color: #2d6a4f; font-weight: bold;">
            Total: $${totalCost.toFixed(2)}
        </p>
    `;
});