const mysql = require('mysql2/promise');

// Configurações de conexão com o banco de dados
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'minhas_skins',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Testar conexão ao inicializar
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
    connection.release();
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error.message);
  }
})();

module.exports = pool;