try {
    importScripts('/src/background/onInstalled.js')
    importScripts('/src/background/declarative-content.js')
    importScripts('/src/background/messaging.js')
    importScripts('/src/background/party.js')
    importScripts('/src/background/amazon.min.js')
} catch (e) {
    console.log(e)
}