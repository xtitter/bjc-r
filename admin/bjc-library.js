/*
 * Common functions for any bjc page
 * 
 * CANNOT RELY ON JQUERY, YO
 */

if ( typeof bjc === 'undefined') {
	// if bjc-loader wasn't used, we need this.
	bjc = {};
	bjc.rootURL = "/bjc-r";
	bjc.loaded = {};   // needs to be defined, even though unused if bjc_loader isn't run
}




/////////////////


bjc.CORSproxy = "www.corsproxy.com";

bjc.CORSCompliantServers = [];
bjc.CORSCompliantServers.push("bjc.berkeley.edu");
bjc.CORSCompliantServers.push("snap.berkeley.edu");


////

bjc.snapRunURLBase = "http://snap.berkeley.edu/snapsource/snap.html#open:";

// returns the current domain with a cors proxy if needed
bjc.getSnapRunURL = function(targeturl) {

	if (targeturl.substring(0, 7) == "http://") {
		// pointing to some non-local resource... maybe a published cloud project?  do nothing!!
		return targeturl;	
			
	} else {
		// internal resource!
		var finalurl = bjc.snapRunURLBase + "http://";
		var currdom = document.domain;
console.log(currdom);
		// why not, for the devs out there...
		if (currdom == "localhost") {
			currdom = "bjc.berkeley.edu";
		}
		if (bjc.CORSCompliantServers.indexOf(currdom) == -1) {
			finalurl = finalurl + bjc.CORSproxy + "/";
		}
		finalurl = finalurl + currdom + targeturl;
		
		return finalurl;
	}

	

	
	
		return currdom;

}



//TODO put this in the bjc namespace
/** Returns the value of the URL parameter associated with NAME. */
function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.search);
  if(results == null)
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}



/** Strips comments off the line. */
bjc.stripComments = function(line) {
	var index = line.indexOf("//");
	if (index != -1 && line[index - 1] != ":") {
		line = line.slice(0, index);
	}
	return line;
}



bjc.loaded['bjc-library'] = true;
