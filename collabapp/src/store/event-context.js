import { createContext, useReducer } from 'react'

// Initial state: This will be empty initially.
const DUMMY_EVENTS = []

// Create the EventsContext
export const EventsContext = createContext({
	events: [],
	addEvent: ({ date, hour, description }) => {},
	deleteEvent: date => {},
	updateEvent: (date, { hour, description }) => {},
})

// Define the reducer for managing events
function eventsReducer(state, action) {
	switch (action.type) {
		case 'ADD':
			return [{ ...action.payload }, ...state] // Add new event at the beginning of the array
		case 'UPDATE':
			const eventIndex = state.findIndex(event => event.date === action.payload.date)
			const updatedEvent = { ...state[eventIndex], ...action.payload.data }
			const updatedEvents = [...state]
			updatedEvents[eventIndex] = updatedEvent // Update the event
			return updatedEvents
		case 'DELETE':
			return state.filter(event => event.date !== action.payload) // Remove the event
		default:
			return state // Return the current state if action type is unknown
	}
}

// Create the Provider component
function EventsContextProvider({ children }) {
	const [eventsState, dispatch] = useReducer(eventsReducer, DUMMY_EVENTS) // Use the reducer

	// Action creators
	function addEvent(eventData) {
		const id = new Date().toISOString() // Use date as the ID
		dispatch({ type: 'ADD', payload: { ...eventData, id } })
	}

	function deleteEvent(id) {
		dispatch({ type: 'DELETE', payload: id })
	}

	function updateEvent(id, eventData) {
		dispatch({ type: 'UPDATE', payload: { id, data: eventData } })
	}

	// Provide context value to children
	const value = {
		events: eventsState,
		addEvent: addEvent,
		deleteEvent: deleteEvent,
		updateEvent: updateEvent,
	}

	return <EventsContext.Provider value={value}>{children}</EventsContext.Provider>
}

export default EventsContextProvider
