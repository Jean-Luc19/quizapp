var state = {
  questions: [
    {title: "Question Text",
     answers: [
       {letter: "a", text: "Blue", value: "2" },
       {letter: "b", text: "Green", value: "4" },
       {letter: "c", text: "Red", value: "6" },
       {letter: "d", text: "Orange", value: "8" },
     ]
    },
  ],
  score: {correct: 0, incorrect: 0},

};
function getClickedAnswerValue (state, item) {

}
// modify state functions

//render functions
function displayNextQuestion (state, question_number) {
  $('.startpage').addClass('hidden');
  $('.quiz').removeClass('hidden');
  console.log(state);
}

//event handlers
$('.begin').on('click', function(event){
  displayNextQuestion();
});
