import DocumentInfoCard from "../components/shared/DocumentInfoCard/DocumentInfoCard";

export const attachedFileToInstruction = (file, styles) => {
  console.log(file);
  switch (file.fileType) {
    case "pdf":
      return <DocumentInfoCard file={file} styles={styles} key={file.number} />;

    default:
      break;
  }
};
