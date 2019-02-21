// ----------------------- The modells -----------------------
export default {
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
}
