var controller = (function () {
  'use strict';

  // ----------------------- Redering the views ----------------------------------

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

  var view = {
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
  };

  // ----------------------- The modells -----------------------
  var modell = {
    /* Handels the incomming data from the API, individualy ----
       1 - The questions
       2 - The answering alternatives
       3 - The the correct answer
       4 - Your answer

       3 and 4 is comparing with eatch others and at last */
    quizQuestion: [],
    addQuizQuestion: function (savedQuizData) {
      this.quizQuestion.push({ savedQuizData: savedQuizData });
    },
    quizQuestionAnswerAlt: [],
    addQuizQuestionAnswerAlt: function (quizAnswerAltArr) {
      this.quizQuestionAnswerAlt.push({ quizAnswerAltArr: quizAnswerAltArr });
    }
    // questionCorrectAnswer: [],
    //   addQuestionCorrectAnswer: function (saveCorrectAnswer) {
    //     this.questionCorrectAnswer.push({ saveCorrectAnswer: saveCorrectAnswer });
    // },
    // yourAnswer: [],
    // addYourAnswer: function (yourAnswered) {
    //   this.yourAnswer.push({ yourAnswered: yourAnswered });
    //}
  };

  // ----------------------- The core of the whole Quiz Webbsite -----------------------
  //startApp();

  /* Counters for the QuizApp: -------------------------------------------
     Question groups
     GameTurns */
  let countQuizQuestionNr = 0;
  let countQuizGameTurns$1 = 0;

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
    view.countQuizGameTurns(countQuizGameTurns$1);

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
      let quizAnswerAltArr = [];

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
  countQuizGameTurns$1 = 1;
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

  var controller = {
    htmlDecode: htmlDecode
  };

  return controller;

}());
