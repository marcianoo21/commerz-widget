import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@chakra-ui/react'
import { useState } from 'react'
import EventDetails from './EventDetails'

function Event({ selectedDate, isOpen, onClose }) {
	// State to track the event description
	const [eventDescription, setEventDescription] = useState('')

	const handleAddEvent = () => {
		// Handle the event saving logic
		console.log(`Event on ${selectedDate.toDateString()}: ${eventDescription}`)
		onClose() // Close the modal after adding the event
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose} size='sm' isCentered>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Add Event</ModalHeader> {/* Display the selected date */}
				<ModalBody>
					{/* Pass the selectedDate, event description, and setter functions to EventDetails */}
					<EventDetails
						selectedDate={selectedDate}
						eventDescription={eventDescription}
						setEventDescription={setEventDescription}
					/>
				</ModalBody>
				<ModalFooter>
					<Button colorScheme='blue' onClick={handleAddEvent}>
						Save
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
