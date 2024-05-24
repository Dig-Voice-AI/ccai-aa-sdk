export default class Listener {
    constructor() {
        this.listeners = []
    }

    create(topic, callback) {
        this.listeners.push({topic: topic, callback: callback})
    }

    onMessage(topic, data) {
        this.listeners.forEach((listener) => {
            if (listener.topic !== topic) return

            listener.callback(data)
        })
    }
}