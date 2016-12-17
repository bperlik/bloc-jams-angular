(function () {
	function SongPlayer() {
		var SongPlayer = {};

		/**
		 * @desc - currently playing song
		 * @type - {object}
		 */
		var currentSong = null;

		/**
		 * @desc - Buzz object audio file
		 * @type - {Object}
		 */
		var currentBuzzObject = null;

		/**
		 * @function  -setSong
		 * @desc Stops currently playing song and loads new audio file as currentBuzzObject
		 * @param {Object} song
		 */
		var setSong = function (song) {
			if (currentBuzzObject) {
				currentBuzzObject.stop();
				currentSong.playing = null;
			}

			currentBuzzObject = new buzz.sound(song.audioUrl, {
				formats: ['mp3'],
				preload: true
			});

			currentSong = song;
		};

		/** 
		 * @function - playSong
		 * @desc - starts play passed song and set song to true
		 * @param - {object} song
		 */
		var playSong = function (song) {
			currentBuzzObject.play();
			song.playing = true;
		}

		/**
		 * @function - SongPlayer.play
		 * @desc - checks if passed song is currently playing, if not, starts playing passed *  * @parm - song object
		 */
		SongPlayer.play = function (song) {
			if (currentSong !== song) {
				setSong(song);
				playSong(song);

			} else if (currentSong === song) {
				if (currentBuzzObject.isPaused()) {
					playSong(song);
				}
			}
		};

		/** 
		 * @function - SongPlayer.pause
		 * @desc - pauses the song that's playing
		 * @param - song object
		 */
		SongPlayer.pause = function (song) {
			currentBuzzObject.pause();
			song.playing = false;
		};

		return SongPlayer;
	}

	angular
		.module('blocJams')
		.factory('SongPlayer', SongPlayer);
})();