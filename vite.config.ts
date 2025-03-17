import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',
    port: 3000,
},
resolve: {
    alias: {
        '@': '/src',
        '@components': '/src/components',
        '@pages': '/src/pages',
        '@utils': '/src/utils',
        '@hooks': '/src/hooks',
        '@contexts': '/src/contexts',
    },
},
// define: {
//     'process.env': process.env,
// },
})


// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//     plugins: [react()],
    // server: {
    //     host: 'localhost',
    //     port: 3000,
    // },
    // resolve: {
    //     alias: {
    //         '@': '/src',
    //         '@components': '/src/components',
    //         '@pages': '/src/pages',
    //         '@utils': '/src/utils',
    //         '@hooks': '/src/hooks',
    //         '@contexts': '/src/contexts',
    //     },
    // },
    // define: {
    //     'process.env': process.env,
    // },
// });
