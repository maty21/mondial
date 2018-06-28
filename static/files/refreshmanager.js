//Check to see if TM is defined or not.
if (typeof TM === 'undefined') {
  TM = {};
}
TM.RefreshManager = (function (){
	var _DEFAULT_REFRESH_TIME = 300 * 1000; // 4 minutes in milli sec
	var _refreshTimeout = null;
	var _to = null;	
	var _this = _DEFAULT_REFRESH_TIME;
		
	
	return {
		init : function(interval){		
			_this = this;
			_this.setRefresh(interval);			
		},
		displayRefreshTimeout : function(){
			if(window.console){
				console.log('current refresh timeout: ' + _refreshTimeout);
			}
		},
		// interval is in millisec
		setRefresh : function(interval){			
			_refreshTimeout = interval ? interval : _DEFAULT_REFRESH_TIME;
			if (_to){
				clearTimeout(_to);
			}
			if (interval > 0){
				_to = setTimeout('window.location.reload()', _refreshTimeout);
			}
		},
		cancelRefresh : function(){
			clearTimeout(_to);		
		},
		resumeRefresh : function(){
			_this.setRefresh(_refreshTimeout);
		}
		/**
		 * Use 'onVideoTemplateLoaded' with BrightCove(BC) video player.
		 * 
		 * When BC video load, it calls the method : onTemplateLoaded.
		 * The refresh-manager uses this method in order to listen to start/ stop video envents.
		 * 
		 * In order to avoid overriding the refresh manager behavior,
		 * replace the method 'onTemplateLoaded' in BC embed code in the back-end with:		 *
		 *  	function onVideoTemplateLoaded(experienceID){
		 *  		< Here comes your code ...> 
		 *  	}
		 */		
	};
})();

/**
 * BrightCove video player events setting.
 * This function is called by the BrightCove java-script
 */
function onTemplateLoaded(experienceID){
	if(onVideoTemplateLoaded){
	   onVideoTemplateLoaded(experienceID);
	}
	try{
		bcExp = brightcove.getExperience(experienceID);
		modVP = bcExp.getModule(APIModules.VIDEO_PLAYER);
  
		// When user video being palyed (even after pause)
		modVP.addEventListener(BCMediaEvent.PLAY , TM.RefreshManager.cancelRefresh);
   
		var siteString = window.location.toString() + "videoStarted";
		modVP.addEventListener(BCMediaEvent.PLAY , _gaq.push(['_trackEvent',"videos" , 'play','siteString']));
		// When video is paused or completed
		modVP.addEventListener(BCMediaEvent.STOP , TM.RefreshManager.resumeRefresh);
	}catch(e){}
}
/**
jQuery(document).ready(function(){	
	TM.RefreshManager.init();
});
**/