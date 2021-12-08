var express = require('express');
const Post = require('../models/post')
const fs = require('fs');

var postRoute = express.Router();

const {checkAuth, isEmail , checkAdmin} = require('../middleware/index');
const postController = require('../controller/post.controller');
var multer =  require('multer');
const multerConf = require('../config/multer');

var bodyParser = require('body-parser');


postRoute.use(checkAuth);
postRoute.use(checkAdmin);

postRoute.use('/uploads', express.static('uploads'));
var path = require('path');
var pathh = path.resolve(__dirname,'public');
postRoute.use(express.static(pathh));
postRoute.use(bodyParser.urlencoded({extended:false}));


postRoute.get('/allposts', postController.post)
postRoute.get('/new', postController.new)
postRoute.get('/edit/:id', postController.edit)

postRoute.get('/delete/:id', postController.delete)


postRoute.post('/postnew',multerConf.array('image', 2),(req,res)=>{
    imgpath = '/uploads/'+  req.files[0].originalname
    if(req.files.length == 1 && imgpath.endsWith('PNG') ||  imgpath.endsWith('JPEG')){

      var post = new Post({
          Title: req.body.title,
          Content: req.body.content,
          ImageURL :imgpath
          
     
   
      });
      post.save(function(err){
          if(err) throw err;
         
          return res.redirect('/post/allposts');
      });
    }else{
        return res.render('newPost.hbs',{errmess:true});

    }
  })

postRoute.post('/doedit:id',multerConf.array('image', 2),(req,res)=>{
    imgpath = '/uploads/'+  req.files[0].originalname
    if(req.files.length == 1 && imgpath.endsWith('PNG') ||  imgpath.endsWith('JPEG')){

    Post.findByIdAndUpdate({_id:req.params.id},{$set:{
        Title: req.body.title,
         Content: req.body.content,
         
         ImageURL : imgpath,
         
    }},function(err,newPost){
        if(err) throw err;
         
        return res.redirect('/post/allposts');
    });    
}else{
 
    Post.findById({_id:req.params.id},function(err,post){
        if(err) throw err;
        return res.render('editPost.hbs',{post:post, errmess:true});
    });   
}
 }
);

module.exports = postRoute;