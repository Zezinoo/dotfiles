async function loadExtendedOptionsOrSetDefaults() {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get('primePartyExtendedOptions', async(item) => {
            if (chrome.runtime.lastError) {
                return reject(chrome.runtime.lastError)
            }
            primePartyExtendedOptions = item?.primePartyExtendedOptions
            if (!primePartyExtendedOptions) {
                primePartyExtendedOptions = {
                    "extensionActive": true,
                    "videoOptionsActive": true,
                    "playerOptionsActive": true,
                    "subtitlesOptionsActive": true,
                    "profileOptionsActive": true,
                    "skipIntroSequence": false,
                    "autoPlayNext": false,
                    "skipAds": false,
                    "hideCursor": false,
                    "hideSpoilers": false,
                    "videoSpeedValue": 1,
                    "aspectRatio": "original",
                    "videoZoomValue": 100,
                    "videoRotation": 0,
                    "subtitlesOutline": false,
                    "subtitlesOutlineColor": "#000000",
                    "subtitlesSize": 36,
                    "subtitlesColor": "#ffffff",
                    "subtitlesBackgroundColor": "#000000",
                    "subtitlesBackgroundOpacity": .1,
                    "subtitlesFontFamily": "1",
                    "allowPip": false,
                    "allowAvatar": true,
                    "avatarPictures": {
                        "user1": {
                            "userName": "User 1",
                            "profilePicture": "",
                            "active": true
                        },
                        "user2": {
                            "userName": "User 2",
                            "profilePicture": "",
                            "active": false
                        },
                        "user3": {
                            "userName": "User 3",
                            "profilePicture": "",
                            "active": false
                        },
                        "user4": {
                            "userName": "User 4",
                            "profilePicture": "",
                            "active": false
                        },
                        "user5": {
                            "userName": "User 5",
                            "profilePicture": "",
                            "active": false
                        },
                        "user6": {
                            "userName": "User 6",
                            "profilePicture": "",
                            "active": false
                        },
                        "user7": {
                            "userName": "User 7",
                            "profilePicture": "",
                            "active": false
                        }
                    }
                }
                chrome.storage.local.set({
                    'primePartyExtendedOptions': primePartyExtendedOptions
                })
            }
            resolve(primePartyExtendedOptions)
        })
    })
}