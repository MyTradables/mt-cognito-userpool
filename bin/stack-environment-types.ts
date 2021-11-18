import cdk = require('@aws-cdk/core');

export interface IMtCognitoUserpoolStackProps extends cdk.StackProps {
  // Add your configuration types here.
  mtUrl: string,
  mtAccountUrl: string,
  certArn: string,
  tempPasswordValidityInDays: number,
  accessTokenValidityInHours: number,
  idTokenValidityinHours: number,
  fbClientId: string,
  fbClientSecret: string,
  ggClientId: string,
  ggClientSecret: string,
  verificationEmailSubject: string,
  verificationEmailSender: string,
  mtInfoEmail: string,
  invitationEmailSubject: string,
  invitationEmailBody: string
}
