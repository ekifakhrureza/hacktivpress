var express = require('express');
var router = express.Router();

const { getAll,getOne,add,update,remove } = require('../controllers/article.controller')

/* GET users listing. */
router.get('/',getAll)
router.get('/:id',getOne)
router.post('/add',add)
router.put('/update/:id',update)
router.delete('/delete/:id',remove)

module.exports = router;
