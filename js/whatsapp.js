/* CONFIGURAÇÃO DA GHAST
 * Coloque o telefone da loja com DDI + DDD, somente números.
 * Exemplo fictício do formato brasileiro: 5541999999999
 * Não use espaços, +, parênteses ou traços.
 */
const WHATSAPP_NUMBER = 'SEU_NUMERO_AQUI';
const SOCIAL_LINKS = {
  instagram: 'https://instagram.com/SEU_PERFIL_AQUI',
  tiktok: 'https://tiktok.com/@SEU_PERFIL_AQUI',
  whatsapp: '' // será preenchido automaticamente se o número estiver configurado
};

function getWhatsAppUrl(message = 'Olá! Vim pelo site da GHAST e gostaria de saber mais.') {
  const number = String(WHATSAPP_NUMBER || '').replace(/\D/g, '');
  if (!number || number === 'SEUNUMEROAQUI') {
    if (typeof showToast === 'function') {
      showToast('WhatsApp ainda não configurado. Edite WHATSAPP_NUMBER em js/whatsapp.js.');
    } else {
      alert('WhatsApp ainda não configurado. Abra js/whatsapp.js e informe o número com DDI + DDD, somente números.');
    }
    return null;
  }
  if (number.length < 12 || number.length > 13) {
    if (typeof showToast === 'function') showToast('Confira o número do WhatsApp: use DDI + DDD + número.');
    else alert('Confira o número do WhatsApp: use DDI + DDD + número, somente números.');
    return null;
  }
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

function openWhatsApp(message) {
  const url = getWhatsAppUrl(message);
  if (!url) return;
  // Abrir diretamente durante o clique do usuário evita bloqueadores de pop-up.
  const tab = window.open(url, '_blank');
  if (!tab) window.location.href = url;
}

// Disponibiliza o WhatsApp da loja nos links do rodapé quando o número estiver definido.
(function configureWhatsAppSocialLink() {
  const number = String(WHATSAPP_NUMBER || '').replace(/\D/g, '');
  if (number && number !== 'SEUNUMEROAQUI' && number.length >= 12 && number.length <= 13) {
    SOCIAL_LINKS.whatsapp = `https://wa.me/${number}`;
  }
})();
