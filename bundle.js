var controller = (function () {
  'use strict';

  // ----------------------- Redering the views ----------------------------------

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

    // createdAnswerAltForm = document.createElement('form');
    // createdAnswerAltForm.setAttribute('class', 'quizForm' + countQuizGroupForm);

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
    let createdAnswerAltBtn = document.createElement('input');
    createdAnswerAltBtn.tabIndex = tabIndexNrQuestionGroupAlt;
    createdAnswerAltBtn.setAttribute('type', 'radio');
    createdAnswerAltBtn.setAttribute('name', 'radioBtn' + countQuizQuestionGroup);
    createdAnswerAltBtn.setAttribute('class', 'radioBtn');
    //createdAnswerAltBtn.setAttribute('id', 'radioBtn' + countQuizQuestionGroup + '_' + countRadioBtnNr);
    createdAnswerAltBtn.setAttribute('value', insurtAnswerAltstr);

    let getSpanAnsweringAltLabel = document.createElement('span');
    let getAnsweringAltLabel = document.createElement('label');
    getAnsweringAltLabel.tabIndex = tabIndexNrQuestionGroupAlt;

    getAnsweringAltLabel.setAttribute('for', 'radioBtn' + countQuizQuestionGroup + '_' + countRadioBtnNr);
    getAnsweringAltLabel.setAttribute('class', 'quizAnswerAlt');

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

  var view = {
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
  };

  // ----------------------- The modells -----------------------
  var modell = {
    /* Handels the incomming data from the API, individualy ----
       Först the questions */
    quizQuestion: [],
    addQuizQuestion: function (savedQuizData) {
      this.quizQuestion.push({ savedQuizData: savedQuizData });
    },
    quizQuestionAnswerAlt: [],
    addQuizQuestionAnswerAlt: function (quizAnswerAltGroupArr) {
      this.quizQuestionAnswerAlt.push({ quizAnswerAltGroupArr: quizAnswerAltGroupArr });
    },
    yourAnswer: [],
    addYourAnswer: function (yourAnswered) {
      this.yourAnswer.push({ yourAnswered: yourAnswered });
    },
    questionCorrectAnswer: [],
    addQuestionCorrectAnswer: function (saveCorrectAnswer) {
      this.questionCorrectAnswer.push({ saveCorrectAnswer: saveCorrectAnswer });
    }
  };

  // ----------------------- The core of the whole Quiz Webbsite -----------------------
  //startApp();

  //let countQuizGroupAnswerAlt = 0;
  let countQuizGroupForm = 0;
  // Counter for how many times you had played the Quiz
  let countQuizTurns$1 = 0;
  let countQuizQuestionGroup = 0;

  document.querySelector("#quizPage").addEventListener("submit", (event) => event.preventDefault());

  //let insurtQuizQuestionAnswerAlt = [];
  let quizAnswerAltGroupArr, getAnswerAltFromArr, getAnswerAltstr, getQuestion;
  // Decode the strings chowinf correct text
  function htmlDecode (input) {
    let textStrTohtml = new DOMParser().parseFromString(input, "text/html");
    return textStrTohtml.documentElement.textContent;
  }
  // Sending a headline string into the function
  view.loadQuizHeadLine('Quiz Master');
  console.log(KeyboardEvent.key);


  drawerMenu();
  function drawerMenu () {
    let getDrawerMenuFrame = document.querySelector('#drawerMenuFrame');
    let getDrawerMenue = document.querySelectorAll('header button');
    for (let i = 0; i < getDrawerMenue.length; i++) {
      let getTargetBtn = getDrawerMenue[i];
      getTargetBtn.addEventListener('click', function (e) {
        let targetText = e.target.textContent;
        document.querySelector('#drawerMenuFrame').setAttribute('style', 'display: block');

        if (targetText === 'Game screen') {
          view.loadQuizHeadLine('Quiz Master');
          getDrawerMenuFrame.setAttribute('style', 'display: none');
          document.querySelector('#statsBox').setAttribute('style', 'display: none');
                  document.querySelector('#abotPage').setAttribute('style', 'display: none');
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



  runQuizTurn();
  // Run a turn of the QUIZ
  function runQuizTurn () {
    view.countQuizTurns(countQuizTurns$1);

  // let getQuizBtn = document.querySelector('#runQuiz');
  // getQuizBtn.addEventListener('click', function () {
  console.log('2.) Modellen för mina frågor ser ut enligt:');
  console.log(modell.quizQuestion);
    let requestQuizQuestions = new XMLHttpRequest();
    requestQuizQuestions.addEventListener('load', getQuizData);
    requestQuizQuestions.open("GET", 'https://opentdb.com/api.php?amount=10');
    requestQuizQuestions.send();
    // Remove the eventlistener !!!
  //})
  }

  function getQuizData () {
    let incommingQuizData = JSON.parse(this.responseText);
    let quizDataFromObj = incommingQuizData['results'];
    console.log('1.) Inkommande data från objektet där jag tar ut resultatet!');
    console.log(quizDataFromObj);
    createCounterGetModellValues(quizDataFromObj);
  }
  /* The length in quizDataFromObj is according the incommingQuizData
  above and is state in urlStr */
  function createCounterGetModellValues (quizDataFromObj) {
    countQuizQuestionGroup = 0;
    let getQuestionStr;
    for (let i = 0; i < quizDataFromObj.length; i++) {
      /* A counter is created which count for both the question groups and
      the answering group. The counters which is part of the question are defined above and increase by one inside every round turn.
      I define a tabindex nr for the question starting at 10 and every 10 after it. */

      countQuizQuestionGroup += 1;
      let tabIndexNrQuestionGroup = countQuizQuestionGroup + '0';

      /* The data received from the modell and insurted into the view for rendering.
      For last the array is clear of data */

      // The questions -------------------------------------------------------------------------------------
      let savedQuizData = quizDataFromObj[i]['question'];
      modell.addQuizQuestion('Q' + countQuizQuestionGroup + '. ' + savedQuizData);

      // Get the individual question string from modell and forwarding it into the view
      getQuestion = modell.quizQuestion;
      for (let i = 0; i < getQuestion.length; i++) {
        getQuestionStr = getQuestion[i]['savedQuizData'];
      }
      // The answer alternative. An array is created inside every turn.
      quizAnswerAltGroupArr = [];
      countQuizGroupForm += 1;

      //Mergeing 2 objs strings into one array (The answer alternatives) and send it into the modell
      let saveQuizQuestionAnswerAlt1 = quizDataFromObj[i]['incorrect_answers'];
      for (let i = 0; i < saveQuizQuestionAnswerAlt1.length; i++) {
          quizAnswerAltGroupArr.push(saveQuizQuestionAnswerAlt1[i]);
        }
      let saveQuizQuestionAnswerAlt2 = quizDataFromObj[i]['correct_answer'];

      quizAnswerAltGroupArr.push(saveQuizQuestionAnswerAlt2);
      // All the correct answered is store in the modell
      modell.addQuestionCorrectAnswer(saveQuizQuestionAnswerAlt2);

      modell.addQuizQuestionAnswerAlt(quizAnswerAltGroupArr);
      view.renderQuizContainerQuestion(tabIndexNrQuestionGroup, getQuestionStr, countQuizGroupForm);
      // The array with the answer alternatives are received and its array with the alternatives which are needed loop through
      let getQuestionAnswerAltArr = modell.quizQuestionAnswerAlt;
      //console.log(getQuestionAnswerAltArr);
      for (let i = 0; i < getQuestionAnswerAltArr.length; i++) {
        getAnswerAltFromArr = getQuestionAnswerAltArr[i]['quizAnswerAltGroupArr'];
      }

      // A counter for specific radioBtn in a group
      let countRadioBtnNr = 0;
      for (let i = 0; i < getAnswerAltFromArr.length; i++) {
        countRadioBtnNr += 1;
        //console.log(countQuizGroup);
        // Correct answer is index = 3
        getAnswerAltstr = getAnswerAltFromArr[i];
        // I define tabindex for answeringAlt based the question tabindex follow by a nr 1,2,3,4 ....
        let tabIndexNrQuestionGroupAlt = '' + countQuizQuestionGroup + countRadioBtnNr;
        view.renderQuizAnswerAlt(tabIndexNrQuestionGroupAlt, getAnswerAltstr, countQuizQuestionGroup, countRadioBtnNr); // Fault????
      }
    }
    view.createSubmitBtn();
    quizSubmit();

    // Emptying the arraies
    modell.quizQuestion.length = 0;
    modell.quizQuestionAnswerAlt.length = 0;
  }
  // Save the incomming data from the API and send it into the modell

  //Submit the quiz
  function quizSubmit () {
    let getQuizSubmitBtn = document.querySelector('#submitQuiz');
    getQuizSubmitBtn.addEventListener('submit', function(event) {
      event.preventDefault();
      let targetRadioStr;

      let formForRadio = view.getQuizPage;
      let nameRadioBtn = document.querySelectorAll('.radioBtn');
      for (let i = 0; i < nameRadioBtn.length; i++) {
        let saveRadioBtnName = nameRadioBtn[i].getAttribute('name');
        let targetRadiosBtn = formForRadio.elements[saveRadioBtnName];

          // loop through list of radio buttons
          for (let i = 0, len = targetRadiosBtn.length; i < len; i++) {
            if (targetRadiosBtn[i].checked) {
              targetRadioStr = targetRadiosBtn[i].value;
              modell.addYourAnswer(targetRadioStr);
              break;
            }
          }
        }

  // Your answer is catching´and send into the modell when finish the calculateResult is loading

      calculateResult();

      let mordalBtn = document.querySelectorAll('#modalBtn button');
      for (let i = 0; i < mordalBtn.length; i++) {
        let getTargetMordalBtn = mordalBtn[i];
        getTargetMordalBtn.addEventListener('click', function(e) {
          let tagetE = e.target;
          if (tagetE.textContent === 'New Quiz') {
            countQuizTurns$1 += 1;
            view.countQuizTurns(countQuizTurns$1);
            view.getQuizPage.scrollTop = 0;
            view.getResultModal.setAttribute('style', 'display: none');
            view.getQuizPage.textContent = '';
            runQuizTurn();
          }
          else if (tagetE.textContent === 'Close') ;
          //event.preventDefault();
        });
      }
    });
  }
  /* Both your answered and the correct answer is incomming from the modell.
  If the both strings match from your answered and the corect answered, it will be a
  add calculation for the finish result which will be showed in the mortal box */
    let countCorrectAnswered = 0;
  function calculateResult () {
    countQuizQuestionGroup = 0;
    let questionsAnswer = modell.yourAnswer;
    for (let i = 0; i < questionsAnswer.length; i++) {
      countQuizQuestionGroup += 1;
      let getYourAnsweredStr = questionsAnswer[i]['yourAnswered'];

      let questionsCorrectAnswer = modell.questionCorrectAnswer;
      let getCorrectAnswerStr = questionsCorrectAnswer[i]['saveCorrectAnswer']; // Error undefined


      if (getYourAnsweredStr === getCorrectAnswerStr) {
        countCorrectAnswered += 1;
      }
      view.renderResultModal(countCorrectAnswered, countQuizQuestionGroup);
    }
    // Emtying the arraies
    //modell.questionCorrectAnswer.length = 0;
  //  modell.yourAnswer.length = 0;

  }
  view.renderStatsPage(countCorrectAnswered, countQuizQuestionGroup);
  // keyBoardListenSpaceEnterRadioChecker();
  //
  // function keyBoardListenSpaceEnterRadioChecker () {
  //   console.log('fvd');
  //   let getTargetRadio = document.querySelectorAll('.quizAnswerAlt');
  //   console.log(getTargetRadio);
  //   for (let i = 0; i < getTargetRadio.length; i++) {
  //     let getRadio = getTargetRadio[i]; //getAttribute('tabIndex');
  //     console.log(getRadio);
  //   }
  //
  //   document.addEventListener('keydown', function(event) {
  //     let targetKey = event.which;
  //
  //     // if (targetKey === 13 || targetKey === 32) {
  //       //
  //       //   document.getElementById("red").checked = true;
  //       // }
  //     });
  // }

    // 32 = Space and 13 = Enter
    //}

    console.log(modell.quizQuestion);
    console.log(modell.quizQuestionAnswerAlt);
    console.log(modell.yourAnswer);
    console.log(modell.questionCorrectAnswer);

  var controller = {
    htmlDecode: htmlDecode
  };

  return controller;

}());
