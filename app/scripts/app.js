(function () {
	function config($stateProvider, $locationProvider) {
		$locationProvider
         .html5Mode({
             enabled: true,   /* disables hashbang URLS */
             requireBase: false /* one way to avoid a common location error */
         });
		 $stateProvider
         .state('landing', {
             url: '/',
             templateUrl: '/templates/landing.html'
			})
         .state('album', {
             url: '/album',
             templateUrl: '/templates/album.html'
		 	})
		   .state('collection', {
			    url: '/collection',
			 	 templateUrl:'/template/collection.html'
         });	
		
	}
	angular
		.module('blocJams', ['ui.router'])
/*To make sure the providers are accessible throughout the application, inject them using the config block on the application's root module. Write a config function to pass into the config() function: */
		.config(config);
})();                              

