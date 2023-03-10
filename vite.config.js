import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    console.log("启动模式：" + mode);
    return {
        base: './',
        plugins: [vue()],
        // server: {
        //     host: '0.0.0.0',
        //     proxy: {
        //         '/hfb-commodity': {
        //             // target: 'http://192.168.110.54:9091',
        //             target: 'http://192.168.110.179:8200',
        //             // target: 'http://192.168.110.118:8088',
        //             changeOrigin: true,
        //             rewrite: (path) => path.replace(/^\/hfb-commodity/, '')
        //         }
        //     }
        // },
        resolve: {
            alias: {
                "@": "/src",
            }
        },
        css: {
            preprocessorOptions: {
                less: {
                    modifyVars: {
                        hack: 'true;@import "@/styles/theme.less"'
                    },
                    javascriptEnabled: true
                }
            }
        }
    }
})