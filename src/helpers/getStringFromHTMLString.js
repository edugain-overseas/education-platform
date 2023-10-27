import { HtmlRegExp } from "../constants/regExp";

export const getStringFromHTMLString = (htmlString) =>
  htmlString.replaceAll(HtmlRegExp, "").trim();
