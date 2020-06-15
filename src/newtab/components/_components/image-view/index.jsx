import React, { memo } from 'react';
import classNames from 'classnames/bind';
import styles from './index.module.scss';

const BLOCK_NAME = 'Image-view';
const cn = classNames.bind(styles);

export const ImageView = memo(({ height, width, url }) => (
  <div className={cn(`${BLOCK_NAME}`)}>
    <img alt="Gallery canvas" height={height} width={width} src={url} />
  </div>
));
