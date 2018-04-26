var express = require('express');
var router = express.Router();

const { getAll,getOne,add,update,remove,getByCat,getByAuthor } = require('../controllers/article.controller')
const { auth } = require('../middlewares/auth')
/* GET users listing. */
router.get('/',getAll)
router.get('/:id',getOne)
router.get('/category/:category',getByCat)
router.get('/author/:author',getByAuthor)
router.post('/add',auth,add)
router.put('/update/:id',auth,update)
router.delete('/delete/:id',auth,remove)

module.exports = router;
