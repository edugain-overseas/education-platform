import React from "react";
import { Image } from "antd";
import { serverName } from "../../../constants/server";
import { useSelector } from "react-redux";
import { getIsEdit } from "../../../redux/config/configSelectors";

const ImageGroup = ({
  imagesData,
  setState = () => {},
  styles = {},
  isDesc,
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
                alt={`${serverName}${imageData.imageName}`}
              />
              {isDesc && (
                <div className={styles.descWrapper}>
                  {isEdit ? (
                    <input
                      value={imageData.imageDescription}
                      onChange={(e) => setState(index, e)}
                      placeholder="Please write your text here..."
                    />
                  ) : (
                    <p>{imageData.imageDescription}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </Image.PreviewGroup>
    </div>
  );
};

export default ImageGroup;
