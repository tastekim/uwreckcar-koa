import { Strategy as KakaoStrategy } from 'passport-kakao';
import passport from 'passport';

const {
  REST_API_KEY,
  CLIENT_SECRET_KEY,
  REDIRECT_URI,
  CLIENT_URL,
} = process.env;

export const kakaoStrategy = new KakaoStrategy(
  {
    clientID : REST_API_KEY,
    clientSecret : CLIENT_SECRET_KEY,
    callbackURL : REDIRECT_URI,
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const user = profile._json;
      return done(null, {
        access_token : accessToken,
        refresh_token : refreshToken,
        user,
      });
    } catch (error) {
      return done(error);
    }
  }
);

export const kakaoLogin = passport.authenticate('kakao', {
  scope : ['profile_nickname', 'profile_image', 'account_email'],
});
export const kakaoCallback = passport.authenticate('kakao', {
  failureRedirect : `${CLIENT_URL}`,
  session : false,
});
