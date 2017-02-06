var quizHtml = 
`<p class="question"></p>
  <ul class="s">
  <input type="radio" name=" " value=" "><br/>
  <input type="radio" name=" " value=" "><br/>
  <input type="radio" name=" " value=" "><br/>
  <input type="radio" name=" " value=" "><br/>`

var state = {
  questions:[
    {
   question:"What is the name of the species that compelled Capt. James T. Kirk and Lt. Nyota Uhura to kiss?", 
   choices:["The Platonians", "The Vulcans", "The Romulans", "The Kazon"],
   correct: 1
    },
  ],
}

// modify state functions

//render functions
function displayNextQuestion (state, question_number, element) {
  // $('.startpage').addClass('hidden');
  var currentquestion = state.questions[0].question; 
  console.log(currentquestion);
  
  // $('.quiz').removeClass('hidden');
  // console.log(state);
}

//event handlers
$('.begin').on('click', function(event){
  displayNextQuestion(state, 0, $('.question'));
});
