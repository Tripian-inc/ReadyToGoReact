/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useMemo } from 'react';
import { helper } from '@tripian/model';
import PreLoading from '../PreLoading/PreLoading';

import classes from './ImgLazyBase.scss';

interface IImgLazyBase {
  src: string;
  alt: string;
  className?: string;
  /* loadingClassName?: string; */
  x?: number;
  y?: number;
  showThumbnails?: boolean;
  children: React.ReactNode;
}

const ImgLazyBase: React.FC<IImgLazyBase> = ({ src, alt, className, /* loadingClassName, */ x = 0, y = 0, showThumbnails = true, children }) => {
  const [loaded, setLoaded] = useState(false);

  const onLoad = (/* event: React.SyntheticEvent<HTMLImageElement, Event> */) => {
    setLoaded(true);
  };

  const imgClassName = loaded ? `${classes.imgLazyImgDefault} ${className || ''}` : `${classes.imgLazyImg} ${className || ''}`;

  const loadingContent = useMemo(() => {
    if (children) return children;
    if (showThumbnails) return <img src={helper.imgUrlThumbnails(src)} alt={alt} className={classes.imgLazyLoadingThumbnails} />;
    return <PreLoading size="small" bgColor="rgba(238, 238, 238, 0.8)" />;
  }, [alt, children, showThumbnails, src]);

  // if (loaded && src !== '') return <img src={src} alt={alt} style={{ width: '100%', objectFit: 'contain' }} className={`img-load-img ${className}`} onLoad={onLoad} />;
  return (
    <div className={classes.imgLazy}>
      {/* <path d="M10,678.2h980v-89.8H10V678.2z M10,321.8v89.8h980v-89.8H10z" />
      </svg> */}
      <img src={src} alt={alt} className={imgClassName} onLoad={onLoad} />
      {!loaded ? (
        <>
          <svg className={classes.imgLazySvg} viewBox={`0 0 ${x} ${y}`} />
          <div className={classes.imgLazyLoading}>{loadingContent}</div>
        </>
      ) : null}
    </div>
  );

  // return <div className={loadingClassName}>Image is loading..</div>;
};

export default ImgLazyBase;
