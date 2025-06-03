import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',
    port: 4000,
},
resolve: {
    alias: {
        '@':"/src",
        'api': "/src/api",
        'components': "/src/components",
        'constants': "/src/constants",
        'contexts':"/src/contexts",
        'pages': "/src/pages",
        'router': "/src/router",    
        'services': "/src/services", 
        'styles': "/src/styles", 
        'types': "/src/types", 
        'utils': "/src/utils", 

    },
},
// define: {
//     'process.env': process.env,
// },
})



