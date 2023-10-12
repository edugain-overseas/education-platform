import { v4 as uuidv4 } from "uuid";

export const lecturePartsTemplate = {
  text: {
    id: uuidv4(),
    attr_type: "text",
    attr_title: "",
    attr_number: 0,
    value: "",
  },
};
