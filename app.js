var quizHtml =
`<p class="question"></p>
  <ul class="s">`


var state = {
  
  
  questions:[
    {
   question:"What is the name of the species that compelled Capt. James T. Kirk and Lt. Nyota Uhura to kiss?",
   choices:["The Platonians", "The Vulcans", "The Romulans", "The Kazon"],
   correct: 0,
    },
  ],
  currentQuestion: -1,
  answers:[0],

};

// modify state functions

//render functions
function displayNextQuestion (state, question_number, element) {
  // $('.startpage').addClass('hidden');
  $('.startpage').addClass('hidden');
  var currentquestion = state.questions[0];
  var $display = $('.quiz');
  $display.removeClass('hidden');
  var questionHTML = `<p class="question">${currentquestion.question}</p>`;
  currentquestion.choices.forEach(function (answer, i) {
    questionHTML += `<button class ="ansBut" id='${i}'> ${answer} </button>`;
  });
  $display.html(questionHTML);
}



//event handlers
$('.begin').on('click', function(event){
  displayNextQuestion(state, 0, $('.question'));
});

$('.quiz').on('click','.ansBut', function(event){
  var checkAnswerId = $(this).attr('id'); 
    console.log(checkAnswerId); 
});
