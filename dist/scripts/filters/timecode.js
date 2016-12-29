 (function() {
     function timecode() {
         return function(seconds) {
				
				 var output;
				
				 if (seconds >= 3600) {
					 output = buzz.toTimer(seconds, true);
				 
				 } else if (seconds >= 600) {
					 output = buzz.toTimer(seconds);
					 
				 } else {
					  output = buzz.toTimer(seconds).slice(1);
				 }
				
             return output;
         };
     }
 
     angular
         .module('blocJams')
         .filter('timecode', timecode);
 })();