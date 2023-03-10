import { createApp } from 'vue'
import App from './App.vue'
import routes from './router';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.less';
import components from './components'
import { createRouter, createWebHistory } from 'vue-router'
import { setupDirective } from './directive'
import { name } from '../package.json'

if (window.__POWERED_BY_WUJIE__) {
    let app;
    window.__WUJIE_MOUNT = () => {
        app = createApp(App)
        app.use(components);
        app.use(Antd);
        app.use(createRouter({ history: createWebHistory(`/${name}/`), routes }));
        setupDirective(app)
        app.mount("#app")
    };
    window.__WUJIE_UNMOUNT = () => app.unmount();
    window.__WUJIE.mount();
} else {
    const app = createApp(App)
    app.use(components);
    app.use(Antd);
    app.use(createRouter({ history: createWebHistory(`/${name}/`), routes }));
    setupDirective(app)
    app.mount("#app")
}