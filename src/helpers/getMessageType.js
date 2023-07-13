export const getMessageType = (users, sendTo) => {
  if (sendTo.length === 0 || sendTo.length === users.length - 1) {
    return "everyone";
  } 
  if (sendTo.length === 1) {
    return 'alone'
  }
  return 'several'
};
