const db = require('../config/database');

class Product {
    static async findAll() {
        const { rows } = await db.query('SELECT * FROM products');
        return rows;
    }

    static async findById(id) {
        const { rows } = await db.query('SELECT * FROM products WHERE id = $1', [id]);
        return rows[0];
    }

    static async create(name, description) {
        const { rows } = await db.query('INSERT INTO products (name, description) VALUES ($1, $2) RETURNING *', [
            name,
            description,
        ]);
        return rows[0];
    }

    static async update(id, name, description) {
        const { rows } = await db.query('UPDATE products SET name = $1, description = $2 WHERE id = $3 RETURNING *', [
            name,
            description,
            id,
        ]);
        return rows[0];
    }

    static async delete(id) {
        const { rowCount } = await db.query('DELETE FROM products WHERE id = $1', [id]);
        return rowCount;
    }
}

module.exports = Product;