const environment = {
	dev: {
		url:'http://192.168.110.252/merchant',
		uploadUrl: '/blade-resource/oss/endpoint/put-file-attach',
		imgUrl: '',
	},
	test: {
		url: 'http://192.168.110.244/api',
		uploadUrl: '/blade-resource/oss/endpoint/put-file-attach',
		imgUrl: 'http://192.168.200.26:9000',
	},
	prod: {
		url: 'http://192.168.110.252/merchant',
		uploadUrl: '/blade-resource/oss/endpoint/put-file-attach',
		imgUrl: 'https://wy.scdpnh.com:8105',
	},
}
export default environment[import.meta.env.MODE]
