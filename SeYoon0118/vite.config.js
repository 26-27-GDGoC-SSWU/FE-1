import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // .env.local 등에서 환경변수를 읽어요.
  // 세 번째 인자 ''는 "VITE_로 시작하지 않는 변수도 읽어라"는 뜻이에요.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    server: {
      proxy: {
        // 브라우저가 /kakao/... 로 요청하면
        '/kakao': {
          // 개발 서버가 대신 https://dapi.kakao.com 으로 보내요.
          target: 'https://dapi.kakao.com',
          changeOrigin: true,
          // 앞의 /kakao는 떼고 전달해요.
          // 예: /kakao/v2/local/... → /v2/local/...
          rewrite: (path) => path.replace(/^\/kakao/, ''),
          // 이때 서버가 인증 헤더를 붙여요. 키는 브라우저에 전달되지 않아요.
          headers: {
            Authorization: `KakaoAK ${env.KAKAO_REST_API_KEY}`,
          },
        },
      },
    },
  };
});
