import Ajv from 'ajv'
import {
    activateConversationDataSchema,
    analyzeContentDataSchema,
    endConversationDataSchema,
    initializeDataSchema,
    errorMessages,
    navigateToSchema,
    startConversationDataSchema,
    topicTypes
} from '@/constants'
import Listener from '@/classes/Listener'
import Host from '@/classes/Host'

export default class AgentAssistSdk {
    constructor() {
        this.ajv = new Ajv()

        this.host = new Host()

        this.listener = new Listener()

        this.initialized = false

        this.parentId = crypto.randomUUID()

        window.addEventListener(
            'message',
            (event) => {
                if (event.data.parentId !== this.parentId) return

                console.log(
                    `SDK received message for topic = ${event.data.topic}. Data =`,
                    event.data.data
                )

                if (event.data.topic === 'connector-initialization-response-received') {
                    if (!event.data.data.success) return

                    this.initialized = true
                }

                this.listener.onMessage(event.data.topic, event.data.data)
            },
            false
        )
    }

    addListener(topic, callback) {
        console.log('Adding listener topic =', topic)

        if (!topicTypes.includes(topic))
            throw {
                message: "Property 'topic' is invalid.",
                errors: [`Valid values for topic are ${JSON.stringify(topicTypes)}.`]
            }

        if (typeof callback !== 'function')
            throw {
                message: "Property 'callback' is invalid.",
                errors: ['Property callback must be a function.']
            }

        this.listener.create(topic, callback)
    }

    activateConversation(data) {
        if (!this.initialized) throw errorMessages.UNINITIALIZED

        const validate = this.ajv.compile(activateConversationDataSchema)

        const valid = validate(data)

        if (!valid)
            throw {
                message: "Property 'data' is invalid",
                errors: validate.errors
            }

        this.host.sendMessage({
            ...data,
            parentId: this.parentId,
            topic: 'ACTIVATE_CONVERSATION'
        })
    }

    analyzeContent(data) {
        if (!this.initialized) throw errorMessages.UNINITIALIZED

        const validate = this.ajv.compile(analyzeContentDataSchema)

        const valid = validate(data)

        if (!valid)
            throw {
                message: "Property 'data' is invalid",
                errors: validate.errors
            }

        this.host.sendMessage({
            ...data,
            parentId: this.parentId,
            topic: 'ANALYZE_CONTENT'
        })
    }

    endConversation(data) {
        if (!this.initialized) throw errorMessages.UNINITIALIZED

        const validate = this.ajv.compile(endConversationDataSchema)

        const valid = validate(data)

        if (!valid)
            throw {
                message: "Property 'data' is invalid",
                errors: validate.errors
            }

        this.host.sendMessage({
            ...data,
            parentId: this.parentId,
            topic: 'END_CONVERSATION'
        })
    }

    initialize(el, data) {
        this.initialized = false

        return new Promise((resolve, reject) => {
            if (!document.body.contains(el))
                return reject({
                    message: 'Element not found in document body',
                    errors: ['You must pass a valid element.']
                })

            const validate = this.ajv.compile(initializeDataSchema)

            const valid = validate(data)

            if (!valid)
                return reject({
                    message: "Property 'data' is invalid",
                    errors: validate.errors
                })

            if (data.timeout) {
                setTimeout(() => {
                    if (this.initialized) return

                    this.listener.onMessage('connector-initialization-response-received', {
                        success: false
                    })
                }, data.timeout)
            }

            const url = this.host.constructIframeUrl(this.parentId, data)

            this.host.loadIframe(el, url)

            return resolve()
        })
    }

    navigateTo(data) {
        if (!this.initialized) throw errorMessages.UNINITIALIZED

        const validate = this.ajv.compile(navigateToSchema)

        const valid = validate(data)

        if (!valid)
            throw {
                message: "Property 'data' is invalid",
                errors: validate.errors
            }

        this.host.sendMessage({
            ...data,
            parentId: this.parentId,
            topic: 'NAVIGATE'
        })
    }

    startConversation(data) {
        if (!this.initialized) throw errorMessages.UNINITIALIZED

        const validate = this.ajv.compile(startConversationDataSchema)

        const valid = validate(data)

        if (!valid)
            throw {
                message: "Property 'data' is invalid",
                errors: validate.errors
            }

        this.host.sendMessage({
            ...data,
            parentId: this.parentId,
            topic: 'START_CONVERSATION'
        })
    }
}