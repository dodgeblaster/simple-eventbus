export class EventBus { 
    events = []
    
    constructor(events) { 
        if (!events || events.length === 0) { 
            throw new Error('When initializing an event bus, a list of valid events must be provided')
        }

        events.forEach(e => { 
            this.events[e] = []
        })
    }

    on(event, fn) { 
        if (!this.events[event]) { 
            throw new Error(event + ' is not a valid event')
        }
        this.events[event].push(fn)
    }

    emit(event, payload) { 
        if (!this.events[event]) {
            throw new Error(event + ' is not a valid event')
        }
        
        this.events[event].forEach(async (fn) => { 
           void(await fn(payload))
        })
    }

}

