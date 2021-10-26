import cdk = require('@aws-cdk/core');

export interface IMtCognitoUserpoolStackProps extends cdk.StackProps {
  // Add your configuration types here.
  tempPasswordValidityInDays: number,
  accessTokenValidityInHours: number,
  idTokenValidityinHours: number,
  fbClientId: string,
  fbClientSecret: string,
  fbApiVersion: string,
  ggClientId: string,
  ggClientSecret: string,
  verificationEmailSubject: string,
  verificationEmailSender: string,
  invitationEmailSubject: string,
  invitationEmailBody: string
}
