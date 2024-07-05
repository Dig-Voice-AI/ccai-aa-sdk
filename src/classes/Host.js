export default class Host {
    constructor() {
        this.iframe = document.createElement('iframe')

        this.iframe.style.width = '100%'

        this.iframe.style.height = '100%'

        this.iframe.style.border = '0px'
    }

    constructIframeUrl(parentId, data) {
        let url = `${data.connectorUrl}/?parentId=${parentId}&channel=${data.channel}&conversationProfile=${data.conversationProfile}`

        if (data.conversationId) url += `&conversationId=${data.conversationId}`

        data.modules.forEach((module) => {
            url += `&modules=${module}`
        })

        if (Object.keys(data.auth)[0] === 'finesse') {
            url += `&authType=finesse&token=${data.auth.finesse.token}`
        }

        return url
    }

    loadIframe(hostElement, iframeSource) {
        this.hostElement = hostElement

        if (this.iframe.src) this.hostElement.removeChild(this.iframe)

        this.iframe.src = iframeSource

        hostElement.appendChild(this.iframe)
    }

    sendMessage(data) {
        this.iframe.contentWindow.postMessage(data, '*')
    }
}