/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Model from '@tripian/model';
import Apple from '../base/Svg/Icons/Apple';
// import Facebook from '../base/Svg/Icons/Facebook';
import Google from '../base/Svg/Icons/Google';
import classes from './SocialLogin.scss';

type Props = {
  configs: {
    clientId: string;
    domain: string;
    identityProviders: string[];
    region: string;
    baseDomain: string;
  };
  t: (value: Model.TranslationKey) => string;
};

const SocialLogin: React.FC<Props> = ({ configs, t }) => (
  <div className={classes.socialLoginButtons}>
    {configs.identityProviders.includes('Google') && (
      <a
        className={classes.socialLoginButton}
        href={`https://${configs.domain}.auth.${configs.region}.amazoncognito.com/oauth2/authorize?identity_provider=Google&redirect_uri=${configs.baseDomain}/cognito-redirect&response_type=CODE&client_id=${configs.clientId}`}
      >
        <div className={classes.socialLoginLogo}>
          <Google />
        </div>
        <span className={classes.socialLoginText}>{t('auth.login.google')}</span>
      </a>
    )}
    {configs.identityProviders.includes('SignInWithApple') && (
      <a
        className={classes.socialLoginButton}
        href={`https://${configs.domain}.auth.${configs.region}.amazoncognito.com/oauth2/authorize?identity_provider=SignInWithApple&redirect_uri=${configs.baseDomain}/cognito-redirect&response_type=CODE&client_id=${configs.clientId}`}
      >
        <div className={classes.socialLoginLogo}>
          <Apple />
        </div>
        <span className={classes.socialLoginText}>{t('auth.login.apple')}</span>
      </a>
    )}
  </div>
);

export default SocialLogin;
