(function () {
	function AlbumCtrl() {	
		   this.songs = [];
			for (var i=1; i< album.songs.length; i++) {
				this.albums.push(angular.copy(albumPicasso));
			}
	}

	angular
		.module('blocJams')
		.controller('AlbumCtrl', AlbumCtrl);
})();

