const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', async (req, res) => {
    try {
        // Mudando a URL para a nova API
        const response = await axios.get('http://localhost:8080/produto');
        
        // Pegando os primeiros 100 produtos da nova API
        const produtos = response.data.slice(0, 100).map(produto => ({
            title: produto.nome, // Usando o campo "nome" da API
            thumbnailUrl: produto.imagemString, // Usando o campo "imagemString" da API
            price: produto.preco ? `R$ ${produto.preco.toFixed(2)}` : 'R$ 0,00' // Formatando preço
        }));
        
        res.render('index', { produtos });
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        res.render('index', { produtos: [] }); // Renderiza sem produtos em caso de erro
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
