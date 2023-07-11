export const getMessageRecepients = (users, sendTo) => {
  if (sendTo.length === 0 || sendTo.length === users.length - 1) {
    return null;
  }
  if (sendTo.length === 1) {
    return sendTo.join("");
  }
  return sendTo;
};
