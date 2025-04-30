const pool = require('../config/database');

const getProdutos = async () => {
    try {
        const result = await pool.query(`
            SELECT * 
            FROM produtos
        `);
        console.log('Produtos encontrados:', result.rows); 
        return result.rows;
    } catch (error) {
        console.error('Erro ao buscar produtos:', error); 
        throw error;
    }
};

const getProdutosById = async (id) => {
    try {
        const result = await pool.query(`
            SELECT * 
            FROM produtos
            WHERE id = $1`, [id]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao buscar produto por ID:', error); 
        throw error;
    }
};

const createProdutos = async (nome, categoria, preco, marca_id, foto) => {
    try {
        const query = `
            INSERT INTO produtos (nome, categoria, preco, marca_id, foto)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`;
        const result = await pool.query(query, [nome, categoria, preco, marca_id, foto]);
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao criar produto:', error);
        throw error;
    }
};

const deleteProdutos = async (id) => {
    try {
        const result = await pool.query("DELETE FROM produtos WHERE id = $1 RETURNING *", [id]);

        if (result.rowCount === 0) {
            throw new Error('Produto não encontrado');
        }

        return { message: 'Produto deletado com sucesso' };
    } catch (error) {
        console.error('Erro ao deletar produto:', error);
        throw error;
    }
};

const updateProdutos = async (id, nome, categoria, preco, marca_id, foto) => {
    try {
        const query = `
            UPDATE produtos
            SET nome = $1, categoria = $2, preco = $3, marca_id = $4, foto = COALESCE($5, foto)
            WHERE id = $6
            RETURNING *`;
        const result = await pool.query(query, [nome, categoria, preco, marca_id, foto, id]);

        if (result.rowCount === 0) {
            return null; 
        }

        return result.rows[0];
    } catch (error) {
        console.error('Erro ao atualizar produto no banco de dados:', error); 
        throw error;
    }
};

module.exports = { getProdutos, getProdutosById, createProdutos, deleteProdutos, updateProdutos };