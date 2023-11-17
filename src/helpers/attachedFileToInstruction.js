import DocumentInfoCard from "../components/shared/DocumentInfoCard/DocumentInfoCard";
import { documentsFormats } from "../constants/fileFormats";

export const attachedFileToInstruction = (file, styles) => {
  console.log(file);
  if (documentsFormats.includes(file.fileType)) {
    return <DocumentInfoCard file={file} styles={styles} key={file.number} />;
  }
};
