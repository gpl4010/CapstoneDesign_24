// 변수 생성
let userMessages = [];
let assistantMessages = [];

async function sendMessage() {
    //로딩 아이콘 보여주기
    document.getElementById('loader').style.display = "block";    

    //사용자의 메시지 가져옴
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value;

    //채팅 말풍선에 사용자의 메시지 출력
    const userBubble = document.createElement('div');
    userBubble.className = 'chat-bubble user-bubble';
    userBubble.textContent = message;
    document.getElementById('fortuneResponse').appendChild(userBubble);

    //Push
    userMessages.push(messageInput.value);

    //입력 필드 초기화
    messageInput.value = '';
    console.log(userMessages)

    //백엔드 서버에 메시지를 보내고 응답 출력
    try {
        const response = await fetch('/InfoEngineerPrLearn_post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userMessages: userMessages,
                assistantMessages: assistantMessages,
            })
        });
        
        if (!response.ok) {
            throw new Error('Request failed with status ' + response.status);
        }
        console.log('im working!!');
        const data = await response.json();
        console.log('im working!!');
        //!!여기서 부터 오류 엄청남
        console.log('Response:', data);
        
        //로딩 아이콘 숨기기
        document.getElementById('loader').style.display = "none";
        //Push
        assistantMessages.push(data.assistant);
        

        //채팅 말풍선에 챗GPT 응답 출력
        const botBubble = document.createElement('div');
        botBubble.className = 'chat-bubble bot-bubble';
        botBubble.textContent = data.assistant;

    } catch (error) {
        console.error('Error:', error);
    }
}