(function () {
	function config($stateProvider, $locationProvider) {
		$locationProvider
			.html5Mode({
				enabled: true,
				/* disables hashbang URLS */
				requireBase: false /* one way to avoid a common location error */
			});
		$stateProvider
			.state('landing', {
				url: '/',
				controller: 'LandingCtrl as landing',
				templateUrl: '/templates/landing.html'
			})
			.state('album', {
				url: '/album',
				controller: 'AlbumCtrl as album',
				templateUrl: '/templates/album.html'
			})
			.state('collection', {
				url: '/collection',
				controller: 'CollectionCtrl as collection',
				templateUrl: '/templates/collection.html'
			});

	}
	angular
		.module('blocJams', ['ui.router'])
		/*To make sure the providers are accessible throughout the application, inject them using the config block on the application's root module. Write a config function to pass into the config() function: */
		.config(config);
})();