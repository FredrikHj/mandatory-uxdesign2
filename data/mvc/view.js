// ----------------------- Redering the views ----------------------------------
import controller from './controller.js';

let getQuizPlayed = document.querySelector('#quizPlayed');

function countQuizTurns (countQuizTurns) {
  countQuizTurns += 1;
  getQuizPlayed.textContent = 'Quiz ' + countQuizTurns;
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

function renderQuizContainerQuestion (tabIndexNrQuestionGroup, insurtQuestionStr, countQuizGroupForm) {
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

  //controller.getCorrectAnswer(countQuizGroupForm);
}

function renderQuizAnswerAlt (tabIndexNrQuestionGroupAlt, insurtAnswerAltstr, countQuizQuestionGroup, countRadioBtnNr) {
// console.log('Grup: ' + countQuizQuestionGroup);
// console.log('Btn Nr: ' + countRadioBtnNr);
  //console.log('Svarsalternative ' + insurtAnswerAltstr);
  /* Getting a counter the question gropup for the radioBtn.
  Create li and insurt the strings by one by into the corresponding
  span element, which is placed inside the li,
  The span for the answedering alternative are named "quizAnswerAlt". */

  let createdAnswerAltContainer = document.createElement('div');
  createdAnswerAltContainer.setAttribute('class', 'quizAnswerAlt');
  let createdAnswerAltBtn = document.createElement('input'); // Must ha tabindex for rowking
  createdAnswerAltBtn.tabIndex = tabIndexNrQuestionGroupAlt;
  createdAnswerAltBtn.setAttribute('type', 'radio');
  createdAnswerAltBtn.setAttribute('name', 'radioBtn' + countQuizQuestionGroup);
  createdAnswerAltBtn.setAttribute('class', 'radioBtn');
  //createdAnswerAltBtn.setAttribute('id', 'radioBtn' + countQuizQuestionGroup + '_' + countRadioBtnNr);
  createdAnswerAltBtn.setAttribute('value', insurtAnswerAltstr);

  let getSpanAnsweringAltLabel = document.createElement('span');
  let getAnsweringAltLabel = document.createElement('label');

  getAnsweringAltLabel.setAttribute('for', 'radioBtn' + countQuizQuestionGroup + '_' + countRadioBtnNr);
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
function renderResultModal (countCorrectAnswered, countQuizQuestionGroup) {
  let insurtQuestionResult = document.querySelector('#insurtQuizResult');
  insurtQuestionResult.textContent = 'You have answered: ' + countCorrectAnswered + '/' + countQuizQuestionGroup + ' questions correct!';
  getResultModal.setAttribute('style', 'display: block');
}

function renderStatsPage (countCorrectAnswered, countQuizQuestionGroup) {
  console.log('vfdzv');
  let getStatsNr1 = document.querySelector('#container__nr1');
  console.log(getStatsNr1);
  getStatsNr1.textContent = countQuizQuestionGroup;


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
  countQuizTurns: countQuizTurns,
  getQuizPage: getQuizPage,
  renderQuizContainerQuestion: renderQuizContainerQuestion,
  renderQuizAnswerAlt: renderQuizAnswerAlt,
  createSubmitBtn: createSubmitBtn,
  getResultModal: getResultModal,
  renderResultModal: renderResultModal,
  renderStatsPage: renderStatsPage
}
