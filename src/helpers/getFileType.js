import { imageFormats, videoFormats } from "../constants/fileFormats";

export const getFileType = (filePath) => {
  const isImage = imageFormats.some((imageFormat) =>
    filePath.includes(`.${imageFormat}`)
  );
  console.log(isImage);

  if (isImage) {
    return "image";
  }

  const isVideo = videoFormats.some((videoFormat) =>
    filePath.includes(`.${videoFormat}`)
  );

  if (isVideo) {
    return "video";
  }

  return "audio";
};
