chrome.browserAction.onClicked.addListener(function(tab) {
  // var backgroundPage = chrome.extension.getBackgroundPage();
  var disabledExtensions = [];
  var thisExtensionName = 'Disable Extensions Temporarily';

  if (localStorage.getItem('disabledExtensions') == null) {
    // disable extensions

    chrome.management.getAll(function(extensionInfo) {
      for (var n in extensionInfo) {
        if (
          extensionInfo[n].enabled == true &&
          extensionInfo[n].isApp != true &&
          extensionInfo[n].mayDisable == true &&
          extensionInfo[n].name != thisExtensionName
        ) {
          chrome.management.setEnabled(extensionInfo[n].id, false);
          var o = {};
          o[extensionInfo[n].id] = extensionInfo[n].name;
          disabledExtensions.push(o);
        }
      }
      //backgroundPage.console.log(disabledExtensions);
      localStorage.setItem('disabledExtensions', JSON.stringify(disabledExtensions));
    });

    return;
  }

  // else, enable previously disabled extensions

  disabledExtensions = JSON.parse(localStorage.getItem('disabledExtensions'));
  for (var n in disabledExtensions) {
    for (var id in disabledExtensions[n]) {
      //backgroundPage.console.log(id + " = " + disabledExtensions[n][id]);
      chrome.management.setEnabled(id, true);
    }
  }
  localStorage.removeItem('disabledExtensions');
});
