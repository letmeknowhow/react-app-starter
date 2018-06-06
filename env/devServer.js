var mockport =8000;

process.argv.forEach(function(val, index) {
	if (val === '--env.mockport') {
		mockport = process.argv[index + 1];
		return false;
	}
});

module.exports = {
	common:{

	},
	production:{},
	qa: {},
	dev: {},
	fe: {
        proxy: {
            '**/*.action': {
                target: 'http://localhost:' + mockport,
                bypass: function (req, res, proxyOptions) {
                    //处理jsp页面默认的action
                    if (req.headers.accept.indexOf('html') != -1) {
                        return 'index.html';
                    }
                }
            }
        },
	}
};
