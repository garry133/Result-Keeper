var express =require("express");
var app=express();
var mongoose=require("mongoose");
var bodyParser =require("body-parser");
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb://localhost/dbms",{ useNewUrlParser: true , useUnifiedTopology: true })
.then(()=> console.log("data base connection succesfull!!! "))
.catch((err)=> console.log(err));
app.use(express.static("public"));
var teacher=mongoose.Schema({
    name: String,
    id:Number,
    password: Number
});
var students=mongoose.Schema({
    name:String,
    id:Number,
    stream:String,
    password:Number
});
var student=mongoose.Schema({
    name:String,
    class:Number,
    rollNumber:Number,
    physics: Number, 
    chemistry: Number,
    maths:Number,
    english: Number,
    physcial: Number,
    computer : Number,
    total: Number,
 });
var results=mongoose.model('results',student);
var teacherm=mongoose.model('teacherm',teacher);
var studentsm=mongoose.model('studentsm',students);
app.get("/",function(req,res){
    res.render("home.ejs");
});
app.get("/admin",function(req,res){
    res.render("admin.ejs");
});
app.get("/showadd",function(req,res){
    res.render("showadmin.ejs");
});
app.get("/slo",function(req,res){
    res.render("slogin.ejs");
});
app.get("/tlo",function(req,res){
    res.render("tlogin.ejs");
});
app.get("/adt",function(req,res){
    res.render("addtec.ejs");
});
app.get("/ads",function(req,res){
    res.render("addstd.ejs");
});
app.get("/ad",function(req,res){
    res.render("add.ejs");
});
app.get("/sh",function(req,res){
    res.render("show.ejs");
});
app.post("/ad",function(req,res){
    results.create(req.body,function(err){
        if(err) res.render("add.ejs");
        else res.render("home.ejs");
    })
});
app.post("/sh",function(req,res){
    results.find({rollNumber:req.body.rollNumber},function(err,ans){
        if(err) res.render("error.ejs",{ans:req.body});
        else if(ans.length==1){
            res.render("results.ejs",{ans:ans});
        }
        else {
           
            res.render("error.ejs",{ans:req.body});
        }
    })
});
app.post("/adt",function(req,res){
    teacherm.create(req.body,function(err){
        if(err) res.render("add.ejs");
        else{
            //alert("succes");
            console.log("success");
            res.render("admin.ejs");
        } 
    })
});
app.post("/ads",function(req,res){
    studentsm.create(req.body,function(err){
        if(err) res.render("add.ejs");
        else{
            //alert("succes");
            res.render("admin.ejs");
        } 
    })
});







app.post("/tl",function(req,res){
    teacherm.find({id:req.body.id,password:req.body.password},function(err,ans){
        console.log(ans.length);
        console.warn(ans);
        if(err) res.render("error.ejs",{ans:req.body});
        else if(ans.length>0){
            res.render("teach.ejs");
        }
        else {
            console.warn(ans);
            res.render("home.ejs");
        }
    })
});
app.post("/sl",function(req,res){
    studentsm.find({id:req.body.id,password:req.body.password},function(err,ans){
        if(err) res.render("error.ejs",{ans:req.body});
        else if(ans.length>0){
            console.log("success");
            res.render("show.ejs");
        }
        else {
            console.log(ans.length);
            res.render("home.ejs");
        }
    })
});
app.post("/sad",function(req,res){
    if(req.body.password=="admin") res.render("admin.ejs");
    else res.render("home.ejs");
});





app.get("*",function(req,res){
    res.render("home.ejs");
})
app.listen(3000,function(){
    console.log("server started!!!");
})