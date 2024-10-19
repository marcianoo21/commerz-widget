import { useState } from 'react'
import {
	Button,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	Box,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	ModalContent,
	ModalCloseButton,
	useDisclosure,
	useToast,
} from '@chakra-ui/react'
import EventDetails from './EventDetails' // Assuming you already have the EventDetails component
import sendEmail from '../services/mailsAutomate' // Import the sendEmail function

function Event({ selectedDate, events, addEvent, deleteEvent, editEvent }) {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [eventDescription, setEventDescription] = useState('')
	const [eventTitle, setEventTitle] = useState('')
	const [eventHour, setEventHour] = useState('')
	const [userEmail, setUserEmail] = useState('')
	const [isEditing, setIsEditing] = useState(false)
	const [currentEventId, setCurrentEventId] = useState(null)
	const toast = useToast() // Initialize useToast hook

	// Specific dates for bank events
	const bankEventDates = ['2024-10-13', '2024-10-27', '2024-10-16']

	// Handle adding or editing the event
	const handleSaveEvent = () => {
		if (!eventDescription || !eventHour || !userEmail || !eventTitle) {
			toast({
				title: 'Warning',
				description: 'Please fill in all fields.',
				status: 'warning',
				duration: 3000,
				isClosable: true,
			})
			return
		}

		const eventDetails = { description: eventDescription, hour: eventHour, title: eventTitle }

		if (isEditing) {
			// Fetch the current event and check if it's a bank event
			const currentEvent = events.find(event => event.id === currentEventId)
			if (currentEvent && currentEvent.isBankEvent) {
				toast({
					title: 'Error',
					description: 'Bank events cannot be edited.',
					status: 'error',
					duration: 3000,
					isClosable: true,
				})
				return
			}

			editEvent(currentEventId, eventDetails)
			toast({
				title: 'Success',
				description: 'Event edited successfully.',
				status: 'success',
				duration: 3000,
				isClosable: true,
			})
		} else {
			addEvent(eventDetails)
			toast({
				title: 'Success',
				description: 'Event added successfully.',
				status: 'success',
				duration: 3000,
				isClosable: true,
			})

			// Call sendEmail function after adding the event
			sendEmail(userEmail, eventHour, eventDescription, eventTitle)
			console.log(
				'User email:',
				userEmail,
				'Selected hour:',
				eventHour,
				'Description:',
				eventDescription,
				'Title:',
				eventTitle
			)
		}

		// Clear inputs
		setEventDescription('')
		setEventHour('')
		setUserEmail('')
		setEventTitle('')
		setIsEditing(false)
		setCurrentEventId(null)
		onClose()
	}

	// Handle opening the edit modal
	const handleEditEvent = event => {
		// Check if the event is a bank event
		if (event.isBankEvent) {
			toast({
				title: 'Error',
				description: 'Bank events cannot be edited.',
				status: 'error',
				duration: 3000,
				isClosable: true,
			})
			return
		}

		setEventDescription(event.description)
		setEventHour(event.hour)
		setEventTitle(event.title) // Set the title
		setCurrentEventId(event.id)
		setIsEditing(true)
		onOpen()
	}

	return (
		<Box>
			{events.length > 0 ? (
				<Table variant='simple'>
					<Thead>
						<Tr>
							<Th>Hour</Th>
							<Th>Description</Th>
							<Th>Title</Th>
							<Th>Action</Th>
						</Tr>
					</Thead>
					<Tbody>
						{events.map(event => (
							<Tr key={event.id}>
								<Td>{event.hour}</Td>
								<Td>{event.description}</Td>
								<Td>{event.title}</Td>
								<Td>
									<Button
										colorScheme='blue'
										size='sm'
										onClick={() => handleEditEvent(event)}
										disabled={event.isBankEvent}>
										Edit
									</Button>
									<Button
										colorScheme='red'
										size='sm'
										ml={2}
										onClick={() => deleteEvent(event.id)}
										disabled={event.isBankEvent} // Disable delete button for bank events
									>
										Delete
									</Button>
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			) : (
				<p>No events added for this day.</p>
			)}

			{/* Button to add a new event */}
			<Button
				backgroundColor='#0a3046'
				color='#ffd700'
				mt={4}
				onClick={() => {
					setIsEditing(false)
					onOpen()
				}}>
				Add Event
			</Button>

			{/* Modal for adding or editing an event */}
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{isEditing ? 'Edit Event' : 'Add New Event'}</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<EventDetails
							selectedDate={selectedDate}
							eventDescription={eventDescription}
							setEventDescription={setEventDescription}
							setEventHour={setEventHour} // Pass setEventHour for handling hour input
							userEmail={userEmail} // Pass userEmail
							setUserEmail={setUserEmail} // Pass setUserEmail
							eventTitle={eventTitle} // Pass eventTitle
							setEventTitle={setEventTitle} // Pass setEventTitle
						/>
					</ModalBody>
					<ModalFooter>
						<Button backgroundColor='#0a3046' color='#ffd700' mr={3} onClick={handleSaveEvent}>
							{isEditing ? 'Save Changes' : 'Add Event'}
						</Button>
						<Button variant='ghost' onClick={onClose}>
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Box>
	)
}

export default Event
