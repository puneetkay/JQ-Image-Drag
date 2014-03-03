/*
 * JQ Image Drag - v1.1 - 27/11/2013
 * https://github.com/puneetkay/JQ-Image-Drag
 *
 * Copyright (c) 2013 Puneet Kalra
 * under the MIT license.
 */

(function($,window,undefined){

	$.fn.imagedrag = function(options){

		function initialise(e,o){
			// Double check options here, or return false.
			// Once all validated, start process.
			imageDrag(e,o);
		}

		
		var elem;
		function imageDrag(e,o){
			// Get required elements
			var img = $('img', elem);
			var input = $(o.input);

			// Get wrapper WnH
			var wrapHeight = elem.height();
			var wrapWidth = elem.width();

			// Get image WnH
			var imgOrgHeight = img.height();
			var imgOrgWidth = img.width();

			// Adjust WnH according to wrapper
			img.width(wrapWidth);
			img.height((wrapWidth/imgOrgWidth) * imgOrgHeight);

			// Get adjusted WnH of image
			var imgHeight = img.height();
			var imgWidth = img.width();

			// Get maximum margin allowed for image.
			var maxMargin = (imgHeight - wrapHeight) * -1;

			img.draggable({
				axis: "y", //drag vertically only
				scroll: false, // do not autocroll container.
				cursor: o.cursor, 
				create: function () {
                    // Get default position here.
                    var position = "0px";
                    if(o.position.toLowerCase() == "top" || o.position == "" || o.position == " " || o.position == null){ 
                    	// do nothing
                    }else if(o.position.toLowerCase() == "middle"){
                    	position = (maxMargin / 2) + "px";  
                    }else if(o.position.toLowerCase() == "bottom"){
                    	position = maxMargin + "px";
                    }else { // if other, consider it as specific pixel or percentage
                    	position = o.position;
                    }
                	// Set default position
                	img.css("top", position);
                	if(o.attribute == 'html')
                		input.html(position);	
                	else
                		input.attr(o.attribute,position);	
                },
                drag: function (event, ui) {
                    var position = ui.position.top;

                    // Margin should be <= 0
                    if (position > 0) {
                        ui.position.top = 0;
                    }
                    // Margin should be >= maximum margin
                    if (position < maxMargin) {
                        ui.position.top = maxMargin;
                    }
                    if(o.attribute == 'html')
                		input.html(ui.position.top + "px");	
                	else
                		input.attr(o.attribute,ui.position.top + "px");
                }
			});

		}


		// Default values
		var defaults = {
			input: "#output", // Selector for top margin.
			attribute: "value", // Target attribute for selector. 
			position: 'middle', // top, middle, bottom, or specific margin.
			cursor: 'move' // Cursor type for image.
		};
		
		// Merge options with defaults.
		var data = $.extend(defaults, options);


		// Data object ready, Now head for logic
		return this.each(function(){
			elem = $(this);
			if(elem == null)
				return false;
			initialise(elem, data);

		});

	}

})(jQuery,this);
