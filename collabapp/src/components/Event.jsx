import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Box,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	FormLabel,
	Input,
} from '@chakra-ui/react'
import { useState } from 'react'
import EventDetails from './EventDetails' // Import EventDetails component

function Event({ selectedDate, isOpen, onClose, addEvent, events }) {
	const [eventHour, setEventHour] = useState('') // State for event hour
	const [eventDescription, setEventDescription] = useState('')
	const [isAddingEvent, setIsAddingEvent] = useState(false) // State to handle adding an event

	const handleAddEvent = () => {
		// Create event details object with hour and description
		const eventDetails = {
			hour: eventHour,
			description: eventDescription,
		}
		addEvent(eventDetails) // Pass the event details to addEvent function
		setEventHour('') // Clear input fields
		setEventDescription('')
		setIsAddingEvent(false) // Close adding event form
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose} size='md' isCentered>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Events for {selectedDate.toLocaleDateString()}</ModalHeader>
				<ModalBody>
					<Box>
						{/* Display events in a table format or show a message if there are no events */}
						{events.length > 0 ? (
							<Table variant='simple'>
								<Thead>
									<Tr>
										<Th>Hour</Th>
										<Th>Description</Th>
									</Tr>
								</Thead>
								<Tbody>
									{events.map(event => (
										<Tr key={event.id}>
											<Td>{event.hour}</Td>
											<Td>{event.description}</Td>
										</Tr>
									))}
								</Tbody>
							</Table>
						) : (
							<Box textAlign='center' mb={4}>
								No events for this day
							</Box>
						)}

						{/* Button to add a new event */}
						<Button colorScheme='blue' onClick={() => setIsAddingEvent(true)}>
							+ Add Event
						</Button>

						{/* If adding an event, show the form */}
						{isAddingEvent && (
							<Box mt={4}>
								{/* Event description input */}
								<EventDetails
									selectedDate={selectedDate}
									eventDescription={eventDescription}
									setEventDescription={setEventDescription}
								/>

								<Button colorScheme='blue' onClick={handleAddEvent} mt={2}>
									Add Event
								</Button>
							</Box>
						)}
					</Box>
				</ModalBody>
				<ModalFooter>
					<Button variant='ghost' onClick={onClose}>
						Close
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}

export default Event
