import Ajv from 'ajv'

const analyzeContentDataSchema = {
    type: 'object',
    properties: {
        participantRole: {
            enum: ["END_USER", "AUTOMATED_AGENT", "HUMAN_AGENT"]
        },
        request: {
            type: 'object',
            properties: {
                textInput: {
                    type: 'object',
                    properties: {
                        text: {
                            type: 'string'
                        }
                    },
                    required: ['text'],
                    additionalProperties: false
                },
                messageSendTime: {
                    type: 'string'
                }
            },
            required: ['textInput', 'messageSendTime'],
            additionalProperties: false
        }
    },
    required: ['participantRole', 'request'],
    additionalProperties: false
}

const initializeDataSchema = {
    type: 'object',
    properties: {
        connectorUrl: {
            type: 'string',
        },
        conversationId: {
            type: 'string',
        },
        conversationProfile: {
            type: 'string',
        },
        channel: {
            enum: ["chat", "omnichannel", "voice"]
        },
    },
    required: ['connectorUrl', 'conversationProfile', 'channel'],
    additionalProperties: false
}

const navigateToSchema = {
    type: 'object',
    properties: {
        tab: {
            enum: ["GEN_ASSIST", "SMART_REPLY", "SUGGESTIONS", "SUMMARIZATION"]
        },
    },
    required: ['tab'],
    additionalProperties: false
}

const id = crypto.randomUUID()

const iframe = document.createElement('iframe')

const listeners = []

const topicTypes = [
    'analyze-content-response-received',
    'conversation-details-received',
    'list-messages-response-received'
]

window.addEventListener('message', (event) => {
    // if (event.origin !== 'https://origin1.com') return 
    if (event.data.id !== id) return

    console.log('Parent received message =', event.data)

    listeners.forEach((listener) => {
        if (listener.topic !== event.data.topic) return

        listener.callback(event.data.data)
    })
}, false);

export function useAgentAssist() {
    const ajv = new Ajv()

    let initialized = false

    function addListener(topic, callback) {
        console.log('Adding listener topic =', topic, 'callback =', callback)
        if (!topicTypes.includes(topic)) throw({ message: "Property 'topic' is invalid.", errors: [`Valid values for topic are ${JSON.stringify(topicTypes)}.`]})

        if (typeof callback !== 'function') throw({ message: "Property 'callback' is invalid.", errors: ['Property callback must be a function.']})

        listeners.push({topic: topic, callback: callback})
    }

    function analyzeContent(data) {
        const validate = ajv.compile(analyzeContentDataSchema)

        const valid = validate(data)

        if (!valid) throw({ message: "Property 'data' is invalid", errors: validate.errors})

        iframe.contentWindow.postMessage({...data, id: id, topic: 'ANALYZE_CONTENT'}, "*")
    }

    function initialize(el, data) {
        return new Promise((resolve, reject) => {
            if (!document.body.contains(el)) return reject({ message: "Element not found in document body", errors: ['You must pass a valid element.']})

            const validate = ajv.compile(initializeDataSchema)

            const valid = validate(data)

            if (!valid) return reject({ message: "Property 'data' is invalid", errors: validate.errors})

            iframe.style.width = '100%'

            iframe.style.height = '100%'

            iframe.style.border = '0px'
            
            iframe.onload = () => {
                iframe.contentWindow.postMessage({...data, id: id, topic: 'INIT'}, "*")

                initialized = true

                return resolve() 
            }

            iframe.src = data.connectorUrl

            el.appendChild(iframe)
        })
    }

    function navigateTo(data) {
        const validate = ajv.compile(navigateToSchema)

        const valid = validate(data)

        if (!valid) throw({ message: "Property 'data' is invalid", errors: validate.errors})

        iframe.contentWindow.postMessage({...data, id: id, topic: 'NAVIGATE'}, "*")
    }

    return {
        addListener,
        analyzeContent,
        initialize,
        navigateTo
    }
}
