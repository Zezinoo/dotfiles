class Extension {
  constructor() {
    this.waxpeer = new Waxpeer()
    this.waxpeer.extension(this)

    this.waxpeer.start()
  }
  change_ext_status(e) {
    1 == e
      ? (chrome.browserAction.setBadgeText({
          text: 'ON',
        }),
        chrome.browserAction.setBadgeBackgroundColor({
          color: '#4688F1',
        }))
      : (chrome.browserAction.setBadgeText({
          text: 'OFF',
        }),
        chrome.browserAction.setBadgeBackgroundColor({
          color: 'gray',
        }))
  }
}
const ex = new Extension()
