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
			scope: {
				onChange: '&'
			}, // & binding to allow execution in parent scope
			link: function (scope, element, attributes) {
				scope.value = 0;
				scope.max = 100;

				var seekBar = $(element);

				attributes.$observe('value', function (newValue) {
					scope.value = newValue;
				});

				attributes.$observe('max', function (newValue) {
					scope.max = newValue;
				});

				var percentString = function () {
					var value = scope.value;
					var max = scope.max;
					var percent = value / max * 100;
					return percent + "%";
				};

				scope.fillStyle = function () {
					return {
						width: percentString()
					};
				};
				scope.thumbStyle = function () {
					return {
						left: percentString()
					};
				};

				// @function - scope.onClickSeekBar
				// @descr - 	calculates seekbar percent movement
				// @param - 	event (click event)
				scope.onClickSeekBar = function (event) {
					var percent = calculatePercent(seekBar, event);
					scope.value = percent * scope.max;
					notifyOnChange(scope.value);
				};

				// @function - scope.trackThumb
				// @desc - moves percent when user drags seek bar thumb tab
				scope.trackThumb = function () {
					$document.bind('mousemove.thumb', function (event) {
						var percent = calculatePercent(seekBar, event);
						scope.$apply(function () {
							scope.value = percent * scope.max;
							notifyOnChange(scope.value);
						});
					});

					$document.bind('mouseup.thumb', function () {
						$document.unbind('mousemove.thumb');
						$document.unbind('mouseup.thumb');
					});
				};

				//*
				// @function - scope.notifyOnChange
				// @desc - checks that attribute passed in is a function, calls that function
				//
				var notifyOnChange = function (newValue) {
					if (typeof scope.onChange === 'function') {
						scope.onChange({
							value: newValue
						});
					}
				};

			}
		};
	}

	angular
		.module('blocJams')
		.directive('seekBar', ['$document', seekBar]);
})();