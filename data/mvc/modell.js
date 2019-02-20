// ----------------------- The modells -----------------------
export default {
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
  addQuizQuestionAnswerAlt: function (quizAnswerAltGroupArr) {
    this.quizQuestionAnswerAlt.push({ quizAnswerAltGroupArr: quizAnswerAltGroupArr });
  }
  // questionCorrectAnswer: [],
  //   addQuestionCorrectAnswer: function (saveCorrectAnswer) {
  //     this.questionCorrectAnswer.push({ saveCorrectAnswer: saveCorrectAnswer });
  // },
  // yourAnswer: [],
  // addYourAnswer: function (yourAnswered) {
  //   this.yourAnswer.push({ yourAnswered: yourAnswered });
  //}
}
