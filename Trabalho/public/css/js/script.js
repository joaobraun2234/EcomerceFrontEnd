document.addEventListener('DOMContentLoaded', async () => {
    const container = document.querySelector('.row'); // Seleciona a área dos produtos
    const totalElement = document.querySelector('#total-produtos'); // Seleciona o elemento para mostrar o total de produtos

    try {
        // Faz a requisição para a nova API
        const response = await fetch('http://localhost:8080/produto');
        const produtos = await response.json();

        // Filtra para mostrar até 100 produtos, por exemplo
        const produtosLimitados = produtos.slice(0, 100);

        produtosLimitados.forEach(produto => {
            // Cria um card para cada produto
            const card = document.createElement('div');
            card.classList.add('col-md-4', 'mb-4');
            card.innerHTML = `
                <div class="card">
                    <img src="${produto.imagemString}" class="card-img-top" alt="${produto.nome}">
                    <div class="card-body">
                        <h5 class="card-title">${produto.nome}</h5>
                        <p class="card-text">R$ ${produto.preco.toFixed(2)}</p>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });

        // Atualiza o total de produtos exibidos
        totalElement.textContent = `Total de produtos: ${produtosLimitados.length}`;
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
    }
});
