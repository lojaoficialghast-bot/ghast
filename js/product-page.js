(() => {
  const escapeHTML = (value) => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const money = value => Number(value || 0).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
  let products = [];
  try { products = JSON.parse(localStorage.getItem('ghast_products')) || DEFAULT_PRODUCTS; } catch { products = DEFAULT_PRODUCTS; }
  const id = new URLSearchParams(location.search).get('id');
  const product = products.find(item => String(item.id) === String(id));
  const root = document.getElementById('productDetail');
  if (!product) {
    root.innerHTML = `<section class="product-not-found"><p class="eyebrow">GHAST · COLEÇÃO</p><h1>Não encontramos esse produto.</h1><p>Ele pode ter sido removido ou o link pode estar incorreto.</p><a href="index.html#loja">Voltar para a loja →</a></section>`;
    return;
  }
  document.title = `${product.name} | GHAST`;
  const sizes = Array.isArray(product.sizes) ? product.sizes : [];
  const sizeField = sizes.length ? `<label for="detailSize">Tamanho</label><select id="detailSize">${sizes.map(size=>`<option value="${escapeHTML(size)}">${escapeHTML(size)}</option>`).join('')}</select>` : '';
  const stock = Number(product.stock || 0);
  root.innerHTML = `<article class="product-detail"><div class="product-detail-image"><img src="${escapeHTML(product.image)}" alt="${escapeHTML(product.name)}" onerror="this.style.display='none'"></div><div class="product-detail-info"><p class="eyebrow">${escapeHTML(product.category || 'Coleção GHAST')}${product.isNew ? ' · Novidade' : ''}</p><h1>${escapeHTML(product.name)}</h1><div class="product-detail-price">${money(product.price)}</div><p class="product-detail-description">${escapeHTML(product.description || 'Uma peça selecionada pela GHAST para acompanhar seu estilo com elegância e simplicidade.')}</p><p class="product-detail-stock">${stock > 0 ? `Disponível · ${stock} unidade(s)` : 'Indisponível no momento'}</p>${sizeField}<label for="detailQty">Quantidade</label><input id="detailQty" type="number" min="1" max="${Math.max(stock,1)}" value="1" ${stock < 1 ? 'disabled' : ''}><div class="product-detail-actions"><button class="btn btn-gold" id="detailBuy" ${stock < 1 ? 'disabled' : ''}>Consultar e comprar pelo WhatsApp　→</button><a class="btn btn-outline" style="color:var(--deep,#062319);border-color:var(--deep,#062319)" href="index.html#loja">Continuar comprando</a></div><p class="product-detail-note">Dúvidas sobre tamanhos, disponibilidade ou entrega? Entre em contato com a GHAST pelo WhatsApp para combinar os detalhes do pedido.</p></div></article>`;
  document.getElementById('detailBuy')?.addEventListener('click', () => {
    const qty = Math.max(1, Math.min(stock, Number(document.getElementById('detailQty').value) || 1));
    const size = document.getElementById('detailSize')?.value;
    const message = `Olá! Tenho interesse no produto ${product.name} da GHAST.${size ? ` Tamanho: ${size}.` : ''} Quantidade: ${qty}. Valor unitário: ${money(product.price)}. Poderiam me informar sobre disponibilidade, frete e pagamento?`;
    if (typeof openWhatsApp === 'function') openWhatsApp(message);
    else alert('Configure o número do WhatsApp em js/whatsapp.js para habilitar a compra.');
  });
})();
