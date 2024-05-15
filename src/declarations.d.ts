// We need to tell TypeScript that when we write "import styles from './styles.scss' we mean to load a module (to look for a './styles.scss.d.ts').
// declare module '*.css';
declare module '*.scss' {
  interface IClasses {
    [classes: string]: string;
  }
  const classes: IClasses;
  export = classes;
}
declare module '*.png';
declare module '*.svg';
declare module 'external-svg-loader';
