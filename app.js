const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Load questions
const questions = JSON.parse(fs.readFileSync('questions.json', 'utf8'));

// Routes
app.get('/questions', (req, res) => {
    const quizQuestions = questions.map(({ id, question, options }) => ({
        id,
        question,
        options
    }));
    res.json(quizQuestions);
});

// Serve result.html
app.get('/result', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'result.html'));
  });
  
  // Handle quiz submission and redirect to result page
  app.post('/submit-quiz', (req, res) => {
    const answers = req.body.answers;
    let score = 0;
    let questionFeedback = [];
  
    questions.forEach(question => {
      const submittedAnswer = answers[question.id.toString()];
      const isCorrect = question.answer === parseInt(submittedAnswer);
      if (isCorrect) score++;
  
      questionFeedback.push({
        questionId: question.id,
        userAnswer: submittedAnswer,
        correctAnswer: question.options[question.answer],
        isCorrect,
      });
    });
  
    const quizResult = { score, questionFeedback };
    res.json(quizResult);
  });
  



// Error Handling
app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!");
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Quiz app listening at http://localhost:${port}`);
});
