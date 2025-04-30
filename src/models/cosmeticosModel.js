const pool = require('../config/database');

const getProdutos = async () => {
    try {
        const result = await pool.query(`
            SELECT * 
            FROM produtos
        `);
        console.log('Produtos encontrados:', result.rows); 
        return result.rows; // Retorna os produtos
    } catch (error) {
        console.error('Erro ao buscar produtos:', error); 
        throw error;
    }
};


const getProdutosById = async (id) => {
    const result = await pool.query("SELECT * FROM produtos WHERE id = $1", [id]);
    return result.rows[0];
};

const createProdutos = async (nome, categoria, preco, marca_id, foto) => {
    const result = await pool.query("INSERT INTO produtos (nome, categoria, preco, marca_id, foto) VALUES ($1, $2, $3, $4) RETURNING *", [nome, categoria, preco, marca_id, foto]
    );
    return result.rows[0];
};

const deleteProdutos = async (id) => {
    const result = await pool.query("DELETE FROM produtos WHERE id = $1 RETURNING *", [id]);

    if (result.rowCount === 0) {
        throw new Error('Produto não encontrado');
    }

    return { message: 'Produto deletado com sucesso' };
}

const updateProdutos = async (id, nome, categoria, preco, marca_id) => {
    try {
        const result = await pool.query(`
            UPDATE produtos
            SET nome = $1, categoria = $2, preco = $3, marca_id = $4
            WHERE id = $5
            RETURNING *
        `, [nome, categoria, preco, marca_id, id]);

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