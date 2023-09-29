export const getSubjectMessages = (state) => state.subjectChat.messages;
export const getSubjectParticipantsData = (state) => state.subjectChat.participantsData;
export const getSubjectActiveUsers = (state) => state.subjectChat.activeData;
export const getSubjectAttachedFiles = (state) => state.subjectChat.attachedFilesToMessage.filesData;
export const getSubjectAttachFileLoading = (state) => state.subjectChat.attachedFilesToMessage.isLoading;
export const getSubjectFeedbackData = (state) => state.subjectChat.feedbackTo
export const getSubjectIsLoading = (state) => state.subjectChat.isLoading
export const getSubjectHistoryEnd = state => state.subjectChat.historyEnd