function atualizarProdutos() {
    console.log("Carregando produtos...");
    const select = document.getElementById("ordenar");
    const criterio = select.value.split("-");

    const sortBy = criterio[0];
    const order = criterio[1];

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

            data.forEach(produto => {
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

            document.getElementById('total-produtos').innerText = `Total de produtos: ${data.length}`;
        })
        .catch(error => {
            console.error("Erro ao atualizar produtos:", error);
        });
}

function filtrarProdutos() {
    const searchTerm = document.getElementById("search").value.toLowerCase();
    const produtos = document.querySelectorAll(".produto");

    produtos.forEach(produto => {
        const nome = produto.querySelector("h3").textContent.toLowerCase();

        if (nome.includes(searchTerm)) {
            produto.style.display = "";
        } else {
            produto.style.display = "none";
        }
    });
}
