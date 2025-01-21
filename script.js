const questions = [
    {
        question: "What is the correct syntax to print 'Hello, World!' in Python?",
        options: ["print('Hello, World!')", "echo 'Hello, World!'", "print(Hello World)"],
        correctAnswer: "print('Hello, World!')",
        topic: "Basic Syntax"
    },
    {
        question: "What data type is the result of 10 / 3 in Python?",
        options: ["int", "float", "string"],
        correctAnswer: "float",
        topic: "Data Types"
    },
    {
        question: "Which of the following is the correct way to create a list in Python?",
        options: ["[]", "{}", "()"],
        correctAnswer: "[]",
        topic: "Data Structures"
    },
    {
        question: "What is the result of the expression '2' + '3' in Python?",
        options: ["5", "'23'", "Error"],
        correctAnswer: "'23'",
        topic: "String Manipulation"
    },
    {
        question: "How do you define a function in Python?",
        options: ["function myFunction():", "def myFunction():", "define myFunction():"],
        correctAnswer: "def myFunction():",
        topic: "Functions"
    },
    {
        question: "Which of the following is a Python library used for data manipulation and analysis?",
        options: ["NumPy", "TensorFlow", "requests"],
        correctAnswer: "NumPy",
        topic: "Libraries"
    },
    {
        question: "Which of the following statements will raise an exception in Python?",
        options: ["x = 10 / 0", "x = 10", "x = 'Hello'"],
        correctAnswer: "x = 10 / 0",
        topic: "Error Handling"
    },
    {
        question: "What is the output of the following code?\n\nprint([1, 2, 3] * 2)",
        options: ["[1, 2, 3, 1, 2, 3]", "[1, 2, 3, 2, 3, 1]", "[1, 2, 3]"],
        correctAnswer: "[1, 2, 3, 1, 2, 3]",
        topic: "Lists"
    },
    {
        question: "Which of the following is the correct way to write a while loop in Python?",
        options: ["while x < 10: {x += 1}", "while x < 10: x += 1", "while(x < 10): {x++}"],
        correctAnswer: "while x < 10: x += 1",
        topic: "Control Flow"
    },
    {
        question: "What is the purpose of the 'self' parameter in a Python class method?",
        options: ["It refers to the current object", "It is used to define global variables", "It is a Python keyword"],
        correctAnswer: "It refers to the current object",
        topic: "Object-Oriented Programming"
    }
];

// Function to generate the quiz
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

// Function to evaluate answers and generate the graph
function evaluateAnswers() {
    let results = {
        "Basic Syntax": 0,
        "Data Types": 0,
        "Data Structures": 0,
        "String Manipulation": 0,
        "Functions": 0,
        "Libraries": 0,
        "Error Handling": 0,
        "Lists": 0,
        "Control Flow": 0,
        "Object-Oriented Programming": 0
    };

    questions.forEach((question, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedOption && selectedOption.value === question.correctAnswer) {
            results[question.topic]++;
        }
    });

    displayGraph(results);
    displayResults(results);
}

// Function to display results as a graph using Chart.js
function displayGraph(results) {
    const ctx = document.getElementById('resultsChart').getContext('2d');
    
    const chart = new Chart(ctx, {
        type: 'bar', // You can change this to 'pie', 'line', 'radar', etc.
        data: {
            labels: Object.keys(results),  // Topics as x-axis labels
            datasets: [{
                label: 'Skill Proficiency',
                data: Object.values(results),  // Scores as y-axis data
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Function to display the textual results
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
