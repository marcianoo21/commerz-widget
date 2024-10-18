import React from 'react'
import { Textarea, FormLabel, Input, Box } from '@chakra-ui/react'

const EventDetails = ({ selectedDate, eventDescription, setEventDescription, setEventHour }) => {
	return (
		<Box>
			{/* Show the selected date */}
			<FormLabel>Date</FormLabel>
			<Input value={selectedDate?.toDateString()} isReadOnly />

			{/* Hour picker */}
			<FormLabel mt={4}>Select Hour</FormLabel>
			<Input type='time' onChange={e => setEventHour(e.target.value)} />

			{/* Event description */}
			<FormLabel mt={4} htmlFor='event-description'>
				Description
			</FormLabel>
			<Textarea
				id='event-description'
				placeholder='Write your event details here...'
				value={eventDescription}
				onChange={e => setEventDescription(e.target.value)}
				resize='none'
			/>
		</Box>
	)
}

export default EventDetails
