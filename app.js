const products=[
{id:'nozes',name:'Doce de leite com nozes',category:'cremosos',image:'products/nozes.png',description:'Doce de leite e nozes para a sua celebração.'},
{id:'morango',name:'Ninho com morango',category:'frutas',image:'products/morango.png',description:'A combinação de leite Ninho com morango.'},
{id:'nutella',name:'Ninho com Nutella',category:'chocolate',image:'products/nutella.png',description:'Leite Ninho e Nutella em um só sabor.'},
{id:'prestigio',name:'Prestígio',category:'chocolate',image:'products/prestigio.png',description:'Chocolate e coco, uma dupla clássica.'},
{id:'maracuja',name:'Mousse de maracujá',category:'frutas',image:'products/maracuja.png',description:'O toque de maracujá para adoçar o seu momento.'},
{id:'brigadeiro',name:'Brigadeiro',category:'chocolate',image:'products/brigadeiro.png',description:'O sabor de brigadeiro em forma de bolo.'}
];
const cart=new Map();const dialog=document.querySelector('#cart');const productList=document.querySelector('#products');
productList.innerHTML=products.map(p=>`<article class="product" data-category="${p.category}"><img class="product-photo" src="${p.image}" alt="Bolo ${p.name}, imagem ilustrativa" loading="lazy" width="1024" height="1024"><div class="product-info"><h3>${p.name}</h3><p>${p.description}</p><small>Valor sob consulta</small><button type="button" data-add="${p.id}" aria-label="Adicionar ${p.name} ao carrinho">Adicionar ao carrinho <span aria-hidden="true">＋</span></button></div></article>`).join('');
function updateLink(){
 const selected=products.filter(p=>cart.has(p.id));
 const notes=document.querySelector('#notes').value.trim();
 const lines=['Olá, Confeitaria! Quero encomendar:'];
 if(selected.length) lines.push(selected.map(p=>`• ${cart.get(p.id)} × ${p.name}`).join('\n'));
 if(notes) lines.push('Detalhes da minha encomenda:\n'+notes);
 lines.push('Você poderia me contar quais sabores e recheios de bolo estão disponíveis? Gostaria de saber também os valores e a disponibilidade para encomenda.','Aguardo seu retorno. Obrigado pelo carinho! 💕');
 document.querySelector('#send-order').href='https://wa.me/5511914497702?text='+encodeURIComponent(lines.join('\n\n'));
}
function renderCart(){const total=[...cart.values()].reduce((a,b)=>a+b,0);document.querySelector('#count').textContent=total;document.querySelector('#floating-count').textContent=total;document.querySelector('#floating-cart').hidden=total===0;document.querySelector('#cart-items').innerHTML=cart.size?products.filter(p=>cart.has(p.id)).map(p=>`<div class="cart-row"><div class="cart-product"><img src="${p.image}" alt="" width="56" height="56"><strong>${p.name}</strong></div><div class="qty"><button data-minus="${p.id}" aria-label="Diminuir ${p.name}">−</button><span>${cart.get(p.id)}</span><button data-plus="${p.id}" aria-label="Aumentar ${p.name}">+</button></div></div>`).join(''):'<p class="empty">Seu carrinho está vazio. Escolha uma delícia no cardápio ou conte sua ideia abaixo.</p>';updateLink();}
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});document.querySelectorAll('.product').forEach(p=>p.hidden=button.dataset.filter!=='all'&&p.dataset.category!==button.dataset.filter);}));
productList.addEventListener('click',e=>{const button=e.target.closest('[data-add]');if(!button)return;const id=button.dataset.add;cart.set(id,(cart.get(id)||0)+1);renderCart();document.querySelector('#announcement').textContent=products.find(p=>p.id===id).name+' adicionado ao carrinho';button.innerHTML='Adicionado ao carrinho <span aria-hidden="true">✓</span>';setTimeout(()=>button.innerHTML='Adicionar ao carrinho <span aria-hidden="true">＋</span>',1400);});
document.querySelector('#open-order').addEventListener('click',()=>{renderCart();dialog.showModal();});document.querySelector('#close-order').addEventListener('click',()=>dialog.close());document.querySelector('#cart-items').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const id=b.dataset.plus||b.dataset.minus;const n=cart.get(id)+(b.dataset.plus?1:-1);n>0?cart.set(id,n):cart.delete(id);renderCart();});document.querySelector('#notes').addEventListener('input',updateLink);renderCart();

document.querySelector('#floating-cart').addEventListener('click',()=>{renderCart();dialog.showModal();});
