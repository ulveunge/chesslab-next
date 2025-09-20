import type { NextConfig } from 'next';
import { webpack } from 'next/dist/compiled/webpack/webpack';

const nextConfig: NextConfig = {
  /* config options here */
  // Настройка заголовков для SharedArrayBuffer
  async headers() {
    return [
      {
        // Применяем ко всем маршрутам
        source: '/:path*',
        headers: [
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
        ],
      },
      // Заголовок Content-Type только для .wasm файлов
      {
        source: '/stockfish/:path*.wasm',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/wasm',
          },
        ],
      },
    ];
  },
  webpack: (config: webpack.Configuration, { isServer }) => {
    if (!isServer) {
      config.experiments = {
        ...config.experiments,
        asyncWebAssembly: true,
        layers: true,
      };
      config.module = {
        ...config.module,
        rules: [
          ...(config.module.rules || []),
          {
            test: /\.wasm$/,
            type: 'webassembly/async',
          },
        ],
      };
    }
    return config;
  },
};

export default nextConfig;
