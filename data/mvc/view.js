// ----------------------- Redering the views ----------------------------------
import controller from './controller.js';

// Definening varbles which are in diff functions and must working in diff funtions
let getQuizPlayed = document.querySelector('#quizPlayed');
let getQuizPage = document.querySelector('#quizPage');
let createdQuizContainerGroup;
let countQuizTurns = 0;

function countQuizGameTurns () {
  countQuizTurns += 1;
  getQuizPlayed.textContent = 'Quiz ' + countQuizTurns;
}

// Html elements are creating in
function loadQuizHeadLine (quizHeadLine) {
  let getHeadLinePlace = document.querySelector('#quizHeadLine');
  getHeadLinePlace.textContent = quizHeadLine;
}

/* Create a container for the questtions named "quizContainer"countQuizGameTurns
Insurt the question inside a p element named "quizQuestion" */
function renderQuizContainerQuestion (tabIndexNrQuestionGroup, insurtQuestionStr) {
  createdQuizContainerGroup = document.createElement('section');
  createdQuizContainerGroup.setAttribute('class', 'quizContainer');

  let createdQuizQuestionPlace = document.createElement('span');
  createdQuizQuestionPlace.setAttribute('class', 'quizQuestion');
  createdQuizQuestionPlace.tabIndex = tabIndexNrQuestionGroup;
  createdQuizQuestionPlace.textContent = controller.htmlDecode(insurtQuestionStr);

  createdQuizContainerGroup.appendChild(createdQuizQuestionPlace);
  getQuizPage.appendChild(createdQuizContainerGroup);
  let getQuestionGroupLine = document.createElement('div');
  getQuestionGroupLine.setAttribute('class', 'groupLine');
  getQuizPage.appendChild(getQuestionGroupLine);
}

function renderQuizAnswerAlt (tabIndexNrQuestionGroupAlt, insurtAnswerAltstr, countQuizQuestionNr, countRadioBtnNr) {
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
function renderResultModal (countCorrectAnswered, countedQuestionTot) {
  let insurtQuestionResult = document.querySelector('#insurtQuizResult');
  insurtQuestionResult.textContent = 'You have answered: ' + countCorrectAnswered + '/' + countedQuestionTot + ' questions correct!';
}
function renderStatsPage (countCorrectAnswered, countQuizQuestionNr) {
  let getStatsNr1 = document.querySelector('#container__nr1');
  getStatsNr1.textContent = countQuizQuestionNr;

  let getStatsNr2 = document.querySelector('#container__nr2');
  getStatsNr2.textContent = countCorrectAnswered;

  let getStatsNr3 = document.querySelector('#container__nr3');
  getStatsNr3.textContent = 0;

  let getStatsNr4 = document.querySelector('#container__nr4');
  getStatsNr4.textContent = 0 + '%';
}

export default {
  getQuizPlayed: getQuizPlayed,
  countQuizGameTurns: countQuizGameTurns,
  loadQuizHeadLine: loadQuizHeadLine,
  getQuizPage: getQuizPage,
  renderQuizContainerQuestion: renderQuizContainerQuestion,
  renderQuizAnswerAlt: renderQuizAnswerAlt,
  createSubmitBtn: createSubmitBtn,
  renderResultModal: renderResultModal,
  renderStatsPage: renderStatsPage
}
