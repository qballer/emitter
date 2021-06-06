export class MyEventEmitter { 
    listeners = {}
    on(name, callback){
        if (typeof name !== 'string') {
            throw new Error('event name is not string')
        }
        if (typeof callback !== 'function') {
            throw new Error('callback is not a function') 
        }
        if (!this.listeners[name]) {
            this.listeners[name] = []
        }
        this.listeners[name].push(callback)
    }

    emit(name, ...args) {
        if (typeof name !== 'string') {
            throw new Error('event name is not string')
        }
        const listeners = this.listeners[name] || []
        listeners.forEach(listener => {
            listener(...args)
            // setTimeout(() => listener(...args), 0)
        })
    }
}