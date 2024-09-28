const express = require('express');
const OpenAI = require('openai');
const { spawn } = require('child_process');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

// 환경 변수 확인
if (!process.env.OPENAI_API_KEY) {
    console.error('OPENAI_API_KEY is not set in the environment variables');
    process.exit(1);
}

const app = express();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "html")));
app.use(express.static(path.join(__dirname, "html","css")));
app.use(express.static(path.join(__dirname, "html","vendor")));
app.use(express.static(path.join(__dirname, "html","img")));
app.use(express.static(path.join(__dirname, "html","js")));
app.use(express.static(path.join(__dirname, "html","scss")));

app.use(cors());
app.use(helmet());

// 오류 처리 미들웨어
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

// 자격증 쿼리 처리 함수
async function handleCertificateQuery(systemContent, userMessages, assistantMessages) {
    const messages = [
        { "role": "system", "content": systemContent },
        { "role": "user", "content": userMessages.join('\n') },
        { "role": "assistant", "content": assistantMessages.join('\n') }
    ];

    const completion = await openai.chat.completions.create({
        messages: messages,
        model: "gpt-3.5-turbo"
    });

    return completion.choices[0].message['content'];
}

//정보처리기능사 문제생성
app.get('/tech/question', async (req, res) => {
    try {
        console.log('Generating question...');
        const systemContent = "당신은 정보처리기능사 시험 문제를 출제하는 출제자입니다. 객관식 문제 하나와 4개의 선택지, 그리고 정답을 생성해주세요. 형식: '문제: [문제 내용]\na) [선택지1]\nb) [선택지2]\nc) [선택지3]\nd) [선택지4]\n정답: [정답 알파벳]'";
        const response = await openai.chat.completions.create({
            messages: [{ role: "system", content: systemContent }],
            model: "gpt-3.5-turbo"
        });

        console.log('GPT response:', response);

        const content = response.choices[0].message.content;
        console.log('Raw content:', content);

        const parsedContent = parseQuestion(content);
        console.log('Parsed content:', parsedContent);

        res.json(parsedContent);
    } catch (error) {
        console.error('Error in /tech/question:', error);
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
});

//정보처리산업기사 문제생성
app.get('/ieng/question', async (req, res) => {
    try {
        console.log('Generating question...');
        const systemContent = "당신은 정보처리산업기사 시험 문제를 출제하는 출제자입니다. 객관식 문제 하나와 4개의 선택지, 그리고 정답을 생성해주세요. 형식: '문제: [문제 내용]\na) [선택지1]\nb) [선택지2]\nc) [선택지3]\nd) [선택지4]\n정답: [정답 알파벳]'";
        const response = await openai.chat.completions.create({
            messages: [{ role: "system", content: systemContent }],
            model: "gpt-3.5-turbo"
        });

        console.log('GPT response:', response);

        const content = response.choices[0].message.content;
        console.log('Raw content:', content);

        const parsedContent = parseQuestion(content);
        console.log('Parsed content:', parsedContent);

        res.json(parsedContent);
    } catch (error) {
        console.error('Error in /tech/question:', error);
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
});

//정보처리기사 문제생성
app.get('/eng/question', async (req, res) => {
    try {
        console.log('Generating question...');
        const systemContent = "당신은 정보처리기사 시험 문제를 출제하는 출제자입니다. 객관식 문제 하나와 4개의 선택지, 그리고 정답을 생성해주세요. 형식: '문제: [문제 내용]\na) [선택지1]\nb) [선택지2]\nc) [선택지3]\nd) [선택지4]\n정답: [정답 알파벳]'";
        const response = await openai.chat.completions.create({
            messages: [{ role: "system", content: systemContent }],
            model: "gpt-3.5-turbo"
        });

        console.log('GPT response:', response);

        const content = response.choices[0].message.content;
        console.log('Raw content:', content);

        const parsedContent = parseQuestion(content);
        console.log('Parsed content:', parsedContent);

        res.json(parsedContent);
    } catch (error) {
        console.error('Error in /tech/question:', error);
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
});

function parseQuestion(content) {
    const lines = content.split('\n');
    const question = lines[0].replace('문제: ', '');
    const options = lines.slice(1, 5).map(line => line.replace(/^[a-d]\) /, ''));
    const correctAnswer = lines[5].replace('정답: ', '').charCodeAt(0) - 97;

    return { question, options, correctAnswer };
}

// 정보처리산업기사
app.post('/ieng', async (req, res, next) => {
    try {
        const { userMessages, assistantMessages } = req.body;
        const systemContent = "당신은 정보처리산업기사 자격증 시험을 준비하는 학생들을 위한 전문 멘토입니다. 데이터베이스, 전자계산기구조, 시스템분석설계, 운영체제, 정보통신개론 등의 주제에 대해 중급 수준의 설명을 제공합니다. 실제 업무 환경에서의 적용 사례를 들어 설명하며, 정보처리기사와 기능사 사이의 난이도로 답변합니다. 모든 정보는 한국어로 제공하며, 필기와 실기 시험 모두에 도움이 되는 조언을 제공합니다.";
        const response = await handleCertificateQuery(systemContent, userMessages, assistantMessages);
        res.json({ "assistant": response });
    } catch (error) {
        next(error);
    }
});

// 정보처리기사
app.post('/eng', async (req, res, next) => {
    try {
        const { userMessages, assistantMessages } = req.body;
        const systemContent = "당신은 정보처리기사 자격증 시험을 준비하는 학생들을 돕는 전문 튜터입니다. 데이터베이스, 전자계산기구조, 운영체제, 소프트웨어공학, 데이터통신 등의 주제에 대해 정확하고 이해하기 쉬운 설명을 제공합니다. 실제 시험 문제와 유사한 예제를 들어 설명하며, 최신 IT 트렌드도 반영합니다. 모든 답변은 한국어로 제공합니다.";
        const response = await handleCertificateQuery(systemContent, userMessages, assistantMessages);
        res.json({ "assistant": response });
    } catch (error) {
        next(error);
    }
});

// 정보처리 기능사
app.post('/tech', async (req, res, next) => {
    try {
        const { userMessages, assistantMessages } = req.body;
        const systemContent = "당신은 정보처리기능사 자격증 시험을 준비하는 학생들을 위한 가이드입니다. 전자계산기일반, 패키지활용, PC운영체제, 정보통신일반 등의 기초적인 IT 지식에 대해 쉽고 명확하게 설명합니다. 실무에서 자주 사용되는 기술과 도구에 대한 예시를 들어 설명하며, 초보자도 이해할 수 있는 수준으로 답변합니다. 모든 설명은 한국어로 제공합니다.";
        const response = await handleCertificateQuery(systemContent, userMessages, assistantMessages);
        res.json({ "assistant": response });
    } catch (error) {
        next(error);
    }
});

app.post('/chat', async (req, res, next) => {
    try {
        const botResponse = spawn("python", [path.join(__dirname, "g4f.py"), req.body.message]);
        // 여기에 botResponse 처리 로직 추가
        res.json({ response: "botResponse 처리 결과" });
    } catch (error) {
        next(error);
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

// 서버 시작
const PORT = process.env.PORT || 8082;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
