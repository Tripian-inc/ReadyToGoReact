/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { helper } from '@tripian/model';
import classes from './ImgLazy.scss';

interface IImgLazy {
  src: string;
  alt: string;
  className?: string;
  classNameLazyLoading?: string;
  /* loadingClassName?: string; */
  x?: number;
  y?: number;
  showThumbnails?: boolean;
  objectFit?: 'cover' | 'contain';
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
}

const imagePlaceholderData =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEXQ0NCqqKi6ubnBwMCnpaXPz8+wrq64trbHxsatq6vMzMy1s7PLysqrqanEw8O/vb21desJAAACvUlEQVR4nO3a3ZKrIBBG0WgQFYy8/9tOIpqTiS1mNHWkrb2q5mZyw1f8tcDlAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAsJUL5VxwRzfrazpvTDFnjO+Obtp3dEK6ySkidrdEwtsZRmopjdAnf3Tz9qtS+e6qoxu423Ul4fXoBu5WrySsj27gXm4lYGGao5u4RdX3067u1xIW/lkBNFrmpAtW3OFXe9NYHWVOY7fEG0NaBWM2VcF8Ivsqx9mdCW3uEdMVzAdM7lXOznwPR0dI67+QsD86RFL4QsJwdIikMt14W4cQ6pXFqDw6RFIqoX/u5y5Z6mhN6H/v5c1yRp0J2/lH0rU9U0Ir1ZtLxYHGhK1cUDu5FxUmbKdCzDXBWx+aKXAnRtSX0ExzsLfFo6YzhZ029atU4+lLaONPzv+LY/zYjdJU1JcwdtjbujKuPVKVpy6hH84mqvptQNr4b2Fb1JbQxDJz3lmxa/v5TFSXcBiO1XzCtUMndvoTtsP/3TxIjC6sNdoSxk/2ICSMw3d+YqwtYTzTlk6+l345T0K78Mt5Ep6rD4XybCzm9CeMa2kjJIyfxPPiW1tCE69b5rVL3A8r/fvhOBiXahph+GpLON3Uv9Wl09H2CerSoojzzbWvEc14PdEIDzX0JYxrzaV7XTXr8bNfOnHTl9BMX/RNMdycGnML422v8GWhMeE0Tu+6UNd1eN6fneWc5uUo6jc5oMqERSvdJy0E1JmwuM0j9qc6837sf2/3Fu/nNuoT3tnSVVV1uf+50iYeLOpN+DgK9r70Ph4MK0249k7vE3knbL6QMO9HQwvXSX+xcFGVjf3vafIepOLR79/Y7B8o7p2Jec/Cgdv1NjHv50KjKtjWbNHakP0QHbnuukWX+SoKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwP/0AAegXtE+/NFIAAAAASUVORK5CYII=';

const ImgLazy: React.FC<IImgLazy> = ({ src, alt, x = 0, y = 0, showThumbnails = true, className = '', classNameLazyLoading = '', objectFit = 'cover', referrerPolicy }) => {
  const thumbsnailSrc = useMemo(() => (showThumbnails ? helper.imgUrlThumbnails(src) : imagePlaceholderData), [showThumbnails, src]);

  const [imageSrc, setImageSrc] = useState(thumbsnailSrc);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let observer: IntersectionObserver;
    let didCancel = false;

    if (imageRef.current && imageSrc !== src) {
      if (IntersectionObserver) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              // when image is visible in the viewport + rootMargin
              if (!didCancel && (entry.intersectionRatio > 0 || entry.isIntersecting)) {
                // console.log('ImgLazy isIntersecting', src);
                setImageSrc(src);
              }
            });
          },
          {
            threshold: 0.01,
            rootMargin: '75%',
          },
        );

        // console.log('ImgLazy observe', imageSrc);
        observer.observe(imageRef.current);
      } else {
        // Old browsers fallback
        setImageSrc(src);
      }
    }

    return () => {
      didCancel = true;
      // on component unmount, we remove the listner
      if (observer && observer.unobserve) {
        // console.log('ImgLazy unmounted', imageSrc);
        if (imageRef.current) {
          // console.log('ImgLazy unmounted unobserve', imageSrc);
          // eslint-disable-next-line react-hooks/exhaustive-deps
          observer.unobserve(imageRef.current);
        }
      }
    };
  }, [imageSrc, src]);

  const objectFitClasses = objectFit === 'contain' ? `${classes.objectFitContain}` : '';
  const imgLazyLoadingClasses = objectFit === 'contain' ? `${classes.imgLazyLoading} ${classes.blackBgColor} ${classNameLazyLoading}` : `${classes.imgLazyLoading} ${classNameLazyLoading}`;

  const imgClasses = imageSrc !== src && imageSrc !== imagePlaceholderData ? `${classes.imgLazyImgDefault} ${classes.imgLazyImg} ${className} ${objectFitClasses}` : `${classes.imgLazyImgDefault} ${className} ${objectFitClasses}`;

  return (
    <div className={classes.imgLazy}>
      <svg className={classes.imgLazySvg} viewBox={`0 0 ${x} ${y}`} />
      {objectFit === 'contain' ? <div className={classes.bgBlur} style={{ backgroundImage: `url('${imagePlaceholderData}')` }} /> : null}
      <div className={imgLazyLoadingClasses}>
        <img ref={imageRef} src={imageSrc} alt={alt} className={imgClasses} referrerPolicy={referrerPolicy} />
      </div>
    </div>
  );
};

export default ImgLazy;
