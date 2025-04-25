const express = require('express');
const router = express.Router();
const anunciosController = require('../controllers/anunciosController');
const { validateAnuncio } = require('../middlewares/validationMiddleware');

// Rotas para anúncios
router.get('/', anunciosController.getAllAnuncios);
router.get('/:id', anunciosController.getAnuncioById);
router.post('/', validateAnuncio, anunciosController.createAnuncio);
router.put('/:id', validateAnuncio, anunciosController.updateAnuncio);
router.delete('/:id', anunciosController.deleteAnuncio);

module.exports = router;