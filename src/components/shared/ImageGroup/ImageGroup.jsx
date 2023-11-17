import React from "react";
import { Image } from "antd";
import { serverName } from "../../../constants/server";
import { useSelector } from "react-redux";
import { getIsEdit } from "../../../redux/config/configSelectors";
import { ReactComponent as TrashIcon } from "../../../images/icons/trashRounded.svg";
import noImage from '../../../images/noImage.jpeg'

const ImageGroup = ({
  imagesData,
  setState = () => {},
  styles = {},
  isDesc,
  handleDeleteFile = () => {},
  handleInputBlur = () => {}
}) => {
  const isEdit = useSelector(getIsEdit);

  return (
    <div>
      <Image.PreviewGroup>
        <div className={styles.imagesWrapper}>
          {imagesData.map((imageData, index) => (
            <div key={index} className={styles.imageWrapper}>
              <Image
                src={`${serverName}${imageData.imagePath}`}
                alt={`${imageData.imageName}`}
                fallback={noImage}
              />
              {isDesc && (
                <div className={styles.descWrapper}>
                  {isEdit ? (
                    <input
                      value={imageData.imageDescription}
                      onChange={(e) => setState(index, e)}
                      placeholder="Please write your text here..."
                      onBlur={handleInputBlur}
                    />
                  ) : (
                    <p>{imageData.imageDescription}</p>
                  )}
                </div>
              )}
              {isEdit && (
                <button
                  className={styles.deleteBtn}
                  onClick={() => handleDeleteFile(imageData.imagePath)}
                >
                  <TrashIcon />
                </button>
              )}
            </div>
          ))}
        </div>
      </Image.PreviewGroup>
    </div>
  );
};

export default ImageGroup;
