import { AuthConfig } from 'angular-oauth2-oidc';

export const authCodeFlowConfig: AuthConfig = {
  issuer: 'http://localhost:8080/realms/tutorial-java-backend',
  redirectUri: window.location.origin + '/home',
  clientId: 'tutorial-angular-client',
  responseType: 'code',
  scope: 'openid profile email offline_access',
  showDebugInformation: true,
};