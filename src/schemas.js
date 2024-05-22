export const analyzeContentDataSchema = {
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

export const initializeDataSchema = {
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

export const navigateToSchema = {
    type: 'object',
    properties: {
        tab: {
            enum: ["GEN_ASSIST", "SMART_REPLY", "SUGGESTIONS", "SUMMARIZATION"]
        },
    },
    required: ['tab'],
    additionalProperties: false
}