import Ajv from 'ajv'
import { analyzeContentDataSchema, initializeDataSchema, errorMessages, navigateToSchema, searchAiSchema, topicTypes } from '@/constants'
import Listener from '@/classes/Listener'
import Host from '@/classes/Host'

export default class AgentAssistSdk {
    constructor() {
        this.ajv = new Ajv()

        this.host = new Host()

        this.listener = new Listener()
        
        this.initialized = false

        this.id = crypto.randomUUID()

        window.addEventListener('message', (event) => {
            if (event.data.id !== this.id) return

            console.log(`SDK received message for topic = ${event.data.topic}. Data =`, event.data.data)

            if (event.data.topic === 'connector-initialized') this.initialized = true

            this.listener.onMessage(event.data.topic, event.data.data)
        }, false)
    }

    addListener(topic, callback) {
        console.log('Adding listener topic =', topic)

        if (!topicTypes.includes(topic)) throw({ message: "Property 'topic' is invalid.", errors: [`Valid values for topic are ${JSON.stringify(topicTypes)}.`]})

        if (typeof callback !== 'function') throw({ message: "Property 'callback' is invalid.", errors: ['Property callback must be a function.']})

        this.listener.create(topic, callback)
    }

    analyzeContent(data) {
        if (!this.initialized) throw(errorMessages.UNINITIALIZED) 

        const validate = this.ajv.compile(analyzeContentDataSchema)

        const valid = validate(data)

        if (!valid) throw({ message: "Property 'data' is invalid", errors: validate.errors})

        this.host.sendMessage({...data, id: this.id, topic: 'ANALYZE_CONTENT'})
    }

    initialize(el, data) {
        this.initialized = false

        return new Promise((resolve, reject) => {
            if (!document.body.contains(el)) return reject({ message: "Element not found in document body", errors: ['You must pass a valid element.']})

            const validate = this.ajv.compile(initializeDataSchema)

            const valid = validate(data)

            if (!valid) return reject({ message: "Property 'data' is invalid", errors: validate.errors})
            
            return this.host.loadIframe(el, data.iframeUrl || data.connectorUrl, () => {
                this.host.sendMessage({...data, id: this.id, topic: 'INIT'})

                return resolve()
            })
        })
    }

    navigateTo(data) {
        if (!this.initialized) throw(errorMessages.UNINITIALIZED) 

        const validate = this.ajv.compile(navigateToSchema)

        const valid = validate(data)

        if (!valid) throw({ message: "Property 'data' is invalid", errors: validate.errors})

        this.host.sendMessage({...data, id: this.id, topic: 'NAVIGATE'})
    }

    searchAi(data) {
        if (!this.initialized) throw(errorMessages.UNINITIALIZED) 

        const validate = this.ajv.compile(searchAiSchema)

        const valid = validate(data)

        if (!valid) throw({ message: "Property 'data' is invalid", errors: validate.errors})

        this.host.sendMessage({...data, id: this.id, topic: 'SEARCH_AI'})
    }
}
