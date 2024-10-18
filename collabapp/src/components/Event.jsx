import { useState } from 'react'
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	IconButton,
} from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons' // Import the delete icon
import EventDetails from './EventDetails'

function Event({ selectedDate, isOpen, onClose, addEvent, events, deleteEvent }) {
	// Pass deleteEvent function as a prop
	const [eventDescription, setEventDescription] = useState('')
	const [eventHour, setEventHour] = useState('') // State to track the selected hour

	const handleAddEvent = () => {
		// Pass the hour and description as part of the event details
		const eventDetails = {
			hour: eventHour,
			description: eventDescription,
		}
		addEvent(eventDetails) // Add the event via the parent callback
		setEventDescription('') // Reset the description
		setEventHour('') // Reset the hour
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose} size='md'>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Events on {selectedDate?.toDateString()}</ModalHeader>
				<ModalBody>
					{/* Display existing events for the selected date */}
					{events.length > 0 ? (
						<Table variant='simple'>
							<Thead>
								<Tr>
									<Th>Hour</Th>
									<Th>Description</Th>
									<Th>Actions</Th> {/* Add an 'Actions' column for delete button */}
								</Tr>
							</Thead>
							<Tbody>
								{events.map(event => (
									<Tr key={event.id}>
										<Td>{event.hour}</Td>
										<Td>{event.description}</Td>
										<Td>
											<IconButton
												aria-label='Delete event'
												icon={<DeleteIcon />}
												onClick={() => deleteEvent(event.id)} // Call delete function with event id
												colorScheme='red'
											/>
										</Td>
									</Tr>
								))}
							</Tbody>
						</Table>
					) : (
						<p>No events for this day.</p>
					)}

					{/* Event details form */}
					<EventDetails
						selectedDate={selectedDate}
						eventDescription={eventDescription}
						setEventDescription={setEventDescription}
						eventHour={eventHour} // Pass hour state to EventDetails
						setEventHour={setEventHour} // Pass hour setter to EventDetails
					/>
				</ModalBody>

				<ModalFooter>
					<Button colorScheme='blue' onClick={handleAddEvent}>
						Add Event
					</Button>
					<Button variant='ghost' onClick={onClose}>
						Close
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}

export default Event
