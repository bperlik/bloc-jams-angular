(function () {
	function SongPlayer($rootScope, Fixtures) {
		var SongPlayer = {};

		/**
		 * @desc -album that songs are currently being played from
		 * @type -{Object}
		 */
		var currentAlbum = Fixtures.getAlbum();

		/**
		 * @desc -Buzz object audio file
		 * @type -{Object}
		 */
		var currentBuzzObject = null;

		/**
		 * @function -playSong
		 * @desc -starts playing a song and sets song.playing to true
		 * @param -{Object} song
		 */
		var playSong = function (song) {
			currentBuzzObject.play();
			song.playing = true;
		}

		/**
		 * @function -stopSong
		 * @desc -stops playing the current song and sets song.playing to false
		 * @param -{Object} song
		 */
		var stopSong = function (song) {
			currentBuzzObject.stop();
			song.playing = false;
		}

		/**
		 * @function -setSong
		 * @desc -stops currently playing song and loads new audio file as currentBuzzObject
		 * @param -{Object} song
		 */
		var setSong = function (song) {
			if (currentBuzzObject) {
				stopSong(SongPlayer.currentSong);
			}

			currentBuzzObject = new buzz.sound(song.audioUrl, {
				formats: ['mp3'],
				preload: true
			});

			currentBuzzObject.bind('timeupdate', function () {
				$rootScope.$apply(function () {
					SongPlayer.currentTime = currentBuzzObject.getTime();
				});
			});
			
			currentBuzzObject.bind('ended', function(event) {
				SongPlayer.next();
			});
			
			SongPlayer.currentSong = song;
		};

		/**
		 * @function -getSongIndex
		 * @desc - get the index of the song passed to this function
		 * @param -{Object} song
		 * @returns - {number} index of the song passed in
		 */
		var getSongIndex = function (song) {
			return currentAlbum.songs.indexOf(song);
		};

		/**
		 *@desc -currently playing song
		 *@type -{Object}
		 */
		SongPlayer.currentSong = null;

		/**
		 * @desc - Current playback time (in seconds) of currently playing song
		 * @type - {Number}
		 */
		SongPlayer.currentTime = null;
		
		/* @desc initialize current playback volume
 		 * @type {Number}
 		 */
 		SongPlayer.volume = 80;
		
		/**
		 * @function -SongPlayer.play
		 * @desc -checks to see if the currentSong is the same as the song passed in. If it not, starts playing the new song. If the same, it pauses the currently playing song.
		 * @param -{Object} song
		 */
		SongPlayer.play = function (song) {
			song = song || SongPlayer.currentSong;
			if (SongPlayer.currentSong !== song) {
				setSong(song);
				playSong(song);
			} else if (SongPlayer.currentSong == song) {
				if (currentBuzzObject.isPaused()) {
					playSong(song);
				}
			}
		};

		/**
		 * @function -SongPlayer.pause
		 * @desc 	-pauses the currently playing song
		 * @param -{Object} song
		 */
		SongPlayer.pause = function (song) {
			song = song || SongPlayer.currentSong;
			currentBuzzObject.pause();
			song.playing = false;
		}

		/**
		 * @function -SongPlayer.previous
		 * @desc -plays the song before the currently playing song, or stops if at the beginning of the track list
		 */
		SongPlayer.previous = function () {
			var currentSongIndex = getSongIndex(SongPlayer.currentSong);
			currentSongIndex--;

			if (currentSongIndex < 0) {
				stopSong(SongPlayer.currentSong);
			} else {
				var song = currentAlbum.songs[currentSongIndex];
				setSong(song);
				playSong(song);
			}
		};

		/**
		 * @function -SongPlayer.next
		 * @desc -plays the next song after the one currently playing, or stops if at the end  of the track list
		 */
		SongPlayer.next = function () {
			var currentSongIndex = getSongIndex(SongPlayer.currentSong);
			currentSongIndex++;

			if (currentSongIndex >= currentAlbum.songs.length) {
				stopSong(SongPlayer.currentSong);
			} else {
				var song = currentAlbum.songs[currentSongIndex];
				setSong(song);
				playSong(song);
			}
		};

		/**
		 * @function - setCurrentTime
		 * @desc - Set current time (in seconds) of currently playing song
		 * @param - {Number} time
		 */
		SongPlayer.setCurrentTime = function (time) {
			if (currentBuzzObject) {
				currentBuzzObject.setTime(time);
			}
		};

		/**
 		* @function - setVolume
    	*	@desc - set volume of currently playing song 
 		* @param - {Number} volume
 		*/
 		SongPlayer.setVolume = function(volume) {
 			if (currentBuzzObject) {
 				currentBuzzObject.setVolume(volume);
 			}
 		};
		
		return SongPlayer;
	}

	angular
		.module('blocJams')
		.factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();