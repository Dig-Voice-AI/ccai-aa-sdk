import Ajv from 'ajv'
import {
    activateConversationDataSchema,
    analyzeContentDataSchema,
    createConversationDataSchema,
    initializeDataSchema,
    errorMessages,
    navigateToDataSchema,
    summarizeDataSchema,
    topicType,
    topics,
    leaveConversationDataSchema
} from '@/constants'
import Listener from '@/classes/Listener'
import Host from '@/classes/Host'

export default class AgentAssistSdk {
    constructor() {
        this.ajv = new Ajv()

        this.config = null

        this.host = new Host()

        this.listener = new Listener()

        this.initialized = false

        this.sdkId = crypto.randomUUID()

        window.addEventListener(
            'message',
            (event) => {
                if (event.origin !== this.host.baseUrl) return

                console.debug(
                    `SDK received message for topic = ${event.data.topic}. Data =`,
                    event.data.data
                )

                if (event.data.topic === topicType.loadResponse) {
                    return this.host.sendMessage('authenticate', this.config)
                }

                if (event.data.topic === topicType.authenticateResponse && !this.initialized) {
                    if (event.data.data.success && !this.initialized) return this.host.sendMessage('setup', this.config)
                }

                if (event.data.topic === topicType.setupResponse) {
                    console.log("NATHAN")
                    console.log(event.data, event.data.data, event.data.data.success, event.data.success)
                    return this.listener.onMessage(topicType.initializeResponse, event.data.data)
                }

                this.listener.onMessage(event.data.topic, event.data.data)
            },
            false
        )
    }

    addListener(topic, callback) {
        console.log('Adding listener topic =', topic)

        if (!topics.includes(topic))
            throw {
                message: "Property 'topic' is invalid.",
                errors: [`Valid values for topic are ${JSON.stringify(topics)}.`]
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

        this.host.sendMessage('activate-conversation', data)
    }

    analyzeContent(data) {
        if (!this.initialized) throw errorMessages.UNINITIALIZED

        const validate = this.ajv.compile(analyzeContentDataSchema)

        const valid = validate(data)

        if (!valid) {
            throw {
                message: "Property 'data' is invalid",
                errors: validate.errors
            }
        }

        this.host.sendMessage('analyze-content', data)
    }

    createConversation(data) {
        if (!this.initialized) throw errorMessages.UNINITIALIZED

        const validate = this.ajv.compile(createConversationDataSchema)

        const valid = validate(data)

        if (!valid) {
            throw {
                message: "Property 'data' is invalid",
                errors: validate.errors
            }
        }

        this.host.sendMessage('create-conversation', data)
    }

    createErrorResponse({
        success = "",
        data = [],
        message = "",
        errors = {}
    }) {
        return {
            success: success,
            data: data,
            message: message,
            errors: errors
        }
    }

    leaveConversation(data) {
        if (!this.initialized) throw errorMessages.UNINITIALIZED

        const validate = this.ajv.compile(leaveConversationDataSchema)

        const valid = validate(data)

        if (!valid)
            throw {
                message: "Property 'data' is invalid",
                errors: validate.errors
            }

        this.host.sendMessage('leave-conversation', data)
    }

    initialize(el, data) {
        this.initialized = false

        if (!document.body.contains(el)) {
            throw this.createErrorResponse({
                success: false,
                message: 'You must pass a valid element.',
                errors: ['Element not found in document body']
            })
        }

        // const validate = this.ajv.compile(initializeDataSchema)

        // const valid = validate(data)

        // if (!valid) {
        //     throw this.createErrorResponse({
        //         success: false,
        //         message: "Property 'data' must be valid",
        //         errors: validate.errors
        //     })
        // }

        if (data.timeout) {
            setTimeout(() => {
                if (this.initialized) return

                this.listener.onMessage(topicType.initializeResponse, {
                    success: false,
                    message: `Initialization must complete within ${data.timeout}ms`,
                    errors: [`The request timed out`],
                })
            }, data.timeout)
        }

        this.config = data

        this.host.loadIframe(data.baseUrl, this.sdkId, el)
    }

    navigateTo(data) {
        if (!this.initialized) throw errorMessages.UNINITIALIZED

        const validate = this.ajv.compile(navigateToDataSchema)

        const valid = validate(data)

        if (!valid)
            throw {
                message: "Property 'data' is invalid",
                errors: validate.errors
            }

        this.host.sendMessage('navigate-to', data)
    }

    summarize(data) {
        if (!this.initialized) throw errorMessages.UNINITIALIZED

        const validate = this.ajv.compile(summarizeDataSchema)

        const valid = validate(data)

        if (!valid)
            throw {
                message: "Property 'data' is invalid",
                errors: validate.errors
            }

        this.host.sendMessage('summarize', data)
    }

    updateToken(data) {
        console.debug('Update token request received.', data.token)

        if (!data.token) throw this.createErrorResponse({
            success: false,
            message: "A token must be provided.",
            errors: ['No token was provided.']
        })

        this.host.sendMessage('update-token', data)
    }
}