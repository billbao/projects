var closeRightTabs = {};

closeRightTabs.getRightUnpinnedTabsfrom = function _getRightUnpinnedTabsfrom(aTab) {
	var tabs = gBrowser.tabs,
		ret = [];

	for (var i = tabs.length - 1; i >= 0; --i) {
		var t = tabs[i];
		if (t === aTab) { break; }
		if (t.pinned) { continue; }
		ret.unshift(t);
	}

	return ret;
};

closeRightTabs.removeRightTabsfrom = function _removeRightTabsfrom(aTab) {
	//if (gBrowser.warnAboutClosingTabs(false)) {
		var rtabs = closeRightTabs.getRightUnpinnedTabsfrom(aTab);

		for (var i = rtabs.length - 1; i >= 0; --i) {
			gBrowser.removeTab(rtabs[i], {animate:true});
		}
	//}
};

//Set menuitem's state
window.addEventListener("load", function() {
		document.getElementById("tabContextMenu").addEventListener("popupshowing", function(ev){
			//Must be called after TabContextMenu.updateContextMenu(menupopup)
			if (ev.target !== this) { return; }

			var rtabs = closeRightTabs.getRightUnpinnedTabsfrom(TabContextMenu.contextTab);
			document.getElementById("context_closeRightTabs").disabled = !rtabs.length;
			}, false);
		}, false);
