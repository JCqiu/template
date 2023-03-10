export default {
	name: 'img',
	hooks: {
		beforeMount(el, binding, vnode) {
			el.src = new URL(vnode.props.src, binding.value).href
		},
	},
}
