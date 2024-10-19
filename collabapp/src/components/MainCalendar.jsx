import { CalendarIcon, InfoOutlineIcon, ArrowForwardIcon, ArrowBackIcon } from '@chakra-ui/icons'
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
	Text,
} from '@chakra-ui/react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import '../styles/Calendar.css'
import Event from './Event' // Import Event component
import Payments from './Payments' // Import Payments component
import TransactionList from './TransactionList' // Import TransactionList component for transactions
import { SiCommerzbank } from 'react-icons/si'
import IconLegend from './IconLegend'

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
		// Ustawienie daty bez różnicy stref czasowych
		const selected = new Date(value.getTime() - value.getTimezoneOffset() * 60000)
		setSelectedDate(selected)
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
					amount: '+$30',
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

	const calculateMonthlyExpenses = () => {
		const currentMonth = date.getMonth()
		const currentYear = date.getFullYear()
		let totalExpenses = 0

		Object.values(transactions).forEach(transactionArray => {
			transactionArray.forEach(transaction => {
				const transactionDate = new Date(transaction.transactionDate)
				if (transactionDate.getMonth() === currentMonth && transactionDate.getFullYear() === currentYear) {
					totalExpenses += Math.abs(parseFloat(transaction.amount.replace(/[^0-9.-]+/g, ''))) // Sum only negative amounts
				}
			})
		})

		return totalExpenses.toFixed(2)
	}

	// Get icons for events and transactions
	const getTileContent = ({ date }) => {
		const dateString = date.toISOString().split('T')[0]
		console.log('DATE:', dateString)
		const hasEvents = events[dateString] && events[dateString].length > 0
		const hasTransactions = transactions[dateString] && transactions[dateString].length > 0
		const hasPayments = payments[dateString] && payments[dateString].length > 0
		const specificIconDates = ['2024-10-13', '2024-10-27', '2024-10-16']

		if (specificIconDates.includes(dateString)) {
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
					<SiCommerzbank
						style={{
							position: 'absolute',
							width: '18px',
							height: '18px',
							top: '84%',
							left: '25%',
							color: 'yellow.400',
						}}
					/>
					{hasTransactions && <ArrowBackIcon position='absolute' boxSize={5} top='80%' left='65%' color='red.400' />}
					{hasEvents && <CalendarIcon position='absolute' boxSize={5} top='80%' left='85%' color='green.400' />}
					{hasPayments && <ArrowForwardIcon position='absolute' boxSize={5} top='80%' left='45%' color='yellow.400' />}
				</Box>
			)
		}

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
				{hasTransactions && <ArrowBackIcon position='absolute' boxSize={5} top='80%' left='65%' color='red.400' />}
				{hasEvents && <CalendarIcon position='absolute' boxSize={5} top='80%' left='85%' color='green.400' />}
				{hasPayments && <ArrowForwardIcon position='absolute' boxSize={5} top='80%' left='45%' color='yellow.400' />}
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
						<IconLegend />
						<Text
							fontSize='lg'
							fontWeight='bold'
							mt={4}
							color='#0a3046'
							textDecoration='underline'
							textDecorationColor='#ffd700' // Yellow underline
							textDecorationThickness='2px' // Optional: change the thickness of the underline
						>
							Monthly Expense Summary: ${calculateMonthlyExpenses()}
						</Text>
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
							{/* Tabs with smooth underline effect */}
							<Tabs variant='unstyled'>
								<TabList>
									<Tab
										_focus={{ outline: 'none' }}
										sx={{
											position: 'relative',
											padding: '10px',
											fontWeight: 'bold',
											_after: {
												content: "''",
												position: 'absolute',
												width: '100%',
												height: '2px',
												bottom: '0',
												left: '0',
												backgroundColor: '#0a3046',
												transform: 'scaleX(0)',
												transformOrigin: 'right',
												transition: 'transform 0.3s ease-in-out',
											},
											_selected: {
												color: '#ffd700',
												_after: {
													transform: 'scaleX(1)',
													transformOrigin: 'left',
												},
											},
										}}>
										Events
									</Tab>
									<Tab
										_focus={{ outline: 'none' }}
										sx={{
											position: 'relative',
											padding: '10px',
											fontWeight: 'bold',
											_after: {
												content: "''",
												position: 'absolute',
												width: '100%',
												height: '2px',
												bottom: '0',
												left: '0',
												backgroundColor: '#0a3046',
												transform: 'scaleX(0)',
												transformOrigin: 'right',
												transition: 'transform 0.3s ease-in-out',
											},
											_selected: {
												color: '#ffd700',
												_after: {
													transform: 'scaleX(1)',
													transformOrigin: 'left',
												},
											},
										}}>
										Payments
									</Tab>
									<Tab
										_focus={{ outline: 'none' }}
										sx={{
											position: 'relative',
											padding: '10px',
											fontWeight: 'bold',
											_after: {
												content: "''",
												position: 'absolute',
												width: '100%',
												height: '2px',
												bottom: '0',
												left: '0',
												backgroundColor: '#0a3046',
												transform: 'scaleX(0)',
												transformOrigin: 'right',
												transition: 'transform 0.3s ease-in-out',
											},
											_selected: {
												color: '#ffd700',
												_after: {
													transform: 'scaleX(1)',
													transformOrigin: 'left',
												},
											},
										}}>
										Transactions
									</Tab>
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
							<Button backgroundColor='#0a3046' color='#ffd700' mr={3} onClick={onEventClose}>
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
