// EventDetails.jsx
import React, { useState } from 'react'
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	ModalCloseButton,
	Button,
	Textarea,
	FormLabel,
	useDisclosure,
} from '@chakra-ui/react'

const EventDetails = ({ isOpen, onClose, selectedDate }) => {
	const [eventDescription, setEventDescription] = useState('')

	const handleSave = () => {
		// Here you would save the event data (e.g., send to a backend or store in state)
		console.log(`Event on ${selectedDate.toDateString()}: ${eventDescription}`)
		onClose() // Close the modal after saving
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Add Event Details</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<FormLabel htmlFor='event-description'>Event Description</FormLabel>
					<Textarea
						id='event-description'
						placeholder='Write your event details here...'
						value={eventDescription}
						onChange={e => setEventDescription(e.target.value)}
						resize='none'
					/>
				</ModalBody>
				<ModalFooter>
					<Button colorScheme='blue' onClick={handleSave} mr={3}>
						Save
					</Button>
					<Button variant='ghost' onClick={onClose}>
						Cancel
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}

export default EventDetails
