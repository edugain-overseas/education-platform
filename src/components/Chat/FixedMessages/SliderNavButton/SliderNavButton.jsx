import React from "react";
import styles from "./SliderNavButton.module.scss";
import { ReactComponent as PrevIcon } from "../../../../images/icons/prev.svg";
import { ReactComponent as NextIcon } from "../../../../images/icons/next.svg";
import { useSwiper } from "swiper/react";

const SliderNavButton = ({ type }) => {
  const swiper = useSwiper();

  const handleChangeSlide = () => {
    if (type === "prev") {
      swiper.slidePrev();
      return;
    }
    swiper.slideNext();
  };

  return (
    <button onClick={handleChangeSlide} className={styles.btn}>
      {type === "prev" ? <PrevIcon /> : <NextIcon />}
    </button>
  );
};

export default SliderNavButton;
