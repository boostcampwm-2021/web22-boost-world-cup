import 'dotenv/config';

const kakaoStrategyConfig = {
  clientID: process.env.KAKAO_API_KEY,
  callbackURL: process.env.KAKAO_CALLBACK_URL,
};

export default kakaoStrategyConfig;
