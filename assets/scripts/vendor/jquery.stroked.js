/*

stroked

I wrote this plugin to draw rising strokes across things.  

It's based upon the work of Mathieu 'P01' Henri drawing diag lines via css

04/09/09 - version 1.0, code collection from dev/test/debug

*/

$.fn.stroked = function(options) {  

	var defaults = {  
		stroClass: "stroked",
		lineStyle: "rising",
		lineColor: "red",
		lineThickness: "2px"
	};  
	var options = $.extend(defaults, options);  

	return this.each(function() {  

		stroElem = $(this);
		stroWide = stroElem.width()+'px ';
		stroHigh = stroElem.height()+'px ';
		stroId = stroElem.attr('id'); 

		localStroClass = defaults.stroClass +"_"+ stroId;

		stroElem.append($('<div class="'+localStroClass+'">'));
		stroClassDivSel = "."+localStroClass+" div";
		stroClassSel = "."+localStroClass;

		zeroPx = '0px '; 
		if (defaults.lineStyle == "falling") {

			$(stroClassSel)
			.append($('<div></div>').css({ 'border-width': "" +zeroPx +zeroPx +stroHigh +stroWide, 'border-bottom-color': defaults.lineColor })) 
			.append($('<div></div>').css({ 'left': defaults.lineThickness, 'border-width': "" +zeroPx +zeroPx +stroHigh +stroWide, 'border-bottom-color': 'white' }));

			$(stroClassSel).css({ 'position': 'relative', 'width': '100%', 'height': '100%', 'z-index': '-1' });
			$(stroClassDivSel).css({ 'position': 'absolute', 'border-left-color': 'transparent', 'border-style': 'solid' });

		} else {

			$(stroClassSel)
			.append($('<div></div>').css({ 'border-width': "" +zeroPx +stroWide +stroHigh +zeroPx, 'border-right-color': defaults.lineColor })) 
			.append($('<div></div>').css({ 'left': defaults.lineThickness, 'border-width': "" +zeroPx +stroWide +stroHigh +zeroPx, 'border-right-color': 'white' }));

			$(stroClassSel).css({ 'position': 'relative', 'width': '100%', 'height': '100%', 'z-index': '-1' });
			$(stroClassDivSel).css({ 'position': 'absolute', 'border-bottom-color': 'transparent', 'border-style': 'solid' });

		}
	});  

};

/* done */

