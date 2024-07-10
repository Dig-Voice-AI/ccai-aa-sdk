export default class Listener {
    constructor() {
        this.listeners = []
    }

    create(topic, callback) {
        this.listeners.push({
            topic: topic,
            callback: callback
        })
    }

    onMessage(topic, {
        success = "",
        data = [],
        message = "",
        errors = {}
    }) {
        this.listeners.forEach((listener) => {
            if (listener.topic !== topic) return

            listener.callback({
                topic: topic,
                success: success,
                data: data,
                message: message,
                errors: errors
            })
        })
    }
}