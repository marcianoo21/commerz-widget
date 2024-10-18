import { CalendarIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import {
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	ModalCloseButton,
	useDisclosure,
	Box,
} from '@chakra-ui/react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import '../styles/Calendar.css' // Import your CSS styles
import Event from './Event' // Import Event component

function CalendarModal() {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [date, setDate] = useState(new Date())
	const { isOpen: isEventOpen, onOpen: onEventOpen, onClose: onEventClose } = useDisclosure()
	const [selectedDate, setSelectedDate] = useState(null)

	const handleDateClick = value => {
		setSelectedDate(value)
		onEventOpen()
	}

	return (
		<>
			<Button leftIcon={<CalendarIcon />} colorScheme='red' variant='solid' onClick={onOpen}>
				Open Calendar
			</Button>

			{/* Main Calendar Modal */}
			<Modal isOpen={isOpen} onClose={onClose} size='6xl'>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Calendar</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Box
							border='2px solid #e2e8f0'
							borderRadius='10px'
							p='4'
							bg='gray.50'
							width='100%'
							height='100%' // Set the height to ensure ample space
						>
							{/* Calendar with custom styling */}
							<Calendar
								onChange={setDate}
								value={date}
								onClickDay={handleDateClick}
								className='react-calendar' // Apply your custom styles
								style={{ width: '100%', height: '100%' }} // Ensure calendar takes full size of the Box
							/>
						</Box>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme='blue' mr={3} onClick={onClose}>
							Close
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>

			{/* Event Modal triggered on date click */}
			{selectedDate && <Event selectedDate={selectedDate} isOpen={isEventOpen} onClose={onEventClose} />}
		</>
	)
}

export default CalendarModal
