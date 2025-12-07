// Interactive growth tracker
document.getElementById('growth-tracker-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form submission
    const cropType = document.getElementById('crop-type').value;
    const plantDate = new Date(document.getElementById('plant-date').value);

    // Simulate growth tracking logic he ha 
    const currentDate = new Date();
    const daysElapsed = Math.floor((currentDate - plantDate) / (1000 * 60 * 60 * 24));
    const growthStage = daysElapsed < 30 ? 'Seedling' : daysElapsed < 60 ? 'Vegetative' : 'Mature';

    const resultDiv = document.getElementById('growth-tracker-result');
    resultDiv.innerHTML = `<p>Crop Type: ${cropType}</p><p>Days Elapsed: ${daysElapsed}</p><p>Growth Stage: ${growthStage}</p>`;
});

// JavaScript for community forums yo ho
const forumPosts = []; // Placeholder for forum posts (replace with actual data source)

document.getElementById('forum-post-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form submission
    const postTitle = document.getElementById('post-title').value;
    const postContent = document.getElementById('post-content').value;

    // Simulate adding a new forum post maja
    const newPost = { title: postTitle, content: postContent };
    forumPosts.push(newPost);
    renderForumPosts();
});

function renderForumPosts() {
    const forumPostsContainer = document.getElementById('forum-posts');
    forumPostsContainer.innerHTML = ''; // Clear previous content

    forumPosts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('forum-post');
        postDiv.innerHTML = `<h3>${post.title}</h3><p>${post.content}</p>`;
        forumPostsContainer.appendChild(postDiv);
    });
}

// Initial render of forum posts
renderForumPosts();

// Marketplace functionality

const products = [
    { id: 1, name: 'Product 1', price: 10, image: 'product1.jpg' },
    { id: 2, name: 'Product 2', price: 15, image: 'product2.jpg' },
    { id: 3, name: 'Product 3', price: 20, image: 'product3.jpg' },
    // au add kariba options darkar padile
];

// Function to create product cards and append them to #product-listings div
function renderProductListings() {
    const productContainer = document.getElementById('product-listings');
    productContainer.innerHTML = ''; // Clear previous content

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productContainer.appendChild(productCard);
    });
}

// Function to simulate adding product to cart 
function addToCart(productId) {
    alert(`Product with ID ${productId} added to cart.`);
}

// Call the renderProductListings function to populate product listings
renderProductListings();

// JavaScript for crop disease identification
document.getElementById('disease-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form submission
    const cropName = document.getElementById('crop-name').value;
    const imageFile = document.getElementById('disease-image').files[0];

    // Perform image recognition and disease identification logic here
    // Display the identification results in the #disease-result div
    const resultDiv = document.getElementById('disease-result');
    resultDiv.innerHTML = `<p>Crop: ${cropName}</p><p>Disease: Leaf Spot</p>`; // Example result, replace with actual identification data
});

// JavaScript for soil testing and analysis
document.getElementById('soil-test-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form submission
    const soilSample = document.getElementById('soil-sample').files[0];

    // Simulate soil test analysis logic 
    const resultDiv = document.getElementById('soil-test-result');
    resultDiv.innerHTML = `<p>Soil Test Report for ${soilSample.name} analyzed successfully.</p><p>pH Level: 6.5</p><p>Nutrient Levels: Optimal</p>`;
});

// JavaScript for financial tools and calculators
document.getElementById('cost-calculator-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form submission
    const cropType = document.getElementById('crop-type-calc').value;
    const area = parseFloat(document.getElementById('area').value);
    const costPerAcre = parseFloat(document.getElementById('cost-per-acre').value);

    // Calculate total cost
    const totalCost = area * costPerAcre;

    const resultDiv = document.getElementById('cost-calculation-result');
    resultDiv.innerHTML = `<p>Crop Type: ${cropType}</p><p>Area: ${area} acres</p><p>Total Cost: $${totalCost.toFixed(2)}</p>`;
});

