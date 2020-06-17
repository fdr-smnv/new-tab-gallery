import React, {
  memo, useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import classNames from 'classnames/bind';
import styles from './index.module.scss';

const BLOCK_NAME = 'Image-view';
const cn = classNames.bind(styles);

export const ImageView = memo(({ url, dimensions }) => {
  const imageWidth = useMemo(() => (dimensions ? dimensions.width : 0), [dimensions]);
  const imageHeight = useMemo(() => (dimensions ? dimensions.height : 0), [dimensions]);
  const [isLoading, setIsLoading] = useState(true);
  const currentImage = useMemo(() => new Image(), []);
  const canvasContainerRef = useRef(null);

  const calculateNewImageSize = useCallback(
    (width, height, windowWidth, windowHeight, scale = 0.8) => {
      const imageRatio = height / width;
      const windowRatio = windowHeight / windowWidth;

      return imageRatio <= windowRatio
        ? {
          width: Math.floor(windowWidth * scale),
          height: Math.floor(windowWidth * imageRatio * scale),
        }
        : {
          width: Math.floor(windowWidth * (windowRatio / imageRatio) * scale),
          height: Math.floor(windowHeight * scale),
        };
    }, [],
  );

  const updateImageSize = useCallback((scale = 0.8) => {
    const { width, height } = calculateNewImageSize(
      imageWidth, imageHeight, window.innerWidth, window.innerHeight, scale,
    );
    canvasContainerRef.current.style.width = `${width}px`;
    canvasContainerRef.current.style.height = `${height}px`;
  }, [imageWidth, imageHeight, calculateNewImageSize, canvasContainerRef]);

  useEffect(() => {
    window.addEventListener('resize', () => {
      updateImageSize();
    });
    currentImage.onload = () => {
      updateImageSize();
      setIsLoading(false);
    };
  }, [updateImageSize, currentImage.onload, currentImage]);

  useEffect(() => {
    if (currentImage.currentSrc !== url) {
      setIsLoading(true);
      currentImage.src = url;
    }
  }, [url, currentImage]);
  return (
    <div className={cn(`${BLOCK_NAME}`)}>
      <>
        <div className={cn(`${BLOCK_NAME}__canvas-container`)} ref={canvasContainerRef}>
          {isLoading ? '' : (

            <img
              className={cn(`${BLOCK_NAME}__canvas`)}
              alt="Gallery canvas"
              src={currentImage.src}
            />
          )}
        </div>
      </>
    </div>
  );
});
