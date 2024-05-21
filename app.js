const  express = require('express')
const path=require('path')
const app = express();
app.use(express.static('public'));


app.listen(8080,function(){
    console.log('listening on 8080')
});


// get 명령어
// 누군가가 '/'주소를 요청하면 /.html 화면을 띄워주자

app.get('/',function(req, res){
    res.sendFile(path.join(__dirname,"html",'index.html'))
});

app.get('/index',function(req, res){
    res.sendFile(path.join(__dirname,"html",'index.html'))
});
app.get('/login',function(req, res){
    res.sendFile(path.join(__dirname,"html",'login.html'))
});

app.get('/forgotpassword',function(req, res){
    res.sendFile(path.join(__dirname,"html",'forgot-password.html'))
});

app.get('/contact',function(req, res){
    res.sendFile(path.join(__dirname,"html",'Contact.html'))
});

app.get('/blank',function(req, res){
    res.sendFile(path.join(__dirname,"html",'blank.html'))
});

app.get('/InfoTechWrLearn',function(req, res){
    res.sendFile(path.join(__dirname,"html",'InfoTechWrLearn.html'))
});

app.get('/InfoTechPrLearn',function(req, res){
    res.sendFile(path.join(__dirname,"html",'InfoTechPrLearn.html'))
});

app.get('/InfoTechWrTest',function(req, res){
    res.sendFile(path.join(__dirname,"html",'InfoTechWrTest.html'))
});

app.get('/InfoTechPrTest',function(req, res){
    res.sendFile(path.join(__dirname,"html",'InfoTechPrTest.html'))
});

app.get('/InfoIEngineerWrLearn',function(req, res){
    res.sendFile(path.join(__dirname,"html",'InfoIEngineerWrLearn.html'))
});

app.get('/InfoIEngineerPrLearn',function(req, res){
    res.sendFile(path.join(__dirname,"html",'InfoIEngineerPrLearn.html'))
});

app.get('/InfoIEngineerWrTest',function(req, res){
    res.sendFile(path.join(__dirname,"html",'InfoIEngineerWrTest.html'))
});

app.get('/InfoIEngineerPrTest',function(req, res){
    res.sendFile(path.join(__dirname,"html",'InfoIEngineerPrTest.html'))
});

app.get('/InfoEngineerWrLearn',function(req, res){
    res.sendFile(path.join(__dirname,"html",'InfoEngineerWrLearn.html'))
});

app.get('/InfoEngineerPrLearn',function(req, res){
    res.sendFile(path.join(__dirname,"html",'InfoEngineerPrLearn.html'))
});

app.get('/InfoEngineerWrTest',function(req, res){
    res.sendFile(path.join(__dirname,"html",'InfoEngineerWrTest.html'))
});

app.get('/InfoEngineerPrTest',function(req, res){
    res.sendFile(path.join(__dirname,"html",'InfoEngineerPrTest.html'))
});