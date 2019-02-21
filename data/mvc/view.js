// ----------------------- Redering the views ----------------------------------
import controller from './controller.js';

let getQuizPlayed = document.querySelector('#quizPlayed');

function countQuizGameTurns (countQuizGameTurns) {
  countQuizGameTurns += 1;
  getQuizPlayed.textContent = 'Quiz ' + countQuizGameTurns;
}

// Definening varbles which are in diff functions and must working in diff funtions
let getQuizPage = document.querySelector('#quizPage');
let getResultModal = document.querySelector('#resultModal');
let createdQuizContainerGroup;
// Html elements are creating in matching function -----------------------------

//}

function loadQuizHeadLine (quizHeadLine) {
  let getHeadLinePlace = document.querySelector('#quizHeadLine');
  getHeadLinePlace.textContent = quizHeadLine;
}

/* Create a container for the questtions named "quizContainer"
Insurt the question inside a p element named "quizQuestion" */

function renderQuizContainerQuestion (tabIndexNrQuestionGroup, insurtQuestionStr) {
  createdQuizContainerGroup = document.createElement('section');
  createdQuizContainerGroup.setAttribute('class', 'quizContainer');

  let createdQuizQuestionPlace = document.createElement('span');
  createdQuizQuestionPlace.setAttribute('class', 'quizQuestion');
  createdQuizQuestionPlace.tabIndex = tabIndexNrQuestionGroup;
  createdQuizQuestionPlace.textContent = controller.htmlDecode(insurtQuestionStr);


  createdQuizContainerGroup.appendChild(createdQuizQuestionPlace);
  //createdQuizContainer.appendChild(createdAnswerAltForm);
  getQuizPage.appendChild(createdQuizContainerGroup);

  let getQuestionGroupLine = document.createElement('div');
  getQuestionGroupLine.setAttribute('class', 'groupLine');
  getQuizPage.appendChild(getQuestionGroupLine);
}

function renderQuizAnswerAlt (tabIndexNrQuestionGroupAlt, insurtAnswerAltstr, countQuizQuestionNr, countRadioBtnNr) {
// console.log('Grup: ' + countQuizQuestionNr);
// console.log('Btn Nr: ' + countRadioBtnNr);
  //console.log('Svarsalternative ' + insurtAnswerAltstr);
  /* Getting a counter the question gropup for the radioBtn.
  Create li and insurt the strings by one by into the corresponding
  span element, which is placed inside the li,
  The span for the answedering alternative are named "quizAnswerAlt". */

  let createdAnswerAltContainer = document.createElement('div');
  createdAnswerAltContainer.setAttribute('class', 'quizAnswerAlt');
  let createdAnswerAltBtn = document.createElement('input'); // Must ha tabindex
  createdAnswerAltBtn.tabIndex = tabIndexNrQuestionGroupAlt;
  createdAnswerAltBtn.setAttribute('type', 'radio');
  createdAnswerAltBtn.setAttribute('name', 'radioBtn' + countQuizQuestionNr);
  createdAnswerAltBtn.setAttribute('class', 'radioBtn');
  createdAnswerAltBtn.setAttribute('id', 'radioBtn' + countQuizQuestionNr + '_' + countRadioBtnNr);
  createdAnswerAltBtn.setAttribute('value', controller.htmlDecode(insurtAnswerAltstr));

  let getSpanAnsweringAltLabel = document.createElement('span');
  let getAnsweringAltLabel = document.createElement('label');
  getAnsweringAltLabel.setAttribute('for', 'radioBtn' + countQuizQuestionNr + '_' + countRadioBtnNr);
  //getAnsweringAltLabel.setAttribute('class', 'quizAnswerAlt');

  getSpanAnsweringAltLabel.textContent = controller.htmlDecode(insurtAnswerAltstr);

  // If looping the first radioBtn add a class checker for it
  if (countRadioBtnNr === 1) {
    createdAnswerAltBtn.setAttribute('checked', 'checked');
  }


  getAnsweringAltLabel.appendChild(createdAnswerAltBtn);
  getAnsweringAltLabel.appendChild(getSpanAnsweringAltLabel);
  createdAnswerAltContainer.appendChild(getAnsweringAltLabel);
  createdQuizContainerGroup.appendChild(createdAnswerAltContainer);
}

function createSubmitBtn () {
  let getCreatedBtnSubmit = document.createElement('button');
  getCreatedBtnSubmit.setAttribute('id', 'submitQuiz');
  getCreatedBtnSubmit.textContent = 'Done';
  getQuizPage.appendChild(getCreatedBtnSubmit);
}
function renderResultModal (countCorrectAnswered, countQuizQuestionNr) {
  let insurtQuestionResult = document.querySelector('#insurtQuizResult');
  insurtQuestionResult.textContent = 'You have answered: ' + countCorrectAnswered + '/' + countQuizQuestionNr + ' questions correct!';
//  getResultModal.setAttribute('style', 'display: block');
}

function renderStatsPage (countCorrectAnswered, countQuizQuestionNr) {
  console.log('vfdzv');
  let getStatsNr1 = document.querySelector('#container__nr1');
  console.log(getStatsNr1);
  getStatsNr1.textContent = countQuizQuestionNr;


  let getStatsNr2 = document.querySelector('#container__nr2');
  getStatsNr2.textContent = countCorrectAnswered;


  let getStatsNr3 = document.querySelector('#container__nr3');
  getStatsNr3.textContent = 0;

  let getStatsNr4 = document.querySelector('#container__nr4');
  getStatsNr4.textContent = 0 + '%';
}
// function renderAboutPage() {
//   //let getAbouPage = document.querySelector('#abotPage');
//
//
// }
// let test = document.querySelector('input[name=radioButton1]');

export default {
  getQuizPlayed: getQuizPlayed,
  loadQuizHeadLine: loadQuizHeadLine,
  countQuizGameTurns: countQuizGameTurns,
  getQuizPage: getQuizPage,
  renderQuizContainerQuestion: renderQuizContainerQuestion,
  renderQuizAnswerAlt: renderQuizAnswerAlt,
  createSubmitBtn: createSubmitBtn,
  getResultModal: getResultModal,
  renderResultModal: renderResultModal,
  renderStatsPage: renderStatsPage
}
