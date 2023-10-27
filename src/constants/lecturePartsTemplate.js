import { v4 as uuidv4 } from "uuid";

export const lecturePartsTemplate = () => {
  return {
    text: {
      id: uuidv4(),
      attributeType: "text",
      attributeTitle: "",
      attributeNumber: 1,
      attributeText: "",
      hided: false,
    },
    present: {
      id: uuidv4(),
      attributeType: "present",
      attributeTitle: "",
      attributeNumber: 2,
      attributeText: "",
      hided: false,
      fileName: "",
      fileSize: 0,
      filePath: "",
      downloadAllowed: false,
    },
    audio: {
      id: uuidv4(),
      attributeType: "audio",
      attributeTitle: "",
      attributeNumber: 3,
      attributeText: "",
      hided: false,
      fileName: "",
      fileSize: 0,
      filePath: "",
      downloadAllowed: false,
    },
    video: {
      id: uuidv4(),
      attributeType: "video",
      attributeTitle: "",
      attributeNumber: 4,
      attributeText: "",
      hided: false,
      fileName: "",
      fileSize: 0,
      filePath: "",
      downloadAllowed: false,
    },
    picture: {
      id: uuidv4(),
      attributeType: "picture",
      attributeTitle: "",
      attributeNumber: 5,
      attributeText: "",
      hided: false,
      attributeImages: [
        // {
        //   imageName: "string",
        //   imagePath: "string",
        //   imageSize: 0,
        //   imageDescription: "asdsa",
        //   downloadAllowed: false,
        // },
      ],
    },
    file: {
      id: uuidv4(),
      attributeType: "file",
      attributeTitle: "",
      attributeNumber: 6,
      attributeText: "",
      hided: false,
      attributeFiles: [
        // {
        //   id: uuidv4(),
        //   fileName: "",
        //   fileSize: 0,
        //   filePath: "",
        //   downloadAllowed: false,
        // },
      ],
    },
    link: {
      id: uuidv4(),
      attributeType: "link",
      attributeTitle: "",
      attributeNumber: 7,
      attributeText: "",
      hided: false,
      attributeLinks: [
        // {
        //   id: uuidv4(),
        //   link: "", //href
        //   anchor: "", //link text
        // },
      ],
    },
    homework: {
      id: uuidv4(),
      attributeType: "homework",
      attributeTitle: "",
      attributeNumber: 8,
      attributeText: "",
      hided: false,
      attributeFiles: [
        // {
        //   id: uuidv4(),
        //   filename: "",
        //   filePath: "",
        //   fileSize: 0,
        //   downloadAllowed: true,
        // },
      ],
      attributeLinks: [
        // {
        //   id: uuidv4(),
        //   link: "",
        //   anchor: "",
        // },
      ],
    },
  };
};
