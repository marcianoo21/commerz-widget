import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Text,
	Box,
	Flex,
	FormLabel,
	Textarea,
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { useState } from 'react'

function Event({ selectedDate, isOpen, onClose }) {
	const [eventDescription, setEventDescription] = useState('')

	const handleAddEvent = () => {
		// Here you would typically handle the event saving logic
		console.log(`Event on ${selectedDate.toDateString()}: ${eventDescription}`)
		onClose() // Close the modal after adding the event
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose} size='sm' isCentered>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Event Details for {selectedDate.toDateString()}</ModalHeader>
				<ModalBody>
					<Box>
						<FormLabel htmlFor='event-description'>Event Description</FormLabel>
						<Textarea
							id='event-description'
							placeholder='Write your event details here...'
							value={eventDescription}
							onChange={e => setEventDescription(e.target.value)}
							resize='none'
							height='150px' // Adjust height as necessary
						/>
						<Flex justifyContent='flex-end' mt={4}>
							<Button leftIcon={<AddIcon />} colorScheme='green' onClick={handleAddEvent}>
								Add Event
							</Button>
						</Flex>
					</Box>
				</ModalBody>

				<ModalFooter>
					<Button colorScheme='blue' onClick={onClose}>
						Close
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}

export default Event
