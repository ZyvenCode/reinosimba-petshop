const WHATSAPP = "5599999999999"; // troque pelo número oficial do negócio
const products = [
 {name:"Ração Pedigree Adultos – 1kg",price:89.90,img:"https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=600&q=80"},
 {name:"Shampoo Pet Clean – 500ml",price:24.90,img:"https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=600&q=80"},
 {name:"Antipulgas para Cães",price:59.90,img:"https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=600&q=80"},
 {name:"Areia Higiênica para Gatos – 4kg",price:19.90,img:"https://images.unsplash.com/photo-1519052537078-e6302a4968d4?auto=format&fit=crop&w=600&q=80"},
 {name:"Brinquedo Mordedor para Cães",price:14.90,img:"https://images.unsplash.com/photo-1535294435445-d7249524ef2e?auto=format&fit=crop&w=600&q=80"},
 {name:"Coleira Ajustável",price:29.90,img:"https://images.unsplash.com/photo-1558929996-da64ba858215?auto=format&fit=crop&w=600&q=80"},
 {name:"Higiene Bucal Pet",price:22.90,img:"https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=600&q=80"},
 {name:"Cama Conforto Pet",price:119.90,img:"https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&w=600&q=80"},
 {name:"Comedouro Antiformiga",price:39.90,img:"https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?auto=format&fit=crop&w=600&q=80"}
];
let cart=[];
function money(v){return v.toLocaleString("pt-BR",{style:"currency",currency:"BRL"})}
function renderProducts(list=products.slice(0,5)){
 const grid=document.getElementById("productGrid");
 grid.innerHTML=list.map((p,i)=>`<article class="product"><img src="${p.img}" alt="${p.name}" loading="lazy"><h3>${p.name}</h3><div class="price">${money(p.price)}</div><button onclick="addToCart(${products.indexOf(p)})">🛒 Adicionar ao carrinho</button></article>`).join("");
}
function addToCart(i){cart.push(products[i]);updateCart();showToast("Produto adicionado ao carrinho!")}
function updateCart(){
 document.getElementById("cartCount").textContent=cart.length;
 const box=document.getElementById("cartItems");
 if(!cart.length){box.innerHTML="<p style='color:#667;padding:20px 0'>Seu carrinho está vazio.</p>";document.getElementById("cartTotal").textContent=money(0);return}
 box.innerHTML=cart.map((p,i)=>`<div class="cart-line"><span>${p.name}</span><b>${money(p.price)}</b><button onclick="removeCart(${i})" style="border:0;background:none;cursor:pointer">×</button></div>`).join("");
 document.getElementById("cartTotal").textContent=money(cart.reduce((s,p)=>s+p.price,0));
}
function removeCart(i){cart.splice(i,1);updateCart()}
function openCart(){updateCart();document.getElementById("cartModal").classList.add("open")}
function openBooking(){document.getElementById("bookingModal").classList.add("open")}
function closeModal(id){document.getElementById(id).classList.remove("open")}
function showAllProducts(){renderProducts(products);document.querySelector("#produtos").scrollIntoView({behavior:"smooth"})}
function checkout(){
 if(!cart.length)return showToast("Adicione algum produto primeiro.");
 const text="Olá, Reino do Simba! 🐾%0A%0AGostaria de fazer este pedido:%0A"+cart.map(p=>`• ${p.name} — ${money(p.price)}`).join("%0A")+`%0A%0ATotal: ${money(cart.reduce((s,p)=>s+p.price,0))}`;
 window.open(`https://wa.me/${WHATSAPP}?text=${text}`,"_blank");
}
function showToast(t){const el=document.getElementById("toast");el.textContent=t;el.classList.add("show");setTimeout(()=>el.classList.remove("show"),2200)}
document.querySelectorAll("[data-whatsapp]").forEach(a=>a.addEventListener("click",e=>{e.preventDefault();window.open(`https://wa.me/${WHATSAPP}?text=Olá,%20Reino%20do%20Simba!%20🐾%20Gostaria%20de%20mais%20informações.`,"_blank")}));
const bookingForm=document.getElementById("bookingForm");
bookingForm.addEventListener("submit",e=>{
 e.preventDefault();
 const clientName=document.getElementById("clientName");
 const petName=document.getElementById("petName");
 const serviceName=document.getElementById("serviceName");
 const serviceDate=document.getElementById("serviceDate");
 const serviceTime=document.getElementById("serviceTime");
 const msg=`Olá, Reino do Simba! 🐾%0A%0AGostaria de agendar:%0A• Cliente: ${encodeURIComponent(clientName.value)}%0A• Pet: ${encodeURIComponent(petName.value)}%0A• Serviço: ${encodeURIComponent(serviceName.value)}%0A• Data: ${serviceDate.value}%0A• Horário: ${serviceTime.value}`;
 window.open(`https://wa.me/${WHATSAPP}?text=${msg}`,"_blank"); closeModal("bookingModal"); bookingForm.reset();
});
document.getElementById("menuBtn").addEventListener("click",()=>document.querySelector(".header nav").classList.toggle("mobile-open"));
document.addEventListener("click",e=>{if(e.target.classList.contains("modal"))e.target.classList.remove("open")});
renderProducts();
updateCart();
