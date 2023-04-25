const Product = require('../models/productModel');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500)
            .json({ message: 'Internal server error' });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            res.status(404).json({ message: 'Produto não encontrato' });
        } else {
            res.json(product);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const { name, description } = req.body;
        const product = await Product.create(name, description);
        res.status(201).json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const product = await Product.update(id, name, description);
        if (!product) {
            res.status(404).json({ message: 'Produto não encontrato' });
        } else {
            res.json(product);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const rowCount = await Product.delete(id);
        if (rowCount === 0) {
            res.status(404).json({ message: 'Produto não encontrato' });
        } else {
            res.status(204).end();
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};