const questions = [
    {
      question: "What is the correct way to declare a JavaScript variable?",
      choices: [
        "var name;",
        "variable name;",
        "v name;",
        "None of the above."
      ],
      answer: "var name;"
    },
    {
      question: "What is the result of the following expression: 1 + 2 + '3'?",
      choices: [
        "'63'",
        "'33'",
        "'6'",
        "'123'"
      ],
      answer: "'33'"
    },
    {
      question: "Which built-in method reverses the order of the elements of an array?",
      choices: [
        "reverse()",
        "sort()",
        "changeOrder(order)",
        "None of the above."
      ],
      answer: "reverse()"
    },
    {
      question: "What is the correct way to check if a JavaScript variable is not null?",
      choices: [
        "if (x !== null)",
        "if (x != null)",
        "if (x =! null)",
        "if (x == null)"
      ],
      answer: "if (x !== null)"
    },
    {
      question: "What is the output of the following code? console.log(3 + 4 + '5');",
      choices: [
        "'75'",
        "'345'",
        "'12'",
        "'7'"
      ],
      answer: "'75'"
    }
  ];
  
  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const startButton = document.getElementById("start");
  const submitButton = document.getElementById("submit");
  const clearButton = document.getElementById("clear");
  const timerEl = document.getElementById("timer");
  const timeEl = document.getElementById("time");
  let secondsLeft = 30;
  let currentQuestionIndex = 0;
  let score = 0;
  let timeLeft = 60;
  let timerId;
  
  function startQuiz() {
    startButton.disabled = true;
    timerEl.style.display = "block";
    displayNextQuestion();
    startTimer();
  }  

  function startTimer() {
    timerId = setInterval(function() {
      timeLeft--;
      if (timeLeft === 0) {
        endQuiz();
      } else {
        updateTimer();
      }
    }, 1000);
  }
  
  function updateTimer() {
    const timerElement = document.getElementById("timer");
    timerElement.textContent = "Time: " + timeLeft;
  }
  
  function displayNextQuestion() {
    quizContainer.innerHTML = "";
    const currentQuestion = questions[currentQuestionIndex];
    const questionElement = document.createElement("h2");
    questionElement.textContent = currentQuestion.question;
    quizContainer.appendChild(questionElement);
    for (let i = 0; i < currentQuestion.choices.length; i++) {
      const choiceElement = document.createElement("button");
      choiceElement.textContent = currentQuestion.choices[i];
      choiceElement.addEventListener("click", function() {
        checkAnswer(this.textContent);
      });
      quizContainer.appendChild(choiceElement);
    }
  }
  
  function checkAnswer(choice) {
    const currentQuestion = questions[currentQuestionIndex];
    if (choice === currentQuestion.answer) {
      score++;
      resultsContainer.textContent = "Correct!";
    } else {
      timeLeft -= 10;
      if (timeLeft < 0) {
        timeLeft = 0;
      }
      updateTimer();
      resultsContainer.textContent = "Incorrect!";
    }
    currentQuestionIndex++;
    if (currentQuestionIndex === questions.length) {
      endQuiz();
    } else {
      displayNextQuestion();
    }
  }
  
  function endQuiz() {
    clearInterval(timerId);
    quizContainer.innerHTML = "";
    const scoreElement = document.createElement("h2");
    scoreElement.textContent = "Final Score: " + score;
    quizContainer.appendChild(scoreElement);
    const initialsElement = document.createElement("input");
    initialsElement.setAttribute("type", "text");
    initialsElement.setAttribute("placeholder", "Enter your initials");
    quizContainer.appendChild(initialsElement);
    const submitElement = document.getElementById("submit");
    submitElement.style.display = "inline-block";
    submitElement.addEventListener("click", function() {
      saveScore(initialsElement.value, score);
    });
    const clearElement = document.getElementById("clear");
    clearElement.style.display = "inline-block";
    clearElement.addEventListener("click", function() {
      clearScores();
    });
  }
  
  function saveScore(initials, score) {
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push({ initials, score });
    highScores.sort(function(a, b) {
      return b.score - a.score;
    });
    localStorage.setItem("highScores", JSON.stringify(highScores));
    showHighScores();
  }
  
  function clearScores() {
    localStorage.removeItem("highScores");
    showHighScores();
  }
  
  function showHighScores() {
    quizContainer.innerHTML = "";
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    if (highScores.length > 0) {
      const highScoresElement = document.createElement("ol");
      for (let i = 0; i < highScores.length; i++) {
        const score = highScores[i];
        const scoreElement = document.createElement("li");
        scoreElement.textContent = score.initials + ": " + score.score;
        highScoresElement.appendChild(scoreElement);
      }
      quizContainer.appendChild(highScoresElement);
      const clearElement = document.getElementById("clear");
      clearElement.style.display = "inline-block";
    } else {
      const messageElement = document.createElement("p");
      messageElement.textContent = "No high scores yet!";
      quizContainer.appendChild(messageElement);
    }
  }
  
  startButton.addEventListener("click", startQuiz);  