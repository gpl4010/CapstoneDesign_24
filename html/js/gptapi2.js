document.addEventListener('DOMContentLoaded', function() {
    let currentQuestion = null;
    let userScore = 0;
    let totalQuestions = 0;

    async function getQuestion() {
        try {
            console.log('Fetching question...');
            const response = await fetch('/tech/question', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Server response:', errorText);
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('Received question:', data);
            return data;
        } catch (error) {
            console.error('Error fetching question:', error);
            throw error;
        }
    }

    function displayQuestion(question) {
        const questionContainer = document.getElementById('question-container');
        const optionsContainer = document.getElementById('options-container');
        
        questionContainer.innerHTML = `<p>${question.question}</p>`;
        optionsContainer.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('btn', 'btn-outline-primary', 'm-2');
            button.addEventListener('click', () => selectOption(index));
            optionsContainer.appendChild(button);
        });

        document.getElementById('submit-btn').style.display = 'inline-block';
        document.getElementById('next-btn').style.display = 'none';
        document.getElementById('result-container').innerHTML = '';
    }

    function selectOption(index) {
        const options = document.querySelectorAll('#options-container button');
        options.forEach((option, i) => {
            if (i === index) {
                option.classList.add('selected');
            } else {
                option.classList.remove('selected');
            }
        });
    }

    async function submitAnswer() {
        const selectedOption = document.querySelector('#options-container button.selected');
        if (!selectedOption) {
            alert('답변을 선택해주세요.');
            return;
        }

        const userAnswer = Array.from(selectedOption.parentNode.children).indexOf(selectedOption);
        const isCorrect = userAnswer === currentQuestion.correctAnswer;

        if (isCorrect) {
            userScore++;
        }

        totalQuestions++;

        const resultContainer = document.getElementById('result-container');
        resultContainer.innerHTML = isCorrect ? 
            '<p class="text-success">정답입니다!</p>' : 
            `<p class="text-danger">오답입니다. 정답은 ${currentQuestion.options[currentQuestion.correctAnswer]} 입니다.</p>`;

        document.getElementById('submit-btn').style.display = 'none';
        document.getElementById('next-btn').style.display = 'inline-block';
    }

    async function nextQuestion() {
        try {
            currentQuestion = await getQuestion();
            if (currentQuestion && currentQuestion.question && Array.isArray(currentQuestion.options)) {
                displayQuestion(currentQuestion);
            } else {
                throw new Error('Invalid question data received');
            }
        } catch (error) {
            console.error('Error loading question:', error);
            document.getElementById('quiz-container').innerHTML = `
                <h2>오류 발생</h2>
                <p>문제를 불러오는 중 오류가 발생했습니다: ${error.message}</p>
                <p>페이지를 새로고침하거나 나중에 다시 시도해주세요.</p>
            `;
        }
    }

    document.getElementById('submit-btn').addEventListener('click', submitAnswer);
    document.getElementById('next-btn').addEventListener('click', nextQuestion);

    // 초기 문제 로드
    nextQuestion();
});