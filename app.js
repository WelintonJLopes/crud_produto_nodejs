const express = require('express');
const productRoutes = require('./routes/productRoutes');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/products', productRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});