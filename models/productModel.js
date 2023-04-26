const db = require('../config/database');

class Product {
    static async findAll() {
        const { rows } = await db.query('SELECT * FROM products');

        if (rows.length > 0) {
            return rows;
        } else {
            const snapshot = await db.firebase.database().ref('products').once('value');
            const products = snapshot.val();
            return Object.keys(products).map(key => ({ id: key, ...products[key] }));
        }
    }

    static async findById(id) {
        const { rows } = await db.query('SELECT * FROM products WHERE id = $1', [id]);

        if (rows.length > 0) {
            return rows[0];
        } else {
            const snapshot = await db.firebase.database().ref('/products').orderByChild('id').equalTo(parseInt(id)).once('value');
            const product = snapshot.val();

            if (product) {
                return product;
            } else {
                throw new Error(`Product with id ${id} not found`);
            }
        }
    }

    static async create(name, description) {
        const { rows } = await db.query('INSERT INTO products (name, description) VALUES ($1, $2) RETURNING *', [
            name,
            description,
        ]);

        const firebaseRef = db.firebase.database().ref('products');
        await firebaseRef.push({
            id: rows[0].id,
            name: rows[0].name,
            description: rows[0].description
        });

        return rows[0];
    }

    static async update(id, name, description) {
        const { rows } = await db.query('UPDATE products SET name = $1, description = $2 WHERE id = $3 RETURNING *', [
            name,
            description,
            id,
        ]);

        const snapshot = await db.firebase.database().ref('/products').orderByChild('id').equalTo(parseInt(id)).once('value');
        const product = snapshot.val();
        const key = Object.keys(product)[0]
        const updates = {};
        updates[`/products/${key}/name`] = name;
        updates[`/products/${key}/description`] = description;

        await db.firebase.database().ref().update(updates);

        return rows[0];
    }

    static async delete(id) {
        const { rowCount } = await db.query('DELETE FROM products WHERE id = $1', [id]);

        const snapshot = await db.firebase.database().ref('/products').orderByChild('id').equalTo(parseInt(id)).once('value');
        const product = snapshot.val();
        const key = Object.keys(product)[0]
        const productRef = db.firebase.database().ref('products').child(key);
        await productRef.remove();

        return rowCount;
    }
}

module.exports = Product;