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

function Event({ selectedDate, events, addEvent, deleteEvent, editEvent }) {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [eventDescription, setEventDescription] = useState('')
	const [eventHour, setEventHour] = useState('')
	const [isEditing, setIsEditing] = useState(false)
	const [currentEventId, setCurrentEventId] = useState(null)
	const toast = useToast() // Initialize useToast hook

	// Handle adding or editing the event
	const handleSaveEvent = () => {
		if (!eventDescription || !eventHour) {
			toast({
				title: 'Warning',
				description: 'Please fill in all fields.',
				status: 'warning',
				duration: 3000,
				isClosable: true,
			})
		} else {
			if (isEditing) {
				editEvent(currentEventId, { description: eventDescription, hour: eventHour })
				toast({
					title: 'Success',
					description: 'Event edited successfully.',
					status: 'success',
					duration: 3000,
					isClosable: true,
				})
			} else {
				addEvent({ description: eventDescription, hour: eventHour })
				toast({
					title: 'Success',
					description: 'Event added successfully.',
					status: 'success',
					duration: 3000,
					isClosable: true,
				})
			}
			setEventDescription('') // Clear after adding or editing
			setEventHour('')
			setIsEditing(false)
			setCurrentEventId(null)
			onClose()
		}
	}

	// Handle opening the edit modal
	const handleEditEvent = event => {
		setEventDescription(event.description)
		setEventHour(event.hour)
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
							<Th>Action</Th>
						</Tr>
					</Thead>
					<Tbody>
						{events.map(event => (
							<Tr key={event.id}>
								<Td>{event.hour}</Td>
								<Td>{event.description}</Td>
								<Td>
									<Button colorScheme='blue' size='sm' onClick={() => handleEditEvent(event)}>
										Edit
									</Button>
									<Button colorScheme='red' size='sm' ml={2} onClick={() => deleteEvent(event.id)}>
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
				colorScheme='green'
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
						/>
					</ModalBody>
					<ModalFooter>
						<Button colorScheme='blue' mr={3} onClick={handleSaveEvent}>
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
