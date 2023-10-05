import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import SliderNavButton from "./SliderNavButton/SliderNavButton";
import MessageSLide from "./MessageSLide/MessageSLide";
import styles from "./FixedMessages.module.scss";
import "./swiperStyles.css";

const FixedMessages = ({ messages }) => {
  return (
    <div className={styles.sliderWrapper}>
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true, dynamicBullets: true }}
        onSlideChange={() => console.log("slide change")}
        className={styles.slider}
      >
        {messages &&
          messages.map((message) => (
            <SwiperSlide key={message.messageId}>
              <MessageSLide message={message} />
            </SwiperSlide>
          ))}
        <div className={styles.navigationWrapper}>
          <SliderNavButton type="prev" />
          <SliderNavButton type="next" />
        </div>
      </Swiper>
    </div>
  );
};

export default FixedMessages;
