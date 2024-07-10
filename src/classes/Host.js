export default class Host {
    constructor() {
        this.iframe = document.createElement('iframe')

        this.iframe.style.width = '100%'

        this.iframe.style.height = '100%'

        this.iframe.style.border = '0px'

        this.baseUrl = null
    }

    loadIframe(baseUrl, sdkId, hostElement) {
        this.baseUrl = baseUrl

        const url = `${baseUrl}/?sdkId=${sdkId}`

        this.hostElement = hostElement

        if (this.iframe.src) this.hostElement.removeChild(this.iframe)

        this.iframe.src = url

        this.iframe.allow = "clipboard-write"

        hostElement.appendChild(this.iframe)
    }

    sendMessage(topic, data = null) {
        this.iframe.contentWindow.postMessage({
            topic: topic,
            data: data
        }, this.baseUrl)
    }
}