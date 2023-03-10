const modules = import.meta.globEager('./modules/**/*.js')

export const setupDirective = (app) => {
	Object.keys(modules).forEach((key) => {
		const mod = modules[key].default || {}
		app.directive(mod.name, mod.hooks)
	})
}
