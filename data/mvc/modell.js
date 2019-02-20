// ----------------------- The modells -----------------------
export default {
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
}
