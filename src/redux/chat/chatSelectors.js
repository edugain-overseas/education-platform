export const getMessages = (state) => state.chat.messages;
export const getParticipantsData = (state) => state.chat.participantsData;
export const getActiveUsers = (state) => state.chat.activeData;
export const getAttachedFiles = (state) => state.chat.attachedFilesToMessage.filesURL;
export const getAttachFileLoading = (state) => state.chat.attachedFilesToMessage.isLoading;
