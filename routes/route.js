const express = require('express');
const router = express.Router()

const musicController = require('../controllers/musicController')

const validator = require('../middlewares/validator');



router.post('/music',validator.checkmusic,musicController.Music)

router.get('/getAllMusic',musicController.getAllMusics)

router.get('/getMusic',musicController.getMusics)
router.get('/getMusic',musicController.playAllMusics)





module.exports = router
