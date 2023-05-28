const chatToggleCheckbox = document.getElementById('chat-toggle');


document.getElementById('header-close').addEventListener('click', () => window.close())
document.getElementById('chat-toggle').addEventListener('change', (e) => {
  sendMessage('chat-visibility', { visible: e.target.checked }, null);
});

// Coordinates message-sending between popup and content script.
const sendMessage = function (type, data, callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const tab = tabs[0];
    chrome.tabs.executeScript(tab.id, { file: './content.js' }, function () {
      chrome.tabs.sendMessage(tab.id, { type: type, data: data }, function (response) {
        if (response && response.errorMessage) {
          return;
        }

        if (callback) {
          callback(response);
        }
      });
    });
  })
};

const getSessionLink = function(videoID, sessionID) {
  return `https://www.youtube.com/watch?v=${videoID}&party=${sessionID}`;
}

sendMessage('get-session-data', {}, function({ username, userID, sessionID, videoID, videoTitle, chatState }) {
  document.getElementById('chat-toggle').checked = chatState;
  if(sessionID === null) {
    $('#username-entry').val(localStorage.getItem('party-username') || 'Partygoer');
    // Ensure the create-session-view is visible.
    $('#create-session-view').show();
    $('#session-info-view').hide();
  } else {
    // Ensure the session-info-view is visible.
    $('#create-session-view').hide();
    $('#session-info-view').show();
    $('#share-session-link').val(getSessionLink(videoID, sessionID));
    $('#username-entry-during-session').val(username);
    document.getElementById('copy-icon').addEventListener('click', copyURL);
    document.getElementById('save-icon').addEventListener('click', saveUsername);
  }
});

// From: https://www.w3schools.com/howto/howto_js_copy_clipboard.asp
const copyURL = () => {
  /* Get the text field */
  var copyText = document.getElementById('share-session-link');

  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /*For mobile devices*/

  /* Copy the text inside the text field */
  document.execCommand('copy');

  document.getElementById('tooltip-message').innerHTML = 'COPIED!';

  document.getSelection().removeAllRanges();
  copyText.blur();
}

const isValidUsername = username =>  /^[0-9a-zA-Z_.-]+$/.test(username);

const saveUsername = () => {
  document.getElementById('saved-tooltip-message').innerHTML = 'SAVED!';
  let username = $('#username-entry-during-session').val();
  if(isValidUsername(username)) {
    document.getElementById('saved-tooltip-message').innerHTML = 'SAVED!';
    sendMessage('update-username', { username }, null);
    localStorage.setItem('party-username', username);
  } else {
    alert('Please try a different username. Usernames can include numbers, letters, and _, ., and - characters.');
  }
}


chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.type === 'toggle-chat') {
      const { checked } = request.data;
      chatToggleCheckbox.checked = checked;
    }
});

$('#create-session-button').click(() => {
  let username = $('#username-entry').val();
  if(!isValidUsername(username)) {
    console.log(username);
    alert('Please try a different username. Usernames can include numbers, letters, and _, ., and - characters.');
    return;
  }

  // if(!username || !username.length) return; // TODO: throw error.
  localStorage.setItem('party-username', username);
  sendMessage('create-session', { username }, function({ sessionID, videoID, videoTitle }) {
    if(sessionID !== null) {
      // Ensure the session-info-view is visible.
      // Switch to session-info-view.
      $('#create-session-view').toggle();
      $('#session-info-view').toggle();
      $('#share-session-link').val(getSessionLink(videoID, sessionID));
      $('#username-entry-during-session').val(username);
      document.getElementById('chat-toggle').checked = true;
      document.getElementById('copy-icon').addEventListener('click', copyURL);
      document.getElementById('save-icon').addEventListener('click', saveUsername);
    }
  })
});

$('#leave-session-button').click(() => {
  sendMessage('leave-session', { }, function() {
    $('#create-session-view').toggle();
    $('#session-info-view').toggle();
    $('#username-entry').val(localStorage.getItem('party-username'));
    window.close();
  })
});