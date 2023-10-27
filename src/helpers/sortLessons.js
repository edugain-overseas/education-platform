export const sortLessonsByDate = (lessons, tmblr = 1) => {
  return [...lessons].sort((lessonA, lessonB) => {
    console.log(tmblr);
    const dateA = new Date(lessonA.lesson_date);
    const dateB = new Date(lessonB.lesson_date);

    return tmblr ? dateB - dateA : dateA - dateB;
  });
};

export const sortLessonsByType = (lessons, tmblr = 1) => {
  return [...lessons].sort((lessonA, lessonB) => {
    const typeA = lessonA.lesson_type;
    const typeB = lessonB.lesson_type;

    const comparisonResult = typeA.localeCompare(typeB);

    return tmblr ? -comparisonResult : comparisonResult;
  });
};

export const sortLessonsByScore = (lessons, tmblr = 1) => {
  return [...lessons].sort((lessonA, lessonB) => {
    const scoreA = lessonA.score;
    const scoreB = lessonB.score;

    return tmblr ? scoreB - scoreA : scoreA - scoreB;
  });
};
