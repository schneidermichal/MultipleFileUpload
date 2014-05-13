var fallbackController = this;
(function($) {
	// API: http://www.plupload.com/docs/API

	// Convert divs to queue widgets when the DOM is ready
	$(function(){
		// TODO: auto fallback
		var uploader = $("#"+{$id|escapeJs|noescape}).pluploadQueue({
			// General settings
			runtimes : 'html5,flash,silverlight,html4',
			url : {$uploadLink|escapeJs|noescape},
			max_file_size : {$sizeLimit|noescape},
			chunk_size : '5mb',
			rename : true,
			flash_swf_url : {$interface->baseUrl|escapeJs|noescape}+'/js/Moxie.swf',
			silverlight_xap_url : {$interface->baseUrl|escapeJs|noescape}+'/js/Moxie.xap'

			// Intentionally do not use headers because not all interfaces allows you to send them.
			// instead use parameters in URL or POST
		});
		uploader = $(uploader).pluploadQueue();
		// if plupload moves around page, good to recompute position of uploader, @link http://www.plupload.com/docs/UI.Plupload#refresh--method
		var refreshFn = function(){
			uploader.refresh();
		};
		setInterval(refreshFn,1000);
		refreshFn();

		uploader.bind("Error",function(){
			fallbackController.fallback();
		});
	});

	return true; // OK

})(jQuery);