export const getFileType = (type) => {
    if (!type) {
        return null
    }
  return type.split("/")[0];
};
