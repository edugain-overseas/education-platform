export const getMessages = (state) => state.chat.messages;
export const getParticipantsData = (state) => state.chat.participantsData;
export const getActiveUsers = (state) => state.chat.activeData;
export const getAttachedFiles = (state) => state.chat.attachedFilesToMessage.filesData;
export const getAttachFileLoading = (state) => state.chat.attachedFilesToMessage.isLoading;
export const getFeedbackData = (state) => state.chat.feedbackTo
export const getIsLoading = (state) => state.chat.isLoading
export const getHistoryEnd = state => state.chat.historyEnd