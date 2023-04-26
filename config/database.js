const { Pool } = require('pg');
const admin = require('firebase-admin');

// Configuração do banco PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'db_products',
    password: 'admin',
    port: 5432,
});

// Configuração do banco Firebase
const serviceAccount = require('../../dbproductsf-firebase-adminsdk-mi1ne-ee1428b1ad.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://dbproductsf-default-rtdb.firebaseio.com/"
});

module.exports = {
    query: (text, params) => pool.query(text, params),
    firebase: admin
};
