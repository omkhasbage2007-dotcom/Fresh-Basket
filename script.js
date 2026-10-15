const products = [
  {id:1,name:"Fresh Apples",category:"Fruits",unit:"1 kg",price:160,emoji:"🍎",tag:"POPULAR"},
  {id:2,name:"Bananas",category:"Fruits",unit:"1 dozen",price:60,emoji:"🍌",tag:"FRESH PICK"},
  {id:3,name:"Tomatoes",category:"Vegetables",unit:"1 kg",price:40,emoji:"🍅",tag:""},
  {id:4,name:"Broccoli",category:"Vegetables",unit:"1 piece",price:55,emoji:"🥦",tag:""},
  {id:5,name:"Fresh Milk",category:"Dairy",unit:"1 litre",price: atPrice(64),emoji:"🥛",tag:"DAILY ESSENTIAL"},
  {id:6,name:"Farm Eggs",category:"Dairy",unit:"6 pieces",price:48,emoji:"🥚",tag:""},
  {id:7,name:"Basmati Rice",category:"Staples",unit:"1 kg",price:120,emoji:"🍚",tag:""},
  {id:8,name:"Oat Cookies",category:"Snacks",unit:"200 g pack",price:75,emoji:"🍪",tag:""}
];
function atPrice(n){return n}
let activeCategory = "All", cart = {};
const grid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
function rupees(n){return "₹"+n.toLocaleString("en-IN")}
function renderProducts(){
  const q=searchInput.value.trim().toLowerCase();
  const shown=products.filter(p=>(activeCategory==="All"||p.category===activeCategory)&&(p.name.toLowerCase().includes(q)||p.category.toLowerCase().includes(q)));
  document.getElementById("resultCount").textContent=shown.length+" product"+(shown.length===1?"":"s");
  grid.innerHTML=shown.length?shown.map(p=>`<article class="product-card">
    <div class="product-image">${p.tag?`<span class="product-tag">${p.tag}</span>`:""}<span>${p.emoji}</span></div>
    <h3>${p.name}</h3><div class="product-meta">${p.unit} · ${p.category}</div>
    <div class="product-footer"><span class="price">${rupees(p.price)}</span><button class="add-btn" onclick="addToCart(${p.id})">+ Add</button></div>
  </article>`).join(""):'<div class="no-results">No products found. Try another search.</div>';
}
function addToCart(id){cart[id]=(cart[id]||0)+1;renderCart();showToast("Added to your basket!")}
function changeQty(id,delta){cart[id]=(cart[id]||0)+delta;if(cart[id]<=0)delete cart[id];renderCart()}
function renderCart(){
  const count=Object.values(cart).reduce((a,b)=>a+b,0);
  const total=products.reduce((sum,p)=>sum+p.price*(cart[p.id]||0),0);
  document.getElementById("cartCount").textContent=count;
  document.getElementById("cartTotal").textContent=rupees(total);
  const el=document.getElementById("cartItems");
  const items=products.filter(p=>cart[p.id]);
  el.innerHTML=items.length?items.map(p=>`<div class="cart-item"><div class="cart-emoji">${p.emoji}</div><div><strong>${p.name}</strong><small>${rupees(p.price)} · ${p.unit}</small><div class="qty-controls"><button onclick="changeQty(${p.id},-1)">−</button><span>${cart[p.id]}</span><button onclick="changeQty(${p.id},1)">+</button></div></div><b>${rupees(p.price*cart[p.id])}</b></div>`).join(""):'<p class="empty-cart">Your basket is empty. Add something fresh!</p>';
}
const panel=document.getElementById("cartPanel"),overlay=document.getElementById("cartOverlay");
function openCart(){panel.classList.add("open");overlay.classList.add("open")}
function closeCart(){panel.classList.remove("open");overlay.classList.remove("open")}
document.getElementById("cartOpen").addEventListener("click",openCart);
document.getElementById("cartClose").addEventListener("click",closeCart);
overlay.addEventListener("click",closeCart);
document.querySelectorAll(".category").forEach(btn=>btn.addEventListener("click",()=>{document.querySelectorAll(".category").forEach(b=>b.classList.remove("active"));btn.classList.add("active");activeCategory=btn.dataset.category;renderProducts()}));
searchInput.addEventListener("input",renderProducts);
document.getElementById("searchBtn").addEventListener("click",renderProducts);
document.getElementById("checkoutBtn").addEventListener("click",()=>{
  const items=products.filter(p=>cart[p.id]);
  if(!items.length){showToast("Add items to your basket first.");return}
  const total=items.reduce((s,p)=>s+p.price*cart[p.id],0);
  const message="Hello FreshBasket! I would like to place an order request:\n"+items.map(p=>`${p.name} (${p.unit}) x ${cart[p.id]} = ${rupees(p.price*cart[p.id])}`).join("\n")+"\nEstimated total: "+rupees(total)+"\nPlease confirm availability and delivery/pickup details.";
  // Replace the placeholder number below with the shop's WhatsApp number, including country code.
  const whatsappNumber="";
  if(!whatsappNumber){showToast("Demo mode: add the shop WhatsApp number in script.js to enable ordering.");return}
  window.open("https://wa.me/"+whatsappNumber+"?text="+encodeURIComponent(message),"_blank");
});
let toastTimer;
function showToast(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove("show"),2600)}
document.getElementById("year").textContent=new Date().getFullYear();
renderProducts();renderCart();
