export const getMessages = (state) => state.groupChat.messages;
export const getParticipantsData = (state) => state.groupChat.participantsData;
export const getActiveUsers = (state) => state.groupChat.activeData;
export const getAttachedFiles = (state) => state.groupChat.attachedFilesToMessage.filesData;
export const getAttachFileLoading = (state) => state.groupChat.attachedFilesToMessage.isLoading;
export const getFeedbackData = (state) => state.groupChat.feedbackTo
export const getIsLoading = (state) => state.groupChat.isLoading
export const getHistoryEnd = state => state.groupChat.historyEnd