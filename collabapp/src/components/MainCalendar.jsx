import { CalendarIcon, InfoOutlineIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { useState, useEffect } from 'react'
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
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
} from '@chakra-ui/react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import '../styles/Calendar.css'
import Event from './Event' // Import Event component
import Payments from './Payments' // Import Payments component
import TransactionList from './TransactionList' // Import TransactionList component for transactions

function CalendarModal() {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [date, setDate] = useState(new Date())
	const { isOpen: isEventOpen, onOpen: onEventOpen, onClose: onEventClose } = useDisclosure()
	const [selectedDate, setSelectedDate] = useState(null)
	const [events, setEvents] = useState({}) // State to hold events
	const [transactions, setTransactions] = useState({}) // State to hold transactions
	const [payments, setPayments] = useState([]) // State for payments

	// Handle date click to open the event modal
	const handleDateClick = value => {
		setSelectedDate(value)
		onEventOpen()
	}

	// Add dummy transactions when the component mounts
	useEffect(() => {
		const dummyTransactions = {
			'2024-10-15': [
				{
					id: 1,
					amount: '-$50',
					description: 'Grocery Shopping',
					operationType: 'Debit',
					transactionType: 'Purchase',
					recipientName: 'Supermarket',
					transactionDate: '2024-10-15',
					settlementDate: '2024-10-16',
					linkedAccountNumber: '1234567890',
				},
				{
					id: 2,
					amount: '-$20',
					description: 'Coffee with Friends',
					operationType: 'Debit',
					transactionType: 'Purchase',
					recipientName: 'Coffee Shop',
					transactionDate: '2024-10-15',
					settlementDate: '2024-10-16',
					linkedAccountNumber: '1234567890',
				},
			],
			'2024-10-16': [
				{
					id: 3,
					amount: '-$100',
					description: 'Electronics Purchase',
					operationType: 'Debit',
					transactionType: 'Purchase',
					recipientName: 'Electronics Store',
					transactionDate: '2024-10-16',
					settlementDate: '2024-10-17',
					linkedAccountNumber: '1234567890',
				},
			],
			'2024-10-17': [
				{
					id: 4,
					amount: '-$150',
					description: 'Car Maintenance',
					operationType: 'Debit',
					transactionType: 'Service',
					recipientName: 'Car Service Center',
					transactionDate: '2024-10-17',
					settlementDate: '2024-10-18',
					linkedAccountNumber: '1234567890',
				},
				{
					id: 5,
					amount: '-$30',
					description: 'Restaurant Bill',
					operationType: 'Debit',
					transactionType: 'Purchase',
					recipientName: 'Restaurant',
					transactionDate: '2024-10-17',
					settlementDate: '2024-10-18',
					linkedAccountNumber: '1234567890',
				},
			],
		}

		// Set the dummy transactions into state
		setTransactions(dummyTransactions)
	}, [])

	// Add event function
	const addEvent = eventDetails => {
		const dateKey = selectedDate.toISOString().split('T')[0]
		const newEvent = { id: Date.now(), ...eventDetails }

		setEvents(prevEvents => ({
			...prevEvents,
			[dateKey]: [...(prevEvents[dateKey] || []), newEvent],
		}))
	}

	// Delete event function
	const deleteEvent = eventId => {
		const dateKey = selectedDate.toISOString().split('T')[0]
		setEvents(prevEvents => ({
			...prevEvents,
			[dateKey]: prevEvents[dateKey].filter(event => event.id !== eventId),
		}))
	}

	// Add payment function
	const addPayment = paymentDetails => {
		const dateKey = selectedDate.toISOString().split('T')[0]
		const newPayment = { id: Date.now(), ...paymentDetails }

		setPayments(prevPayments => ({
			...prevPayments,
			[dateKey]: [...(prevPayments[dateKey] || []), newPayment],
		}))
	}

	// Delete payment function
	const deletePayment = paymentId => {
		const dateKey = selectedDate.toISOString().split('T')[0]
		setPayments(prevPayments => ({
			...prevPayments,
			[dateKey]: prevPayments[dateKey].filter(payment => payment.id !== paymentId),
		}))
	}

	// Get icons for events and transactions
	const getTileContent = ({ date }) => {
		const dateString = date.toISOString().split('T')[0]
		const hasEvents = events[dateString] && events[dateString].length > 0
		const hasTransactions = transactions[dateString] && transactions[dateString].length > 0
		const hasPayments = payments[dateString] && payments[dateString].length > 0

		return (
			<Box
				position='relative'
				display='flex'
				flexDirection='column'
				alignItems='center'
				justifyContent='flex-start'
				width='100%'
				height='100%'
				p={2}
				margin='5px'
				borderRadius='8px'>
				{hasTransactions && (
					<CalendarIcon position='absolute' width='14px' height='14px' top='86%' left='65%' color='red.400' />
				)}
				{hasEvents && (
					<InfoOutlineIcon position='absolute' width='15px' height='15px' top='85%' left='85%' color='green.400' />
				)}
				{hasPayments && (
					<ArrowForwardIcon position='absolute' width='15px' height='15px' top='85%' left='45%' color='yellow.400' />
				)}
			</Box>
		)
	}

	return (
		<>
			<Button color='#0a3046' variant='solid' onClick={onOpen} size='2xl' overflow='hidden'>
				<Calendar className='react-calendar-small' />
			</Button>

			{/* Main Calendar Modal */}
			<Modal isOpen={isOpen} onClose={onClose} size='6xl'>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Calendar</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Box border='2px solid #e2e8f0' borderRadius='10px' p='4' bg='gray.50' width='100%' height='100%'>
							<Calendar
								onChange={setDate}
								value={date}
								onClickDay={handleDateClick}
								className='react-calendar'
								tileContent={getTileContent}
							/>
						</Box>
					</ModalBody>
					<ModalFooter>
						<Button backgroundColor='#0a3046' color='#ffd700' mr={3} onClick={onClose}>
							Close
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>

			{/* Event/Transaction Modal triggered on date click */}
			{selectedDate && (
				<Modal isOpen={isEventOpen} onClose={onEventClose} size='6xl'>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>{selectedDate.toDateString()}</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<Tabs variant='enclosed'>
								<TabList>
									<Tab>Events</Tab>
									<Tab>Payments</Tab>
									<Tab>Transactions</Tab>
								</TabList>
								<TabPanels>
									{/* Events Tab */}
									<TabPanel>
										<Event
											selectedDate={selectedDate}
											events={events[selectedDate.toISOString().split('T')[0]] || []}
											addEvent={addEvent}
											deleteEvent={deleteEvent}
										/>
									</TabPanel>

									{/* Payments Tab */}
									<TabPanel>
										<Payments
											selectedDate={selectedDate}
											payments={payments[selectedDate.toISOString().split('T')[0]] || []}
											addPayment={addPayment}
											deletePayment={deletePayment}
										/>
									</TabPanel>

									{/* Transactions Tab */}
									<TabPanel>
										<TransactionList
											selectedDate={selectedDate}
											transactions={transactions[selectedDate.toISOString().split('T')[0]] || []}
										/>
									</TabPanel>
								</TabPanels>
							</Tabs>
						</ModalBody>
						<ModalFooter>
							<Button colorScheme='teal' mr={3} onClick={onEventClose}>
								Close
							</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
			)}
		</>
	)
}

export default CalendarModal
