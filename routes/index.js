var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res) {
   var filedup =[];
   fs.readdir("./uploads", {withFileTypes:true} ,function(err, files){
      files.forEach(function(dirent){
         //  console.log(dirent.name)
         filedup.push({name:dirent.name, folderhaikya:dirent.isDirectory()})
      })
    res.render('index' ,{files:filedup}); 
    // her filedup is the array of the  object 
   })
  
});


router.get('/createfile' , function(req, res){
   fs.writeFile(`./uploads/${req.query.filename}`,"" , function(err){
      if(err){
         console.log(err);
      }
      else{
         res.redirect('/')
      }
   })
})

router.get("/createfolder",function(req,res){
   fs.mkdir(`./uploads/${req.query.foldername}`,function(err){
      if(err){
         console.log(err);
      }
      else{
         res.redirect('/')
      }
   })
})


router.get("/files/:name",function(req,res){
   var filedup =[];
   fs.readdir("./uploads", {withFileTypes:true} ,function(err, files){
      files.forEach(function(dirent){
         //  console.log(dirent.name)
         filedup.push({name:dirent.name, folderhaikya:dirent.isDirectory()})
      })
      var name = req.params.name;
      fs.readFile(`./uploads/${name}`,"utf8",function(err,data){
         res.render('fileopen' ,{files:filedup, name:req.params.name, filedata:data}); 
      })
   
    // her filedup is the array of the  object 
   })
})


router.get("/deletefile/:file", function(req,res){
   fs.unlink(`./uploads/${req.params.file}`, function(err){
      res.redirect("/");
   })
})
router.get("/deletefolder/:folder", function(req,res){
   fs.rmdir(`./uploads/${req.params.folder}`, function(err){
      res.redirect("/");
   })
})


router.post("/savefile/:filename", function(req,res){
   fs.writeFile(`./uploads/${req.params.filename}`,req.body.filedata,function(err){
      if(err) throw err;
      res.redirect('/')
   })
})

// router.get("/files/:name",function(req,res){
//    var name = req.params.name;
//    fs.readFile(`./uploads/${name}`,"utf8",function(err,data){
//       // res.redirect('/')
//       // console.log(data)
//       // res.send("asdf")
//       // res.send(req.params)
//       res.render("index",{data})
//    })
// })

// fs.get("/file/:filename",)

module.exports = router;
