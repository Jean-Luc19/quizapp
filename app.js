var quizHtml =
`<p class="question"></p>
  <ul class="s">`


var state = {
  questions:[
    {
   question:"What is the name of the species that compelled Capt. James T. Kirk and Lt. Nyota Uhura to kiss?",
   answers:["The Platonians", "The Vulcans", "The Romulans", "The Kazon"],
   correct: 0,
    },
    {
   question:"This is the next question that should be up compelled Capt. James T. Kirk and Lt. Nyota Uhura to kiss?",
   answers:["The Platonians", "The Vulcans", "The Romulans", "The Kazon"],
   correct: 0,
    },
  ],
  currentQuestion: -1,
  userAnswers:[],
  score: 0,

};
//{state.questions[state.currentquestion].answers[state.questions[state.currentquestion].correct]}
// modify state functions
function getCurrentQuestion(state) {
  state.currentQuestion ++;
}
function updateUserAnswers (state, uA) {
  var convertedAnswer = Number(uA);
  state.userAnswers.push(convertedAnswer);
}


//caluclator functions
function checkUserAnswer(state) {
  if (state.currentQuestion >= 0) {
    var userAnswer = state.userAnswers[state.currentQuestion];
    var correctAnswer = state.questions[state.currentQuestion].correct;
    if (userAnswer === correctAnswer) {
      state.score ++;
      return true;

    }
    else {
      return false;
    }
  }
};


//render functions
function displayNextQuestion (state) {
  var $display = $('.quiz');
  if (state.currentQuestion === -1) {
    $('.startpage').removeClass('hidden');
  }
  else if (state.currentQuestion >= state.questions.length) {
     return $display.html(`<h2>Game Over Man, You're final score is ${state.score} out of ${state.questions.length}</h2>`)
  }
  $('.startpage').addClass('hidden');
  var currentQuestionObj = state.questions[state.currentQuestion];
  var $display = $('.quiz');
  $display.removeClass('hidden');
  var questionHTML = `<p class="question">${currentQuestionObj.question}</p>`;
  currentQuestionObj.answers.forEach(function (answer, i) {
    questionHTML += `<button class ="ansBut" id='${i}'> ${answer} </button>`;
  });
  $display.html(questionHTML);
  console.log(state);
}

function displayFeedBack(state) {
  var checker = checkUserAnswer(state);
    var $display = $('.quiz');
    var feedbackHtml = `<button class='next'>Next Question</button><p>${state.score}</p>`;
    if (checker) {
      feedbackHtml += `<h1>Q'plah! You Are Correct</h1>`;
    }
    else {
      var questionObject = state.questions[state.currentQuestion]
      feedbackHtml += `<h1>Phasers Offline</h1><h2>The correct answer was${questionObject.answers[questionObject.correct]}`
    }
    $display.html(feedbackHtml);
}



//event handlers
$('.begin').on('click', function(event){
  getCurrentQuestion(state);
  displayNextQuestion(state);
});

$('.quiz').on('click','.ansBut', function(event){
  var checkAnswerId = $(this).attr('id');
  updateUserAnswers(state, checkAnswerId);
  displayFeedBack(state);

});
$('.quiz').on('click','.next', function(event){
  getCurrentQuestion(state);
  displayNextQuestion(state);
  console.log(state);
});





/*
First thing a user sees is the welcome page with start quiz button: the state at this point is currentquestion = -1, answers array is empty.

User clicks start button, state is now currentquestion = 0, answers array is still empty.

User selects an answer and presses its button. State is currentquestion = 0, userAnswers.length = 1

User sees page with feedback that displays their results on the question offered click next button to continue State is currentquestion = 0, userAnswers.length = 1

User clicks next button

state is currentquestion = 1 userAnswers.length = 1





*/
