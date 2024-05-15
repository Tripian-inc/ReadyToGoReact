import React from 'react';
import Apple from '../base/Svg/Icons/Apple';
// import Facebook from '../base/Svg/Icons/Facebook';
import Google from '../base/Svg/Icons/Google';
import classes from './SocialLogin.scss';

type Props = {
  cognitoDomain: string;
  region: string;
  baseDomain: string;
  clientId: string;
};

const SocialLogin: React.FC<Props> = ({ cognitoDomain, region, baseDomain, clientId }) => (
  <div className={classes.socialLoginButtons}>
    {/* <a className={classes.facebookButton} href={`https://${cognitoDomain}.auth.${region}.amazoncognito.com/oauth2/authorize?identity_provider=Facebook&redirect_uri=${baseDomain}/cognito-redirect&response_type=CODE&client_id=${clientId}`}>
      <div className={classes.socialLoginLogo}>
        <Facebook />
      </div>
      <span className={classes.socialLoginText}>Continue with Facebook</span>
    </a> */}
    <a className={classes.googleButton} href={`https://${cognitoDomain}.auth.${region}.amazoncognito.com/oauth2/authorize?identity_provider=Google&redirect_uri=${baseDomain}/cognito-redirect&response_type=CODE&client_id=${clientId}`}>
      <div className={classes.socialLoginLogo}>
        <Google />
      </div>
      <span className={classes.socialLoginText}>Continue with Google</span>
    </a>
    <a className={classes.appleButton} href={`https://${cognitoDomain}.auth.${region}.amazoncognito.com/oauth2/authorize?identity_provider=SignInWithApple&redirect_uri=${baseDomain}/cognito-redirect&response_type=CODE&client_id=${clientId}`}>
      <div className={classes.socialLoginLogo}>
        <Apple />
      </div>
      <span className={classes.socialLoginText}>Continue with Apple</span>
    </a>
  </div>
);

export default SocialLogin;
