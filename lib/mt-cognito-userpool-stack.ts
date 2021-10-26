import * as cdk from '@aws-cdk/core';
import * as cognito from '@aws-cdk/aws-cognito';
import { IMtCognitoUserpoolStackProps } from '../bin/stack-environment-types';

class MtCognitoUserpoolStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: IMtCognitoUserpoolStackProps) {
    super(scope, id, props);

    /**
     * AWS Cognito Userpool.
     */
    const userPool = new cognito.UserPool(this, 'mt-traders-pool', {
      userPoolName: 'mt-traders-pool',
      selfSignUpEnabled: true,
      userVerification: {
        emailStyle: cognito.VerificationEmailStyle.CODE,
        emailSubject: props.verificationEmailSubject,
      },
      autoVerify: {
        email: true,
      },
      emailSettings: {
        from: props.verificationEmailSender,
      },
      passwordPolicy: {
        minLength: 12,
        requireLowercase: true,
        requireUppercase: true,
        requireDigits: true,
        requireSymbols: true,
        tempPasswordValidity: cdk.Duration.days(props.tempPasswordValidityInDays),
      },
      removalPolicy: cdk.RemovalPolicy.RETAIN,
      accountRecovery: cognito.AccountRecovery.PHONE_AND_EMAIL,
      userInvitation: {
        emailSubject: props.invitationEmailSubject,
        emailBody: props.invitationEmailBody,
      },
    });

    /**
     * Facebook login options for AWS Cognito Userpool.
     */
    const facebookLogin = new cognito.UserPoolIdentityProviderFacebook(this, 'mt-facebook-login', {
      userPool,
      clientId: props.fbClientId,
      clientSecret: props.fbClientSecret,
      apiVersion: props.fbApiVersion,
      attributeMapping: {
        nickname: cognito.ProviderAttribute.FACEBOOK_NAME,
        givenName: cognito.ProviderAttribute.FACEBOOK_FIRST_NAME,
        familyName: cognito.ProviderAttribute.FACEBOOK_LAST_NAME,
        email: cognito.ProviderAttribute.FACEBOOK_EMAIL,
      },
    });
    userPool.registerIdentityProvider(facebookLogin);

    /**
     * Google login options for AWS Cognito Userpool.
     */
    const googleLogin = new cognito.UserPoolIdentityProviderGoogle(this, 'mt-google-login', {
      userPool,
      clientId: props.ggClientId,
      clientSecret: props.ggClientSecret,
      attributeMapping: {
        nickname: cognito.ProviderAttribute.GOOGLE_NAME,
        givenName: cognito.ProviderAttribute.GOOGLE_GIVEN_NAME,
        familyName: cognito.ProviderAttribute.GOOGLE_FAMILY_NAME,
        email: cognito.ProviderAttribute.GOOGLE_EMAIL,
      },
    });
    userPool.registerIdentityProvider(googleLogin);

    /**
     * AWS Cognito Userpool Client
     */
    const userPoolClient = new cognito.UserPoolClient(this, 'mt-traders-pool-client', {
      userPool,
      userPoolClientName: 'mt-traders-pool-client',
      accessTokenValidity: cdk.Duration.hours(props.accessTokenValidityInHours),
      idTokenValidity: cdk.Duration.hours(props.idTokenValidityinHours),
      supportedIdentityProviders: [
        cognito.UserPoolClientIdentityProvider.GOOGLE,
        cognito.UserPoolClientIdentityProvider.FACEBOOK,
        cognito.UserPoolClientIdentityProvider.COGNITO,
      ],
    });

    new cdk.CfnOutput(this, 'UserpoolId', {
      value: userPool.userPoolId,
    });

    new cdk.CfnOutput(this, 'UserpoolClientId', {
      value: userPoolClient.userPoolClientId,
    });
  }
}

export default MtCognitoUserpoolStack;
