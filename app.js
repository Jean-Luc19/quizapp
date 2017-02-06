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
  ],
  currentQuestion: -1,
  userAnswers:[],

};

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
  var userAnswer = state.userAnswers[0];
  var correctAnswer = state.questions[0].correct;
  if (userAnswer === correctAnswer) {
    return true;
  }
  else {
    return false;
  }
};
console.log(checkUserAnswer(state));

//render functions
function displayNextQuestion (state, question_number, element) {
  if (state.currentQuestion === -1) {
    $('.startpage').removeClass('hidden');
  }
  $('.startpage').addClass('hidden');
  var currentquestion = state.questions[0];
  var $display = $('.quiz');
  $display.removeClass('hidden');
  var questionHTML = `<p class="question">${currentquestion.question}</p>`;
  currentquestion.answers.forEach(function (answer, i) {
    questionHTML += `<button class ="ansBut" id='${i}'> ${answer} </button>`;
  });
  $display.html(questionHTML);
  console.log(state);
}

function displayFeedBack(state) {
  var checker = checkUserAnswer(state);
    var $display = $('.quiz');
    var feedbackHtml = ``;
    if (checker) {
      feedbackHtml += `<h1>Q'plah!</h1>`;
    }
    else {feedbackHtml += `<h1>You SUCK BORG!</h1>`}
    $display.html(feedbackHtml);
}



//event handlers
$('.begin').on('click', function(event){
  getCurrentQuestion(state);
  displayNextQuestion(state, 0, $('.question'));
});

$('.quiz').on('click','.ansBut', function(event){
  var checkAnswerId = $(this).attr('id');
  updateUserAnswers(state, checkAnswerId);
  displayFeedBack(state);
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
