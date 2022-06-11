import { EventBus } from './index'

test('will throw error if valid events are not included in initialization', () => { 
    expect(() => {
        const events = new EventBus()
    }).toThrow(
        'When initializing an event bus, a list of valid events must be provided'
    )
})

test('will initialize', () => {
    const events = new EventBus([
        'USER_ADDED_NOTE',
        'BACKEND_REMOVED_NOTE'
    ])
    expect(events).toBeTruthy()
})

test('can register and emit an event', () => {
    const events = new EventBus(['USER_ADDED_NOTE', 'BACKEND_REMOVED_NOTE'])

    let state = []
    events.on('USER_ADDED_NOTE', (x) => state.push(x))
    events.emit('USER_ADDED_NOTE', {id: '100'})
    
    expect(state[0]).toEqual({ id: '100' })
})

test('will throw error when trying to register an function to an invalid event', () => {
    const events = new EventBus(['USER_ADDED_NOTE', 'BACKEND_REMOVED_NOTE'])
    expect(() => {
        events.on('INVALID', (x) => state.push(x))
    }).toThrow('INVALID is not a valid event')
})

test('will throw error when trying to emit an invalid event', () => {
    const events = new EventBus(['USER_ADDED_NOTE', 'BACKEND_REMOVED_NOTE'])
    expect(() => {
        events.emit('INVALID', { id: '100' })
    }).toThrow('INVALID is not a valid event')
})