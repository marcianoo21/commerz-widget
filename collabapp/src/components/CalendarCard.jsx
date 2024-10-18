import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, Box, Heading, Text, Button, useDisclosure } from '@chakra-ui/react'
import { FaMoneyCheckAlt } from 'react-icons/fa'
import CalendarModal from '../components/MainCalendar'

function CalendarCard() {
	const { isOpen, onOpen, onClose } = useDisclosure() // Modal state handling

	return (
		<>
			{/* Your Card Component */}
			<Card
				className='animated-card'
				backgroundColor='#F0FFF0'
				boxShadow='md'
				height='280px'
				cursor='pointer' // Add pointer cursor to indicate it's clickable
				onClick={onOpen} // Handle click to open calendar modal
			>
				<CardHeader textAlign='center'>
					<Box display='flex' alignItems='center' justifyContent='center'>
						<FaMoneyCheckAlt style={{ marginRight: '8px' }} />
						<Heading size='md'>Calendar</Heading>
					</Box>
				</CardHeader>
				<CardBody overflowY='auto'>
					<Text ml={4} mb={2}>
						Account Balance: <strong>10,000 PLN</strong>
					</Text>
					<Text ml={4} mt={2} lineHeight='1.8'>
						Available Funds: <strong>5,000 PLN</strong>
					</Text>
				</CardBody>
				<CardFooter display='flex' justifyContent='center'>
					<Button onClick={onOpen}>Detailed View</Button>
				</CardFooter>
			</Card>

			{/* Calendar Modal Component */}
			<CalendarModal isOpen={isOpen} onClose={onClose} />
		</>
	)
}

export default CalendarCard
