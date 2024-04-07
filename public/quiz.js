window.onload = async () => {
    const response = await fetch('/questions');
    const questions = await response.json();
    const quizContainer = document.getElementById('quiz');
    
    questions.forEach((question, index) => {
      const questionElem = document.createElement('div');
      questionElem.innerHTML = `<p>${index + 1}. ${question.question}</p>`;
      
      question.options.forEach((option, optionIndex) => {
        questionElem.innerHTML += `<label><input type="radio" name="question${question.id}" value="${optionIndex}"> ${option}</label><br>`;
      });
  
      quizContainer.appendChild(questionElem);
    });
  };
  
  async function submitAnswers() {
    const answers = {};
    document.querySelectorAll('#quiz div').forEach((questionDiv, index) => {
      const selectedOption = questionDiv.querySelector('input[type="radio"]:checked');
      if (selectedOption) {
        answers[index + 1] = selectedOption.value;
      }
    });
  
    const response = await fetch('/submit-quiz', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ answers }),
    });
  
    const result = await response.json();
    localStorage.setItem('quizResult', JSON.stringify(result)); // Store result in localStorage for access in result.js
    window.location.href = '/result'; // Redirect to result page
  }
  