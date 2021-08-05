var express = require('express');
var router = express.Router();
const {check,validationResult} = require('express-validator')
const DataBase = require("monk")("localhost:27017/ARTDataBase")
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('Blog');
});

/* GET home page. */
router.get('/add', function(req, res, next) {
    res.render('BlogAdd');
  });

router.post('/add',[
    check("blogname","Please input  blogname").not().isEmpty(),  
    check("blogdetail","Please input  blogsdetail").not().isEmpty(),
    check("blogauthor","Please input  blogauthor").not().isEmpty(),
], function(req, res, next) {
    const result = validationResult(req);
    console.log('result :>> ', result);
    const errors = result.errors;
    if(!result.isEmpty()){
        res.render('BlogAdd', { errors: errors });
    }else{
        var collection = DataBase.get("Blog")
        collection.insert({
            blogname: req.body.blogname,
            blogdetail: req.body.blogdetail,
            blogauthor: req.body.blogauthor,
        })
    }

  });
  
  

module.exports = router;
