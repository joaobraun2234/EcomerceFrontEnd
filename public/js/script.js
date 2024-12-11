document.addEventListener("DOMContentLoaded", function() {
    atualizarProdutos(); 
});

function atualizarProdutos() {
    console.log("Carregando produtos...");

    
    const select = document.getElementById("ordenar");
    const criterio = select.value.split("-");
    const sortBy = criterio[0];
    const order = criterio[1];

    
    const searchTerm = document.getElementById("search").value.toLowerCase();

    fetch(`http://localhost:8080/produto?sortBy=${sortBy}&order=${order}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao carregar produtos");
            }
            return response.json();
        })
        .then(data => {
            const produtosContainer = document.getElementById('produtos-container');
            produtosContainer.innerHTML = '';

           
            const produtosFiltrados = data.filter(produto => {
                const nome = produto.nome.toLowerCase();
                return nome.includes(searchTerm);
            });

            
            produtosFiltrados.forEach(produto => {
                const produtoDiv = document.createElement('div');
                produtoDiv.classList.add('produto');

                produtoDiv.innerHTML = `
                    <img src="${produto.imagemString}" alt="${produto.nome}">
                    <h3>${produto.nome}</h3>
                    <p>${produto.descricao}</p>
                    <span>R$ ${produto.preco.toFixed(2)}</span>
                `;
                produtosContainer.appendChild(produtoDiv);
            });

            
            document.getElementById('total-produtos').innerText = `Total de produtos: ${produtosFiltrados.length}`;
        })
        .catch(error => {
            console.error("Erro ao atualizar produtos:", error);
        });
}

function filtrarProdutos() {
    
    atualizarProdutos();
}

