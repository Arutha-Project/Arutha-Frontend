import react from '@vitejs/plugin-react-swc';
import path from 'node:path';
import { defineConfig } from 'vite';

type ViteConfigInput = {
  mode: string;
  command: string;
};

export default function (args: ViteConfigInput) {
  return defineConfig({
    resolve: {
      alias: {
        '@redux/reducers': path.resolve(__dirname, 'src/reduxToolkit/reducers/index.ts'),
        '@redux/hooks': path.resolve(__dirname, 'src/reduxToolkit/hooks.ts'),
        '@redux/store': path.resolve(__dirname, 'src/reduxToolkit/store.ts'),
        '@higherOrderComponents': path.resolve(
          __dirname,
          'src/components/higherOrderComponents/index.ts'
        ),
        '@components': path.resolve(__dirname, 'src/components'),
        '@assets': path.resolve(__dirname, 'src/assets'),
        '@hooks': path.resolve(__dirname, 'src/hooks/index.ts'),
        '@constants': path.resolve(__dirname, 'src/constants/index.ts'),
        '@utils': path.resolve(__dirname, 'src/utils/index.ts'),
        '@slices': path.resolve(__dirname, 'src/slices/index.ts'),
        '@theme': path.resolve(__dirname, 'src/theme/index.ts'),
        '@services': path.resolve(__dirname, 'src/services/index.ts'),
        '@context': path.resolve(__dirname, 'src/context/index.ts'),
        '@node_modules': path.resolve(__dirname, 'node_modules'),
      },
    },
    plugins: [react()],
  });
}
