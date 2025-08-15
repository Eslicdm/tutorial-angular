import { Injectable, signal } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from './auth.config';

export interface UserProfile {
  email?: string;
  name?: string;
  preferred_username?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _isAuthenticated = signal(false);
  readonly isAuthenticated = this._isAuthenticated.asReadonly();

  private readonly _userProfile = signal<UserProfile | null>(null);
  readonly userProfile = this._userProfile.asReadonly();

  private readonly initializationComplete: Promise<void>;

  constructor(private oauthService: OAuthService) {
    this.oauthService.configure(authCodeFlowConfig);
    this.initializationComplete = this.initializeLoginFlow();
  }

  private async initializeLoginFlow(): Promise<void> {
    await this.oauthService.loadDiscoveryDocumentAndTryLogin();
    this._isAuthenticated.set(this.oauthService.hasValidAccessToken());
    if (this.isAuthenticated()) {
      const profile = await this.oauthService.loadUserProfile();
      this._userProfile.set(profile as UserProfile);
    }
  }

  public whenInitialized(): Promise<void> {
    return this.initializationComplete;
  }

  login(): void {
    this.oauthService.initCodeFlow();
  }

  logout(): void {
    this.oauthService.logOut();
  }
}
