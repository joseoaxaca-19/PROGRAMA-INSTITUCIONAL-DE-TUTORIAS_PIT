require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3000,
    db: {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT || 5432,
    },
    jwtSecret: process.env.JWT_SECRET || 'fallback_secret_key_change_me',
};
