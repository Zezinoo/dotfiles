/**
 * Transforms incoming background/extension messages to window messages
 */
(
    function () {
        chrome.runtime.onMessage.addListener(function(msg) {
            postWindowMessage(msg);
        });
    }
)();