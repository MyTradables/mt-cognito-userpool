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
  fbClientId: '799753421023660', // faruk test account
  fbClientSecret: '345a86ddc368367628e97af71ccba672', // faruk test account
  ggClientId: '4260226210-mhu69h406g1l7m55m96umsqcl7l4t08g.apps.googleusercontent.com',
  ggClientSecret: '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',
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
