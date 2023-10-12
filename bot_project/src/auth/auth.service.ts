import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {

    const hardcodedUsername = 'testuser';
    const hardcodedPassword = 'testpassword';

    if (username === hardcodedUsername && password === hardcodedPassword) {
      return { username: hardcodedUsername, password: hardcodedPassword };
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, password: user.password  };
    return {
      access_token: this.jwtService.signAsync(payload),
    };
  }
}