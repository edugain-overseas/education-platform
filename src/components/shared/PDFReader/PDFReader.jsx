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
  // withCredentials: true,
};

function PDFReader({ pdf, setFullscreen, fullscreen }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageLoadedSucces, setPageLoadedSucces] = useState(false);
  // const [pageHeight, setPageHeight] = useState(0);
  const [play, setPlay] = useState(false);

  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const interval = useRef(null);
  const controlPanelRef = useRef(null);
  const PrevBtnRef = useRef(null);
  const NextBtnRef = useRef(null);

  const rootFontSize = parseFloat(document.documentElement.style.fontSize);
  const pageWidthInRem = 470;
  const pageWidthInPx = pageWidthInRem * rootFontSize;
  const fullscreenHeight = window.window.outerHeight * 0.85;
  console.log(fullscreenHeight);

  const onLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handlePrev = () => {
    if (pageNumber === 1) {
      return;
    }
    setPageNumber((prev) => prev - 2);
  };

  const handleNext = () => {
    if (pageNumber === numPages) {
      setPageNumber(1);
      return;
    }
    setPageNumber((prev) => prev + 2);
  };

  const handleContainerMouseEnter = () => {
    if (controlPanelRef.current) {
      controlPanelRef.current.classList.add(styles.active);
    }
    if (PrevBtnRef.current) {
      PrevBtnRef.current.classList.add(styles.active);
    }
    if (NextBtnRef.current) {
      NextBtnRef.current.classList.add(styles.active);
    }
  };

  // useEffect(() => {
  //   if (canvasRef.current) {
  //     if (pageHeight !== canvasRef.current?.clientHeight) {
  //       setPageHeight(canvasRef.current.clientHeight);
  //       setPageLoadedSucces(true);
  //     }
  //   }
  // }, [fullscreen, containerRef.current?.clientWidth, pageHeight]);

  useEffect(() => {
    if (play) {
      interval.current = setInterval(() => {
        setPageNumber((prev) => prev + 2);
      }, 5000);
    } else {
      clearInterval(interval.current);
    }
  }, [play]);

  useEffect(() => {
    if (pageNumber >= numPages) {
      setPageNumber(1);
    }
  }, [pageNumber, numPages]);

  return (
    <div
      ref={containerRef}
      className={styles.documentContainer}
      // style={{ height: fullscreen ? "100%" : pageHeight }}
      onMouseEnter={handleContainerMouseEnter}
    >
      {pageLoadedSucces && (
        <>
          <div className={styles.controlPanel} ref={controlPanelRef}>
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
              <button
                className={styles.controllsFullscreenOn}
                onClick={() => setFullscreen((prev) => !prev)}
              >
                <FullscreenIcon />
              </button>
            </div>
          </div>
          <button
            className={styles.prevBtnLarge}
            onClick={handlePrev}
            ref={PrevBtnRef}
          >
            <PrevIcon />
          </button>
          <button
            className={styles.nextBtnLarge}
            onClick={handleNext}
            ref={NextBtnRef}
          >
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
        loading={null}
      >
        <Page
          pageNumber={pageNumber}
          renderAnnotationLayer={false}
          renderTextLayer={false}
          className={styles.page}
          width={fullscreen ? null : pageWidthInPx}
          height={fullscreen ? fullscreenHeight : null}
          // canvasRef={canvasRef}
          onLoadSuccess={() => setPageLoadedSucces(true)}
          loading={null}
        />
        {pageNumber !== numPages && (
          <Page
            pageNumber={pageNumber + 1}
            renderAnnotationLayer={false}
            renderTextLayer={false}
            className={styles.page}
            width={fullscreen ? null : pageWidthInPx}
            height={fullscreen ? fullscreenHeight : null}
            canvasRef={canvasRef}
            loading={null}
            onLoadSuccess={() => setPageLoadedSucces(true)}
          />
        )}
      </Document>
    </div>
  );
}

export default PDFReader;
