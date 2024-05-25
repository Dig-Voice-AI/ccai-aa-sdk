export default class Host {
    constructor() {
        this.iframe = document.createElement('iframe')

        this.iframe.style.width = '100%'

        this.iframe.style.height = '100%'

        this.iframe.style.border = '0px'
    }

    loadIframe(hostElement, iframeSource, callback) {
        this.iframe.onload = callback

        this.iframe.src = iframeSource

        hostElement.appendChild(this.iframe)
    }

    sendMessage(data) {
        this.iframe.contentWindow.postMessage(data, '*')
    }
}