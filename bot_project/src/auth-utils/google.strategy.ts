import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

  constructor() {
    super({
      clientID: '528843248533-b9b5k5qhkkl3lp3gfqpiioekdr2e6hi5.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://127.0.0.1:4000/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const { name, emails, photos } = profile
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken
    }
    done(null, user);
  }
}