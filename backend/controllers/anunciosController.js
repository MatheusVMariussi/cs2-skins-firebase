const db = require('../config/db');

// Listar todos os anúncios (com opção de filtros e paginação)
const getAllAnuncios = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const offset = (page - 1) * limit;
    
    // Condições de filtro
    const conditions = [];
    const params = [];
    
    if (req.query.arma && req.query.arma !== '') {
      conditions.push('arma = ?');
      params.push(req.query.arma);
    }
    
    if (req.query.raridade && req.query.raridade !== '') {
      conditions.push('raridade = ?');
      params.push(req.query.raridade);
    }
    
    if (req.query.minPrice && req.query.minPrice !== '') {
      conditions.push('valor >= ?');
      params.push(parseFloat(req.query.minPrice));
    }
    
    if (req.query.maxPrice && req.query.maxPrice !== '') {
      conditions.push('valor <= ?');
      params.push(parseFloat(req.query.maxPrice));
    }
    
    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
    
    // Consultar total de registros (para paginação)
    const [countResult] = await db.query(
      `SELECT COUNT(*) as total FROM anuncios ${whereClause}`,
      params
    );
    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);
    
    // Consultar registros com paginação
    const countParams = [...params];
    params.push(offset, limit);
    
    const [anuncios] = await db.query(
      `SELECT * FROM anuncios ${whereClause} ORDER BY data_anuncio DESC LIMIT ?, ?`,
      params
    );
    
    res.status(200).json({
      anuncios,
      page,
      limit,
      total,
      totalPages
    });
  } catch (error) {
    console.error('Erro ao listar anúncios:', error);
    res.status(500).json({ message: 'Erro ao listar anúncios' });
  }
};

// Buscar um anúncio pelo ID
const getAnuncioById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const [anuncio] = await db.query(
      'SELECT * FROM anuncios WHERE id = ?',
      [id]
    );
    
    if (anuncio.length === 0) {
      return res.status(404).json({ message: 'Anúncio não encontrado' });
    }
    
    res.status(200).json(anuncio[0]);
  } catch (error) {
    console.error('Erro ao buscar anúncio:', error);
    res.status(500).json({ message: 'Erro ao buscar anúncio' });
  }
};

// Criar um novo anúncio
const createAnuncio = async (req, res) => {
  try {
    const { 
      nome_skin, 
      arma, 
      raridade, 
      valor, 
      floatSkin, 
      descricao, 
      imagem_url, 
      vendedor 
    } = req.body;
    
    const [result] = await db.query(
      `INSERT INTO anuncios 
       (nome_skin, arma, raridade, valor, floatSkin, descricao, imagem_url, vendedor) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [nome_skin, arma, raridade, valor, floatSkin, descricao, imagem_url, vendedor]
    );
    
    if (result.affectedRows === 0) {
      return res.status(400).json({ message: 'Falha ao criar anúncio' });
    }
    
    res.status(201).json({ 
      message: 'Anúncio criado com sucesso',
      id: result.insertId
    });
  } catch (error) {
    console.error('Erro ao criar anúncio:', error);
    res.status(500).json({ message: 'Erro ao criar anúncio' });
  }
};

// Atualizar um anúncio existente
const updateAnuncio = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      nome_skin, 
      arma, 
      raridade, 
      valor, 
      floatSkin, 
      descricao, 
      imagem_url, 
      vendedor 
    } = req.body;
    
    // Verificar se o anúncio existe
    const [anuncioExistente] = await db.query(
      'SELECT id FROM anuncios WHERE id = ?',
      [id]
    );
    
    if (anuncioExistente.length === 0) {
      return res.status(404).json({ message: 'Anúncio não encontrado' });
    }
    
    const [result] = await db.query(
      `UPDATE anuncios SET 
       nome_skin = ?, 
       arma = ?, 
       raridade = ?, 
       valor = ?, 
       floatSkin = ?, 
       descricao = ?, 
       imagem_url = ?, 
       vendedor = ? 
       WHERE id = ?`,
      [nome_skin, arma, raridade, valor, floatSkin, descricao, imagem_url, vendedor, id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(400).json({ message: 'Falha ao atualizar anúncio' });
    }
    
    res.status(200).json({ message: 'Anúncio atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar anúncio:', error);
    res.status(500).json({ message: 'Erro ao atualizar anúncio' });
  }
};

// Excluir um anúncio
const deleteAnuncio = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Verificar se o anúncio existe
    const [anuncioExistente] = await db.query(
      'SELECT id FROM anuncios WHERE id = ?',
      [id]
    );
    
    if (anuncioExistente.length === 0) {
      return res.status(404).json({ message: 'Anúncio não encontrado' });
    }
    
    const [result] = await db.query(
      'DELETE FROM anuncios WHERE id = ?',
      [id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(400).json({ message: 'Falha ao excluir anúncio' });
    }
    
    res.status(200).json({ message: 'Anúncio excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir anúncio:', error);
    res.status(500).json({ message: 'Erro ao excluir anúncio' });
  }
};

module.exports = {
  getAllAnuncios,
  getAnuncioById,
  createAnuncio,
  updateAnuncio,
  deleteAnuncio
};