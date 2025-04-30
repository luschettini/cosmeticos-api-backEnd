const marcasModel = require('../models/marcasModel');
const pool = require('../config/database');

const getAllMarcas = async (req, res) => {
    try {
        const { nome } = req.query; 
        const marcas = await marcasModel.getMarcas(nome); 
        res.json(marcas);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar marcas' });
    }
};

const getMarcas = async (req, res) => {
    try {
        const marcas = await marcasModel.getMarcasById(req.params.id);
        if (!marcas) {
            return res.status(404).json({ error: 'Marca não encontrada' });
        }
        res.json(marcas);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar marca' });
    }
};

const createMarcas = async (req, res) => {
    try {
        const { nome, pais } = req.body;
        console.log('Dados recebidos para criar marca:', { nome, pais }); 

        if (!nome || !pais) {
            return res.status(400).json({ error: 'Nome e país são obrigatórios' });
        }

        const result = await pool.query(`
            INSERT INTO marcas (nome, pais) 
            VALUES ($1, $2) RETURNING *
        `, [nome, pais]);

        console.log('Marca criada:', result.rows[0]); 
        res.status(201).json(result.rows[0]); 
    } catch (error) {
        console.error('Erro ao criar marca no banco de dados:', error); 
        res.status(500).json({ error: 'Erro ao criar marca' });
    }
};

const deleteMarcas = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await marcasModel.deleteMarca(id);

        if (!result) {
            return res.status(404).json({ error: "Marca não encontrada" });
        }

        res.json({ message: "Marca deletada com sucesso" });
    } catch (error) {
        console.error("Erro ao deletar marca:", error);
        res.status(500).json({ error: "Erro ao deletar marca" });
    }
};


const updateMarcas = async (req, res) => {
    try {
        const { nome, pais } = req.body;
        console.log('Dados recebidos para atualizar marca:', { nome, pais }); 

        if (!nome || !pais) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        }

        const marca = await marcasModel.updateMarcas(req.params.id, nome, pais);

        if (!marca) {
            console.log('Marca não encontrada para o ID:', req.params.id); 
            return res.status(404).json({ error: 'Marca não encontrada' });
        }

        console.log('Marca atualizada com sucesso:', marca); 
    } catch (error) {
        console.error('Erro ao atualizar marca:', error); 
        res.status(500).json({ error: 'Erro ao atualizar marca' });
    }
};

module.exports = { getAllMarcas, getMarcas, createMarcas, deleteMarcas, updateMarcas };