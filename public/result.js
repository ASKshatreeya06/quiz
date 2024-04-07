window.onload = () => {
    const resultContainer = document.getElementById('result');
    const quizResult = JSON.parse(localStorage.getItem('quizResult'));
  
    if (quizResult) {
      const { score, questionFeedback } = quizResult;
      resultContainer.innerHTML = `<p>Your Score: ${score}/${questionFeedback.length}</p>`;
  
      questionFeedback.forEach(feedback => {
        const feedbackElem = document.createElement('p');
        feedbackElem.textContent = `Question ${feedback.questionId}: ${feedback.isCorrect ? 'Correct' : 'Incorrect'}. Correct Answer: ${feedback.correctAnswer}`;
        resultContainer.appendChild(feedbackElem);
      });
    } else {
      resultContainer.textContent = 'Quiz result not found!';
    }
  };
  