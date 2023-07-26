export const getMessageType = (replyTo) => {
    if (replyTo) {
        return "answer"
    }
    return "message"
}