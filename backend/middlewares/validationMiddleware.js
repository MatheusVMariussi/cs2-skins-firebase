const validateAnuncio = (req, res, next) => {
    const { nome_skin, arma, raridade, valor, floatSkin, imagem_url, vendedor } = req.body;
    const errors = [];
  
    // Validação dos campos obrigatórios
    if (!nome_skin || nome_skin.trim() === '') {
      errors.push('Nome da skin é obrigatório');
    }
  
    if (!arma || arma.trim() === '') {
      errors.push('Arma é obrigatória');
    }
  
    if (!raridade || raridade.trim() === '') {
      errors.push('Raridade é obrigatória');
    }
  
    if (!valor || isNaN(valor) || parseFloat(valor) <= 0) {
      errors.push('Valor deve ser um número positivo');
    }
  
    if (!floatSkin || isNaN(floatSkin) || parseFloat(floatSkin) < 0 || parseFloat(floatSkin) > 1) {
      errors.push('Float deve ser um número entre 0 e 1');
    }
  
    if (!imagem_url || imagem_url.trim() === '') {
      errors.push('URL da imagem é obrigatória');
    }
  
    if (!vendedor || vendedor.trim() === '') {
      errors.push('Nome do vendedor é obrigatório');
    }
  
    // Se houver erros, retornar mensagem de erro
    if (errors.length > 0) {
      return res.status(400).json({ message: 'Dados inválidos', errors });
    }
  
    // Se tudo estiver ok, prosseguir para o próximo middleware ou controlador
    next();
  };
  
  module.exports = {
    validateAnuncio
  };