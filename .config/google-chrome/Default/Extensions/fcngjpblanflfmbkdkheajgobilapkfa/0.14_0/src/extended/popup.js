// main fetures - load options
let primePartyExtendedOptions = {}
let profileNameCounter = 0
let pin_image_blob = null

window.addEventListener('DOMContentLoaded', async() => {
    let primePartyExtendedOptions = await loadExtendedOptionsOrSetDefaults()
    setValues(primePartyExtendedOptions)
})

// popup fetures
// this part is only for popup inner functions
// main part
let onOff = document.querySelector('#onOff')
let screens = document.querySelectorAll('.screen')
let homeScreen = document.querySelector('#homeScreen')
let partyScreen = document.querySelector('#partyScreen')
let videoScreen = document.querySelector('#videoScreen')
let playerScreen = document.querySelector('#playerScreen')
let subtitlesScreen = document.querySelector('#subtitlesScreen')
let profileScreen = document.querySelector('#profileScreen')
let userGuideScreen = document.querySelector('#userGuideScreen')
let partyButton = document.querySelector('.bigContainer')
let partyBack = document.querySelectorAll('.partyBack')
let videoOptionsButton = document.querySelector('#videoOptionsBrick')
let playerOptionsButton = document.querySelector('#playerOptionsBrick')
let subtitlesOptionsButton = document.querySelector('#subtitlesOptionsBrick')
let profileOptionsButton = document.querySelector('#profileOptionsBrick')
let userGuideButton = document.querySelector('#aboutBrick')
let onOffContainer = document.querySelector('.headerRight')

function hideOnOff() {
    onOffContainer.classList.add('invisible')
}

onOff.addEventListener('change', () => {
    onOff.checked ? primePartyExtendedOptions.extensionActive = true : primePartyExtendedOptions.extensionActive = false
    saveOptions(primePartyExtendedOptions)
})

partyButton.addEventListener('click', () => {
    screens.forEach(screenElem => {
        screenElem.classList.add('invisible')
    })
    partyScreen.classList.remove('invisible')
    hideOnOff()
})

partyBack.forEach(arrow => {
    arrow.addEventListener('click', () => {
        screens.forEach(screenElem => {
            screenElem.classList.add('invisible')
        })
        homeScreen.classList.remove('invisible')
        onOffContainer.classList.remove('invisible')
    })
})

videoOptionsButton.addEventListener('click', () => {
    screens.forEach(screenElem => {
        screenElem.classList.add('invisible')
    })
    videoScreen.classList.remove('invisible')
    hideOnOff()
})

playerOptionsButton.addEventListener('click', () => {
    screens.forEach(screenElem => {
        screenElem.classList.add('invisible')
    })
    playerScreen.classList.remove('invisible')
    hideOnOff()
})

subtitlesOptionsButton.addEventListener('click', () => {
    screens.forEach(screenElem => {
        screenElem.classList.add('invisible')
    })
    subtitlesScreen.classList.remove('invisible')
    hideOnOff()
})

profileOptionsButton.addEventListener('click', () => {
    screens.forEach(screenElem => {
        screenElem.classList.add('invisible')
    })
    profileScreen.classList.remove('invisible')
    hideOnOff()
})

userGuideButton.addEventListener('click', () => {
    screens.forEach(screenElem => {
        screenElem.classList.add('invisible')
    })
    userGuideScreen.classList.remove('invisible')
    hideOnOff()
})

// party part
let moreInfoBtn = document.querySelector('.partyInfo')
let moreInfoWindow = document.querySelector('.moreInfoWindow')
let moreInfoClose = document.querySelector('#moreInfoClose')

moreInfoBtn.addEventListener('click', () => {
    moreInfoWindow.classList.toggle('invisible')
})

moreInfoClose.addEventListener('click', () => {
    moreInfoWindow.classList.add('invisible')
})

// video part
let videoOnOff = document.querySelector('#videoFeaturesSwitch')
let resetAllVideo = document.querySelector('#resetAllVideo')
let resetVideoSpeed = document.querySelector('#resetVideoSpeed')
let resetVideoAspectRatio = document.querySelector('#resetVideoAspectRatio')
let resetVideoZoom = document.querySelector('#resetVideoZoom')
let resetVideoRotation = document.querySelector('#resetVideoRotation')
let resetVideoPip = document.querySelector('#resetVideoPip')
let speedOutput = document.querySelector('#videoSpeedOutput')
let speedRange = document.querySelector('#videoSpeedRange')
let speedButtons = document.querySelectorAll('.speedBrick')
let videoAspectRatioRadios = document.querySelectorAll('input[type=radio][name="watchMode"]')
let zoomOutput = document.querySelector('#videoZoomOutput')
let zoomRange = document.querySelector('#videoZoomRange')
let videoZoomButtons = document.querySelectorAll('.videoBrick')
let videoRotationLeft = document.querySelector('#videoRotationLeft')
let videoRotationRight = document.querySelector('#videoRotationRight')
let videoRotationOutput = document.querySelector('#videoRotationOutput')
let pipCheckbox = document.querySelector('#pipCheckbox')

videoOnOff.addEventListener('change', () => {
    videoOnOff.checked ? primePartyExtendedOptions.videoOptionsActive = true : primePartyExtendedOptions.videoOptionsActive = false
    saveOptions(primePartyExtendedOptions)
})

resetAllVideo.addEventListener('click', () => {
    resetVideoSpeed.click()
    resetVideoAspectRatio.click()
    resetVideoZoom.click()
    resetVideoRotation.click()
    resetVideoPip.click()
})

resetVideoSpeed.addEventListener('click', () => {
    primePartyExtendedOptions.videoSpeedValue = 1
    speedOutput.innerHTML = 1
    speedRange.value = 1
    saveOptions(primePartyExtendedOptions)
})

speedRange.addEventListener('input', () => {
    let rangeValue = speedRange.value
    speedOutput.innerHTML = `${rangeValue}x`
    primePartyExtendedOptions.videoSpeedValue = rangeValue
    saveOptions(primePartyExtendedOptions)
})

speedButtons.forEach(speedButton => {
    speedButton.addEventListener('click', () => {
        let buttonValue = Number(speedButton.innerText.slice(0, -1))
        primePartyExtendedOptions.videoSpeedValue = buttonValue
        speedOutput.innerHTML = `${buttonValue}x`
        speedRange.value = buttonValue
        saveOptions(primePartyExtendedOptions)
    })
})

resetVideoAspectRatio.addEventListener('click', () => {
    document.querySelector('#watchModeOriginal').click()
})

videoAspectRatioRadios.forEach(videoAspectRatioRadio => {
    videoAspectRatioRadio.addEventListener('change', () => {
        if (videoAspectRatioRadio.id == 'watchModeOriginal') {
            primePartyExtendedOptions.aspectRatio = 'original'
        } else if (videoAspectRatioRadio.id == 'watchModeWidth') {
            primePartyExtendedOptions.aspectRatio = 'width'
        } else if (videoAspectRatioRadio.id == 'watchModeHeight') {
            primePartyExtendedOptions.aspectRatio = 'height'
        }
        saveOptions(primePartyExtendedOptions)
    })
})

resetVideoZoom.addEventListener('click', () => {
    zoomOutput.innerHTML = "100%"
    zoomRange.value = 100
    primePartyExtendedOptions.videoZoomValue = 100
    saveOptions(primePartyExtendedOptions)
})

zoomRange.addEventListener('input', () => {
    let rangeValue = Number(zoomRange.value)
    zoomOutput.innerHTML = `${rangeValue}%`
    primePartyExtendedOptions.videoZoomValue = rangeValue
    saveOptions(primePartyExtendedOptions)
})

videoZoomButtons.forEach(zoomButton => {
    zoomButton.addEventListener('click', () => {
        let zoomButtonValue = Number(zoomButton.innerText.slice(0, -1))
        primePartyExtendedOptions.videoZoomValue = zoomButtonValue
        zoomOutput.innerHTML = `${zoomButtonValue}%`
        zoomRange.value = zoomButtonValue
        saveOptions(primePartyExtendedOptions)
    })
})

resetVideoRotation.addEventListener('click', () => {
    videoRotationOutput.attributes.data.value = 0
    videoRotationOutput.innerText = `${videoRotationOutput.attributes.data.value} deg`
    primePartyExtendedOptions.videoRotation = videoRotationOutput.attributes.data.value
    saveOptions(primePartyExtendedOptions)
})

videoRotationLeft.addEventListener('click', () => {
    videoRotationOutput.attributes.data.value = Number(videoRotationOutput.attributes.data.value) - 15
    videoRotationOutput.attributes.data.value == -360 ? videoRotationOutput.attributes.data.value = 0 : null
    videoRotationOutput.innerText = `${videoRotationOutput.attributes.data.value} deg`
    primePartyExtendedOptions.videoRotation = videoRotationOutput.attributes.data.value
    saveOptions(primePartyExtendedOptions)
})

videoRotationRight.addEventListener('click', () => {
    videoRotationOutput.attributes.data.value = Number(videoRotationOutput.attributes.data.value) + 15
    videoRotationOutput.attributes.data.value == 360 ? videoRotationOutput.attributes.data.value = 0 : null
    videoRotationOutput.innerText = `${videoRotationOutput.attributes.data.value} deg`
    primePartyExtendedOptions.videoRotation = videoRotationOutput.attributes.data.value
    saveOptions(primePartyExtendedOptions)
})

resetVideoPip.addEventListener('click', () => {
    primePartyExtendedOptions.allowPip = false
    pipCheckbox.checked = false
    saveOptions(primePartyExtendedOptions)
})

pipCheckbox.addEventListener('change', () => {
    pipCheckbox.checked ? primePartyExtendedOptions.allowPip = true : primePartyExtendedOptions.allowPip = false
    saveOptions(primePartyExtendedOptions)
})

// player screen
let playerOnOff = document.querySelector('#playerFeaturesSwitch')
let resetAllPlayer = document.querySelector('#resetAllPlayer') // todo
let resetSkipIntros = document.querySelector('#resetSkipIntros')
let skipIntrosCheckbox = document.querySelector('#skipIntrosCheckbox')
let resetNextEpisode = document.querySelector('#resetNextEpisode')
let nextEpisodeCheckbox = document.querySelector('#nextEpisodeCheckbox')
let resetSkipAds = document.querySelector('#resetSkipAds')
let skipAdsCheckbox = document.querySelector('#skipAdsCheckbox')
let resetHideCursor = document.querySelector('#resetHideCursor')
let hideCursorCheckbox = document.querySelector('#hideCursorCheckbox')
let resetHideSpoilers = document.querySelector('#resetHideSpoilers')
let hideSpoilerCheckbox = document.querySelector('#hideSpoilerCheckbox')

playerOnOff.addEventListener('change', () => {
    playerOnOff.checked ? primePartyExtendedOptions.playerOptionsActive = true : primePartyExtendedOptions.playerOptionsActive = false
    saveOptions(primePartyExtendedOptions)
})

resetAllPlayer.addEventListener('click', () => {
    resetSkipIntros.click()
    resetNextEpisode.click()
    resetSkipAds.click()
    resetHideCursor.click()
    resetHideSpoilers.click()
})

skipIntrosCheckbox.addEventListener('change', () => {
    skipIntrosCheckbox.checked ? primePartyExtendedOptions.skipIntroSequence = true : primePartyExtendedOptions.skipIntroSequence = false
    saveOptions(primePartyExtendedOptions)
})

resetSkipIntros.addEventListener('click', () => {
    primePartyExtendedOptions.skipIntroSequence = false
    skipIntrosCheckbox.checked = false
    saveOptions(primePartyExtendedOptions)
})

nextEpisodeCheckbox.addEventListener('change', () => {
    nextEpisodeCheckbox.checked ? primePartyExtendedOptions.autoPlayNext = true : primePartyExtendedOptions.autoPlayNext = false
    saveOptions(primePartyExtendedOptions)
})

resetNextEpisode.addEventListener('click', () => {
    primePartyExtendedOptions.autoPlayNext = false
    nextEpisodeCheckbox.checked = false
    saveOptions(primePartyExtendedOptions)
})

skipAdsCheckbox.addEventListener('change', () => {
    skipAdsCheckbox.checked ? primePartyExtendedOptions.skipAds = true : primePartyExtendedOptions.skipAds = false
    saveOptions(primePartyExtendedOptions)
})

resetSkipAds.addEventListener('click', () => {
    primePartyExtendedOptions.skipAds = false
    skipAdsCheckbox.checked = false
    saveOptions(primePartyExtendedOptions)
})

hideCursorCheckbox.addEventListener('change', () => {
    hideCursorCheckbox.checked ? primePartyExtendedOptions.hideCursor = true : primePartyExtendedOptions.hideCursor = false
    saveOptions(primePartyExtendedOptions)
})

resetHideCursor.addEventListener('click', () => {
    primePartyExtendedOptions.hideCursor = false
    hideCursorCheckbox.checked = false
    saveOptions(primePartyExtendedOptions)
})

hideSpoilerCheckbox.addEventListener('change', () => {
    hideSpoilerCheckbox.checked ? primePartyExtendedOptions.hideSpoilers = true : primePartyExtendedOptions.hideSpoilers = false
    saveOptions(primePartyExtendedOptions)
})

resetHideSpoilers.addEventListener('click', () => {
    primePartyExtendedOptions.hideSpoilers = false
    hideSpoilerCheckbox.checked = false
    saveOptions(primePartyExtendedOptions)
})

// subtitles part
let subtitlesOnOff = document.querySelector('#subtitlesFeaturesSwitch')
let resetAllSubtitles = document.querySelector('#resetAllSubtitles')
let resetSubtitlesOutline = document.querySelector('#resetSubtitlesOutline')
let subtitlesOutlineCheckbox = document.querySelector('#subtitlesOutlineCheckbox')
let subtitlesOutlineColor = document.querySelector('#subtitlesOutlineColor')
let resetSubtitles = document.querySelector('#resetSubtitles')
let subtitlesColor = document.querySelector('#subtitlesColor')
let fontSizeOutput = document.querySelector('#fontSizeOutput')
let fontSizeRange = document.querySelector('#fontSizeRange')
let fontBricks = document.querySelectorAll('.fontBrick')
let fontType = document.querySelector('#fontType')
let resetSubtitlesBackground = document.querySelector('#resetSubtitlesBackground')
let subtitlesBackgroundColor = document.querySelector('#subtitlesBackgroundColor')
let backgroundOutput = document.querySelector('#backgroundOutput')
let backgroundRange = document.querySelector('#backgroundRange')
let opacityBricks = document.querySelectorAll('.opacityBrick')
let outlineColorBlur = document.querySelector('#outlineColorBlur')

subtitlesOnOff.addEventListener('change', () => {
    subtitlesOnOff.checked ? primePartyExtendedOptions.subtitlesOptionsActive = true : primePartyExtendedOptions.subtitlesOptionsActive = false
    saveOptions(primePartyExtendedOptions)
})

resetAllSubtitles.addEventListener('click', () => {
    resetSubtitlesOutline.click()
    resetSubtitles.click()
    resetSubtitlesBackground.click()
})

subtitlesOutlineCheckbox.addEventListener('change', () => {
    if (subtitlesOutlineCheckbox.checked) {
        primePartyExtendedOptions.subtitlesOutline = true
        outlineColorBlur.classList.remove('grey')
    } else {
        primePartyExtendedOptions.subtitlesOutline = false
        outlineColorBlur.classList.add('grey')
    }
    saveOptions(primePartyExtendedOptions)
})

resetSubtitlesOutline.addEventListener('click', () => {
    primePartyExtendedOptions.subtitlesOutline = false
    subtitlesOutlineCheckbox.checked = false
    primePartyExtendedOptions.subtitlesOutlineColor = "#000000"
    subtitlesOutlineColor.value = "#000000"
    outlineColorBlur.classList.add('grey')
    saveOptions(primePartyExtendedOptions)
})

subtitlesOutlineColor.addEventListener('change', () => {
    primePartyExtendedOptions.subtitlesOutlineColor = subtitlesOutlineColor.value
    saveOptions(primePartyExtendedOptions)
})

subtitlesColor.addEventListener('change', () => {
    primePartyExtendedOptions.subtitlesColor = subtitlesColor.value
    saveOptions(primePartyExtendedOptions)
})

fontSizeRange.addEventListener('change', () => {
    primePartyExtendedOptions.subtitlesSize = Number(fontSizeRange.value)
    fontSizeOutput.innerHTML = `${fontSizeRange.value}px`
    saveOptions(primePartyExtendedOptions)
})

fontBricks.forEach(fontBrick => {
    fontBrick.addEventListener('click', () => {
        primePartyExtendedOptions.subtitlesSize = Number(fontBrick.innerHTML.slice(0, -2))
        fontSizeRange.value = fontBrick.innerHTML.slice(0, -2)
        fontSizeOutput.innerHTML = fontBrick.innerHTML
        saveOptions(primePartyExtendedOptions)
    })
})

fontType.addEventListener('change', () => {
    primePartyExtendedOptions.subtitlesFontFamily = fontType.value
    saveOptions(primePartyExtendedOptions)
})

resetSubtitles.addEventListener('click', () => {
    primePartyExtendedOptions.subtitlesSize = 36
    primePartyExtendedOptions.subtitlesFontFamily = '1'
    primePartyExtendedOptions.subtitlesColor = "#ffffff"
    subtitlesColor.value = "#ffffff"
    fontType.value = '1'
    fontSizeOutput.innerHTML = '36px'
    fontSizeRange.value = 36
    saveOptions(primePartyExtendedOptions)
})

subtitlesBackgroundColor.addEventListener('change', () => {
    primePartyExtendedOptions.subtitlesBackgroundColor = subtitlesBackgroundColor.value
    saveOptions(primePartyExtendedOptions)
})

backgroundRange.addEventListener('change', () => {
    backgroundOutput.innerHTML = backgroundRange.value
    primePartyExtendedOptions.subtitlesBackgroundOpacity = backgroundRange.value
    saveOptions(primePartyExtendedOptions)
})

opacityBricks.forEach(opacityBrick => {
    opacityBrick.addEventListener('click', () => {
        backgroundOutput.innerHTML = Number(opacityBrick.innerHTML)
        primePartyExtendedOptions.subtitlesBackgroundOpacity = Number(opacityBrick.innerHTML)
        backgroundRange.value = Number(opacityBrick.innerHTML)
        saveOptions(primePartyExtendedOptions)
    })
})

resetSubtitlesBackground.addEventListener('click', () => {
    backgroundOutput.innerHTML = 0.1
    primePartyExtendedOptions.subtitlesBackgroundOpacity = 0.1
    primePartyExtendedOptions.subtitlesBackgroundColor = "#000000"
    backgroundRange.value = 0.1
    subtitlesBackgroundColor.value = "#000000"
    saveOptions(primePartyExtendedOptions)
})

// profile part
let profileFeaturesSwitch = document.querySelector('#profileFeaturesSwitch')
let resetAllProfile = document.querySelector('#resetAllProfile')
let elemsToHide = document.querySelectorAll('.profileToHide')
let profileTextToggle = document.querySelector('.profileContainerTitle')
let profileLeft = document.querySelector('#profileLeft')
let profileRight = document.querySelector('#profileRight')
let profileImgs = document.querySelectorAll('.profileImg')
let editProfileContainer = document.querySelector('.editProfileContainer')
let profileNameInput = document.querySelector('#profileNameInput')
let uploadPicBtn = document.querySelector('#uploadPicBtn')
let uploadPicInput = document.querySelector('#uploadPicInput')
let editProfileBtn = document.querySelector('#editProfileBtn')
let saveProfileBtn = document.querySelector('#saveProfileBtn')
let profileNames = document.querySelectorAll('.profileSmallDescription')
let profileLocation1 = document.querySelector('#profileLocation1')
let profileLocation2 = document.querySelector('#profileLocation2')
let partyBackEdit = document.querySelector('.partyBackEdit')
let originalBackArrow = document.querySelector('#originalBackArrow')

partyBackEdit.addEventListener('click', () => {
    saveProfileBtn.classList.add('invisible')
    editProfileBtn.classList.remove('invisible')
    elemsToHide.forEach(elem => {
        elem.classList.remove('invisible')
    })
    profileTextToggle.innerHTML = 'Profiles gallery'
    editProfileContainer.classList.add('invisible')
    profileLocation2.classList.add('invisible')
    profileLocation1.classList.remove('invisible')
    partyBackEdit.classList.add('invisible')
    originalBackArrow.classList.remove('invisible')
})

profileFeaturesSwitch.addEventListener('change', () => {
    profileFeaturesSwitch.checked ? primePartyExtendedOptions.profileOptionsActive = true : primePartyExtendedOptions.profileOptionsActive = false
    saveOptions(primePartyExtendedOptions)
})

resetAllProfile.addEventListener('click', () => {
    profileImgs[0].firstChild ? profileImgs[0].firstChild.remove() : null
    profileImgs[1].firstChild ? profileImgs[1].firstChild.remove() : null
    profileImgs[2].firstChild ? profileImgs[2].firstChild.remove() : null
    profileImgs[3].firstChild ? profileImgs[3].firstChild.remove() : null
    profileImgs[4].firstChild ? profileImgs[4].firstChild.remove() : null
    profileImgs[5].firstChild ? profileImgs[5].firstChild.remove() : null
    profileImgs[6].firstChild ? profileImgs[6].firstChild.remove() : null
    profileNames[0].innerText = 'User 1'
    profileNames[1].innerText = 'User 2'
    profileNames[2].innerText = 'User 3'
    profileNames[3].innerText = 'User 4'
    profileNames[4].innerText = 'User 5'
    profileNames[5].innerText = 'User 6'
    profileNames[6].innerText = 'User 7'
    primePartyExtendedOptions.allowAvatar = true
    saveProfiles()
})

editProfileBtn.addEventListener('click', () => {
    saveProfileBtn.classList.remove('invisible')
    editProfileBtn.classList.add('invisible')
    elemsToHide.forEach(elem => {
        elem.classList.add('invisible')
    })
    profileTextToggle.innerHTML = 'Edit user profile'
    editProfileContainer.classList.remove('invisible')
    profileNameInput.value = profileNames[profileNameCounter].innerText
    profileLocation1.classList.add('invisible')
    profileLocation2.classList.remove('invisible')
    partyBackEdit.classList.remove('invisible')
    originalBackArrow.classList.add('invisible')
})

saveProfileBtn.addEventListener('click', () => {
    saveProfiles()
    saveProfileBtn.classList.add('invisible')
    editProfileBtn.classList.remove('invisible')
    elemsToHide.forEach(elem => {
        elem.classList.remove('invisible')
    })
    profileTextToggle.innerHTML = 'Profiles gallery'
    editProfileContainer.classList.add('invisible')
    profileLocation2.classList.add('invisible')
    profileLocation1.classList.remove('invisible')
    partyBackEdit.classList.add('invisible')
    originalBackArrow.classList.remove('invisible')
})

uploadPicBtn.addEventListener('click', () => {
    uploadPicInput.click()
})

profileRight.addEventListener('click', () => {
    profileNames.forEach(profileName => {
        profileName.classList.add('invisible')
    })
    profileImgs.forEach(profileImg => {
        profileImg.classList.add('invisible')
    })
    profileNameCounter += 1
    profileNameCounter == 7 ? profileNameCounter = 0 : null
    profileNames[profileNameCounter].classList.remove('invisible')
    profileNameInput.value = profileNames[profileNameCounter].innerText
    profileImgs[profileNameCounter].classList.remove('invisible')
})

profileLeft.addEventListener('click', () => {
    profileNames.forEach(profileName => {
        profileName.classList.add('invisible')
    })
    profileImgs.forEach(profileImg => {
        profileImg.classList.add('invisible')
    })
    profileNameCounter -= 1
    profileNameCounter == -1 ? profileNameCounter = 6 : null
    profileNames[profileNameCounter].classList.remove('invisible')
    profileNameInput.value = profileNames[profileNameCounter].innerText
    profileImgs[profileNameCounter].classList.remove('invisible')
})

profileNameInput.addEventListener('input', () => {
    profileNames[profileNameCounter].innerText = profileNameInput.value
})

uploadPicInput.addEventListener('change', e => {
    if (e.target.files && e.target.files[0]) {
        if (/image\/*/.test(e.target.files[0].type)) {
            if (profileImgs[profileNameCounter].firstChild) {
                profileImgs[profileNameCounter].firstChild.remove() // to remove last pic
            }
            const reader = new FileReader()
            reader.onload = function() {
                const new_image = new Image()
                new_image.src = reader.result
                pin_image_blob = reader.result
                new_image.onload = function() {
                    profileImgs[profileNameCounter].appendChild(new_image)
                    new_image.classList.add('imagePic')
                }
            }
            reader.readAsDataURL(e.target.files[0])
        }
    }
})

function saveProfiles() {
    primePartyExtendedOptions.avatarPictures.user1.userName = profileNames[0].innerText
    primePartyExtendedOptions.avatarPictures.user2.userName = profileNames[1].innerText
    primePartyExtendedOptions.avatarPictures.user3.userName = profileNames[2].innerText
    primePartyExtendedOptions.avatarPictures.user4.userName = profileNames[3].innerText
    primePartyExtendedOptions.avatarPictures.user5.userName = profileNames[4].innerText
    primePartyExtendedOptions.avatarPictures.user6.userName = profileNames[5].innerText
    primePartyExtendedOptions.avatarPictures.user7.userName = profileNames[6].innerText
    profileImgs[0].firstChild ? primePartyExtendedOptions.avatarPictures.user1.profilePicture = profileImgs[0].firstChild.src : primePartyExtendedOptions.avatarPictures.user1.profilePicture = ""
    profileImgs[1].firstChild ? primePartyExtendedOptions.avatarPictures.user2.profilePicture = profileImgs[1].firstChild.src : primePartyExtendedOptions.avatarPictures.user2.profilePicture = ""
    profileImgs[2].firstChild ? primePartyExtendedOptions.avatarPictures.user3.profilePicture = profileImgs[2].firstChild.src : primePartyExtendedOptions.avatarPictures.user3.profilePicture = ""
    profileImgs[3].firstChild ? primePartyExtendedOptions.avatarPictures.user4.profilePicture = profileImgs[3].firstChild.src : primePartyExtendedOptions.avatarPictures.user4.profilePicture = ""
    profileImgs[4].firstChild ? primePartyExtendedOptions.avatarPictures.user5.profilePicture = profileImgs[4].firstChild.src : primePartyExtendedOptions.avatarPictures.user5.profilePicture = ""
    profileImgs[5].firstChild ? primePartyExtendedOptions.avatarPictures.user6.profilePicture = profileImgs[5].firstChild.src : primePartyExtendedOptions.avatarPictures.user6.profilePicture = ""
    profileImgs[6].firstChild ? primePartyExtendedOptions.avatarPictures.user6.profilePicture = profileImgs[5].firstChild.src : primePartyExtendedOptions.avatarPictures.user7.profilePicture = ""
    saveOptions(primePartyExtendedOptions)
}

// user guide
let featureGroupBtn = document.querySelector('#featureGroupBtn')
let featureVideoBtn = document.querySelector('#featureVideoBtn')
let featurePlayerBtn = document.querySelector('#featurePlayerBtn')
let featureSubtitlesBtn = document.querySelector('#featureSubtitlesBtn')
let featurePictureBtn = document.querySelector('#featurePictureBtn')
let fetureScreens = document.querySelectorAll('.fetureScreen')
let featureGroupScreen = document.querySelector('#featureGroupStreaming')
let featureVideoScreen = document.querySelector('#featureVideoOptions')
let featurePlayerScreen = document.querySelector('#featurePlayerOptions')
let featuresSubtitlesScreen = document.querySelector('#featuresSubtitles')
let featuresPictureScreen = document.querySelector('#featuresPicture')
let featureBtns = document.querySelectorAll('.featuresList li')

function removeFetureColor() {
    featureBtns.forEach(btn => {
        btn.classList.remove('featureLiActive')
    })
}

featureGroupBtn.addEventListener('click', () => {
    fetureScreens.forEach(screen => {
        screen.classList.add('invisible')
        featureGroupScreen.classList.remove('invisible')
    })
    removeFetureColor()
    featureGroupBtn.classList.add('featureLiActive')
})

featureVideoBtn.addEventListener('click', () => {
    fetureScreens.forEach(screen => {
        screen.classList.add('invisible')
        featureVideoScreen.classList.remove('invisible')
    })
    removeFetureColor()
    featureVideoBtn.classList.add('featureLiActive')
})

featurePlayerBtn.addEventListener('click', () => {
    fetureScreens.forEach(screen => {
        screen.classList.add('invisible')
        featurePlayerScreen.classList.remove('invisible')
    })
    removeFetureColor()
    featurePlayerBtn.classList.add('featureLiActive')
})

featureSubtitlesBtn.addEventListener('click', () => {
    fetureScreens.forEach(screen => {
        screen.classList.add('invisible')
        featuresSubtitlesScreen.classList.remove('invisible')
    })
    removeFetureColor()
    featureSubtitlesBtn.classList.add('featureLiActive')
})

featurePictureBtn.addEventListener('click', () => {
    fetureScreens.forEach(screen => {
        screen.classList.add('invisible')
        featuresPictureScreen.classList.remove('invisible')
    })
    removeFetureColor()
    featurePictureBtn.classList.add('featureLiActive')
})

// For all screens

function setValues(primePartyExtendedOptions) {
    // main values
    onOff.checked = primePartyExtendedOptions.extensionActive
        // video
    videoOnOff.checked = primePartyExtendedOptions.videoOptionsActive
    speedRange.value = primePartyExtendedOptions.videoSpeedValue
    speedOutput.innerHTML = `${speedRange.value}x`
    if (primePartyExtendedOptions.aspectRatio == "original") { document.querySelector('#watchModeOriginal').checked = true }
    if (primePartyExtendedOptions.aspectRatio == "width") { document.querySelector('#watchModeWidth').checked = true }
    if (primePartyExtendedOptions.aspectRatio == "height") { document.querySelector('#watchModeHeight').checked = true }
    zoomRange.value = primePartyExtendedOptions.videoZoomValue
    zoomOutput.innerHTML = `${zoomRange.value}%`
    videoRotationOutput.attributes.data.value = primePartyExtendedOptions.videoRotation
    videoRotationOutput.innerText = `${videoRotationOutput.attributes.data.value} deg`
    pipCheckbox.checked = primePartyExtendedOptions.allowPip
        // player
    playerOnOff.checked = primePartyExtendedOptions.playerOptionsActive
    skipIntrosCheckbox.checked = primePartyExtendedOptions.skipIntroSequence
    nextEpisodeCheckbox.checked = primePartyExtendedOptions.autoPlayNext
    skipAdsCheckbox.checked = primePartyExtendedOptions.skipAds
    hideCursorCheckbox.checked = primePartyExtendedOptions.hideCursor
    hideSpoilerCheckbox.checked = primePartyExtendedOptions.hideSpoilers
        // subtitles
    subtitlesOnOff.checked = primePartyExtendedOptions.subtitlesOptionsActive
    subtitlesOutlineCheckbox.checked = primePartyExtendedOptions.subtitlesOutline
    primePartyExtendedOptions.subtitlesOutline ? outlineColorBlur.classList.remove('grey') : outlineColorBlur.classList.add('grey')
    subtitlesOutlineColor.value = primePartyExtendedOptions.subtitlesOutlineColor
    subtitlesColor.value = primePartyExtendedOptions.subtitlesColor
    fontSizeRange.value = primePartyExtendedOptions.subtitlesSize
    fontSizeOutput.innerHTML = `${fontSizeRange.value}px`
    fontType.value = primePartyExtendedOptions.subtitlesFontFamily
    subtitlesBackgroundColor.value = primePartyExtendedOptions.subtitlesBackgroundColor
    backgroundRange.value = primePartyExtendedOptions.subtitlesBackgroundOpacity
    backgroundOutput.innerHTML = backgroundRange.value
        // profile
    profileFeaturesSwitch.checked = primePartyExtendedOptions.profileOptionsActive
    profileNames[0].innerText = primePartyExtendedOptions.avatarPictures.user1.userName
    profileNames[1].innerText = primePartyExtendedOptions.avatarPictures.user2.userName
    profileNames[2].innerText = primePartyExtendedOptions.avatarPictures.user3.userName
    profileNames[3].innerText = primePartyExtendedOptions.avatarPictures.user4.userName
    profileNames[4].innerText = primePartyExtendedOptions.avatarPictures.user5.userName
    profileNames[5].innerText = primePartyExtendedOptions.avatarPictures.user6.userName
    profileNames[6].innerText = primePartyExtendedOptions.avatarPictures.user7.userName
    primePartyExtendedOptions.avatarPictures.user1.profilePicture != "" ? appendPic(primePartyExtendedOptions.avatarPictures.user1.profilePicture, profileImgs[0]) : null
    primePartyExtendedOptions.avatarPictures.user2.profilePicture != "" ? appendPic(primePartyExtendedOptions.avatarPictures.user2.profilePicture, profileImgs[1]) : null
    primePartyExtendedOptions.avatarPictures.user3.profilePicture != "" ? appendPic(primePartyExtendedOptions.avatarPictures.user3.profilePicture, profileImgs[2]) : null
    primePartyExtendedOptions.avatarPictures.user4.profilePicture != "" ? appendPic(primePartyExtendedOptions.avatarPictures.user4.profilePicture, profileImgs[3]) : null
    primePartyExtendedOptions.avatarPictures.user5.profilePicture != "" ? appendPic(primePartyExtendedOptions.avatarPictures.user5.profilePicture, profileImgs[4]) : null
    primePartyExtendedOptions.avatarPictures.user6.profilePicture != "" ? appendPic(primePartyExtendedOptions.avatarPictures.user6.profilePicture, profileImgs[5]) : null
    primePartyExtendedOptions.avatarPictures.user7.profilePicture != "" ? appendPic(primePartyExtendedOptions.avatarPictures.user7.profilePicture, profileImgs[6]) : null
}

function appendPic(picture, place) {
    place.firstChild ? place.firstChild.remove() : null
    let newPic = new Image()
    newPic.src = picture
    newPic.classList.add('imagePic')
    place.appendChild(newPic)
}

function saveOptions(primePartyExtendedOptions) {
    chrome.storage.local.set({
        'primePartyExtendedOptions': primePartyExtendedOptions
    })
    console.log(primePartyExtendedOptions)
}