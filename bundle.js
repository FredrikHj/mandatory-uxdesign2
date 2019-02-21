var controller = (function () {
  'use strict';

  // ----------------------- Redering the views ----------------------------------

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

  var view = {
    getQuizPlayed: getQuizPlayed,
    countQuizGameTurns: countQuizGameTurns,
    loadQuizHeadLine: loadQuizHeadLine,
    getQuizPage: getQuizPage,
    renderQuizContainerQuestion: renderQuizContainerQuestion,
    renderQuizAnswerAlt: renderQuizAnswerAlt,
    createSubmitBtn: createSubmitBtn,
    renderResultModal: renderResultModal,
    renderStatsPage: renderStatsPage
  };

  // ----------------------- The modells -----------------------
  var modell = {
    /* Handels the incomming data from the API, individualy ----
       1 - The questions
       2 - The answering alternatives
    */
    quizQuestion: [],
    addQuizQuestion: function (savedQuizData) {
      this.quizQuestion.push({ savedQuizData: savedQuizData });
    },
    quizQuestionAnswerAlt: [],
    addQuizQuestionAnswerAlt: function (quizAnswerAltArr) {
      this.quizQuestionAnswerAlt.push({ quizAnswerAltArr: quizAnswerAltArr });
    }
  };

  // ----------------------- The core of the whole Quiz Webbsite -----------------------
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

  var controller = {
    htmlDecode: htmlDecode
  };

  return controller;

}());
