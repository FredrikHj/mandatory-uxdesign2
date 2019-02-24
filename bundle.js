var controller = (function () {
  'use strict';

  // ----------------------- Redering the views ----------------------------------

  // Definening varbles which are in diff functions and must working in diff funtions
  let getQuizPlayed = document.querySelector('#quizPlayed');
  let getQuizPage = document.querySelector('#quizPage');
  let createdQuizContainerGroup;
  let countQuizGameTurn = 0;
  //let totQuizGameTurns = 0;
  let totQuizAnswer = 0;
  countQuizGameTurns();
  function countQuizGameTurns () {
    countQuizGameTurn += 1;
    getQuizPlayed.textContent = 'Quiz ' + countQuizGameTurn;
  }

  // Function for the headline is created and take one string
  function loadQuizHeadLine (quizHeadLine) {
    let getHeadLinePlace = document.querySelector('#quizHeadLine');
    getHeadLinePlace.textContent = quizHeadLine;
  }
  // ======================================== Html elements are creating ========================================
  function renderQuizContainerQuestion (tabIndexNrQuestionGroup, insurtQuestionStr) {
    /* Create a container for the questtions named "quizContainer"countQuizGameTurnss
    Insurt the question inside a p element named "quizQuestion" */
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
    let radioBtnName = 'radioBtn' + countQuizQuestionNr;
    createdAnswerAltBtn.setAttribute('name', radioBtnName);
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
  // ============================================================================================================
  function createSubmitBtn () {
    let getCreatedBtnSubmit = document.createElement('button');
    getCreatedBtnSubmit.setAttribute('id', 'submitQuiz');
    getCreatedBtnSubmit.textContent = 'Done';
    getQuizPage.appendChild(getCreatedBtnSubmit);
  }


  function renderResultModal (countCorrectAnswered, countQuizQuestionNr) {
    console.log('countQuizQuestionNr: ' + countQuizQuestionNr);
    console.log('countQuizGameTurn 77 ' + countQuizGameTurn); // error in calc
    let insurtQuestionResult = document.querySelector('#insurtQuizResult');
    totQuizAnswer = countQuizQuestionNr * countQuizGameTurn;
    console.log('Tot' + totQuizAnswer);
    insurtQuestionResult.textContent = 'You have answered: ' + countCorrectAnswered + '/' + totQuizAnswer + ' questions correct!';
  }

  function renderStatsPage (countCorrectAnswered, countQuizQuestionNr) {
    let getStatsNr1 = document.querySelector('#container__nr1');
    getStatsNr1.textContent = countQuizGameTurn;

    let getStatsNr2 = document.querySelector('#container__nr2');
    getStatsNr2.textContent = countCorrectAnswered;

    let getStatsNr3 = document.querySelector('#container__nr3');
    let totIncorrectAnswer = totQuizAnswer - countCorrectAnswered;
    getStatsNr3.textContent = totIncorrectAnswer;

    let getStatsNr4 = document.querySelector('#container__nr4');
    let percCorrect = countCorrectAnswered / (totIncorrectAnswer + countCorrectAnswered);
    getStatsNr4.textContent = percCorrect * 10 + '%';
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

  /* Counters for the QuizApp: -------------------------------------------
     Question groups
     GameTurns */

  let saveAnswerAltLastStr = '';
  let countCorrectAnswered = 0;
  let countQuizQuestionNr = 0;
  let correctAnswerStr = {};
  let getAnswerAltObj = '';
  let getQuestionStr = '';
  let getYourAnswerStr;
  let getAnswerAltStr;
  let correctAnswerOutObj;

  // Some usefull functions ---------------------------------------------

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
          document.querySelector('#aboutPage').setAttribute('style', 'display: none');
          view.getQuizPlayed.style.color = 'black';
          view.getQuizPage.setAttribute('style', 'display: block');

        }
        if (targetText === 'Stats') {
          view.loadQuizHeadLine('Stats');
          getDrawerMenuFrame.setAttribute('style', 'display: none');
          document.querySelector('#aboutPage').setAttribute('style', 'display: none');
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

          document.querySelector('#aboutPage').setAttribute('style', 'display: block');
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

    // ============================================= Handle Ajax and its data =============================================
    ajaxRequest();

    function ajaxRequest() {
      // let getQuizBtn = document.querySelector('#runQuiz');
      let requestQuiz;
      // getQuizBtn.addEventListener('click', function () {
        let quizDataFromObj;
        console.log('Ska utföra AJAX anrop');
        console.log('1.) Inkommande data från objektet där jag tar ut resultatet!');
        requestQuiz = new XMLHttpRequest();
        requestQuiz.addEventListener('load', function() {
          let incommingQuizData = JSON.parse(this.responseText);
          quizDataFromObj = incommingQuizData['results'];
          console.log(quizDataFromObj);
          ajaxDataIncomming(quizDataFromObj);
        });
        let questionAmmount = 5;
        requestQuiz.open('GET', 'https://opentdb.com/api.php?amount=' + questionAmmount);
        requestQuiz.send();
        return quizDataFromObj;
        //})
      }

    function ajaxDataIncomming (quizDataFromObj) {
      console.log('Incomming values:');
      countQuizQuestionNr = 0;

      /* The length in quizDataFromObj is according the incommingQuizData
      above and is state in urlStr */
      for (let i = 0; i < quizDataFromObj.length; i++) {
        /* A counter is created which count for both the question groups and
        the answering group. The counters which is part of the question are defined above and increase by one inside every round turn.
        I define a tabindex nr for the question starting at 10 and every 10 after it. */
        countQuizQuestionNr += 1;
        console.log('-----------------------------------------------------');
        console.log('Rad 117 - Loop turn Nr: ' + countQuizQuestionNr);
        let tabIndexNrQuestionGroup = countQuizQuestionNr + '0';

        /* The data received from the modell and inserted into the view for rendering. ====================================
        The questions */

        getQuestion(quizDataFromObj[i]);
        console.log('Rad 124 - Questionnr ' + countQuizQuestionNr + '.)');
        console.log(getQuestionStr);
        // Send data into the view
        view.renderQuizContainerQuestion(tabIndexNrQuestionGroup, getQuestionStr);

        // The answer alternative. An array is created inside every turn.
        let quizAnswerAltArr = [];
        let countRadioBtnNr = 0;
        getAnswerAlt(quizDataFromObj[i], quizAnswerAltArr);
        console.log('136 - AnswerAlt: ' + countQuizQuestionNr + '.)');
        for (let getAnswerAltFromObj in getAnswerAltObj) {
          // I define tabindex for answeringAlt based the question tabindex follow by a nr 1,2,3,4 ....
          countRadioBtnNr += 1;
          let tabIndexNrQuestionGroupAlt = '' + countQuizQuestionNr + countRadioBtnNr;

          getAnswerAltStr = getAnswerAltObj[getAnswerAltFromObj];
          console.log(htmlDecode(getAnswerAltStr));
          view.renderQuizAnswerAlt(tabIndexNrQuestionGroupAlt, getAnswerAltStr, countQuizQuestionNr, countRadioBtnNr); // Fault????
          // Triggering the calc of the matching answer
          // matchStr(saveAnswerAltLastStr);
        }
        console.log('Rad 150 - The correct answer?');

        // Insert the correct answer into a objekct you can loop through to getting the correct answering string
        correctAnswerStr[countQuizQuestionNr] = saveAnswerAltLastStr;

        // Some functions to be running right after the main function
      }
      view.createSubmitBtn();
      quizSubmit();
    }
  }
  // ======================================== Handle Ajax´s undelaying functions ========================================
  function getQuestion (quizDataFromObj) {
    let savedQuizQuestion = quizDataFromObj['question'];
    modell.addQuizQuestion('Q' + countQuizQuestionNr + '. ' + savedQuizQuestion);

    // Get the individual question string from modell and forwarding it into the view
    let getQuestion = modell.quizQuestion;
    for (let i = 0; i < getQuestion.length; i++) {
      getQuestionStr = getQuestion[i]['savedQuizData'];
    }
  }
  // ------------------------------------------------------------------------
  function getAnswerAlt (quizDataFromObj, quizAnswerAltArr) {
    /* Mergeing 2 objs strings into one array (The answer alternatives) and send it into the modell.
    The array with the incorrect answers */
    let saveAnswerAlt = quizDataFromObj['incorrect_answers'];
    for (let i = 0; i < saveAnswerAlt.length; i++) {
      quizAnswerAltArr.push(saveAnswerAlt[i]);
    }
    // The string with the correct_answer
    saveAnswerAltLastStr = quizDataFromObj['correct_answer'];
    quizAnswerAltArr.push(saveAnswerAltLastStr);
    modell.addQuizQuestionAnswerAlt(quizAnswerAltArr);

    /* The array with the answer alternatives are received and the array
    with the alternatives are needed loop through */
    let getAnswerAltArr = modell.quizQuestionAnswerAlt;
    for (let i = 0; i < getAnswerAltArr.length; i++) {
      getAnswerAltObj = getAnswerAltArr[i]['quizAnswerAltArr'];
    }

    // Returning value into the head function
    //retunedAnswerignAltArr = [saveAnswerAltLastStr, getAnswerAltStr];
    //return retunedAnswerignAltArr;
  }
  // ====================================================================================================================



  //Prevent reloading of the form
  document.querySelector("#quizPage").addEventListener("submit", (event) => event.preventDefault());

  function quizSubmit () {
    let getQuizSubmitBtn = document.querySelector('#submitQuiz');
    getQuizSubmitBtn.addEventListener('click', function() {
      console.log('dsf<');
      console.log('-----------------------------------------------------------');
      console.log('QuizSubmited :)');
      console.log('Rad 211 - Submit the Quiz');
      matchStr();
      // Sending the tot nr of correct_answer to the modal together widh the tot nr of question

      document.querySelector('#resultModal').setAttribute('style', 'display: block');
    });
  }
  modalBtns();
  function modalBtns () {
    document.querySelector('#modalBtnNewQuiz').addEventListener('click', function() {
      view.getQuizPage.textContent = ' ';
      view.getQuizPage.scrollTop = 0;
      document.querySelector('#resultModal').style.display = 'none';

      view.countQuizGameTurns ();
      runQuizGameTurn();

    });
    document.querySelector('#modalBtnClose').addEventListener('click', function() {
      location.reload();
    });
  }
  function matchStr() {
    /* looping through my radioBtn an if checked I comparing it with my answer.
    if correct it will add 1 so I can present how many correct answered I chose */
    let getRadioBtn = document.querySelectorAll('.radioBtn');
    for (let i = 0; i < getRadioBtn.length; i++) {
      let getCheckedRadioStr = getRadioBtn[i];

      if (getCheckedRadioStr.checked) {
        getYourAnswerStr = getCheckedRadioStr.value;

        // Get out the correct_answer string from the object
        for (let correctAnswerFromObj in correctAnswerStr) {
          correctAnswerOutObj = correctAnswerStr[correctAnswerFromObj];

          if (getYourAnswerStr === htmlDecode(correctAnswerOutObj)) {
            countCorrectAnswered += 1;
            view.renderResultModal(countCorrectAnswered, countQuizQuestionNr);
          }
          console.log('-----------------------------------------------------');
          console.log('Rad 243 - Your answer: ' + getYourAnswerStr + ' = ' + ' correct answer: ' + htmlDecode(correctAnswerOutObj) + ' That gives Nr: ' + countCorrectAnswered);
        }
      }
    }
    view.renderStatsPage(countCorrectAnswered, countQuizQuestionNr);
  }
    var controller = {
    htmlDecode: htmlDecode
  };

  return controller;

}());
