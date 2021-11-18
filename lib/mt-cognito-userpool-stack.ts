/* eslint-disable max-lines */
import * as cdk from '@aws-cdk/core';
import * as cognito from '@aws-cdk/aws-cognito';
// import * as acm from '@aws-cdk/aws-certificatemanager';
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
      standardAttributes: {
        email: { required: true },
        nickname: { required: true },
        fullname: { required: false },
        address: { required: false },
        profilePicture: { required: false },
      },
      signInAliases: {
        email: true,
        username: true,
        phone: false,
        preferredUsername: false,
      },
      userVerification: {
        emailStyle: cognito.VerificationEmailStyle.CODE,
        emailSubject: props.verificationEmailSubject,
      },
      autoVerify: {
        email: true,
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
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
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
      oAuth: {
        flows: {
          authorizationCodeGrant: true,
        },
        callbackUrls: [
          props.mtUrl,
          props.mtAccountUrl,
        ],
      },
      accessTokenValidity: cdk.Duration.hours(props.accessTokenValidityInHours),
      idTokenValidity: cdk.Duration.hours(props.idTokenValidityinHours),
      supportedIdentityProviders: [
        cognito.UserPoolClientIdentityProvider.GOOGLE,
        cognito.UserPoolClientIdentityProvider.FACEBOOK,
        cognito.UserPoolClientIdentityProvider.COGNITO,
      ],
    });
    // add provides as dependency for client.
    userPoolClient.node.addDependency(facebookLogin);
    userPoolClient.node.addDependency(googleLogin);

    // const domainCert = acm.Certificate.fromCertificateArn(this, 'mtCert', props.certArn);
    // const domain = userPool.addDomain('mytradablesDomain', {
    //   customDomain: {
    //     domainName: props.mtUrl,
    //     certificate: domainCert,
    //   },
    // });
    // domain.signInUrl( userPoolClient, {
    //   redirectUri: props.mtAccountUrl,
    // });
    userPool.addDomain('mtDomainPrefix', {
      cognitoDomain: {
        domainPrefix: 'mytradables',
      },
    });

    // const cfnUserPool = userPool.node.defaultChild as cognito.CfnUserPool;
    // cfnUserPool.emailConfiguration = {
    //   emailSendingAccount: 'DEVELOPER',
    //   from: props.verificationEmailSender,
    //   replyToEmailAddress: props.mtInfoEmail,
    //   sourceArn: '',
    // };

    /**
    * Output cognito pool id and client id
    */
    new cdk.CfnOutput(this, 'UserpoolId', {
      value: userPool.userPoolId,
    });

    new cdk.CfnOutput(this, 'UserpoolClientId', {
      value: userPoolClient.userPoolClientId,
    });
  }
}

export default MtCognitoUserpoolStack;
