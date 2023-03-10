import config from '../../config'

export default {
    name: 'oss-img',
    hooks: {
        beforeMount(el, binding, _vnode) {
            el.src = config.imgUrl + binding.value
        },
    },
}
