const valivateTestQuestions = (parts) => {
  // parts.forEach(
  //   ({
  //     questionType,
  //     questionText,
  //     questionScore,
  //     questionAnswers,
  //     id,
  //     questionNumber,
  //   }) => {
  //     switch (questionType) {
  //       case "test":
  //         if (questionText === "") {
  //           const error = new Error("Please write your question first");
  //           error.details = questionNumber;
  //           throw error;
  //         }
  //         if (2 > questionAnswers.length || questionAnswers.length > 4) {
  //           const error = new Error("Question must have 2, 3 or 4 options");
  //           error.details = questionNumber;
  //           throw error;
  //         }
  //         if (questionScore === 0) {
  //           const error = new Error("Please write score for question");
  //           error.details = questionNumber;
  //           throw error;
  //         }
  //       case "boolean":
  //     }
  //   }
  // );
  return parts
    .filter((item) => !item.questionId)
    .map(
      ({
        questionType,
        questionText,
        questionScore,
        hided,
        questionAnswers,
        questionNumber,
        imagePath,
      }) => {
        if (questionType === "matching") {
          return {
            questionType,
            questionText,
            questionScore: +questionScore,
            hided,
            questionAnswers,
            questionNumber,
          };
        }
        if (questionType === "question_with_photo") {
          return {
            questionType,
            questionText,
            questionScore: +questionScore,
            hided,
            imagePath,
            questionAnswers,
            questionNumber,
          };
        }
        return {
          questionType,
          questionText,
          questionScore: +questionScore,
          hided,
          questionAnswers,
          questionNumber,
        };
      }
    );
};

export default valivateTestQuestions;
