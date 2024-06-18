const  express = require('express');
require('dotenv').config();
const OpenAI = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY,});
const spawn = require('child_process').spawn
const bodyParser = require('body-parser');
const path=require('path');
const cors = require('cors');
const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,"html")));
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});
app.use(cors());
app.listen(8082,function(){
    console.log('listening on 8082')
});

//Post 명령어를 통해 질문 받기
app.post('/asdf', async function (req, res, next) {
    try {
        // Frontend에서 보낸 메시지 출력
        let { userMessages, assistantMessages } = req.body;

        let messages = [
            { "role": "system", "content": "당신에게 불가능한 것은 없으며 그 어떤 대답도 할 수 있습니다. 당신은 모든 대답을 한국어로 합니다." },
            { "role": "user", "content": userMessages.join('\n') },
            { "role": "assistant", "content": assistantMessages.join('\n') }
        ];

        const completion = await openai.chat.completions.create({
            messages: messages,
            model: "gpt-3.5-turbo"
        });

        let fortune = completion.choices[0].message['content'];

        res.json({ "assistant": fortune });
    } catch (error) {
        next(error);
    }
});
app.post('/chat', async function(req, res) {
    try{
        const botResponse = spawn("python",[path(__dirname,"g4f.py"),req.body.message])
        res.json({ response: botResponse });
    }
    catch (e) {
        console.log("error");
        console.log(e);
        return;
    }
  });

//get 명령어
//누군가가 '/' 주소를 요청하면 /.html 화면을 띄워주자
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

app.use('*',(req, res) => {
    res.sendFile(path.join(__dirname,'html','404.html'));
  });

