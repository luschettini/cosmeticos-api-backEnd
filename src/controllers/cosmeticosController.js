const pool = require('../config/database'); 
const produtosModel = require('../models/cosmeticosModel');

const getAllProdutos = async (req, res) => {
    const { nome, marca, preco_min } = req.query;

    let query = `SELECT * FROM produtos WHERE 1=1`;
    const params = [];
    if (nome) {
        params.push(`%${nome}%`);
        query += ` AND nome ILIKE $${params.length}`;
    }
    if (marca) {
        params.push(`%${marca}%`);
        query += ` AND marca ILIKE $${params.length}`;
    }
    if (preco_min) {
        params.push(preco_min);
        query += ` AND preco >= $${params.length}`;
    }

    try {
        const resultado = await pool.query(query, params);
        res.json(resultado.rows); 
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        res.status(500).json({ error: 'Erro ao buscar produtos' });
    }
};

const getProdutos = async (req, res) => {
    try {
        const produtos = await produtosModel.getProdutosById(req.params.id);
        if (!produtos) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }
        res.json(produtos);
    } catch (error) {
        console.error('Erro ao buscar produto por ID:', error);
        res.status(500).json({ error: 'Erro ao buscar produto' });
    }
};

const createProdutos = async (req, res) => {
    try {
        const { nome, categoria, preco, marca_id } = req.body;
        const foto = req.file ? req.file.filename : null;
        const produtos = await produtosModel.createProdutos(nome, categoria, preco, marca_id, foto); 
        res.status(201).json(produtos);
    } catch (error) {
        console.error('Erro ao criar produto:', error);
        res.status(500).json({ error: 'Erro ao criar produto' });
    }
};

const deleteProdutos = async (req, res) => {
    try {
        const message = await produtosModel.deleteProdutos(req.params.id);
        if (!message) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }
        res.json({ message: 'Produto deletado com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar produto:', error);
        res.status(500).json({ error: 'Erro ao deletar produto' });
    }
};

const updateProdutos = async (req, res) => {
    try {
        const { nome, categoria, preco, marca_id } = req.body;
        const foto = req.file ? req.file.filename : null; // Verifica se há uma nova foto

        console.log("Dados recebidos para atualizar produto:", { nome, categoria, preco, marca_id, foto });

        if (!nome || !categoria || !preco || !marca_id) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios" });
        }

        const produto = await produtosModel.updateProdutos(req.params.id, nome, categoria, preco, marca_id, foto);

        if (!produto) {
            return res.status(404).json({ error: "Produto não encontrado" });
        }

        res.json(produto);
    } catch (error) {
        console.error("Erro ao atualizar produto:", error);
        res.status(500).json({ error: "Erro ao atualizar produto" });
    }
};

module.exports = { getAllProdutos, getProdutos, createProdutos, deleteProdutos, updateProdutos };