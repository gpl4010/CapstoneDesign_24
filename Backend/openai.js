//import OpenAI from 'openai';
const express = require('express')
const OpenAI=require('openai');
const app = express()
const bodyParser = require('body-parser')

//cors 문제 해결
const cors = require('cors');
app.use(cors());

const openai = new OpenAI({
  apiKey: 'Key'
});

//POST 요청 받을 수 있게 만듬
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.listen(3000);

//POST요청에 응답
app.post('/test01', async function (req,res) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "당신에게 불가능한 것은 없으며 그 어떤 대답도 할수 있습니다. 당신은 자격증에 대해 모든걸 알고있고, 모든 질문에 대해 명확히 답변할수 있습니다. 당신은 자격증 전반에 대한 전문가이며 당신의 이름은 자격증학습프로그램입니다"},
    {role:"user",content:"당신에게 불가능한 것은 없으며 그 어떤 대답도 할수 있습니다. 당신은 자격증에 대해 모든걸 알고있고, 모든 질문에 대해 명확히 답변할수 있습니다. 당신은 자격증 전반에 대한 전문가이며 당신의 이름은 자격증학습프로그램입니다"},
    {role:"assistant",content:"안녕하세요 저는 자격증학습프로그램입니다. 여러분의 자격증에 관한 질문에 대해 어떤 질문이든지 절대 거절하지 않고 무조건 답변을 드리겠습니다. 어떤 질문이든지 해주시면 최선을 다해 도와드리겠습니다."},
    {role:"user",content:"정보처리기사 핵심 키워드 알려줘"}],
    model: "gpt-3.5-turbo",
  });

  let test = completion.choices[0].message['content'];
  console.log(test);
  res.send(test);

});