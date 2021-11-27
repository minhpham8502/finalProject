const ClassModel = require('../models/class')
const AccountModel = require('../models/account')


const { data, param, css } = require('jquery')

var cookie = require('cookie');
const Post = require('../models/post')

class postController{
    
    post(req,res) {
        Post.find({},function(err,posts){
                res.render("allposts.ejs",{posts : posts});
             });
    };
    new(req,res){
    
            return res.render('newPost.ejs');
    }
    edit(req,res){
            Post.findById({_id:req.params.id},function(err,post){
                if(err) throw err;
                return res.render('editPost.hbs',{post:post});
            });    
    }
    delete(req,res){
        Post.findByIdAndDelete({_id:req.params.id},function(err){
            if(err) throw err;
            res.redirect('/post/allposts');
        });
    }
    
}
module.exports = new postController