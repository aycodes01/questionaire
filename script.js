const quizData = [
            {
                question: "What does HTML stand for?",
                options: [
                    "Hyper Text Markup Language",
                    "High Tech Modern Language",
                    "Home Tool Markup Language",
                    "Hyperlinks and Text Markup Language"
                ],
                correct: 0
            },
            {
                question: "Which CSS property controls the text size?",
                options: [
                    "text-size",
                    "font-style",
                    "font-size",
                    "text-scale"
                ],
                correct: 2
            },
            {
                question: "What is the correct HTML for making a text italic?",
                options: [
                    "<i>sometext</i>",
                    "<italic>sometext</italic>",
                    "<em style='italic'>sometext</em>",
                    "<em>sometext</em>"
                ],
                correct: 0
            },
            {
                question: "Which HTML attribute specifies an alternate text for an image?",
                options: [
                    "alt",
                    "title",
                    "longdesc",
                    "src"
                ],
                correct: 0
            },
            {
                question: "Which character is used to indicate an end tag?",
                options: [
                    "*",
                    "<",
                    "/",
                    "^"
                ],
                correct: 2
            }
        ];

        let currentQuestion = 0;
        let score = 0;
        let answeredQuestions = [];

        const quizContainer = document.getElementById('quizContainer');
        const questionContainer = document.getElementById('questionContainer');
        const nextBtn = document.getElementById('nextBtn');
        const restartBtn = document.getElementById('restartBtn');
        const restartFromScore = document.getElementById('restartFromScore');
        const scoreSection = document.getElementById('scoreSection');
        const quizContent = document.getElementById('quizContent');
        const progressFill = document.getElementById('progressFill');
        const finalScore = document.getElementById('finalScore');
        const scoreText = document.getElementById('scoreText');

        function init() {
            currentQuestion = 0;
            score = 0;
            answeredQuestions = [];
            showQuestion();
            updateProgress();
            nextBtn.classList.remove('hidden');
            restartBtn.classList.add('hidden');
            scoreSection.classList.add('hidden');
            quizContent.classList.remove('hidden');
        }

        function showQuestion() {
            const q = quizData[currentQuestion];
            questionContainer.innerHTML = `
                <div class="question-number">Question ${currentQuestion + 1} of ${quizData.length}</div>
                <div class="question-text">${q.question}</div>
                <div class="options-container" id="optionsContainer"></div>
            `;

            const optionsContainer = document.getElementById('optionsContainer');
            q.options.forEach((option, index) => {
                const optionDiv = document.createElement('div');
                optionDiv.className = 'option';
                optionDiv.textContent = option;
                optionDiv.onclick = () => selectOption(index);
                optionsContainer.appendChild(optionDiv);
            });

            updateProgress();
        }

        function selectOption(selectedIndex) {
            const options = document.querySelectorAll('.option');
            const correctIndex = quizData[currentQuestion].correct;

            // Disable all options
            options.forEach(opt => opt.classList.add('disabled'));

            // Show correct answer
            options[correctIndex].classList.add('correct');

            // Show if selected was wrong
            if (selectedIndex !== correctIndex) {
                options[selectedIndex].classList.add('wrong');
            } else {
                score++;
            }

            answeredQuestions.push(currentQuestion);
            nextBtn.textContent = currentQuestion === quizData.length - 1 ? 'Finish Quiz' : 'Next Question';
        }

        function updateProgress() {
            const progress = ((currentQuestion + 1) / quizData.length) * 100;
            progressFill.style.width = progress + '%';
        }

        nextBtn.onclick = () => {
            currentQuestion++;
            if (currentQuestion < quizData.length) {
                showQuestion();
            } else {
                showScore();
            }
        };

        function showScore() {
            quizContent.classList.add('hidden');
            scoreSection.classList.remove('hidden');
            
            finalScore.textContent = `${score}/${quizData.length}`;
            
            let percentage = (score / quizData.length) * 100;
            let message = '';
            if (percentage >= 80) message = 'Outstanding! You\'re an expert!';
            else if (percentage >= 60) message = 'Great job! Well done!';
            else if (percentage >= 40) message = 'Good effort! Keep learning!';
            else message = 'Nice try! Practice makes perfect!';
            
            scoreText.textContent = message;
        }

        restartBtn.onclick = init;
        restartFromScore.onclick = init;

        // Initialize quiz
        init();