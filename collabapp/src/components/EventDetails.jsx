import React from 'react'
import { Textarea, FormLabel, Input, Box } from '@chakra-ui/react'

const EventDetails = ({
	selectedDate,
	eventDescription,
	setEventDescription,
	setEventHour,
	userEmail,
	setUserEmail,
	eventTitle,
	setEventTitle,
}) => {
	return (
		<Box>
			{/* Event title */}
			<FormLabel mt={4} htmlFor='event-title'>
				Title
			</FormLabel>
			<Input
				id='event-title'
				placeholder='Enter event title'
				value={eventTitle}
				onChange={e => setEventTitle(e.target.value)}
			/>

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
				placeholder='Enter event description'
				value={eventDescription}
				onChange={e => setEventDescription(e.target.value)}
			/>

			{/* User Email */}
			<FormLabel mt={4} htmlFor='user-email'>
				Email
			</FormLabel>
			<Input
				id='user-email'
				placeholder='Enter your email for notifications'
				value={userEmail}
				onChange={e => setUserEmail(e.target.value)}
			/>
		</Box>
	)
}

export default EventDetails
