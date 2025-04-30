const pool = require('../config/database');

const getMarcas = async () => {
        const result = await pool.query(`
            SELECT * 
            FROM marcas
        `);
        return result.rows;
};

const getMarcasById = async (id) => {
        const result = await pool.query(
            `SELECT * 
            FROM marcas
            WHERE id = $1`, [id]
        );
        return result.rows[0];
    };

const createMarcas = async (nome, pais) => {
        const result = await pool.query(`INSERT INTO marcas (nome, pais) 
            VALUES ($1, $2) RETURNING *`, [nome, pais]
        );
        return result.rows[0];
};


const updateMarcas = async (id, nome, pais) => {
        const result = await pool.query(`
            UPDATE marcas
            SET nome = $1, pais = $2
            WHERE id = $3
            RETURNING *
        `, [nome, pais, id]);

        if (result.rowCount === 0) {
            return null; 
        }
        return result.rows[0];
};

const deleteMarcas = async (id) => {
    const result = await pool.query("DELETE FROM marcas WHERE id = $1 RETURNING *", [id]);

    if (result.rowCount === 0) {
        return null; 
    }

    return result.rows[0]; 
};


module.exports = { getMarcas, getMarcasById, createMarcas, updateMarcas, deleteMarcas };