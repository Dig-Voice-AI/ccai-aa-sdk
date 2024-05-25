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
        conversationId: {
            type: 'string'
        },
        conversationProfile: {
            type: 'string'
        },
        channel: {
            enum: ['chat', 'omnichannel', 'voice']
        },
        features: {
            type: 'array',
            minItems: 1,
            uniqueItems: true,
            items: {
                enum: ['GEN_ASSIST', 'SUGGESTIONS', 'SMART_REPLY', 'SUMMARIZATION', 'TRANSCRIPT']
            }
        },
        iframeUrl: {
            type: 'string'
        }
    },
    required: ['connectorUrl', 'conversationProfile', 'channel', 'features'],
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

export const searchAiSchema = {
    type: 'object',
    properties: {
        text: {
            type: 'string'
        }
    },
    required: ['text'],
    additionalProperties: false
}

export const topicTypes = [
    'analyze-content-response-received',
    'connector-initialized',
    'conversation-details-received',
    'list-messages-response-received',
    'smart-reply-selected'
]
