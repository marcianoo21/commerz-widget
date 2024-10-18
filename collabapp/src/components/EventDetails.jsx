import React from 'react'
import { Textarea, FormLabel, Input, Box } from '@chakra-ui/react'

const EventDetails = ({ selectedDate, eventDescription, setEventDescription }) => {
	return (
		<Box>
			{/* Show the selected date */}
			<FormLabel>Date</FormLabel>
			<Input value={selectedDate?.toDateString()} isReadOnly />

			{/* Hour picker (for example, you can use an Input or a proper TimePicker component if needed) */}
			<FormLabel mt={4}>Select Hour</FormLabel>
			<Input type='time' />

			{/* Event description */}
			<FormLabel mt={4} htmlFor='event-description'>
				Event Description
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
