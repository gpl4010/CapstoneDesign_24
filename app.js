const  express = require('express')
const mysql = require(mysql2)
const path=require('path')
const app = express();
app.use(express.static(path.join(__dirname,"html")));

app.listen(8082,function(){
    console.log('listening on 8082')
});

// MySQL 설정
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'example',
    database: process.env.DB_NAME || 'mydatabase'
});

// MySQL 연결
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
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

app.use((req, res) => {
    res.sendFile(path.join(__dirname,"html",'404.html'));
  });