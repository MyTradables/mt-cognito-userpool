import { IMtCognitoUserpoolStackProps } from './stack-environment-types';

const environmentConfig: IMtCognitoUserpoolStackProps = {
  tags: {
    Developer: 'Faruk Ada',
    Application: 'MyTradables.com',
  },
  tempPasswordValidityInDays: 3,
  accessTokenValidityInHours: 2,
  idTokenValidityinHours: 2,
  fbClientId: '',
  fbClientSecret: '',
  fbApiVersion:  '',
  ggClientId: '',
  ggClientSecret: '',
  verificationEmailSubject: 'Verify your new myTradables account!',
  verificationEmailSender: 'mytradables@gmail.com',
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
