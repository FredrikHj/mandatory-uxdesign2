// ----------------------- The core of the whole Quiz Webbsite -----------------------
import view from './view.js';
import modell from './modell.js';
//startApp();

/* Counters for the QuizApp: -------------------------------------------
   Question groups
   GameTurns */

let compareCorrectAnswerStr;
let countQuizQuestionNr = 0;
let countedQuestionTot = 0;
let correctAnswerStr = {};
let getCorrectAnswerStr;

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

// let getQuizBtn = document.querySelector('#runQuiz');
// getQuizBtn.addEventListener('click', function () {
console.log("Ska utföra AJAX anrop");
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
  // Rerender the dom
  view.getQuizPage.textContent = ' ';

  for (let i = 0; i < quizDataFromObj.length; i++) {
    /* A counter is created which count for both the question groups and
    the answering group. The counters which is part of the question are defined above and increase by one inside every round turn.
    I define a tabindex nr for the question starting at 10 and every 10 after it. */
    countQuizQuestionNr += 1;
    let tabIndexNrQuestionGroup = countQuizQuestionNr + '0';

    /* The data received from the modell and inserted into the view for rendering.
    Last the array is clear of data */
    // The questions -------------------------------------------------------------------------------------
    let getQuestionStr;
    getQuizQuestion(quizDataFromObj[i]);
    function getQuizQuestion(quizDataFromObj) {
      let savedQuizData = quizDataFromObj['question'];
      modell.addQuizQuestion('Q' + countQuizQuestionNr + '. ' + savedQuizData);

      // Get the individual question string from modell and forwarding it into the view
      let getQuestion = modell.quizQuestion;
      for (let i = 0; i < getQuestion.length; i++) {
        getQuestionStr = getQuestion[i]['savedQuizData'];
      }
    }

      // The answer alternative. An array is created inside every turn.-------------------------------------
    let getAnswerAltFromArr;
    getQuizAnswerAlt(quizDataFromObj[i]);
    function getQuizAnswerAlt (quizDataFromObj) {
      let quizAnswerAltArr = [];

      //Mergeing 2 objs strings into one array (The answer alternatives) and send it into the modell
      let saveQuizQuestionAnswerAlt1 = quizDataFromObj['incorrect_answers'];

      for (let i = 0; i < saveQuizQuestionAnswerAlt1.length; i++) {
        quizAnswerAltArr.push(saveQuizQuestionAnswerAlt1[i]);
      }

      let saveQuizQuestionAnswerAlt2 = quizDataFromObj['correct_answer'];

      // Insert the correct answer into a objekct you can loop through to getting the correct answering string
      correctAnswerStr[countQuizQuestionNr] = saveQuizQuestionAnswerAlt2;
      // -----------------------------------------------------------------------------------------------------

      quizAnswerAltArr.push(saveQuizQuestionAnswerAlt2);
      modell.addQuizQuestionAnswerAlt (quizAnswerAltArr);
      // ---------------------------------------------------------------------------------------------------
      view.renderQuizContainerQuestion(tabIndexNrQuestionGroup, getQuestionStr);

      /* The array with the answer alternatives are received and the array
      with the alternatives are needed loop through */
      let getQuestionAnswerAltArr = modell.quizQuestionAnswerAlt;
      for (let i = 0; i < getQuestionAnswerAltArr.length; i++) {
        getAnswerAltFromArr = getQuestionAnswerAltArr[i]['quizAnswerAltArr'];
      }
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
  }
  // Some functions to be running right after the main function
  view.createSubmitBtn();
  quizSubmit(getCorrectAnswerStr);
  view.countQuizGameTurns ();
}
//Submit the quiz and prevent reloading
document.querySelector("#quizPage").addEventListener("submit", (event) => event.preventDefault());
//countQuizGameTurns = 1;
function quizSubmit (getCorrectAnswerStr) {
  let getQuizSubmitBtn = document.querySelector('#submitQuiz');
  getQuizSubmitBtn.addEventListener('click', function() {
    //document.querySelector('#resultModal').style.display = 'block';
    calculateResult(getCorrectAnswerStr);

    document.querySelector('#modalBtnNewQuiz').addEventListener('click', function() {
      //view.getQuizPage.textContent = ' ';
      view.getQuizPage.scrollTop = 0;
      //document.querySelector('#resultModal').style.display = 'none';
      runQuizGameTurn();
    });
    document.querySelector('#modalBtnClose').addEventListener('click', function() {
      location.reload();
    });
  });

}
let countCorrectAnswered = 0;
let getYourAnswerStr;
function calculateResult (getCorrectAnswerStr) {

  /* looping through my radioBtn an if checked I comparing it with my answer.
  if correct it will add 1 so I can present how many correct answered I chose */
  let getRadioBtn = document.querySelectorAll('.radioBtn');
  for (let i = 0; i < getRadioBtn.length; i++) {
    let getCheckedRadioStr = getRadioBtn[i];
    if (getCheckedRadioStr.checked) {
      getYourAnswerStr = getCheckedRadioStr.value;
      for (let getCorrectAnswerStr in correctAnswerStr) {
        compareCorrectAnswerStr = correctAnswerStr[getCorrectAnswerStr];

        //console.log(getYourAnswerStr + ' = ' + htmlDecode(compareCorrectAnswerStr));
        if (getYourAnswerStr === htmlDecode(compareCorrectAnswerStr)) {
          countCorrectAnswered += 1;

        }
      }
    }
    // Calling the counter who is showing the tot question of the games turns
  view.renderResultModal(countCorrectAnswered, countedQuestionTot);
  }
}
view.renderStatsPage(countQuizQuestionNr);

export default {
  htmlDecode: htmlDecode
}
