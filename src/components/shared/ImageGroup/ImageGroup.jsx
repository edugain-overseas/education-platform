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
  console.log(imagesData);
  const isEdit = useSelector(getIsEdit);

  //   const handleChange = (index, e) => {
  //     const value = e.target.value;
  //     setState((prev) => {
  //       const updatedState = prev.map((image, i) => {
  //         if (i === index) {
  //           image.imageDescription = value;
  //         }
  //         return image;
  //       });
  //       return updatedState;
  //     });
  //   };

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
