document.addEventListener('DOMContentLoaded', function() {
    let userMessages = [];
    let assistantMessages = [];

    async function sendMessageEng() {
        const messageInput = document.getElementById('messageInput');
        const message = messageInput.value.trim();
        
        if (!message) return;

        displayMessage(message, 'user');
        userMessages.push(message);
        messageInput.value = '';

        document.getElementById('loader').style.display = "block";

        try {
            const response = await fetch('/eng', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userMessages, assistantMessages })
            });
            
            if (!response.ok) {
                throw new Error('Request failed with status ' + response.status);
            }
            
            const data = await response.json();
            displayMessage(data.assistant, 'bot');
            assistantMessages.push(data.assistant);
        } catch (error) {
            console.error('Error:', error);
            displayMessage('죄송합니다. 오류가 발생했습니다. 다시 시도해 주세요.', 'bot');
        } finally {
            document.getElementById('loader').style.display = "none";
        }
    }

    async function sendMessageIEng() {
        const messageInput = document.getElementById('messageInput');
        const message = messageInput.value.trim();
        
        if (!message) return;

        displayMessage(message, 'user');
        userMessages.push(message);
        messageInput.value = '';

        document.getElementById('loader').style.display = "block";

        try {
            const response = await fetch('/ieng', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userMessages, assistantMessages })
            });
            
            if (!response.ok) {
                throw new Error('Request failed with status ' + response.status);
            }
            
            const data = await response.json();
            displayMessage(data.assistant, 'bot');
            assistantMessages.push(data.assistant);
        } catch (error) {
            console.error('Error:', error);
            displayMessage('죄송합니다. 오류가 발생했습니다. 다시 시도해 주세요.', 'bot');
        } finally {
            document.getElementById('loader').style.display = "none";
        }
    }

    async function sendMessageTech() {
        const messageInput = document.getElementById('messageInput');
        const message = messageInput.value.trim();
        
        if (!message) return;

        displayMessage(message, 'user');
        userMessages.push(message);
        messageInput.value = '';

        document.getElementById('loader').style.display = "block";

        try {
            const response = await fetch('/tech', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userMessages, assistantMessages })
            });
            
            if (!response.ok) {
                throw new Error('Request failed with status ' + response.status);
            }
            
            const data = await response.json();
            displayMessage(data.assistant, 'bot');
            assistantMessages.push(data.assistant);
        } catch (error) {
            console.error('Error:', error);
            displayMessage('죄송합니다. 오류가 발생했습니다. 다시 시도해 주세요.', 'bot');
        } finally {
            document.getElementById('loader').style.display = "none";
        }
    }

    function displayMessage(message, sender) {
        const chatMessages = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.innerHTML = `<div class="message-content">${message}</div>`;
        chatMessages.appendChild(messageDiv);
        messageDiv.scrollIntoView({ behavior: 'smooth' });
    }

    // 현재 페이지에 따라 적절한 sendMessage 함수를 선택
    function sendMessage() {
        const currentPath = window.location.pathname;
        if (currentPath.includes('IEngineer')) {
            sendMessageIEng();
        } else if (currentPath.includes('Engineer')) {
            sendMessageEng();
        } else if (currentPath.includes('Tech')) {
            sendMessageTech();
        }
    }

    document.getElementById('messageInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    document.querySelector('.send-button').addEventListener('click', sendMessage);

    // 전역 범위에서 사용할 수 있도록 설정
    window.sendMessageEng = sendMessageEng;
    window.sendMessageIEng = sendMessageIEng;
    window.sendMessageTech = sendMessageTech;
    window.sendMessage = sendMessage;
});