# GHAST — loja demonstrativa

## Abrir corretamente no VS Code (recomendado)
1. Extraia o ZIP inteiro para uma pasta do computador. Não abra o site de dentro do ZIP.
2. No VS Code, use **Arquivo > Abrir Pasta** e selecione a pasta `ghast`.
3. Instale a extensão **Live Server** (Ritwick Dey) na área de Extensões.
4. Abra `index.html`, clique com o botão direito no código e escolha **Open with Live Server**.
5. O projeto está configurado para tentar abrir no Google Chrome. Se abrir no Edge, copie o endereço local exibido (normalmente `http://127.0.0.1:5500`) e cole no Chrome. Você também pode definir o Chrome como navegador padrão do Windows.

Se aparecer erro de página, confirme que o endereço começa com `http://127.0.0.1:5500/` ou `http://localhost:5500/` e que você abriu `index.html` dentro da pasta `ghast`. Não abra `loja.html` diretamente: ele redireciona para a seção Loja da página inicial.

## Ativar o WhatsApp
1. No VS Code, abra `js/whatsapp.js`.
2. Encontre `const WHATSAPP_NUMBER = 'SEU_NUMERO_AQUI';`.
3. Substitua pelo número real da loja com DDI + DDD, usando apenas dígitos. Formato de exemplo fictício: `5541999999999`.
4. Salve com `Ctrl + S`, atualize o site e teste **Comprar pelo WhatsApp** ou **Finalizar pelo WhatsApp**.

O formato brasileiro normalmente começa com `55`, seguido do DDD e do número. Não inclua `+`, espaços, parênteses ou traços. O número precisa ter WhatsApp ativo. Se o campo continuar como `SEU_NUMERO_AQUI`, o site avisará que precisa ser configurado; isso não é um erro do Chrome.

## Personalizar
- Produtos: edite `DEFAULT_PRODUCTS` em `js/products.js`.
- WhatsApp e redes sociais: edite `js/whatsapp.js`.
- Estilo: `css/style.css`.
- Página inicial: `index.html`.
- Painel demonstrativo: `admin/admin.html`.

## O que funciona neste protótipo
Catálogo, pesquisa, filtros, modal de detalhes, carrinho em `localStorage`, cálculo de total, formulário de sugestões, newsletter local e painel administrativo local.

## Limitações
- O botão de compra prepara uma mensagem e abre o WhatsApp; não processa pagamentos.
- Carrinho, sugestões, inscrições e mudanças administrativas ficam somente no navegador atual.
- O painel não tem login nem backend e não é seguro para produção.
- As imagens iniciais são remotas de demonstração; conexão com internet necessária para imagens e fontes externas.


## Navegação de produtos (atualização)
- `loja.html` agora é a página dedicada com o catálogo completo, busca, categorias, filtro de preço, novidades e ordenação.
- Cada card abre `produto.html?id=...`, a página individual do produto.
- A página inicial direciona para a loja; os atalhos de roupas e acessórios já abrem a categoria correspondente.
- O catálogo continua usando `js/products.js` e as alterações salvas no `localStorage` (`ghast_products`) feitas pelo protótipo administrativo.
>>>>>>> efd7f84 (Primeira versão da loja Ghast)
