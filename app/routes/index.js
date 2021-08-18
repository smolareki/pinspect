module.exports = function(app) {

	app.get('/', function(req, res) {
		res.render('partials/wrapper', {
			entity: '',
			method: '',
			tenant: '',
			id: ''
		});
	});

	app.get('/order/:tenant?/:id?', function(req, res) {
		res.render('partials/wrapper', {
			entity: 'order',
			method: 'GetOrderByNumber',
			tenant: req.params.tenant,
			id: req.params.id
		});
	});

	app.get('/sku/:tenant?/:id?', function(req, res) {
		res.render('partials/wrapper', {
			entity: 'sku',
			method: 'GetSku',
			tenant: req.params.tenant,
			id: req.params.id
		});
	});

	app.get('/customer/:tenant?/:id?', function(req, res) {
		res.render('partials/wrapper', {
			entity: 'customer',
			method: 'GetCustomer',
			tenant: req.params.tenant,
			id: req.params.id
		});
	});

	app.get('/product/:tenant?/:id?', function(req, res) {
		res.render('partials/wrapper', {
			entity: 'product',
			method: 'GetProduct',
			tenant: req.params.tenant,
			id: req.params.id
		});
	});

	app.get('/website/:tenant?/:id?', function(req, res) {
		res.render('partials/wrapper', {
			entity: 'website',
			method: 'GetWebSite',
			tenant: req.params.tenant,
			id: req.params.id
		});
	});
};