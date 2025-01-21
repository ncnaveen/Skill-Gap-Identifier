const questions = [
    {
        question: "What is the correct syntax to print 'Hello, World!' in Python?",
        options: ["print('Hello, World!')", "echo 'Hello, World!'", "print(Hello World)"],
        correctAnswer: "print('Hello, World!')",
        topic: "Basic Syntax"
    },
    {
        question: "What data type is the result of 10 / 3?",
        options: ["int", "float", "string"],
        correctAnswer: "float",
        topic: "Data Types"
    },
    {
        question: "What does the following code do? \nif x > 10: \n    print('Greater')",
        options: [
            "Checks if x is greater than 10 and prints 'Greater' if True", 
            "Assigns value 'Greater' to variable x", 
            "Checks if x is equal to 10 and prints 'Greater' if False"
        ],
        correctAnswer: "Checks if x is greater than 10 and prints 'Greater' if True",
        topic: "Control Flow"
    },
    {
        question: "How do you define a function in Python?",
        options: ["function myFunction():", "def myFunction():", "define myFunction():"],
        correctAnswer: "def myFunction():",
        topic: "Functions"
    },
    {
        question: "Which of the following is a Python library for data manipulation?",
        options: ["Numpy", "TensorFlow", "requests"],
        correctAnswer: "Numpy",
        topic: "Libraries"
    },
    {
        question: "How do you handle exceptions in Python?",
        options: ["try-except", "catch-throw", "error-catch"],
        correctAnswer: "try-except",
        topic: "Error Handling"
    }
];

// Function to generate the quiz form
function generateQuiz() {
    const form = document.getElementById('quizForm');
    questions.forEach((question, index) => {
        const questionElement = document.createElement('div');
        questionElement.classList.add('question');
        
        const questionTitle = document.createElement('p');
        questionTitle.textContent = question.question;
        questionElement.appendChild(questionTitle);

        question.options.forEach((option) => {
            const label = document.createElement('label');
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = `question${index}`;
            input.value = option;
            label.appendChild(input);
            label.appendChild(document.createTextNode(option));
            questionElement.appendChild(label);
        });

        form.appendChild(questionElement);
    });
}

// Function to evaluate answers
function evaluateAnswers() {
    let results = {
        "Basic Syntax": 0,
        "Data Types": 0,
        "Control Flow": 0,
        "Functions": 0,
        "Libraries": 0,
        "Error Handling": 0
    };

    questions.forEach((question, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedOption && selectedOption.value === question.correctAnswer) {
            results[question.topic]++;
        }
    });

    displayResults(results);
}

// Function to display the results
function displayResults(results) {
    const resultList = document.getElementById('resultList');
    resultList.innerHTML = '';  // Clear previous results

    for (const [topic, score] of Object.entries(results)) {
        const resultItem = document.createElement('li');
        if (score === 0) {
            resultItem.textContent = `You need improvement in: ${topic}`;
        } else if (score === 1) {
            resultItem.textContent = `Good knowledge of ${topic}, but further improvement needed.`;
        } else {
            resultItem.textContent = `You are proficient in: ${topic}`;
        }
        resultList.appendChild(resultItem);
    }

    // Show the results
    document.getElementById('result').classList.remove('hidden');
}

// Initialize the quiz
generateQuiz();

// Attach event listener to submit button
document.getElementById('submitBtn').addEventListener('click', evaluateAnswers);
