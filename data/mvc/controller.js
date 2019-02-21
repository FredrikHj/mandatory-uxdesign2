// ----------------------- The core of the whole Quiz Webbsite -----------------------
import view from './view.js';
import modell from './modell.js';
//startApp();

/* Counters for the QuizApp: -------------------------------------------
   Question groups
   GameTurns */
let countQuizQuestionNr = 0;
let countQuizGameTurns = 0;

// Some usefull functions ----------------------------------------------
// Decode the strings chowin correct text
function htmlDecode (input) {
  let textStrTohtml = new DOMParser().parseFromString(input, "text/html");
  return textStrTohtml.documentElement.textContent;
}
// Sending a headline string into the function
view.loadQuizHeadLine('Quiz Master');
// Showing the side menue and handle the buttons inside it
drawerMenu();
function drawerMenu () {
  let getDrawerMenuFrame = document.querySelector('#drawerMenuFrame');
  let getDrawerMenue = document.querySelectorAll('header button');
  for (let i = 0; i < getDrawerMenue.length; i++) {
    let getTargetBtn = getDrawerMenue[i];
    getTargetBtn.addEventListener('click', function (e) {
      let targetText = e.target.textContent;
      document.querySelector('#drawerMenuFrame').setAttribute('style', 'display: block');
      view.getQuizPage.setAttribute('style', 'display: none');
      document.querySelector('#drawerMenuHeadline').focus();

      if (targetText === 'Game screen') {
        view.loadQuizHeadLine('Quiz Master');
        getDrawerMenuFrame.setAttribute('style', 'display: none');
        document.querySelector('#statsBox').setAttribute('style', 'display: none');
        document.querySelector('#abotPage').setAttribute('style', 'display: none');
        view.getQuizPlayed.style.color = 'black';
        view.getQuizPage.setAttribute('style', 'display: block');

      }
      if (targetText === 'Stats') {
        view.loadQuizHeadLine('Stats');
        getDrawerMenuFrame.setAttribute('style', 'display: none');
        document.querySelector('#abotPage').setAttribute('style', 'display: none');
        view.getQuizPage.setAttribute('style', 'display: none');

        document.querySelector('#statsBox').setAttribute('style', 'display: block');
        document.querySelector('#loadContent').setAttribute('style', 'margin-top: -10px');
        view.getQuizPlayed.style.paddingBottom = '10px';
        view.getQuizPlayed.style.color = 'orange';
      }
      if (targetText === 'About this app') {
        getDrawerMenuFrame.setAttribute('style', 'display: none');
        document.querySelector('#statsBox').setAttribute('style', 'display: none');
        view.getQuizPage.setAttribute('style', 'display: none');

        document.querySelector('#abotPage').setAttribute('style', 'display: block');
        document.querySelector('#loadContent').style.borderRadius = '0px';
        view.getQuizPlayed.style.paddingBottom = '10px';
        view.getQuizPlayed.style.color = 'orange';
        view.loadQuizHeadLine('About this app');
      }
    });
  }
}

runQuizGameTurn();
// Run a turn of the QUIZ
function runQuizGameTurn () {
  let requestQuizQuestions;
  view.countQuizGameTurns(countQuizGameTurns);

// let getQuizBtn = document.querySelector('#runQuiz');
// getQuizBtn.addEventListener('click', function () {
  requestQuizQuestions = new XMLHttpRequest();
  requestQuizQuestions.addEventListener('load', function() {
    let incommingQuizData = JSON.parse(this.responseText);
    let quizDataFromObj = incommingQuizData['results'];
    console.log('1.) Inkommande data från objektet där jag tar ut resultatet!');
    console.log(quizDataFromObj);
    createCounterGetModellValues(quizDataFromObj);
  });
  requestQuizQuestions.open("GET", 'https://opentdb.com/api.php?amount=10');
  requestQuizQuestions.send();
//})
}

/* The length in quizDataFromObj is according the incommingQuizData
above and is state in urlStr */
function createCounterGetModellValues (quizDataFromObj) {
  countQuizQuestionNr = 0;
  for (let i = 0; i < quizDataFromObj.length; i++) {
    /* A counter is created which count for both the question groups and
    the answering group. The counters which is part of the question are defined above and increase by one inside every round turn.
    I define a tabindex nr for the question starting at 10 and every 10 after it. */
    countQuizQuestionNr += 1;
    let tabIndexNrQuestionGroup = countQuizQuestionNr + '0';

    /* The data received from the modell and insurted into the view for rendering.
    Last the array is clear of data */

    // The questions -------------------------------------------------------------------------------------
    let savedQuizData = quizDataFromObj[i]['question'];
    modell.addQuizQuestion('Q' + countQuizQuestionNr + '. ' + savedQuizData);

    // Get the individual question string from modell and forwarding it into the view
    let getQuestionStr;
    let getQuestion = modell.quizQuestion;
    for (let i = 0; i < getQuestion.length; i++) {
      getQuestionStr = getQuestion[i]['savedQuizData'];
    }
    // The answer alternative. An array is created inside every turn.-------------------------------------
    let quizAnswerAltArr = []

    //Mergeing 2 objs strings into one array (The answer alternatives) and send it into the modell
    let saveQuizQuestionAnswerAlt1 = quizDataFromObj[i]['incorrect_answers'];
    for (let i = 0; i < saveQuizQuestionAnswerAlt1.length; i++) {
      quizAnswerAltArr.push(saveQuizQuestionAnswerAlt1[i]);
    }

    let saveQuizQuestionAnswerAlt2 = quizDataFromObj[i]['correct_answer'];
    quizAnswerAltArr.push(saveQuizQuestionAnswerAlt2);

    modell.addQuizQuestionAnswerAlt(quizAnswerAltArr);
    // ---------------------------------------------------------------------------------------------------
    view.renderQuizContainerQuestion(tabIndexNrQuestionGroup, getQuestionStr);

  /* The array with the answer alternatives are received and the array
   with the alternatives are needed loop through */
    let getQuestionAnswerAltArr = modell.quizQuestionAnswerAlt;
    let getAnswerAltFromArr;
    for (let i = 0; i < getQuestionAnswerAltArr.length; i++) {
      getAnswerAltFromArr = getQuestionAnswerAltArr[i]['quizAnswerAltArr'];
    }

    // A counter for specific radioBtn in a group
    let countRadioBtnNr = 0;
    let getAnswerAltstr;
    for (let i = 0; i < getAnswerAltFromArr.length; i++) {
      countRadioBtnNr += 1;
      // Correct answer is index = 3 but then shuffeled
      getAnswerAltstr = getAnswerAltFromArr[i];
      // I define tabindex for answeringAlt based the question tabindex follow by a nr 1,2,3,4 ....
      let tabIndexNrQuestionGroupAlt = '' + countQuizQuestionNr + countRadioBtnNr;
      view.renderQuizAnswerAlt(tabIndexNrQuestionGroupAlt, getAnswerAltstr, countQuizQuestionNr, countRadioBtnNr); // Fault????
    }
    // Emptying the arraies
    modell.quizQuestion.length = 0;
    modell.quizQuestionAnswerAlt.length = 0;

      var getCorrectAnswerStr = quizDataFromObj[i]['correct_answer'];
          calculateResult(getCorrectAnswerStr);
  }
  // Some functions to be running rright after the main function
  view.createSubmitBtn();
  quizSubmit();
}
//Submit the quiz and prevent reloading
document.querySelector("#quizPage").addEventListener("submit", (event) => event.preventDefault());
countQuizGameTurns = 1;
function quizSubmit (calcResult) {
  let getQuizSubmitBtn = document.querySelector('#submitQuiz');
  getQuizSubmitBtn.addEventListener('click', function() {
    document.querySelector('#resultModal').setAttribute('style', 'display: block');



// Börja här 


// Your answer is catching and send into the modell when finish the calculateResult is loading
    let mordalBtn = document.querySelectorAll('#modalBtn button');
    for (let i = 0; i < mordalBtn.length; i++) {
      let getTargetMordalBtn = mordalBtn[i];
      getTargetMordalBtn.addEventListener('click', function(e) {
        let targetE = e.target;
        if (targetE.textContent === 'New Quiz') {
          //view.countQuizGameTurns(countQuizGameTurns);
          view.getQuizPage.scrollTop = 0;
          view.getResultModal.setAttribute('style', 'display: none');
          view.getQuizPage.textContent = ' ';
          runQuizGameTurn();
        }
        else if (targetE.textContent === 'Close') {
          location.reload();
        }
      });
    }
  });
}

function calculateResult (getCorrectAnswerStr) {
    let countCorrectAnswered = 0;
  let getYourAnswerStr;
  let getRadioBtn = document.querySelectorAll('.radioBtn');
  for (let i = 0; i < getRadioBtn.length; i++) {
    let getCheckedRadioStr = getRadioBtn[i];
    if (getCheckedRadioStr.checked) {
      getYourAnswerStr = getCheckedRadioStr.value;
      console.log(getYourAnswerStr);
      if (getYourAnswerStr === getCorrectAnswerStr) {
      countCorrectAnswered += 1;
      console.log(countCorrectAnswered);
      }
    }

  }
  view.renderResultModal(countCorrectAnswered, countQuizQuestionNr);
}

view.renderStatsPage(//countCorrectAnswered,
  countQuizQuestionNr);


  console.log(modell.quizQuestion);
  console.log(modell.quizQuestionAnswerAlt);

export default {
  htmlDecode: htmlDecode
}
