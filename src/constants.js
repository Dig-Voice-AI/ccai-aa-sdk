export const analyzeContentDataSchema = {
    type: 'object',
    properties: {
        id: {
            type: 'string',
            minLength: 1
        },
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
    required: ['participantRole', 'request', 'id'],
    additionalProperties: false
}

export const activateConversationDataSchema = {
    type: 'object',
    properties: {
        id: {
            type: 'string',
            minLength: 1
        },
    },
    additionalProperties: false
}

export const leaveConversationDataSchema = {
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

export const createConversationDataSchema = {
    type: 'object',
    properties: {
        eventBased: {
            type: 'boolean'
        },
        id: {
            type: 'string',
            minLength: 1
        },
        displayName: {
            type: 'string',
            minLength: 1
        }
    },
    required: ['id'],
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
        baseUrl: {
            type: 'string'
        },
        timeout: {
            type: 'number',
            minimum: 5000
        },
        conversationProfile: {
            type: 'string'
        },
        authenticationType: {
            enum: ['skip', 'finesse', 'salesforce', 'genesys']
        },
        authenticationToken: {
            type: 'string'
        },
        allowManualSummarization: {
            type: 'boolean'
        },
        displaySentiment: {
            type: 'boolean'
        },
        enableAgentCoach: {
            type: 'boolean'
        },
        enableTranscript: {
            type: 'boolean'
        },
        enableSummarization: {
            type: 'boolean'
        },
        largeDisplayMode: {
            type: 'boolean'
        }
    },
    required: ['baseUrl', 'conversationProfile', 'authenticationType'],
    additionalProperties: true
}

export const navigateToDataSchema = {
    type: 'object',
    properties: {
        id: {
            type: 'string',
            minLength: 1
        },
        page: {
            enum: ['assist', 'conversation']
        }
    },
    required: ['id', 'page'],
    additionalProperties: false
}

export const summarizeDataSchema = {
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

export const topicType = {
    analyzeContent: 'analyze-content',
    initializeResponse: 'initialize-response',
    loadResponse: 'load-response',
    authenticateResponse: 'authenticate-response',
    setupResponse: 'setup-response',
    summarizeResponse: 'summarize-response',
    updateTokenResponse: 'update-token-response'
}

export const topics = Object.values(topicType).filter((topic) => topic)