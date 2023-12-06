import React, { useEffect, useState } from "react";
import AddTestPartPanel from "./AddTestPartPanel/AddTestPartPanel";
import ClassicTest from "./ClassicTest/ClassicTest";
import MultipleChoiceTest from "./MultipleChoiceTest/MultipleChoiceTest";
import BooleanTest from "./BooleanTest/BooleanTest";
import PhotoAnswersTest from "./PhotoAnswersTest/PhotoAnswersTest";
import PhotoQuestionTest from "./PhotoQuestionTest/PhotoQuestionTest";
import MatchingTest from "./MatchingTest/MatchingTest";
import { useSelector } from "react-redux";
import { getIsSubmit } from "../../../../redux/config/configSelectors";
import valivateTestQuestions from "../../../../helpers/valivateTestQuestions";
import { useDispatch } from "react-redux";
import { setDefault, setUnsubmit } from "../../../../redux/config/configSlice";
import {
  crateTestQuestionsThunk,
  deleteQuestionThunk,
  getTestByTaskIdThunk,
  updateQuestionThunk,
} from "../../../../redux/task/taskOperation";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";
import styles from "./TestContructor.module.scss";
import { getUserType } from "../../../../redux/user/userSelectors";

const TestContructor = ({ testData = {} }) => {
  const [parts, setParts] = useState(
    [...testData?.testQuestions]
      .sort((itemA, itemB) => itemA.questionNumber - itemB.questionNumber)
      .map((part) => {
        if (part.questionType === "matching") {
          return {
            ...part,
            id: part.questionId,
            leftOptions: part.questionAnswers.left.map(({ value }) => value),
            rightOptions: part.questionAnswers.right.map(({ value }) => value),
            questionAnswers: part.questionAnswers.left.map((leftOpt) => ({
              leftText: leftOpt.value,
              rightText: part.questionAnswers.right.find(
                ({ id }) => id === leftOpt.rightId
              ).value,
            })),
          };
        }
        return {
          ...part,
          id: part.questionId,
        };
      }) || []
  );
  const { lessonId } = useParams();
  const { testId } = testData;
  const isSubmit = useSelector(getIsSubmit);
  const userType = useSelector(getUserType);
  const dispatch = useDispatch();

  const handleSubmitChanges = (questionId) => {
    const updatedData = {
      ...parts.find(({ questionId: id }) => id === questionId),
    };
    delete updatedData.questionId;
    if (updatedData.questionType === "matching") {
      delete updatedData.leftOptions;
      delete updatedData.rightOptions;
    }
    console.log(updatedData);
    dispatch(updateQuestionThunk({ questionId, questionData: updatedData }));
  };

  const handleDragEnd = ({ source, destination }) => {
    const startIndex = source.index;
    const endIndex = destination?.index;
    if (!destination || startIndex === endIndex) {
      return;
    }
    setParts((prev) => {
      const reorderedAllParts = [...prev];
      const [removed] = reorderedAllParts.splice(startIndex, 1);
      reorderedAllParts.splice(endIndex, 0, removed);
      const updatedState = reorderedAllParts.map((part, index) => {
        if (part.questionId) {
          if (part.questionType === "question_with_photo") {
            dispatch(
              updateQuestionThunk({
                questionId: part.id,
                questionData: {
                  questionText: part.questionText,
                  questionNumber: part.questionNumber,
                  questionScore: part.questionScore,
                  questionType: part.questionType,
                  hided: part.hided,
                  imagePath: part.imagePath,
                },
              })
            );
          } else {
            dispatch(
              updateQuestionThunk({
                questionId: part.id,
                questionData: {
                  questionText: part.questionText,
                  questionNumber: part.questionNumber,
                  questionScore: part.questionScore,
                  questionType: part.questionType,
                  hided: part.hided,
                  questionAnswers: part.questionAnswers,
                },
              })
            );
          }
        }
        return {
          ...part,
          questionNumber: index + 1,
        };
      });
      return updatedState;
    });
  };

  const handleDeleteQuestion = (questionId) => {
    if (parts.find(({ questionId: id }) => id === questionId)) {
      dispatch(deleteQuestionThunk(questionId)).then(() =>
        setParts((prev) => prev.filter(({ id }) => id !== questionId))
      );
      return;
    }
    setParts((prev) => prev.filter(({ id }) => id !== questionId));
  };

  const renderTestParts = () =>
    parts.map((part, index) => {
      console.log(part);
      return (
        <Draggable key={part.id} draggableId={`${part.id}`} index={index}>
          {(provided) => {
            switch (part.questionType) {
              case "test":
                return (
                  <div ref={provided.innerRef} {...provided.draggableProps}>
                    <ClassicTest
                      part={part}
                      setParts={setParts}
                      key={part.id || part.questionId}
                      handleSubmitChanges={handleSubmitChanges}
                      dragHandleProps={provided.dragHandleProps}
                      handleDeleteQuestion={handleDeleteQuestion}
                    />
                  </div>
                );
              case "multiple_choice":
                return (
                  <div ref={provided.innerRef} {...provided.draggableProps}>
                    <MultipleChoiceTest
                      part={part}
                      setParts={setParts}
                      key={part.id || part.questionId}
                      handleSubmitChanges={handleSubmitChanges}
                      dragHandleProps={provided.dragHandleProps}
                      handleDeleteQuestion={handleDeleteQuestion}
                    />
                  </div>
                );
              case "boolean":
                return (
                  <div ref={provided.innerRef} {...provided.draggableProps}>
                    <BooleanTest
                      part={part}
                      setParts={setParts}
                      key={part.id || part.questionId}
                      handleSubmitChanges={handleSubmitChanges}
                      dragHandleProps={provided.dragHandleProps}
                      handleDeleteQuestion={handleDeleteQuestion}
                    />
                  </div>
                );
              case "answer_with_photo":
                return (
                  <div ref={provided.innerRef} {...provided.draggableProps}>
                    <PhotoAnswersTest
                      part={part}
                      setParts={setParts}
                      key={part.id || part.questionId}
                      handleSubmitChanges={handleSubmitChanges}
                      dragHandleProps={provided.dragHandleProps}
                      handleDeleteQuestion={handleDeleteQuestion}
                    />
                  </div>
                );
              case "question_with_photo":
                return (
                  <div ref={provided.innerRef} {...provided.draggableProps}>
                    <PhotoQuestionTest
                      part={part}
                      setParts={setParts}
                      key={part.id || part.questionId}
                      handleSubmitChanges={handleSubmitChanges}
                      dragHandleProps={provided.dragHandleProps}
                      handleDeleteQuestion={handleDeleteQuestion}
                    />
                  </div>
                );
              case "matching":
                return (
                  <div ref={provided.innerRef} {...provided.draggableProps}>
                    <MatchingTest
                      part={part}
                      setParts={setParts}
                      key={part.id || part.questionId}
                      handleSubmitChanges={handleSubmitChanges}
                      dragHandleProps={provided.dragHandleProps}
                      handleDeleteQuestion={handleDeleteQuestion}
                    />
                  </div>
                );
              default:
                return null;
            }
          }}
        </Draggable>
      );
    });

  useEffect(() => {
    if (isSubmit) {
      try {
        const data = valivateTestQuestions(parts);
        console.log(data);
        console.log(testId);
        if (data.length !== 0) {
          dispatch(crateTestQuestionsThunk({ testId, data })).then(() =>
            setParts(testData?.testQuestions || [])
          );
        }
        dispatch(setDefault());
        dispatch(getTestByTaskIdThunk({ lessonId: +lessonId, userType }));
      } catch (error) {
        dispatch(setUnsubmit());
        console.log(error.message);
        console.log(error.details);
      }
    }
    // eslint-disable-next-line
  }, [isSubmit, userType]);

  return (
    <div className={styles.constructorWrapper}>
      {parts.length !== 0 && (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="testQuetions">
            {(provided) => (
              <div
                className={styles.partsWrapper}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {renderTestParts()}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
      {testId ? (
        <AddTestPartPanel questionsCount={parts.length} setParts={setParts} />
      ) : (
        <p>PLease create your test configuration first</p>
      )}
    </div>
  );
};

export default TestContructor;
