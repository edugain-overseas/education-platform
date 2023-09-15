import React, { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { ReactComponent as ArrowLeftIcon } from "../../../images/icons/arrow-left.svg";
import { ReactComponent as PlayIcon } from "../../../images/icons/play.svg";
import { ReactComponent as PauseIcon } from "../../../images/icons/pause.svg";
import { ReactComponent as FullscreenIcon } from "../../../images/icons/fullscreen.svg";
import { ReactComponent as PrevIcon } from "../../../images/icons/prev.svg";
import { ReactComponent as NextIcon } from "../../../images/icons/next.svg";
import styles from "./PDFReader.module.scss";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
  withCredentials: true,
};

function PDFReader({ pdf }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageLoadedSucces, setPageLoadedSucces] = useState(false);
  const [pageHeight, setPageHeight] = useState(0);
  const [play, setPlay] = useState(false);

  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const interval = useRef(null);

  const onLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handlePageLoadSucces = () => {
    if (!pageLoadedSucces || pageHeight !== canvasRef.current.clientHeight) {
      setPageHeight(canvasRef.current.clientHeight);
      setPageLoadedSucces(true);
    }
  };

  const handlePrev = () => {
    setPageNumber((prev) => prev - 1);
  };

  const handleNext = () => {
    setPageNumber((prev) => prev + 1);
  };

  useEffect(() => {
    if (play) {
      interval.current = setInterval(() => {
        setPageNumber((prev) => prev + 1);
      }, 5000);
    } else {
      clearInterval(interval.current);
    }
  }, [play]);

  return (
    <div
      ref={containerRef}
      className={styles.documentContainer}
      style={{ height: pageHeight }}
    >
      {pageLoadedSucces && (
        <>
          <div className={styles.controlPanel}>
            <div className={styles.controlsLeft}>
              <button
                className={styles.controlPlayBtn}
                onClick={() => setPlay((prev) => !prev)}
              >
                {play ? <PauseIcon /> : <PlayIcon />}
              </button>
              <button onClick={handlePrev} className={styles.controlPrevBtn}>
                <ArrowLeftIcon />
              </button>
              <p
                className={styles.pagesInfo}
              >{`${pageNumber} / ${numPages}`}</p>
              <button onClick={handleNext} className={styles.controlNextBtn}>
                <ArrowLeftIcon />
              </button>
            </div>
            <div className={styles.controlsRight}>
              <button className={styles.controllsFullscreenOn}>
                <FullscreenIcon />
              </button>
            </div>
          </div>
          <button className={styles.prevBtnLarge} onClick={handlePrev}>
            <PrevIcon />
          </button>
          <button className={styles.nextBtnLarge} onClick={handleNext}>
            <NextIcon />
          </button>
        </>
      )}

      <Document
        file={{ url: pdf }}
        options={options}
        onLoadSuccess={onLoadSuccess}
        onLoadError={console.error}
        className={styles.document}
      >
        <Page
          pageNumber={pageNumber}
          renderAnnotationLayer={false}
          renderTextLayer={false}
          className={styles.page}
          width={
            containerRef?.current ? containerRef.current.clientWidth : undefined
          }
          canvasRef={canvasRef}
          onLoadSuccess={handlePageLoadSucces}
        />
      </Document>
    </div>
  );
}

export default PDFReader;
