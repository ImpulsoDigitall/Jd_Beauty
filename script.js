// --- CONFIGURAÇÃO ---
const seuNumeroWhatsApp = "981972062"; 
let slideIndex = 0; 

let todosProdutos = [];
let carrinho = JSON.parse(localStorage.getItem('jd_beauty_cart')) || [];


// --- FUNÇÕES DE INICIALIZAÇÃO E GERAÇÃO DE DADOS ---

function gerarProdutos() {
    const modelosBase = [
        { 
            id: 1, 
            nome: "Perfume JD Exclusive", 
            imagem: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=400&auto=format&fit=crop", 
            descricao: "Uma fragrância sofisticada e marcante, com notas de baunilha e jasmim, perfeita para noites especiais. Conteúdo: 100ml.",
            categoria: "Perfume"
        },
        { 
            id: 2, 
            nome: "Body Splash Pink Summer", 
            imagem: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=400&auto=format&fit=crop",
            descricao: "Leve e refrescante, com aroma de frutas vermelhas e toque cítrico. Ideal para o uso diário no verão. Conteúdo: 250ml.",
            categoria: "Body Splash"
        },
        { 
            id: 3, 
            nome: "Hidratante Corporal JD Gold", 
            imagem: "https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?q=80&w=400&auto=format&fit=crop",
            descricao: "Fórmula de rápida absorção com partículas de brilho dourado e hidratação profunda por 48 horas. Conteúdo: 300g.",
            categoria: "Hidratante"
        },
        { 
            id: 4, 
            nome: "Kit Completo Skin Care", 
            imagem: "https://images.unsplash.com/photo-1556228720-19273297a7cb?q=80&w=400&auto=format&fit=crop",
            descricao: "Tudo o que você precisa para uma rotina de cuidados completa: Sérum, Tônico e Esfoliante. Para todos os tipos de pele.",
            categoria: "Kit"
        },
        { 
            id: 5, 
            nome: "Sérum Facial Revitalizante", 
            imagem: "https://images.unsplash.com/photo-1601049676869-702ea24cfd58?q=80&w=400&auto=format&fit=crop",
            descricao: "Enriquecido com Vitamina C, combate radicais livres e reduz linhas finas, deixando a pele radiante. Conteúdo: 30ml.",
            categoria: "Skin Care"
        },
        { 
            id: 6, 
            nome: "Batom Matte Longa Duração", 
            imagem: "https://images.unsplash.com/photo-1586495777744-4413f2106251?q=80&w=400&auto=format&fit=crop",
            descricao: "Cor intensa e acabamento matte aveludado que dura o dia todo sem ressecar os lábios. Cor: Vermelho Rubi.",
            categoria: "Maquiagem"
        }
    ];

    for (let i = 1; i <= 100; i++) {
        const modelo = modelosBase[i % modelosBase.length];
        const precoAntigo = (Math.random() * (350 - 80) + 80); 
        const descontoPercentual = (Math.random() * (0.5 - 0.1) + 0.1); 
        const precoNovo = parseFloat((precoAntigo * (1 - descontoPercentual)).toFixed(2));
        const desconto = Math.round(descontoPercentual * 100);

        todosProdutos.push({
            id: i,
            nome: `${modelo.nome} - Edição #${i}`, 
            precoAntigo: parseFloat(precoAntigo.toFixed(2)),
            precoNovo: precoNovo,
            imagem: modelo.imagem,
            desconto: desconto,
            descricao: `${modelo.descricao} SKU: ${1000 + i}.`, 
            categoria: modelo.categoria
        });
    }
}

function carregarProdutos(produtosParaExibir = todosProdutos) {
    const container = document.getElementById('grid-produtos');
    container.innerHTML = ''; 

    if (produtosParaExibir.length === 0) {
        container.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; font-size: 1.2rem;">Nenhum produto encontrado. Tente pesquisar por outro termo.</p>';
        return;
    }

    produtosParaExibir.forEach(produto => {
        const html = `
            <div class="product-card">
                <div class="discount-badge">-${produto.desconto}% OFF</div>
                
                <button class="quick-view-btn" onclick="abrirQuickView(${produto.id}); event.stopPropagation();">
                    <i class="fas fa-eye"></i> Detalhes Rápidos
                </button>
                
                <img src="${produto.imagem}" alt="${produto.nome}" class="product-img" loading="lazy">
                <div class="product-info">
                    <div>
                        <h3 class="product-name" title="${produto.nome}">${produto.nome}</h3>
                        <div class="price-container">
                            <span class="old-price">R$ ${produto.precoAntigo.toFixed(2).replace('.', ',')}</span>
                            <span class="new-price">R$ ${produto.precoNovo.toFixed(2).replace('.', ',')}</span>
                        </div>
                    </div>
                    <button class="btn-add-cart" onclick="adicionarAoCarrinho(${produto.id})">
                        <i class="fas fa-cart-plus"></i> ADICIONAR AO CARRINHO
                    </button>
                </div>
            </div>
        `;
        container.innerHTML += html;
    });
}

function init() {
    gerarProdutos();
    carregarProdutos();
    criarOpcoesCategorias();
    atualizarContadorCarrinho();
    criarDots(); 
    mostrarSlides(); 
}


// --- FUNÇÕES DO CARROSSEL ---

function mostrarSlides(n) {
    const slides = document.getElementsByClassName("slide");
    const dots = document.getElementsByClassName("dot");
    
    if (n !== undefined) {
        slideIndex = n;
    } else {
        slideIndex++;
    }
    
    if (slideIndex > slides.length - 1) {slideIndex = 0}
    if (slideIndex < 0) {slideIndex = slides.length - 1}
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active');
    }
    
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove('active');
    }
    
    slides[slideIndex].classList.add('active');
    dots[slideIndex].classList.add('active');
    
    setTimeout(mostrarSlides, 5000); 
}

function criarDots() {
    const slides = document.getElementsByClassName("slide");
    const dotContainer = document.getElementById("dotContainer");
    
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement("span");
        dot.className = "dot";
        dot.onclick = function() {
            mostrarSlides(i); 
        };
        dotContainer.appendChild(dot);
    }
}


// --- FUNÇÕES DE FILTRAGEM E ORDENAÇÃO ---

function criarOpcoesCategorias() {
    // Usa um Set para garantir categorias únicas
    const categorias = new Set(todosProdutos.map(p => p.categoria));
    const select = document.getElementById('category-select');
    
    // Adiciona as opções dinamicamente
    categorias.forEach(categoria => {
        const option = document.createElement('option');
        option.value = categoria;
        option.textContent = categoria;
        select.appendChild(option);
    });
}


function aplicarFiltrosEOrdenacao() {
    const filtro = document.getElementById('category-select').value;
    const ordenacao = document.getElementById('sort-select').value;

    let produtosFiltrados = [...todosProdutos]; // Copia o array base

    // 1. APLICA FILTRAGEM (Categoria)
    if (filtro !== 'all') {
        produtosFiltrados = produtosFiltrados.filter(produto => 
            produto.categoria === filtro
        );
    }
    
    // 2. APLICA ORDENAÇÃO
    produtosFiltrados.sort((a, b) => {
        switch (ordenacao) {
            case 'price-asc':
                return a.precoNovo - b.precoNovo;
            case 'price-desc':
                return b.precoNovo - a.precoNovo;
            case 'name-asc':
                // Ordenação alfabética case-insensitive
                return a.nome.localeCompare(b.nome);
            case 'discount-desc':
                return b.desconto - a.desconto; 
            case 'default':
            default:
                return a.id - b.id; 
        }
    });

    // 3. CARREGA PRODUTOS FILTRADOS E ORDENADOS
    carregarProdutos(produtosFiltrados);
}


// --- FUNÇÕES DE PESQUISA E SCROLL ---

function toggleSearchBar() {
    const searchBar = document.getElementById('searchBar');
    searchBar.classList.toggle('active');
    if (searchBar.classList.contains('active')) {
        document.getElementById('searchInput').focus();
    } else {
        document.getElementById('searchInput').value = '';
        document.getElementById('suggestionsList').style.display = 'none'; 
        filtrarProdutos(); 
    }
}

function rolarParaProdutos() {
    document.getElementById('produtos').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

function handleEnter(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); 
        document.getElementById('suggestionsList').style.display = 'none'; 
        filtrarProdutos(); 
        rolarParaProdutos(); 
    }
}

function mostrarSugestoes(termo) {
    const listaSugestoes = document.getElementById('suggestionsList');
    
    if (termo.length < 2) {
        listaSugestoes.innerHTML = '';
        listaSugestoes.style.display = 'none';
        return;
    }

    const termoLower = termo.toLowerCase();
    
    const sugestoes = todosProdutos
        .filter(produto => produto.nome.toLowerCase().includes(termoLower))
        .slice(0, 5); 

    let html = '';
    sugestoes.forEach(produto => {
        html += `<li class="suggestion-item" onclick="selecionarSugestao('${produto.nome.replace(/'/g, "\\'")}')">${produto.nome}</li>`;
    });

    listaSugestoes.innerHTML = html;
    listaSugestoes.style.display = sugestoes.length > 0 ? 'block' : 'none';
    
    filtrarProdutos(termo); 
}

function selecionarSugestao(nomeProduto) {
    const input = document.getElementById('searchInput');
    input.value = nomeProduto; 
    document.getElementById('suggestionsList').style.display = 'none'; 
    filtrarProdutos(nomeProduto); 
    rolarParaProdutos(); 
}

function filtrarProdutos(termoOverride) {
    const termo = termoOverride ? termoOverride.toLowerCase() : document.getElementById('searchInput').value.toLowerCase();
    
    const produtosFiltrados = todosProdutos.filter(produto => 
        produto.nome.toLowerCase().includes(termo)
    );
    
    // Reseta os dropdowns para 'default' e 'all' ao usar a barra de pesquisa
    document.getElementById('sort-select').value = 'default';
    document.getElementById('category-select').value = 'all';

    carregarProdutos(produtosFiltrados);
}


// --- FUNÇÕES DO QUICK VIEW ---

function abrirQuickView(produtoId) {
    const produto = todosProdutos.find(p => p.id === produtoId);
    if (!produto) return;
    
    document.getElementById('qvImage').src = produto.imagem;
    document.getElementById('qvName').innerText = produto.nome;
    document.getElementById('qvOldPrice').innerText = `R$ ${produto.precoAntigo.toFixed(2).replace('.', ',')}`;
    document.getElementById('qvNewPrice').innerText = `R$ ${produto.precoNovo.toFixed(2).replace('.', ',')}`;
    document.getElementById('qvDescription').innerText = produto.descricao;
    
    document.getElementById('qvAddToCartBtn').onclick = function() {
        adicionarAoCarrinho(produto.id);
        fecharQuickView();
    };

    document.getElementById('quickViewModal').style.display = 'flex';
}

function fecharQuickView() {
    document.getElementById('quickViewModal').style.display = 'none';
}


// --- FUNÇÕES DO CARRINHO ---

function atualizarContadorCarrinho() {
    const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
    document.getElementById('cartCount').innerText = totalItens;
}

function adicionarAoCarrinho(produtoId) {
    const produtoExistente = carrinho.find(item => item.id === produtoId);
    const produtoBase = todosProdutos.find(p => p.id === produtoId);

    if (!produtoBase) return;

    if (produtoExistente) {
        produtoExistente.quantidade += 1;
    } else {
        carrinho.push({ ...produtoBase, quantidade: 1 });
    }

    localStorage.setItem('jd_beauty_cart', JSON.stringify(carrinho));
    atualizarContadorCarrinho();
    
    renderizarCarrinho();
    document.getElementById('cartModal').style.display = 'flex';
}

function removerItemDoCarrinho(produtoId) {
    // Mantém no carrinho apenas os itens cujo ID não corresponde ao produto a ser removido
    carrinho = carrinho.filter(item => item.id !== produtoId);

    // Salva a nova lista no Local Storage
    localStorage.setItem('jd_beauty_cart', JSON.stringify(carrinho));
    
    // Atualiza a interface
    atualizarContadorCarrinho();
    renderizarCarrinho();
}

function renderizarCarrinho() {
    const container = document.getElementById('cartItemsContainer');
    const totalDisplay = document.getElementById('cartTotal');
    let totalGeral = 0;
    let html = '';

    if (carrinho.length === 0) {
        html = '<p style="text-align: center; margin: 20px 0;">Seu carrinho está vazio!</p>';
        totalDisplay.innerHTML = 'Total: R$ 0,00';
        container.innerHTML = html;
        return;
    }

    carrinho.forEach((item) => {
        const subtotal = item.precoNovo * item.quantidade;
        totalGeral += subtotal;

        html += `
            <div class="cart-item">
                <span class="cart-item-name">${item.quantidade}x ${item.nome}</span>
                <span class="cart-item-price">R$ ${subtotal.toFixed(2).replace('.', ',')}
                    <button class="remove-item-btn" onclick="removerItemDoCarrinho(${item.id})">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </span>
            </div>
        `;
    });

    container.innerHTML = html;
    totalDisplay.innerHTML = `Total: R$ ${totalGeral.toFixed(2).replace('.', ',')}`;
}

function abrirCarrinho() {
    renderizarCarrinho();
    document.getElementById('cartModal').style.display = 'flex';
}

function fecharCarrinho() {
    document.getElementById('cartModal').style.display = 'none';
}

function finalizarPedidoWhatsApp() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let totalGeral = 0;
    let listaItens = '';

    carrinho.forEach(item => {
        const subtotal = item.precoNovo * item.quantidade;
        totalGeral += subtotal;
        listaItens += `${item.quantidade}x ${item.nome} (R$ ${item.precoNovo.toFixed(2).replace('.', ',')})\n`;
    });

    const mensagem = `Olá, JD Beauty! Gostaria de finalizar meu pedido:\n\n` + 
                     `*ITENS:*\n${listaItens}\n` +
                     `*TOTAL: R$ ${totalGeral.toFixed(2).replace('.', ',')}*\n\n` +
                     `Aguardando instruções para pagamento e entrega!`;

    const url = `https://wa.me/${seuNumeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
    
    carrinho = [];
    localStorage.setItem('jd_beauty_cart', JSON.stringify(carrinho));
    atualizarContadorCarrinho();
    fecharCarrinho();
}


// --- EVENTOS GLOBAIS ---

init();

// Fecha modais e sugestões ao clicar fora
window.onclick = function(event) {
    if (!event.target.matches('#searchInput') && !event.target.matches('.suggestion-item')) {
        document.getElementById('suggestionsList').style.display = 'none';
    }
    
    if (event.target == document.getElementById('cartModal')) {
        fecharCarrinho();
    }
    if (event.target == document.getElementById('quickViewModal')) {
        fecharQuickView();
    }

}

