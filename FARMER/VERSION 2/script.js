
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('year').textContent = new Date().getFullYear();

  initTheme();
  initRipple();
  initScrollReveal();
  initGrowthTracker();
  initForum();
  initMarketplace();
  initDiseaseForm();
  initSoilForm();
  initCostCalculator();
});

// THEME: dark mode maja asiba he ha ha
function initTheme() {
  const body = document.body;
  const btn = document.getElementById('theme-toggle');
  const saved = localStorage.getItem('fh-theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light');
  setTheme(saved);

  btn.addEventListener('click', () => {
    const next = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    setTheme(next);
  });

  function setTheme(value) {
    if (value === 'dark') {
      body.setAttribute('data-theme', 'dark');
      document.getElementById('theme-toggle').setAttribute('aria-pressed', 'true');
    } else {
      body.setAttribute('data-theme', 'light');
      document.getElementById('theme-toggle').setAttribute('aria-pressed', 'false');
    }
    localStorage.setItem('fh-theme', value);
  }
}

// RIPPLE: add ripple effect to .btn elements sundarta pain
function initRipple() {
  document.querySelectorAll('.btn, .icon-btn, button').forEach(el => {
    el.classList.add('ripple');
    el.addEventListener('pointerdown', function (e) {
      const rect = el.getBoundingClientRect();
      const wave = document.createElement('span');
      wave.className = 'ripple-wave';
      wave.style.left = (e.clientX - rect.left) + 'px';
      wave.style.top = (e.clientY - rect.top) + 'px';
      el.appendChild(wave);
      setTimeout(() => wave.remove(), 700);
    });
  });
}

// SCROLL REVEAL: sections fade in sundara ahaa
function initScrollReveal() {
  const sections = document.querySelectorAll('section[data-anim]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(ent => {
      if (ent.isIntersecting) {
        ent.target.classList.add('visible');
        observer.unobserve(ent.target);
      }
    });
  }, {threshold: 0.12});
  sections.forEach(s => observer.observe(s));
}

// Growth tracker
function initGrowthTracker(){
  const form = document.getElementById('growth-tracker-form');
  const resultDiv = document.getElementById('growth-tracker-result');

  form.addEventListener('submit', function(e){
    e.preventDefault();
    const cropType = document.getElementById('crop-type').value;
    const dateVal = document.getElementById('plant-date').value;
    if(!dateVal){
      resultDiv.innerHTML = `<p style="color:#b33">Please select a planting date.</p>`;
      return;
    }
    const plantDate = new Date(dateVal);
    const currentDate = new Date();
    const daysElapsed = Math.max(0, Math.floor((currentDate - plantDate) / (1000 * 60 * 60 * 24)));
    let growthStage = 'Seedling';
    let progress = Math.min(100, Math.round((daysElapsed / 60) * 100));
    if(daysElapsed >= 60) { growthStage = 'Mature'; progress = 100; }
    else if(daysElapsed >= 30) growthStage = 'Vegetative';

    resultDiv.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap">
        <div><strong>Crop:</strong> ${escapeHtml(cropType)} • <strong>Stage:</strong> ${growthStage}</div>
        <div><strong>Days:</strong> ${daysElapsed}</div>
      </div>
      <div style="margin-top:10px">
        <div aria-hidden="true" style="height:12px;background:linear-gradient(90deg,var(--brand-500),var(--brand-700));width:${progress}%;border-radius:8px;transition:width 500ms ease"></div>
      </div>
      <div style="margin-top:8px;color:var(--muted)">Progress to next stage: ${progress}%</div>
    `;
  });
}

function escapeHtml(s){
  return String(s).replace(/[&<>"']/g, function(m){return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]);});
}

// Forum
const forumPosts = [
  {title:'Welcome to Farmers Hub','content':'Share tips, ask questions, and help fellow growers.'}
];

function initForum(){
  const form = document.getElementById('forum-post-form');
  const container = document.getElementById('forum-posts');
  renderForum();

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const title = document.getElementById('post-title').value.trim();
    const content = document.getElementById('post-content').value.trim();
    if(!title || !content) return alert('Please add a title and content.');
    forumPosts.unshift({title:escapeHtml(title), content:escapeHtml(content)});
    form.reset();
    renderForum();
  });

  function renderForum(){
    container.innerHTML = '';
    forumPosts.forEach(post => {
      const div = document.createElement('div');
      div.className = 'forum-post';
      div.innerHTML = `<h3>${post.title}</h3><p style="color:var(--muted)">${post.content}</p>`;
      container.appendChild(div);
    });
  }
}

// Marketplace
const products = [
  { id: 1, name: 'Organic Fertilizer', price: 10, image: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?q=80&w=800&auto=format&fit=crop&s=4a6c8a7a8f0b1c2e' },
  { id: 2, name: 'Seed Pack (Wheat)', price: 15, image: 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=800&auto=format&fit=crop&s=3c0f1e3f8a1c45a1' },
  { id: 3, name: 'Soil Test Kit', price: 20, image: 'https://images.unsplash.com/photo-1542736667-069246bdbc6d?q=80&w=800&auto=format&fit=crop&s=a3b3b0f3c9a7e9d1' }
];

function initMarketplace(){
  const container = document.getElementById('product-listings');
  container.innerHTML = '';
  products.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${p.image}" alt="${escapeHtml(p.name)}" />
      <h3>${escapeHtml(p.name)}</h3>
      <p>Price: $${p.price.toFixed(2)}</p>
      <button class="btn primary" data-id="${p.id}">Add to Cart</button>
    `;
    container.appendChild(card);
  });

  container.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-id]');
    if(!btn) return;
    const id = Number(btn.getAttribute('data-id'));
    addToCart(id);
  });
}

function addToCart(productId){
  const p = products.find(x => x.id === productId);
  if(!p) return alert('Product not found');
  // lightweight placeholder: could integrate cart later sundar deka haba karle ebe icha nahi
  alert(`${p.name} added to cart.`);
}

// Disease identification beautiful aha(placeholder logic)
function initDiseaseForm() {
  const form = document.getElementById('disease-form');
  const result = document.getElementById('disease-result');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const crop = document.getElementById('crop-name').value;
    const file = document.getElementById('disease-image').files[0];

    if (!file) {
      result.innerHTML = `<p style="color:#b33">Please upload an image to analyze.</p>`;
      return;
    }

    result.innerHTML = `<p>Uploading image…</p>`;

    // Build formData for backend important eta file ru info utheiba
    const formData = new FormData();
    formData.append("crop", crop);
    formData.append("image", file);

    // API endpoint placeholder
    const API_URL = "https://your-server.com/api/detect-disease";

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      result.innerHTML = `
        <div><strong>Crop:</strong> ${crop}</div>
        <div><strong>Disease:</strong> ${data.disease || "Unknown"}</div>
        <div><strong>Confidence:</strong> ${data.confidence || "N/A"}</div>
      `;
    } catch (err) {
      result.innerHTML = `
        <p style="color:#b33">API unavailable — ensure your backend is running.</p>
        <p>(Stub Active)</p>
      `;
    }
  });
}


// Soil testing form (he ha ha ha)
function initSoilForm(){
  const form = document.getElementById('soil-test-form');
  const result = document.getElementById('soil-test-result');

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const file = document.getElementById('soil-sample').files[0];
    if(!file){
      result.innerHTML = `<p style="color:#b33">Please upload a soil report file.</p>`;
      return;
    }
    result.innerHTML = `<p>Processing ${escapeHtml(file.name)}... <em>(demo)</em></p>`;
    setTimeout(()=> {
      result.innerHTML = `<div><strong>Soil Test:</strong> ${escapeHtml(file.name)}</div><div><strong>pH Level:</strong> 6.5</div><div><strong>Nutrients:</strong> Nitrogen Normal • Phosphorus Adequate • Potassium Adequate</div>`;
    }, 800);
  });
}

// Cost calculator
function initCostCalculator(){
  const form = document.getElementById('cost-calculator-form');
  const result = document.getElementById('cost-calculation-result');

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const crop = document.getElementById('crop-type-calc').value;
    const area = parseFloat(document.getElementById('area').value) || 0;
    const cost = parseFloat(document.getElementById('cost-per-acre').value) || 0;
    const total = (area * cost).toFixed(2);
    result.innerHTML = `<div><strong>Crop:</strong> ${escapeHtml(crop)}</div><div><strong>Area:</strong> ${area} acres</div><div><strong>Total Cost:</strong> $${total}</div>`;
  });
}
/* ============================================================
   LEADERBOARD + ACHIEVEMENTS (sundar sushil bhala dekha haba website pain)
   ============================================================ */

// Local storage keys
const LB_KEY = 'fh-leaderboard';
const ACH_KEY = 'fh-achievements';

// Default state
let leaderboard = JSON.parse(localStorage.getItem(LB_KEY) || '[]');
let achievements = JSON.parse(localStorage.getItem(ACH_KEY) || '{}');

// Hooks into growth tracker (already exists)
function updateLeaderboard(daysElapsed, cropType) {
  const entry = {
    crop: cropType,
    days: daysElapsed,
    date: new Date().toLocaleDateString()
  };

  leaderboard.unshift(entry);
  leaderboard = leaderboard.slice(0, 10); // Keep top 10

  localStorage.setItem(LB_KEY, JSON.stringify(leaderboard));
  renderLeaderboard();
  updateAchievements(daysElapsed);
}

function updateAchievements(daysElapsed) {
  if (daysElapsed >= 30 && !achievements['30_day_farmer']) {
    achievements['30_day_farmer'] = true;
    alert("🏆 Achievement Unlocked: 30-Day Farmer!");
  }
  if (daysElapsed >= 60 && !achievements['season_master']) {
    achievements['season_master'] = true;
    alert("🏆 Achievement Unlocked: Season Master!");
  }
  localStorage.setItem(ACH_KEY, JSON.stringify(achievements));
}

function renderLeaderboard() {
  const container = document.getElementById('leaderboard');
  if (!container) return;

  if (!leaderboard.length) {
    container.innerHTML = "<p>No growth entries yet.</p>";
    return;
  }

  container.innerHTML = leaderboard
    .map(
      (e, i) => `
        <div class="lb-entry">
          <span>#${i + 1}</span>
          <span>${e.crop}</span>
          <span>${e.days} days</span>
          <span>${e.date}</span>
        </div>`
    )
    .join('');
}

// Add leaderboard section dynamically
document.addEventListener('DOMContentLoaded', () => {
  const tracker = document.getElementById('growth-tracker');
  const lbBox = document.createElement('section');
  lbBox.id = 'leaderboard-section';
  lbBox.setAttribute('data-anim', '');
  lbBox.innerHTML = `
    <h2>Growth Leaderboard</h2>
    <div id="leaderboard" class="leaderboard-box"></div>
  `;
  tracker.insertAdjacentElement('afterend', lbBox);
  renderLeaderboard();
});

// Patch growth tracker form submission to record results
const originalGrowthHandler = document.getElementById('growth-tracker-form').onsubmit;
document.getElementById('growth-tracker-form').addEventListener('submit', () => {
  setTimeout(() => {
    const result = document.getElementById('growth-tracker-result').innerText;
    if (!result.includes("Days")) return;

    const crop = document.getElementById('crop-type').value;
    const dateVal = document.getElementById('plant-date').value;
    const daysElapsed = Math.max(
      0,
      Math.floor((new Date() - new Date(dateVal)) / (1000 * 60 * 60 * 24))
    );

    updateLeaderboard(daysElapsed, crop);
  }, 50);
});
