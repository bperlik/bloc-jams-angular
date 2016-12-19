(function () {

	//	@function - seekBar
	// @descr - replace html with directed template behavior to Angular compiler
	// @param - $document 
	// @returns {object} - 
	//			E for element = <seek-bar> or <div seek-bar> in html
	//			replace: true = completely replace seek-bar element with template
	//			templateUrl = path to the template
	function seekBar($document) {


		// @function - calculatePercent
		// @desc - 	calculates percentage of movement along width of bar
		// @param - seekBar function and event (click)
		// @return - the needed offset 
		var calculatePercent = function (seekBar, event) {
			var offsetX = event.pageX - seekBar.offset().left;
			var seekBarWidth = seekBar.width();
			var offsetXPercent = offsetX / seekBarWidth;
			offsetXPercent = Math.max(0, offsetXPercent);
			offsetXPercent = Math.min(1, offsetXPercent);
			return offsetXPercent;
		};

		return {
			templateUrl: '/templates/directives/seek_bar.html',
			replace: true,
			restrict: 'E',
			scope: {},
			link: function (scope, element, attributes) {
				scope.value = 0;
				scope.max = 100;

				var seekBar = $(element);

				var percentString = function () {
					var value = scope.value;
					var max = scope.max;
					var percent = value / max * 100;
					return percent + "%";
				};

				scope.fillStyle = function() {
					return {
						width: percentString()
					};
				};
				scope.thumbStyle = function() {
					return {left: percentString()
					};
				};

				// @function - scope.onClickSeekBar
				// @descr - 	calculates seekbar percent movement
				// @param - 	event (click event)
				scope.onClickSeekBar = function (event) {
					var percent = calculatePercent(seekBar, event);
					scope.value = percent * scope.max;
				};

				// @function - scope.trackThumb
				// @desc - moves percent when user drags seek bar thumb tab
				scope.trackThumb = function() {
					$document.bind('mousemove.thumb', function (event) {
						var percent = calculatePercent(seekBar, event);
						scope.$apply(function() {
							scope.value = percent * scope.max;
						});
					});

					$document.bind('mouseup.thumb', function () {
						$document.unbind('mousemove.thumb');
						$document.unbind('mouseup.thumb');
					});
				};
			}
		};
	}

	angular
		.module('blocJams')
		.directive('seekBar', ['$document', seekBar]);
})();