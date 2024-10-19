import { CalendarIcon, WarningIcon, ChatIcon, BellIcon, InfoOutlineIcon } from '@chakra-ui/icons'
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
import '../styles/Calendar.css' // Import your CSS styles
import Event from './Event' // Import Event component
import TransactionList from './TransactionList' // Import TransactionList component for transactions

function CalendarModal() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [date, setDate] = useState(new Date())
    const { isOpen: isEventOpen, onOpen: onEventOpen, onClose: onEventClose } = useDisclosure()
    const [selectedDate, setSelectedDate] = useState(null)
    const [events, setEvents] = useState({}) // State to hold events
    const [transactions, setTransactions] = useState({}) // State to hold transactions

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
                    linkedAccountNumber: '1234567890'
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
                    linkedAccountNumber: '1234567890'
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
                    linkedAccountNumber: '1234567890'
                }
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
                    linkedAccountNumber: '1234567890'
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
                    linkedAccountNumber: '1234567890'
                },
            ],
        }

        // Set the dummy transactions into state
        setTransactions(dummyTransactions)
    }, [])

    // Add event function
    const addEvent = eventDetails => {
        // Ensure dateKey is in YYYY-MM-DD format (ISO format)
        const dateKey = selectedDate.toISOString().split('T')[0]
        const newEvent = { id: Date.now(), ...eventDetails } // Include hour and description

        // Update the events state
        setEvents(prevEvents => ({
            ...prevEvents,
            [dateKey]: [...(prevEvents[dateKey] || []), newEvent],
        }))
    }

    // Edit event function
    const editEvent = (eventId, updatedEvent) => {
        const dateKey = selectedDate.toISOString().split('T')[0] // Ensure dateKey is consistent
        setEvents(prevEvents => ({
            ...prevEvents,
            [dateKey]: prevEvents[dateKey].map(event =>
                event.id === eventId ? { ...event, ...updatedEvent } : event
            ),
        }))
    }

    // Delete event function
    const deleteEvent = eventId => {
        const dateKey = selectedDate.toISOString().split('T')[0] // Ensure dateKey is consistent
        setEvents(prevEvents => ({
            ...prevEvents,
            [dateKey]: prevEvents[dateKey].filter(event => event.id !== eventId),
        }))
    }

    const getTileContent = ({ date }) => {
        const dateString = date.toISOString().split('T')[0] // Use UTC ISO string
        const hasEvents = events[dateString] && events[dateString].length > 0
        const hasTransactions = transactions[dateString] && transactions[dateString].length > 0

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
                    <CalendarIcon
                        position='absolute'
                        width='14px'
                        height='14px'
                        top='86%'
                        left='65%'
                        color="red.400"
                    />
                )}
                {hasEvents && (
                    <InfoOutlineIcon
                        position='absolute'
                        width='15px'
                        height='15px'
                        top='85%'
                        left='85%'
                        color='green.400'
                    />
                )}
            </Box>
        )
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
                        <Box border='2px solid #e2e8f0' borderRadius='10px' p='4' bg='gray.50' width='100%' height='100%'>
                            {/* Calendar with custom styling */}
                            <Calendar
                                onChange={setDate}
                                value={date}
                                onClickDay={handleDateClick}
                                className='react-calendar' // Your custom styles
                                tileContent={getTileContent}
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

            {/* Event/Transaction Modal triggered on date click */}
            {selectedDate && (
                <Modal isOpen={isEventOpen} onClose={onEventClose} size='6xl'>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>{selectedDate.toDateString()}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            {/* Tabs for Events and Transactions */}
                            <Tabs variant='enclosed'>
                                <TabList>
                                    <Tab>Events</Tab>
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
                                            editEvent={editEvent} // Dodaj funkcję edycji
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
                            <Button colorScheme='blue' mr={3} onClick={onEventClose}>
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