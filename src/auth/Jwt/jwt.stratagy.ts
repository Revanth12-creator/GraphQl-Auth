import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import constants from '../../constant';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    // base validation : checking if token is valid using the key
    // token has not expired
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: constants.SECRET_KEY,
    });
  }
  async validate(payload: any) {
    // any additional validation needed
    return { userId: payload.sub, email: payload.email };
    // return this.userService.findById(payload.sub);
  }
}
