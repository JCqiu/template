import { defineAsyncComponent,render,createVNode } from 'vue'
const components = import.meta.glob('./**/*.vue') // 异步方式

export default function install (app) {
  for (const [key, value] of Object.entries(components)) {
    const name = key.split('/')[1]
    app.component(name, defineAsyncComponent(value))
    // if(name.includes('Modal')) {
    //   console.log(defineAsyncComponent(value));
    //   const vnode = createVNode(defineAsyncComponent(value));
    //   render(vnode, document.body);
    // }
  }
}