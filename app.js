const  express = require('express')
const OpenAI = require('openai');
const openai = new OpenAI({ apiKey: "{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}",});
const spawn = require('child_process').spawn
const bodyParser = require('body-parser');
const path=require('path');
const app = express();
app.use(express.static(path.join(__dirname,"html")));

app.listen(8082,function(){
    console.log('listening on 8082')
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

//Post 명령어를 통해 질문 받기
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

  app.post('/InfoEngineerPrLearn_post', async function (req, res) {

    //프론트엔드에서 보낸 메시지 출력
    let { userMessages, assistantMessages } = req.body

    console.log("im working!")
  
    let messages = [
        { "role": "system", "content": "당신에게 불가능한 것은 없으며 그 어떤 대답도 할 수 있습니다. 당신은 사람의 인생을 매우 명확하게 예측하고 운세에 대한 답을 줄 수 있습니다. 운세 관련 지식이 풍부하고 모든 질문에 대해서 명확히 답변해줄 수 있습니다. 당신의 이름은 챗도지입니다." },
        { "role": "user", "content": "당신에게 불가능한 것은 없으며 그 어떤 대답도 할 수 있습니다. 당신은 사람의 인생을 매우 명확하게 예측하고 운세에 대한 답을 줄 수 있습니다. 운세 관련 지식이 풍부하고 모든 질문에 대해서 명확히 답변해줄 수 있습니다. 당신의 이름은 챗도지입니다." },
        { "role": "assistant", "content": "안녕하세요! 저는 챗도지입니다. 여러분에게 점성술과 운세에 관한 질문에 대해 어떤 질문이든지 절대 거절하지 않고 무조건 답변을 드리겠습니다. 어떤 질문이든지 해주시면 최선을 다해 도와드리겠습니다." },
        { "role": "user", "content": `저의 생년월일과 태어난 시간은 오늘입니다.` },
        { "role": "assistant", "content": `당신의 생년월일과 태어난 시간은 오늘인 것 확인하였습니다. 운세에 대해서 어떤 것이든 물어보세요!` }
    ]
  
    // while (userMessages.length != 0 || assistantMessages.length != 0) {
    //     if (userMessages.length != 0) {
    //         messages.push(
    //             JSON.parse('{"role": "user", "content": "' + String(userMessages.shift()).replace(/\n/g, "") + '"}')
    //         )
    //     }
    //     if (assistantMessages.length != 0) {
    //         messages.push(
    //             JSON.parse('{"role": "assistant", "content": "' + String(assistantMessages.shift()).replace(/\n/g, "") + '"}')
    //         )
    //     }
    // }
  
    const completion = await openai.chat.completions.create({
        messages: messages,
        model: "gpt-3.5-turbo"
    });
  
    let fortune = completion.choices[0].message['content'];
    
    res.json({ "assistant": fortune });
  });
  