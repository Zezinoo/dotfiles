// Coordinates message-sending between background and content script.
const sendMessage = function (tabId, type, data, callback) {
  chrome.tabs.executeScript(tabId, { file: './content.js' }, function () {
    chrome.tabs.sendMessage(tabId, { type: type, data: data }, function (response) {
      if (callback) {
        callback(response);
      }
    });
  });
};

const sendMessageNoInject = function (tabId, type, data, callback) {
  chrome.tabs.sendMessage(tabId, { type: type, data: data }, function (response) {
    if (callback) {
      callback(response);
    }
  });
};

const enableExtensionRule = {
    conditions: [
      new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {
            hostEquals: 'www.youtube.com',
            pathPrefix: '/watch',
            schemes: ['http', 'https']
        }
      })
    ],
    actions: [ new chrome.declarativeContent.ShowPageAction() ]
};

// On installation/update, add rule to listen for www.youtube.com/watch* and enable extension.
chrome.runtime.onInstalled.addListener(function(details) {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([
        enableExtensionRule
      ]);
    });
});

chrome.runtime.onMessage.addListener(function(request, sender, callback) {
  if(request.type === 'change-url') {
    const { videoID, sessionID } = request.data;
    const tab = sender.tab;

    if(tab) {
      chrome.tabs.update(tab.id, { url: `http://www.youtube.com/watch?v=${videoID}&party=${sessionID}` });
    }

    callback();
  }

});

const joinSessionListener = (tabDetails) => {
  const { tabId, url } = tabDetails;
  const sessionID = new URLSearchParams(url).get('party');

  if(sessionID) {
    sendMessage(
      tabId,
      'join-session',
      { sessionID },
      null
    )
  }
}


const changePageListener = (tabDetails) => {
  const { tabId, url } = tabDetails;
  sendMessageNoInject(
    tabId,
    'get-session-data',
    {},
    (data) => {
      if (!data) {
        return;
      }
      // Don't need videoID and videoTitle.
      const { sessionID, videoID } = data;

      // If not in a session, don't do anything.
      if(!sessionID) {
        return;
      }

      // If already on this video. Dealing with event triggered multiple times.
      if(url.includes(videoID)) {
        return;
      }

      sendMessageNoInject(
        tabId,
        'change-video',
        {
          sessionID,
        },
        null
      )
    }
  )
}


chrome.webNavigation.onHistoryStateUpdated.addListener(changePageListener, {
  url: [{
    hostEquals: 'www.youtube.com',
    pathPrefix: '/watch'
  }]
});

chrome.webNavigation.onCommitted.addListener(joinSessionListener, {
  url: [{
    hostEquals: 'www.youtube.com',
    pathPrefix: '/watch',
    urlContains: '&party='
  }]
});

chrome.runtime.setUninstallURL('https://forms.gle/D7WcUGh3x9A9QMFo7', () => {
  console.log('We out.');
});