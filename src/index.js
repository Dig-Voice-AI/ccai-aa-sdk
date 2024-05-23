import Ajv from 'ajv'
import { analyzeContentDataSchema, initializeDataSchema, errorMessages, navigateToSchema, topicTypes } from '@/constants'

export default class AgentAssistSdk {
    constructor() {
        window.addEventListener('message', (event) => this.handleNewMessageFromListener(event), false)

        this.ajv = new Ajv()
        
        this.initialized = false

        this.listeners = []

        this.id = crypto.randomUUID()

        this.iframe = document.createElement('iframe')

        this.iframe.style.width = '100%'

        this.iframe.style.height = '100%'

        this.iframe.style.border = '0px'
    }

    addListener(topic, callback) {
        console.log('Adding listener topic =', topic)
        if (!topicTypes.includes(topic)) throw({ message: "Property 'topic' is invalid.", errors: [`Valid values for topic are ${JSON.stringify(topicTypes)}.`]})

        if (typeof callback !== 'function') throw({ message: "Property 'callback' is invalid.", errors: ['Property callback must be a function.']})

        this.listeners.push({topic: topic, callback: callback})
    }

    analyzeContent(data) {
        if (!this.initialized) throw(errorMessages.UNINITIALIZED) 

        const validate = this.ajv.compile(analyzeContentDataSchema)

        const valid = validate(data)

        if (!valid) throw({ message: "Property 'data' is invalid", errors: validate.errors})

        this.iframe.contentWindow.postMessage({...data, id: this.id, topic: 'ANALYZE_CONTENT'}, "*")
    }

    handleNewMessageFromListener(event) {
        // if (event.origin !== 'https://origin1.com') return 
        if (event.data.id !== this.id) return
    
        console.log('Parent received message =', event.data)

        if (event.data.topic === 'connector-initialized') this.initialized = true
    
        this.listeners.forEach((listener) => {
            if (listener.topic !== event.data.topic) return

            listener.callback(event.data.data)
        })
    }

    initialize(el, data) {
        if (this.initialized) return

        return new Promise((resolve, reject) => {
            if (!document.body.contains(el)) return reject({ message: "Element not found in document body", errors: ['You must pass a valid element.']})

            const validate = this.ajv.compile(initializeDataSchema)

            const valid = validate(data)

            if (!valid) return reject({ message: "Property 'data' is invalid", errors: validate.errors})
            
            this.iframe.onload = () => {
                this.iframe.contentWindow.postMessage({...data, id: this.id, topic: 'INIT'}, "*")

                return resolve() 
            }

            this.iframe.src = data.iframeUrl || data.connectorUrl

            el.appendChild(this.iframe)
        })
    }

    navigateTo(data) {
        if (!this.initialized) throw(errorMessages.UNINITIALIZED) 

        const validate = this.ajv.compile(navigateToSchema)

        const valid = validate(data)

        if (!valid) throw({ message: "Property 'data' is invalid", errors: validate.errors})

        this.iframe.contentWindow.postMessage({...data, id: this.id, topic: 'NAVIGATE'}, "*")
    }
}
