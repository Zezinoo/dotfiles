// Show current extension version number
$('.ext-version').html('version ' + chrome.runtime.getManifest().version)

// Create new party button
$('#new-party-link').click(() => {
    createAndJoinNewParty();
});

// Save displayname
$('#displayname').submit((ev) => {
    setDisplayName($('#displayname-text').val());
    $('.saved-hint').css('visibility', 'visible')
        .css('opacity', '1');
    changeDisplayButton()
    setTimeout(() => {
        $('.saved-hint').css('visibility', 'hidden')
            .css('opacity', '0');
    }, 3000);
    ev.preventDefault(); // Prevent page reload
});

function changeDisplayButton() {
    let saveMessage = document.querySelector('#saveMessage')
    let saveSvg = document.querySelector('#saveSvg')
    saveSvg.classList.remove('invisible')
    saveMessage.innerText = "Saved!"
    console.log('change btn to saved')
}

// Copy party link button
$('#copy-party-link').click(() => {
    copyPartyUrl();
    confirmCodeCopy();
});

/**
 * Copy the party URL to the clipboard
 */
function copyPartyUrl() {
    const partyCode = $('#party-code').val();
    chrome.tabs.query(
        {active: true, currentWindow: true},
        function(tabs) {   
            const currentTab = tabs[0];
            let url = new URL(currentTab.url).origin;

            if (url.includes('amazon.')) {
                url += '/gp/video/storefront'
            }

            const partyLink = url + '/?pvpartyId=' + partyCode;
            navigator.clipboard.writeText(partyLink)
        }
    );
}

/**
 * Show "Copied!" in copy button and reset after 3 sec.
 */
function confirmCodeCopy() {
    const copyLinkButton = $('#copy-party-link');
    copyLinkButton.html('<i class="fas fa-check" aria-hidden="true"></i> Copied!');
    setTimeout(() => {
        copyLinkButton.html('<i class="fas fa-paste" aria-hidden="true"></i> Copy link');
    }, 3000);
}
