export const activateConversationDataSchema = {
    type: 'object',
    properties: {
        id: {
            type: 'string',
        },
    },
    additionalProperties: false
}

export const endConversationDataSchema = {
    type: 'object',
    properties: {
        id: {
            type: 'string',
            minLength: 1
        },
    },
    required: ['id'],
    additionalProperties: false
}

export const startConversationDataSchema = {
    type: 'object',
    properties: {
        isEventBased: {
            type: 'boolean'
        },
        id: {
            type: 'string',
            minLength: 1
        },
    },
    required: ['id'],
    additionalProperties: false
}

export const analyzeContentDataSchema = {
    type: 'object',
    properties: {
        participantRole: {
            enum: ['END_USER', 'AUTOMATED_AGENT', 'HUMAN_AGENT']
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

export const errorMessages = {
    UNINITIALIZED: {
        message: 'Connector is not initialized.',
        errors: 'Please wait for the connector to initialize before making this request.'
    }
}

export const initializeDataSchema = {
    type: 'object',
    properties: {
        connectorUrl: {
            type: 'string'
        },
        timeout: {
            type: 'number',
            minimum: 1000
        },
        conversationProfile: {
            type: 'string'
        },
        channel: {
            enum: ['chat', 'omnichannel', 'voice']
        },
        auth: {
            type: 'object',
            properties: {
                skip: {
                    type: 'boolean'
                },
                finesse: {
                    type: 'object',
                    properties: {
                        token: {
                            type: 'string'
                        }
                    },
                    required: ['token'],
                    additionalProperties: false
                },
                genesys: {
                    type: 'object',
                    properties: {
                        token: {
                            type: 'string'
                        }
                    },
                    required: ['token'],
                    additionalProperties: false
                }
            },
            additionalProperties: false,
            oneOf: [{
                required: ['skip']
            }, {
                required: ['finesse']
            }, {
                required: ['genesys']
            }]
        },
        modules: {
            type: 'array',
            minItems: 1,
            uniqueItems: true,
            items: {
                enum: ['GEN_ASSIST', 'SUGGESTIONS', 'SMART_REPLY', 'SUMMARIZATION', 'TRANSCRIPT']
            }
        }
    },
    required: ['connectorUrl', 'conversationProfile', 'channel', 'modules', 'auth'],
    additionalProperties: false
}

export const navigateToSchema = {
    type: 'object',
    properties: {
        tab: {
            enum: ['GEN_ASSIST', 'SMART_REPLY', 'SUGGESTIONS', 'SUMMARIZATION', 'TRANSCRIPT']
        }
    },
    required: ['tab'],
    additionalProperties: false
}

export const topicTypes = [
    'analyze-content-response-received',
    'connector-initialization-response-received',
    'conversation-details-received',
    'conversation-summarization-received',
    'list-messages-response-received',
    'new-message-received',
    'smart-reply-selected'
]