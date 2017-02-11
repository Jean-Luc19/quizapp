$(function(){
  var $display = $('.quiz');
  function displayNextQuestion (state) {
    console.log($display);

    if (state.currentQuestion === -1) {
      $('.startpage').removeClass('hidden');
    }
    else if (state.currentQuestion >= state.questions.length) {
      var currentRank = setRank(state);

      return $display.html(`<h2>Game Over Man, You're final score is ${state.score} out of ${state.questions.length}</h2><h3>You have achieved the rank of ${currentRank}</h3><button class="restart">Replay Mission</button>`);
    }
    $('.startpage').addClass('hidden');
    var currentQuestionObj = state.questions[state.currentQuestion];

    $display.removeClass('hidden');
    var questionHTML = `<p class="question">${currentQuestionObj.question}</p>`;
    currentQuestionObj.answers.forEach(function (answer, i) {
      questionHTML += `<button class ="ansBut" id='${i}'> ${answer} </button>`;
    });
    $display.html(questionHTML);

  }
  function getCurrentQuestion(state) {
    state.currentQuestion ++;
  }
  function updateUserAnswers (state, uA) {
    var convertedAnswer = Number(uA);
    state.userAnswers.push(convertedAnswer);
  }
  function resetStateVariables (state) {
    state.currentQuestion = -1;
    state.userAnswers = [];
    state.score = 0;
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
  }

  function setRank(state) {
    var percentScore = Math.floor((state.score / state.currentQuestion) * 10);
    var rank;
    // ranks.forEach(function(item, i) {
    //   if (i === percentScore) {
    //     rank = item;
    //   }
    // });
    return ranks[percentScore];
  }

  //render functions

  function changeBackgroundImage() {
    var x =  Math.floor(Math.random() * bgImages.length);
    var imagePath = bgImages[x];
    $('html').css('background', `url(${imagePath}) no-repeat center center fixed`);
  }
  function displayFeedBack(state) {
    var checker = checkUserAnswer(state);

      var feedbackHtml = `<button class='next'>Next Question</button>`;
      if (checker) {
        feedbackHtml += `<h1>Q'plah! You Are Correct</h1>`;
      }
      else {
        var questionObject = state.questions[state.currentQuestion]
        feedbackHtml += `<h1>Phasers Offline</h1><h2>The correct answer was${questionObject.answers[questionObject.correct]}`
      }
      feedbackHtml += `<p>Score: ${state.score} out of ${state.currentQuestion + 1}</p>`
      $display.html(feedbackHtml);
  }
  function removeStartPageHiddenClass() {
    $('.startpage').removeClass('hidden');
  };


  $('.begin').on('click', function(event){
    console.log($display);
    getCurrentQuestion(state);
    displayNextQuestion(state);
    changeBackgroundImage();
  });

  $('.quiz').on('click','.ansBut', function(event){
    var checkAnswerId = $(this).attr('id');
    updateUserAnswers(state, checkAnswerId);
    displayFeedBack(state);
    changeBackgroundImage();

  });

  $('.quiz').on('click','.next', function(event){
    getCurrentQuestion(state);
    displayNextQuestion(state);
    console.log(state);
  });

  $('.quiz').on('click','.restart', function(event){
    resetStateVariables(state);
    removeStartPageHiddenClass();
    console.log(state);
  });


});
var bgImages = [`images/img1.jpg`, `images/img2.jpg`, `images/img3.jpg`, `images/img4.jpg`, `images/img5.jpg`, `images/img6.jpg`, `images/img7.jpg`, `images/img8.jpg`]
var ranks = ["Warp Conduit Scrubber", "Ensign: Firstclass", "Ensign: Gold Star", "Lieutenant", "Commander", "Captain", "Commodore", "Rear Admiral", "Admiral", "Q"];

var state = {
  questions:[
    {
   question:"What is the name of the species that compelled Capt. James T. Kirk and Lt. Nyota Uhura to kiss?",
   answers:["The Platonians", "The Vulcans", "The Romulans", "The Kazon"],
   correct: 0,
    },
    {
   question:"Which of the following was not a founding species of the United Federation of Planets, a collection of governments based on universal liberty and equality?",
   answers:["Vulcans", "Betazoids", "Andorians", "Tellarites"],
   correct: 1,
    },
    {
   question:"In what episode was Lt. Commander Geordi Laforge shown seeing without his VISOR?",
   answers:["Elementary, Dear Data TNG Season 2, Episode 3", "Galaxy's Child TNG Season 4, Episode 16", "Timeless Voyager season 5, Episode 6", "Identity Crises TNG Season 4, Episode 18"],
   correct: 3,
    },
  //   {
  //  question:"Which of Jean-Luc Picard’s Organs is Artificial?",
  //  answers:["Brain", "Liver", "Gall Bladder", "Heart"],
  //  correct: 3,
  //   },
  //    {
  //  question:"Who was the disgraced scientist who created Lt. Cmdr Data, an android who was ultimately granted rights and privileges equal to those afforded to all humanoid species?",
  //  answers:["Julian Bashir", "Noonien Soong", "Tolian Soran", "Ma'Bor Jetrel"],
  //  correct: 1,
  //   },
  //   {
  //  question:"What is the name of the alien who killed Lt. Tasha Yar (played by Denise Crosby, who chose to leave the Next Generation series after its first season)?",
  //  answers:["Armus", "Locutus", "Nagilum", "Khan"],
  //  correct: 0,
  //   },
  //   {
  //  question:"Which of the following was not a host for the Dax symbiont?",
  //  answers:["Jadzia", "Curzon", "Odan", "Ezri"],
  //  correct: 2,
  //   },
  //   {
  //  question:"Which of these species don’t have any telepathic abilities",
  //  answers:["Bejorans", "Vulcans", "Klingon", "Betazoid"],
  //  correct: 0,
  //   },
  //   {
  //  question:"What is the First Rule Of Acquisition?",
  //  answers:["Home is where the heart is, but the stars are made of latinum.", "Once you have their money, you never give it back.", "Never begin a business negotiation on an empty stomach.", "No good deed ever goes unpunished"],
  //  correct: 1,
  //   },
  //   {
  //  question:"What title was given by the bajorans to Capt. Benjamin Sisko?",
  //  answers:["The Prophet", "The Messiah", "The Minister", "The Emissary"],
  //  correct: 3,
  //   },

  ],
  currentQuestion: -1,
  userAnswers:[],
  score: 0,
  ranks: ['Ensign', 'Commander', 'Captain', 'Admiral'],

};
//{state.questions[state.currentquestion].answers[state.questions[state.currentquestion].correct]}
// modify state functions
//bad function name



//event handlers

// Modify state current question -1 answer array[]


/*
First thing a user sees is the welcome page with start quiz button: the state at this point is currentquestion = -1, answers array is empty.

User clicks start button, state is now currentquestion = 0, answers array is still empty.

User selects an answer and presses its button. State is currentquestion = 0, userAnswers.length = 1

User sees page with feedback that displays their results on the question offered click next button to continue State is currentquestion = 0, userAnswers.length = 1

User clicks next button

state is currentquestion = 1 userAnswers.length = 1

Things to work on today:
1. Create Restart function - done
2. Refactor function and variable naming
3. Optional: clean up rank functionality -Done
Styling:
1. Beautify buttons
2. Start screen style div
3. feedback image toggle
4. stylize ranking presentation
5.




*/
