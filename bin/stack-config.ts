import { IMtCognitoUserpoolStackProps } from './stack-environment-types';

const environmentConfig: IMtCognitoUserpoolStackProps = {
  tags: {
    Developer: 'Faruk Ada',
    Application: 'MyTradables.com',
  },
  mtUrl: 'https://localhost:3000', //'https://mytradables.com',
  mtAccountUrl: 'https://localhost:3000', //'https://mytradables.com/account',
  certArn: '',
  tempPasswordValidityInDays: 3,
  accessTokenValidityInHours: 2,
  idTokenValidityinHours: 2,
  fbClientId: '1234567890', // faruk test account
  fbClientSecret: '1234567890', // faruk test account
  ggClientId: '1234567890',
  ggClientSecret: '1234567890',
  verificationEmailSubject: 'Verify your new myTradables account!',
  verificationEmailSender: 'no-reply@mytradables.com',
  mtInfoEmail: 'info@mytradables.com',
  invitationEmailSubject: 'Congratulations with your MyTradables account!',
  invitationEmailBody: `Dear {username},
  Thank you for signing up at www.mytradables.com!
  
  You can login to your account using:
  Username: {username}
  Password: {####}
  
  Cheers!,
  
  www.mytradables.com`,
};
export default environmentConfig;
