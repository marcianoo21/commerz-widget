import React from 'react'
import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Text,
	Heading,
	Button,
	Box,
	SimpleGrid,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
} from '@chakra-ui/react'
import { FaChartBar, FaUsers, FaCalendarAlt, FaMoneyCheckAlt, FaEnvelope, FaHistory } from 'react-icons/fa' // Import ikon z Font Awesome
import '../styles/UpperTab.css' // Upewnij się, że importujesz odpowiedni plik CSS
import { CalendarIcon } from '@chakra-ui/icons'
import CalendarModal from './MainCalendar'

const MultipleCards = () => {
	return (
		<SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={4} padding={4}>
			<Card className='animated-card' backgroundColor='#F0FFF0' boxShadow='md' height='520px'>
				<CardHeader textAlign='center'>
					<Box display='flex' alignItems='center' justifyContent='center'>
						<CalendarIcon style={{ marginRight: '8px' }} />
						<Heading size='md'>Calendar</Heading>
					</Box>
				</CardHeader>
				<CardBody overflowY='auto'>
					<Box display='flex' alignItems='center' justifyContent='center'>
						<CalendarModal />
					</Box>
				</CardBody>
				<CardFooter display='flex' justifyContent='center'>
					<Button>Detailed View</Button>
				</CardFooter>
			</Card>
			<Card className='animated-card' backgroundColor='#F0FFF0' boxShadow='md' height='520px'>
				<CardHeader textAlign='center'>
					<Box display='flex' alignItems='center' justifyContent='center'>
						<FaMoneyCheckAlt style={{ marginRight: '8px' }} />
						<Heading size='md'>Account Balance</Heading>
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
					<Button>Detailed View</Button>
				</CardFooter>
			</Card>
			<Card className='animated-card' backgroundColor='#F0FFF0' boxShadow='md' height='520px'>
				<CardHeader textAlign='center'>
					<Box display='flex' alignItems='center' justifyContent='center'>
						<FaEnvelope style={{ marginRight: '8px' }} />
						<Heading size='md'>Messages</Heading>
					</Box>
				</CardHeader>
				<CardBody overflowY='auto'>
					<Text ml={4} mb={2}>
						Total Messages: <strong>50</strong>
					</Text>
					<Text ml={4} mt={2} lineHeight='1.8'>
						Unread: <strong>5</strong>
					</Text>
					<Box mt={4} p={2} border='1px solid #ccc' borderRadius='md' backgroundColor='#fff'>
						<Heading size='sm'>Sample Message</Heading>
					</Box>
				</CardBody>
				<CardFooter display='flex' justifyContent='center'>
					<Button>View Messages</Button>
				</CardFooter>
			</Card>
			<Card className='animated-card' backgroundColor='#F0FFF0' boxShadow='md' height='520px'>
				<CardHeader textAlign='center'>
					<Box display='flex' alignItems='center' justifyContent='center'>
						<FaHistory style={{ marginRight: '8px' }} />
						<Heading size='md'>Payment History</Heading>
					</Box>
				</CardHeader>
				<CardBody overflowY='auto'>
					<Table variant='simple'>
						<Thead>
							<Tr>
								<Th>Date</Th>
								<Th>Amount</Th>
								<Th>Description</Th>
							</Tr>
						</Thead>
						<Tbody>
							<Tr>
								<Td>2023-01-01</Td>
								<Td color='red'>-100 PLN</Td>
								<Td>Payment for services</Td>
							</Tr>
							<Tr>
								<Td>2023-01-02</Td>
								<Td color='red'>-200 PLN</Td>
								<Td>Payment for goods</Td>
							</Tr>
							<Tr>
								<Td>2023-01-03</Td>
								<Td color='green'>+150 PLN</Td>
								<Td>Refund</Td>
							</Tr>
						</Tbody>
					</Table>
				</CardBody>
				<CardFooter display='flex' justifyContent='center'>
					<Button>View Full History</Button>
				</CardFooter>
			</Card>
			<Card className='animated-card' backgroundColor='#F0FFF0' boxShadow='md' height='520px'>
				<CardHeader textAlign='center'>
					<Box display='flex' alignItems='center' justifyContent='center'>
						<FaCalendarAlt style={{ marginRight: '8px' }} />
						<Heading size='md'>Customer Dashboard</Heading>
					</Box>
				</CardHeader>
				<CardBody overflowY='auto'>
					<Text>View a summary of all your customers over the last month.</Text>
				</CardBody>
				<CardFooter display='flex' justifyContent='center'>
					<Button>View Here</Button>
				</CardFooter>
			</Card>
		</SimpleGrid>
	)
}

export default MultipleCards
