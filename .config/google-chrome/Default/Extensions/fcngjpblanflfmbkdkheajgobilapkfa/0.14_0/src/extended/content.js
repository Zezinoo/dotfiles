let picInPicIcon = `<svg version="1.1" id="Warstwa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">
<style type="text/css">.st0 {fill:#FFFFFF;}</style>
<g><title>Picture In Picture</title><g id="XMLID_6_"><path id="XMLID_11_" class="st0" d="M19.6,11.2h-8.9v6.4h8.8L19.6,11.2L19.6,11.2z M23.9,19.8v-15c0-1.2-1-2.1-2.2-2.1H1.9c-1.2,0-2.2,0.9-2.2,2.1v15c0,1.2,1,2.1,2.2,2.1h19.9C22.9,21.9,23.9,21,23.9,19.8z M21.7,19.8H1.9v-15h19.9V19.8z"/></g></g>
</svg>`
const MAX_TRIES_MONITOR_SKIP = 10
let isMonitorActive = null
let isPipIconActive = false
let fromExtensionMouseTimer = null
let fromExtensionCursorVisible = true
let blurTargetVisible = false
let primePartyExtendedOptions
let oneAvatar = false
let newAvatarImg = new Image()

async function initContent() {
    primePartyExtendedOptions = await loadExtendedOptionsOrSetDefaults()
    startHelper(primePartyExtendedOptions)
}

initContent()

chrome.storage.onChanged.addListener(
    (changes, areaName) => {
        if (areaName === 'local' && changes.primePartyExtendedOptions?.newValue) {
            primePartyExtendedOptions = changes.primePartyExtendedOptions.newValue
            startHelper(primePartyExtendedOptions)
        }
    }
)

function startHelper(primePartyExtendedOptions) {
    let selectors = []
    if (primePartyExtendedOptions.autoPlayNext) { enableAutoPlayNext(selectors) }
    if (primePartyExtendedOptions.skipIntroSequence) { enableSkipIntroSequence(selectors) }
    if (primePartyExtendedOptions.skipAds) { enableskipAds(selectors) }
    if (primePartyExtendedOptions.videoOptionsActive == true && primePartyExtendedOptions.extensionActive == true) {
        eneableVideoOptions(selectors)
        handleVideoSpeed(primePartyExtendedOptions)
    } else {
        handleVideoSpeedDefault()
    }
    eneableSubtitles(selectors)
    enableHideSpoilers(selectors)
    immidietlytoggleSpoilers(selectors)
    extensionHandleCursor(primePartyExtendedOptions)
    if (primePartyExtendedOptions.extensionActive == true) {
        eneableProfilePicture(selectors)
        loopOverSelectors(selectors)
        startMonitoringForSelectors(selectors, 0)
    } else {
        return
    }
}

document.addEventListener('DOMContentLoaded', () => {
    getProfileNames()
    startGetLoop()
})

function getProfileNames() {
    let noListScreen = document.querySelector('h2._3R4E8f')
    let otherProfiles = document.querySelectorAll('div.profile-avatar')
    let profilesArray = Array.from(otherProfiles)
    profilesArray.shift()
    if (primePartyExtendedOptions && !noListScreen && primePartyExtendedOptions.allowAvatar) {
        if (profilesArray[0] && profilesArray[0].parentElement.innerText != 'Add new') {
            primePartyExtendedOptions.avatarPictures.user1.userName = profilesArray[0].parentElement.innerText
        } else {
            primePartyExtendedOptions.avatarPictures.user1.userName = 'User 1'
        } 
        if (profilesArray[1] && profilesArray[1].parentElement.innerText != 'Add new') {
            primePartyExtendedOptions.avatarPictures.user2.userName = profilesArray[1].parentElement.innerText
        } else {
            primePartyExtendedOptions.avatarPictures.user2.userName = 'User 2'
        } 
        if (profilesArray[2] && profilesArray[2].parentElement.innerText != 'Add new') {
            primePartyExtendedOptions.avatarPictures.user3.userName = profilesArray[2].parentElement.innerText
        } else {
            primePartyExtendedOptions.avatarPictures.user3.userName = 'User 3'
        }
        if (profilesArray[3] && profilesArray[3].parentElement.innerText != 'Add new') {
            primePartyExtendedOptions.avatarPictures.user4.userName = profilesArray[3].parentElement.innerText
        } else {
            primePartyExtendedOptions.avatarPictures.user4.userName = 'User 4'
        }
        if (profilesArray[4] && profilesArray[4].parentElement.innerText != 'Add new') {
            primePartyExtendedOptions.avatarPictures.user5.userName = profilesArray[4].parentElement.innerText
        } else {
            primePartyExtendedOptions.avatarPictures.user5.userName = 'User 5'
        } 
        if (profilesArray[5] && profilesArray[5].parentElement.innerText != 'Add new') {
            primePartyExtendedOptions.avatarPictures.user6.userName = profilesArray[5].parentElement.innerText
        } else {
            primePartyExtendedOptions.avatarPictures.user6.userName = 'User 6'
        } 
        if (profilesArray[6] && profilesArray[6].parentElement.innerText != 'Add new') {
            primePartyExtendedOptions.avatarPictures.user7.userName = profilesArray[6].parentElement.innerText
        } else {
            primePartyExtendedOptions.avatarPictures.user7.userName = 'User 7'
        }
        if (primePartyExtendedOptions.avatarPictures.user1.userName != 'User 1' || primePartyExtendedOptions.avatarPictures.user2.userName != 'User 2') {
            primePartyExtendedOptions.allowAvatar = false
        }
        saveOptions(primePartyExtendedOptions)
    }
}

function startGetLoop() {
    setInterval(() => {
        getProfileNames(primePartyExtendedOptions)
        let menageProifileElems = document.querySelectorAll('.nxa5wh')
        if (menageProifileElems.length > 0) {
            menageProifileElems.forEach(elem => {
                reloadProfilePictures1(elem)
            })
        }
    },1000)
}

function immidietlytoggleSpoilers(selectors) {
    loopOverSelectors(selectors)
}

function enableskipAds(selectors) {
    selectors.push('.atvwebplayersdk-adtimeindicator-text')
    selectors.push('.adSkipButton')
    selectors.push('.fu4rd6c')
}

function enableAutoPlayNext(selectors) {
    selectors.push('.atvwebplayersdk-nextupcard-button')
}

function enableSkipIntroSequence(selectors) {
    selectors.push('.atvwebplayersdk-skipelement-button')
}

function enableHideSpoilers(selectors) {
    selectors.push('.tst-hover-synopsis') 
    selectors.push('[data-automation-id="atfSynopsisExpander"]') 
    selectors.push('[data-automation-id^="synopsis"]') 
}

function eneableVideoOptions(selectors) {
    selectors.push('video')
}

function eneableSubtitles(selectors) {
    selectors.push('.atvwebplayersdk-captions-text')
}

function eneableProfilePicture(selectors) {
    selectors.push('#nav-profiles-dropdown-label')
    selectors.push('.nxa5wh')
}

function handleVideoSpeedDefault() {
    let video = document.querySelector("div.scalingVideoContainerBottom > div > video")
    if (video) { video.playbackRate = 1 }
}

function handleVideoSpeed(primePartyExtendedOptions) {
    let video = document.querySelector("div.scalingVideoContainerBottom > div > video")
    if (video) {
        video.playbackRate = Number(primePartyExtendedOptions.videoSpeedValue)
    } else {
        return
    }
}

// hide cursor block 
function extensionHandleCursor(primePartyExtendedOptions) {
    let board = document.querySelector('#dv-web-player') // this is from prime but self cursor hiding
    if (primePartyExtendedOptions.hideCursor && board && primePartyExtendedOptions.extensionActive == true && primePartyExtendedOptions.playerOptionsActive == true) {
        hideCursor()
    } else if (board && (primePartyExtendedOptions.extensionActive == false || primePartyExtendedOptions.playerOptionsActive == false || !primePartyExtendedOptions.hideCursor)) {
        document.querySelector('#dv-web-player').style.cursor = "auto"
        fromExtensionCursorVisible = true
    } else {
        return
    }
}

function hideCursor() {
    if (primePartyExtendedOptions.hideCursor && primePartyExtendedOptions.extensionActive == true && primePartyExtendedOptions.playerOptionsActive == true && document.querySelector('video')) {
        fromExtensionMouseTimer = null
        document.querySelector('#dv-web-player').style.cursor = "none"
        fromExtensionCursorVisible = false
    }
}

document.onmousemove = function() {
    if (fromExtensionCursorVisible === false && primePartyExtendedOptions.hideCursor && primePartyExtendedOptions.extensionActive == true && primePartyExtendedOptions.playerOptionsActive == true) {
        if (fromExtensionMouseTimer) {
            window.clearTimeout(fromExtensionMouseTimer)
        }
        document.querySelector('#dv-web-player').style.cursor = "auto"
        setTimeout(() => {
            fromExtensionCursorVisible = true 
        }, 3300)
        fromExtensionMouseTimer = window.setTimeout(hideCursor, 3300)
    } else {
        return
    }
}

// subtitles
function setFont(elem) {
    if (primePartyExtendedOptions.subtitlesFontFamily == 1) {
        elem.style.fontFamily = "sans-serif"
    } else if (primePartyExtendedOptions.subtitlesFontFamily == 2) {
        elem.style.fontFamily = "serif"
    } else if (primePartyExtendedOptions.subtitlesFontFamily == 3) {
        elem.style.fontFamily = "fantasy"
    } else if (primePartyExtendedOptions.subtitlesFontFamily == 4) {
        elem.style.fontFamily = "cursive"
    } else if (primePartyExtendedOptions.subtitlesFontFamily == 5) {
        elem.style.fontFamily = "monospace"
    } else if (primePartyExtendedOptions.subtitlesFontFamily == 6) {
        elem.style.fontFamily = "system-ui"
    }
}

function startMonitoringForSelectors(selectors, numTries) {
    numTries++
    const monitor = new MutationObserver(() => {
        loopOverSelectors(selectors)
    })
    
    let reactEntry = document.querySelector("body")
        if (!selectors.length) {
            return
        } else if (reactEntry) {
            if (!isMonitorActive) {
                monitor.observe(reactEntry, {
                attributes: true,
                attributeFilter: ['.atvwebplayersdk-adtimeindicator-text'],
                childList: true,
                subtree: true,
                attributeOldValue: false
                })
                isMonitorActive = true
            }
        } else {
            if (numTries > MAX_TRIES_MONITOR_SKIP) { return }
            setTimeout(() => {
                startMonitoringForSelectors(selectors, numTries)
            }, 100 * numTries)
        }
}

function createAvatar(normalPic, elem, uploadedPic) {
    if (oneAvatar == false || !uploadedPic) {
        elem.insertBefore(newAvatarImg, elem.firstChild)
        oneAvatar = true
        newAvatarImg.classList.add('profile-avatar')
        newAvatarImg.classList.add('newAvatar')
        normalPic.style.display = 'none'
    }
}

function reloadProfilePictures1(elem) {
    if (elem.children[0] && elem.children[0].children[3] && elem.children[0].children[3].children[1]) {
        let picElem = elem.children[0].children[3].children[0]
        let nameElem = elem.children[0].children[3].children[1]
        if (nameElem && nameElem.innerText == primePartyExtendedOptions.avatarPictures.user1.userName && primePartyExtendedOptions.avatarPictures.user1.profilePicture != "" && picElem.style.backgroundImage != `url(${primePartyExtendedOptions.avatarPictures.user1.profilePicture})`) {
            picElem.style.backgroundImage = `url(${primePartyExtendedOptions.avatarPictures.user1.profilePicture})`
        } else if (nameElem && nameElem.innerText == primePartyExtendedOptions.avatarPictures.user2.userName && primePartyExtendedOptions.avatarPictures.user2.profilePicture != "" && picElem.style.backgroundImage != `url(${primePartyExtendedOptions.avatarPictures.user2.profilePicture})`) {
            picElem.style.backgroundImage = `url(${primePartyExtendedOptions.avatarPictures.user2.profilePicture})`
        } else if (nameElem && nameElem.innerText == primePartyExtendedOptions.avatarPictures.user3.userName && primePartyExtendedOptions.avatarPictures.user3.profilePicture != "" && picElem.style.backgroundImage != `url(${primePartyExtendedOptions.avatarPictures.user3.profilePicture})`) {
            picElem.style.backgroundImage = `url(${primePartyExtendedOptions.avatarPictures.user3.profilePicture})`
        } else if (nameElem && nameElem.innerText == primePartyExtendedOptions.avatarPictures.user4.userName && primePartyExtendedOptions.avatarPictures.user4.profilePicture != "" && picElem.style.backgroundImage != `url(${primePartyExtendedOptions.avatarPictures.user4.profilePicture})`) {
            picElem.style.backgroundImage = `url(${primePartyExtendedOptions.avatarPictures.user4.profilePicture})`
        } else if (nameElem && nameElem.innerText == primePartyExtendedOptions.avatarPictures.user5.userName && primePartyExtendedOptions.avatarPictures.user5.profilePicture != "" && picElem.style.backgroundImage != `url(${primePartyExtendedOptions.avatarPictures.user5.profilePicture})`) {
            picElem.style.backgroundImage = `url(${primePartyExtendedOptions.avatarPictures.user5.profilePicture})`
        } else if (nameElem && nameElem.innerText == primePartyExtendedOptions.avatarPictures.user6.userName && primePartyExtendedOptions.avatarPictures.user6.profilePicture != "" && picElem.style.backgroundImage != `url(${primePartyExtendedOptions.avatarPictures.user6.profilePicture})`) {
            picElem.style.backgroundImage = `url(${primePartyExtendedOptions.avatarPictures.user6.profilePicture})`
        } else if (nameElem && nameElem.innerText == primePartyExtendedOptions.avatarPictures.user7.userName && primePartyExtendedOptions.avatarPictures.user7.profilePicture != "" && picElem.style.backgroundImage != `url(${primePartyExtendedOptions.avatarPictures.user7.profilePicture})`) {
            picElem.style.backgroundImage = `url(${primePartyExtendedOptions.avatarPictures.user7.profilePicture})`
        }
    }
}

function loopOverSelectors(selectors) {
    let selector = selectors.join(', ')
    let elems = document.querySelectorAll(selector)
    let videoNode = document.querySelector("#dv-web-player > div > div:nth-child(1) > div > div > div.scalingVideoContainer > div.scalingVideoContainerBottom > div > video")
    let video = document.querySelector('video')
    for (const elem of elems) {
        let newClass = elem.getAttribute("class") 
        let newData = elem.getAttribute('data-automation-id')
        const newId = elem.getAttribute('id')
        // profilePic
        if (newClass && newClass.includes('nxa5wh') && primePartyExtendedOptions.extensionActive == true && primePartyExtendedOptions.profileOptionsActive == true) {
            reloadProfilePictures1(elem)
        }
        if (newId && newId == 'nav-profiles-dropdown-label' && primePartyExtendedOptions.extensionActive == true && primePartyExtendedOptions.profileOptionsActive == true) {
            let normalPic = document.querySelector('#nav-profiles-dropdown-label div.profile-avatar')
            let uploadedPic = document.querySelector('#nav-profiles-dropdown-label img.profile-avatar')
            let loggedUserName = document.querySelector('.profiles-dropdown-name').innerHTML
            let preAvatars = document.querySelectorAll('.profile-item')
            let avatars = Array.from(preAvatars)
            // avatars.pop()
            avatars.shift()
            // dropdown
            avatars.forEach(avatar => {
                if (!avatar.children[1]) {
                    return
                }
                if (!avatar.children[1].children[0]) {
                    return
                }
                if (!avatar.children[1].children[0].childNodes[1]) {
                    return
                }
                let profileName = avatar.children[1].children[0].childNodes[1].textContent
                let profileAvatar = avatar.children[1].children[0].children[0]
                if (profileName == primePartyExtendedOptions.avatarPictures.user1.userName && primePartyExtendedOptions.avatarPictures.user1.profilePicture != "" && profileAvatar.style.background != `url(${primePartyExtendedOptions.avatarPictures.user1.profilePicture})`) {
                    profileAvatar.style.background = `url(${primePartyExtendedOptions.avatarPictures.user1.profilePicture})`
                    profileAvatar.style.backgroundSize = 'cover'
                } else if (profileName == primePartyExtendedOptions.avatarPictures.user2.userName && primePartyExtendedOptions.avatarPictures.user2.profilePicture != "" && profileAvatar.style.background != `url(${primePartyExtendedOptions.avatarPictures.user2.profilePicture})`) {
                    profileAvatar.style.background = `url(${primePartyExtendedOptions.avatarPictures.user2.profilePicture})`
                    profileAvatar.style.backgroundSize = 'cover'
                } else if (profileName == primePartyExtendedOptions.avatarPictures.user3.userName && primePartyExtendedOptions.avatarPictures.user3.profilePicture != "" && profileAvatar.style.background != `url(${primePartyExtendedOptions.avatarPictures.user3.profilePicture})`) {
                    profileAvatar.style.background = `url(${primePartyExtendedOptions.avatarPictures.user3.profilePicture})`
                    profileAvatar.style.backgroundSize = 'cover'
                } else if (profileName == primePartyExtendedOptions.avatarPictures.user4.userName && primePartyExtendedOptions.avatarPictures.user4.profilePicture != "" && profileAvatar.style.background != `url(${primePartyExtendedOptions.avatarPictures.user4.profilePicture})`) {
                    profileAvatar.style.background = `url(${primePartyExtendedOptions.avatarPictures.user4.profilePicture})`
                    profileAvatar.style.backgroundSize = 'cover'
                } else if (profileName == primePartyExtendedOptions.avatarPictures.user5.userName && primePartyExtendedOptions.avatarPictures.user5.profilePicture != "" && profileAvatar.style.background != `url(${primePartyExtendedOptions.avatarPictures.user5.profilePicture})`) {
                    profileAvatar.style.background = `url(${primePartyExtendedOptions.avatarPictures.user5.profilePicture})`
                    profileAvatar.style.backgroundSize = 'cover'
                } else if (profileName == primePartyExtendedOptions.avatarPictures.user6.userName && primePartyExtendedOptions.avatarPictures.user6.profilePicture != "" && profileAvatar.style.background != `url(${primePartyExtendedOptions.avatarPictures.user6.profilePicture})`) {
                    profileAvatar.style.background = `url(${primePartyExtendedOptions.avatarPictures.user6.profilePicture})`
                    profileAvatar.style.backgroundSize = 'cover'
                } else if (profileName == primePartyExtendedOptions.avatarPictures.user7.userName && primePartyExtendedOptions.avatarPictures.user7.profilePicture != "" && profileAvatar.style.background != `url(${primePartyExtendedOptions.avatarPictures.user7.profilePicture})`) {
                    profileAvatar.style.background = `url(${primePartyExtendedOptions.avatarPictures.user7.profilePicture})`
                    profileAvatar.style.backgroundSize = 'cover'
                }
            })
            // active user
            if (loggedUserName == primePartyExtendedOptions.avatarPictures.user1.userName && primePartyExtendedOptions.avatarPictures.user1.profilePicture != '' && (newAvatarImg.src != primePartyExtendedOptions.avatarPictures.user1.profilePicture || !uploadedPic)) {
                newAvatarImg.src = primePartyExtendedOptions.avatarPictures.user1.profilePicture
                createAvatar(normalPic, elem, uploadedPic)
            } else if (loggedUserName == primePartyExtendedOptions.avatarPictures.user2.userName && primePartyExtendedOptions.avatarPictures.user2.profilePicture != '' && (newAvatarImg.src != primePartyExtendedOptions.avatarPictures.user2.profilePicture || !uploadedPic)) {
                newAvatarImg.src = primePartyExtendedOptions.avatarPictures.user2.profilePicture
                createAvatar(normalPic, elem, uploadedPic)
            } else if (loggedUserName == primePartyExtendedOptions.avatarPictures.user3.userName && primePartyExtendedOptions.avatarPictures.user3.profilePicture != '' && (newAvatarImg.src != primePartyExtendedOptions.avatarPictures.user3.profilePicture || !uploadedPic)) {
                newAvatarImg.src = primePartyExtendedOptions.avatarPictures.user3.profilePicture
                createAvatar(normalPic, elem, uploadedPic)
            } else if (loggedUserName == primePartyExtendedOptions.avatarPictures.user4.userName && primePartyExtendedOptions.avatarPictures.user4.profilePicture != '' && (newAvatarImg.src != primePartyExtendedOptions.avatarPictures.user4.profilePicture || !uploadedPic)) {
                newAvatarImg.src = primePartyExtendedOptions.avatarPictures.user4.profilePicture
                createAvatar(normalPic, elem, uploadedPic)
            } else if (loggedUserName == primePartyExtendedOptions.avatarPictures.user5.userName && primePartyExtendedOptions.avatarPictures.user5.profilePicture != '' && (newAvatarImg.src != primePartyExtendedOptions.avatarPictures.user5.profilePicture || !uploadedPic)) {
                newAvatarImg.src = primePartyExtendedOptions.avatarPictures.user5.profilePicture
                createAvatar(normalPic, elem, uploadedPic)
            } else if (loggedUserName == primePartyExtendedOptions.avatarPictures.user6.userName && primePartyExtendedOptions.avatarPictures.user6.profilePicture != '' && (newAvatarImg.src != primePartyExtendedOptions.avatarPictures.user6.profilePicture || !uploadedPic)) {
                newAvatarImg.src = primePartyExtendedOptions.avatarPictures.user6.profilePicture
                createAvatar(normalPic, elem, uploadedPic)
            } else if (loggedUserName == primePartyExtendedOptions.avatarPictures.user7.userName && primePartyExtendedOptions.avatarPictures.user7.profilePicture != '' && (newAvatarImg.src != primePartyExtendedOptions.avatarPictures.user7.profilePicture || !uploadedPic)) {
                newAvatarImg.src = primePartyExtendedOptions.avatarPictures.user7.profilePicture
                createAvatar(normalPic, elem, uploadedPic)
            }
        }
        // subtitles
        if (newClass && newClass.includes("atvwebplayersdk-captions-text") && primePartyExtendedOptions.extensionActive == true && primePartyExtendedOptions.subtitlesOptionsActive == true) {
            if (primePartyExtendedOptions.subtitlesOutline && primePartyExtendedOptions.subtitlesSize > 60) {
                elem.style.textShadow = `-3px -3px 0 ${primePartyExtendedOptions.subtitlesOutlineColor}, 0 -3px 0 ${primePartyExtendedOptions.subtitlesOutlineColor}, 3px -3px 0 ${primePartyExtendedOptions.subtitlesOutlineColor}, 3px 0 0 ${primePartyExtendedOptions.subtitlesOutlineColor}, 3px 3px 0 ${primePartyExtendedOptions.subtitlesOutlineColor}, 0 3px 0 ${primePartyExtendedOptions.subtitlesOutlineColor}, -3px 3px 0 ${primePartyExtendedOptions.subtitlesOutlineColor}, -3px 0 0 ${primePartyExtendedOptions.subtitlesOutlineColor}`
            } else if (primePartyExtendedOptions.subtitlesOutline && primePartyExtendedOptions.subtitlesSize <= 60 && primePartyExtendedOptions.subtitlesSize >= 30) {
                elem.style.textShadow = `-2px -2px 0 ${primePartyExtendedOptions.subtitlesOutlineColor}, 0 -2px 0 ${primePartyExtendedOptions.subtitlesOutlineColor}, 2px -2px 0 ${primePartyExtendedOptions.subtitlesOutlineColor}, 2px 0 0 ${primePartyExtendedOptions.subtitlesOutlineColor}, 2px 2px 0 ${primePartyExtendedOptions.subtitlesOutlineColor}, 0 2px 0 ${primePartyExtendedOptions.subtitlesOutlineColor}, -2px 2px 0 ${primePartyExtendedOptions.subtitlesOutlineColor}, -2px 0 0 ${primePartyExtendedOptions.subtitlesOutlineColor}`
            } else if (primePartyExtendedOptions.subtitlesOutline && primePartyExtendedOptions.subtitlesSize < 30) {
                elem.style.textShadow = `-1px -1px 0 ${primePartyExtendedOptions.subtitlesOutlineColor}, 0 -1px 0 ${primePartyExtendedOptions.subtitlesOutlineColor}, 1px -1px 0 ${primePartyExtendedOptions.subtitlesOutlineColor}, 1px 0 0 ${primePartyExtendedOptions.subtitlesOutlineColor}, 1px 1px 0 ${primePartyExtendedOptions.subtitlesOutlineColor}, 0 1px 0 ${primePartyExtendedOptions.subtitlesOutlineColor}, -1px 1px 0 ${primePartyExtendedOptions.subtitlesOutlineColor}, -1px 0 0 ${primePartyExtendedOptions.subtitlesOutlineColor}`
            } else if (!primePartyExtendedOptions.subtitlesOutline) {
                elem.style.textShadow = ''
            }
            elem.style.fontSize = `${primePartyExtendedOptions.subtitlesSize}px`
            elem.style.color = primePartyExtendedOptions.subtitlesColor
            elem.style.backgroundColor = primePartyExtendedOptions.subtitlesBackgroundColor
            elem.style.backgroundColor = `${elem.style.backgroundColor.slice(0, -1)}, ${primePartyExtendedOptions.subtitlesBackgroundOpacity})`
            setFont(elem)
        } else if (newClass && newClass.includes("atvwebplayersdk-captions-text") && (primePartyExtendedOptions.extensionActive == false || primePartyExtendedOptions.subtitlesOptionsActive == false)) {
            elem.style.fontSize = '36px'
            elem.style.color = 'inherit'
            elem.style.backgroundColor = ''
            elem.style.textShadow = ''
        }
        // player
        if (primePartyExtendedOptions.hideCursor && primePartyExtendedOptions.extensionActive == true && primePartyExtendedOptions.playerOptionsActive == true && fromExtensionCursorVisible == true) {
            hideCursor()
        } else if (primePartyExtendedOptions.extensionActive == false || primePartyExtendedOptions.playerOptionsActive == false || !primePartyExtendedOptions.hideCursor) {
            if (document.querySelector('.ffszj3z.f8hspre.f1icw8u')) {
                document.querySelector('.ffszj3z.f8hspre.f1icw8u').style.cursor = "auto"
            }
            fromExtensionCursorVisible = true
        }
        if (primePartyExtendedOptions.skipIntroSequence && newClass && newClass.includes('atvwebplayersdk-skipelement-button') && primePartyExtendedOptions.extensionActive == true && primePartyExtendedOptions.playerOptionsActive == true) {
            elem.click()
            if (video.paused) {
                video.play()
            }
        }
        if (primePartyExtendedOptions.autoPlayNext && newClass && newClass.includes('atvwebplayersdk-nextupcard-button') && primePartyExtendedOptions.extensionActive == true && primePartyExtendedOptions.playerOptionsActive == true) {
            elem.click() 
            if (video.paused) {
                video.play()
            }
        }
        if (primePartyExtendedOptions.skipAds && newClass && newClass.includes('atvwebplayersdk-adtimeindicator') && primePartyExtendedOptions.extensionActive == true && primePartyExtendedOptions.playerOptionsActive == true && videoNode != null) {
            let lastAdTime = -1
            let adText = document.querySelector(".atvwebplayersdk-adtimeindicator-text")
            let adDuration = parseInt(adText.textContent.match(/^\d+|\d+\b|\d+(?=\w)/g)[0])
            let currTime = videoNode.currentTime
            let afterAd = currTime + adDuration
            if (Math.abs(currTime - lastAdTime) > 1) {
                videoNode.currentTime = afterAd
                lastAdTime = afterAd
            } else {
                videoNode.currentTime = afterAd
                setTimeout(() => {
                    videoNode.currentTime = afterAd - adDuration
                    lastAdTime = -1
                }, 100)
            }  
        }
        if (primePartyExtendedOptions.skipAds && newClass && newClass.includes('adSkipButton') && newClass.includes('skippable') && primePartyExtendedOptions.extensionActive == true && primePartyExtendedOptions.playerOptionsActive == true) {
            const adSkipButtons = document.getElementsByClassName('adSkipButton skippable')
            if(adSkipButtons.length > 0) {
                setTimeout(() => {
                    adSkipButtons[0].click()
                    if (video.paused) {
                        video.play()
                    }
                },500)
            }
        }
        if (primePartyExtendedOptions.skipAds && newClass && newClass.includes('fu4rd6c') && !elem.classList.contains('done') && elem.innerText == 'Skip'  && primePartyExtendedOptions.extensionActive == true && primePartyExtendedOptions.playerOptionsActive == true) {
            setTimeout(() => {
                elem.click()
                elem.classList.add('done')
                if (videoNode.paused) {
                    videoNode.play()
                }
            },500)
        }
        if (primePartyExtendedOptions.hideSpoilers && primePartyExtendedOptions.extensionActive == true && primePartyExtendedOptions.playerOptionsActive == true && ((newClass && newClass.includes('tst-hover-synopsis')) || newData === "atfSynopsisExpander" || (newData && newData.slice(0,8) == 'synopsis')) && blurTargetVisible == false) {
            elem.style.filter = 'blur(5px)'
        } else if ((primePartyExtendedOptions.hideSpoilers == false || primePartyExtendedOptions.extensionActive == false || primePartyExtendedOptions.playerOptionsActive == false) && ((newClass && newClass.includes('tst-hover-synopsis')) || newData === "atfSynopsisExpander" || (newData && newData.slice(0,8) == 'synopsis'))) {
            elem.style.filter = 'blur(0px)'
        }
        // video
        if (elem.matches('video') && elem.src.length > 2 && primePartyExtendedOptions.extensionActive == true && primePartyExtendedOptions.videoOptionsActive == true) {
            video.playbackRate = primePartyExtendedOptions.videoSpeedValue
        } else if (elem.matches('video') && elem.src.length > 2 && (primePartyExtendedOptions.extensionActive == false || primePartyExtendedOptions.videoOptionsActive == false)) {
            video.playbackRate = "1"
        }
        if (elem.matches('video') && elem.src.length > 2 && primePartyExtendedOptions.extensionActive == true && primePartyExtendedOptions.videoOptionsActive == true) {
            elem.style.transform = `rotate(${primePartyExtendedOptions.videoRotation}deg) scale(${primePartyExtendedOptions.videoZoomValue / 100})`
            elem.width = ''
            elem.height = ''
            elem.style.width = '100%'
            elem.style.height = '100%'
            if (primePartyExtendedOptions.aspectRatio == 'default') {
                elem.style.width = '100%'
                elem.style.height = '100%'
            } else if (primePartyExtendedOptions.aspectRatio == 'width') {
                elem.style.width = '-webkit-fill-available'
                elem.style.height = 'auto'
            } else if (primePartyExtendedOptions.aspectRatio == 'height') {
                elem.style.height = '-webkit-fill-available'
                elem.style.width = 'auto'
            }
            elem.parentElement.style.display = 'flex'
            elem.parentElement.style.justifyContent = 'center'
            elem.parentElement.style.alignItems = 'center'
            if (document.querySelector('.atvwebplayersdk-captions-text')) {
                document.querySelector('.atvwebplayersdk-captions-text').parentElement.parentElement.style.transform = `rotate(${primePartyExtendedOptions.videoRotation}deg)`
                document.querySelector('.atvwebplayersdk-captions-text').parentElement.parentElement.style.height = `100vh`
                document.querySelector('.atvwebplayersdk-captions-text').parentElement.parentElement.style.display = `flex`
                document.querySelector('.atvwebplayersdk-captions-text').parentElement.parentElement.style.alignItems = `end`
                document.querySelector('.atvwebplayersdk-captions-text').parentElement.parentElement.style.justifyContent = `center`
            }
        } else if (elem.matches('video') && elem.src.length > 2 && (primePartyExtendedOptions.extensionActive == false || primePartyExtendedOptions.videoOptionsActive == false)) {
            elem.style.width = '100%'
            elem.style.height = '100%'
            elem.style.transform = ''
            if (document.querySelector('.atvwebplayersdk-captions-text')) {
                document.querySelector('.atvwebplayersdk-captions-text').parentElement.parentElement.style.transform = ''
                document.querySelector('.atvwebplayersdk-captions-text').parentElement.parentElement.style.height = ''
                document.querySelector('.atvwebplayersdk-captions-text').parentElement.parentElement.style.display = `contents`
            }
        }
        if (elem.matches('video') && elem.src.length == 0) {
            elem.style.width = '0'
            elem.style.height = '0'
        }
    }
}

// pip

setInterval(() => {
    let video = document.querySelector('.rendererContainer video')
    if (video && isPipIconActive == false && primePartyExtendedOptions.extensionActive == true && primePartyExtendedOptions.videoOptionsActive == true && primePartyExtendedOptions.allowPip == true) {
        createPipIcon()
    } else if ((!video || primePartyExtendedOptions.extensionActive == false || primePartyExtendedOptions.videoOptionsActive == false || primePartyExtendedOptions.allowPip == false)) {
        erasePipIcon()
    }
}, 1000)

function erasePipIcon() {
    let modals = document.querySelectorAll('.ontop')
    if (modals) {
        modals.forEach(modal => {
            modal.remove()
            isPipIconActive = false
        })
    }
}

function createPipIcon() {
    if (isPipIconActive == true) {
        return
    }
    let modal = document.createElement('div')
    let iconFrame
    const createSmallPopup = async() => {
        iconFrame = await document.querySelector('.fz90x71')
        if (iconFrame) {
            modal.innerHTML = picInPicIcon
            modal.classList.add('ontop')
            modal.children[0].classList.add('fpp3az0')
            modal.children[0].classList.add('f989gul')
            if (iconFrame) {
                iconFrame.insertBefore(modal, iconFrame.firstChild)
                isPipIconActive = true
            }
        }
    }
    createSmallPopup()

    modal.addEventListener('click', () => {
        let video = document.querySelector('.rendererContainer video')
            // creating picture in picture
        if ('pictureInPictureEnabled' in document) {
            if (document.pictureInPictureElement) {
                document.exitPictureInPicture().catch(err => {
                    console.log(err)
                })
                return
            }
            video.requestPictureInPicture().catch(err => {
                console.log(err)
            })
        }
    })
}

// spoilers
document.addEventListener('mouseover', e => {
    if (!primePartyExtendedOptions) {
        return
    } else if (primePartyExtendedOptions.hideSpoilers && primePartyExtendedOptions.extensionActive == true && primePartyExtendedOptions.playerOptionsActive == true) {
        if (e.target.parentElement == null) {
            return
        } else if (e.target.parentElement.parentElement && primePartyExtendedOptions.hideSpoilers) {
            let blurElem = e.target.parentElement.parentElement
            if (blurElem && blurElem.style.filter == 'blur(5px)') {
                blurReveal = setTimeout(() => {
                    blurElem.style.filter = 'blur(0px)'
                    blurTargetVisible = true
                }, 3000)
            } 
        } else {
            return
        }
        if (e.target.classList.contains('tst-hover-container') ) {
            blurReveal2 = setTimeout(() => {
                e.target.children[1].children[0].children[2].children[0].children[1].style.filter = 'blur(0px)'
                blurTargetVisible = true
            }, 3000)
        }
    }
})

document.addEventListener('mouseout', e => {
    if (!primePartyExtendedOptions) {
        return
    } else if (primePartyExtendedOptions.hideSpoilers && primePartyExtendedOptions.extensionActive == true && primePartyExtendedOptions.playerOptionsActive == true) {
        if (e.target.parentElement == null) {
            return
        } else if (e.target.parentElement.parentElement && primePartyExtendedOptions.hideSpoilers) {
            let leftElem = e.target.parentElement.parentElement
            if (leftElem.style.filter == 'blur(0px)') {
                leftElem.style.filter = 'blur(5px)'
                blurTargetVisible = false
            } else if (leftElem.style.filter == 'blur(5px)' && blurReveal) {
                clearTimeout(blurReveal)
                blurTargetVisible = false
            }
        } else {
            return
        }
        if (e.target.classList.contains('tst-hover-container') && blurReveal2) {
            clearTimeout(blurReveal2)
            blurTargetVisible = false
        }
    }
})

function saveOptions(primePartyExtendedOptions) {
    chrome.storage.local.set({
        'primePartyExtendedOptions': primePartyExtendedOptions
    })
}