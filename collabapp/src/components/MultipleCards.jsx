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
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts'

const dataPie = [
    { name: 'Available Funds', value: 5000 },
    { name: 'Used Funds', value: 5000 },
]

const dataLine = [
    { date: '2024-10-15', amount: -20 },
    { date: '2024-10-16', amount: -100 },
    { date: '2024-10-17', amount: 30 },
]

const dataCustomerPie = [
    { name: 'New Customers', value: 600 },
    { name: 'Returning Customers', value: 300 },
]

const COLORS = ['#0088FE', '#FF8042']

const MultipleCards = () => {
    return (
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={4} padding={4}>
            <Card className='animated-card' backgroundColor='#F0FFF0' boxShadow='md' height='460px'>
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
            </Card>
            <Card className='animated-card' backgroundColor='#F0FFF0' boxShadow='md' height='460px'>
                <CardHeader textAlign='center'>
                    <Box display='flex' alignItems='center' justifyContent='center'>
                        <FaMoneyCheckAlt style={{ marginRight: '8px' }} />
                        <Heading size='md'>Account Balance</Heading>
                    </Box>
                </CardHeader>
                <CardBody overflowY='auto'>
                    <Box display='flex' alignItems='center' justifyContent='center'>
                        <PieChart width={200} height={200}>
                            <Pie
                                data={dataPie}
                                cx={100}
                                cy={100}
                                innerRadius={40}
                                outerRadius={80}
                                fill='#8884d8'
                                paddingAngle={5}
                                dataKey='value'>
                                {dataPie.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </Box>
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
            <Card className='animated-card' backgroundColor='#F0FFF0' boxShadow='md' height='460px'>
                <CardHeader textAlign='center'>
                    <Box display='flex' alignItems='center' justifyContent='center'>
                        <FaEnvelope style={{ marginRight: '8px' }} />
                        <Heading size='md'>Messages</Heading>
                    </Box>
                </CardHeader>
                <CardBody overflowY='auto'>
                    <Text ml={4} mb={2}>
                        <FaEnvelope style={{ marginRight: '8px' }} />
                        Total Messages: <strong>50</strong>
                    </Text>
                    <Text ml={4} mt={2} lineHeight='1.8'>
                        <FaEnvelope style={{ marginRight: '8px' }} />
                        Unread: <strong>5</strong>
                    </Text>
                    <Box mt={4} p={2} border='1px solid #ccc' borderRadius='md' backgroundColor='#fff'>
                        <Heading size='sm'>Sample Message</Heading>
                        <Text mt={2}>This is a preview of a sample message.</Text>
                    </Box>
                </CardBody>
                <CardFooter display='flex' justifyContent='center'>
                    <Button>View Messages</Button>
                </CardFooter>
            </Card>
            <Card className='animated-card' backgroundColor='#F0FFF0' boxShadow='md' height='460px'>
                <CardHeader textAlign='center'>
                    <Box display='flex' alignItems='center' justifyContent='center'>
                        <FaHistory style={{ marginRight: '8px' }} />
                        <Heading size='md'>Payment History</Heading>
                    </Box>
                </CardHeader>
                <CardBody overflowY='auto'>
                    <Box display='flex' alignItems='center' justifyContent='center'>
                        <LineChart width={300} height={200} data={dataLine}>
                            <XAxis dataKey='date' />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type='monotone' dataKey='amount' stroke='#8884d8' />
                        </LineChart>
                    </Box>
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
                                <Td>2024-10-15</Td>
                                <Td color='red'>-$20</Td>
                                <Td>Coffee with Friends</Td>
                            </Tr>
                            <Tr>
                                <Td>2024-10-16</Td>
                                <Td color='red'>-$100</Td>
                                <Td>Electronics Purchase</Td>
                            </Tr>
                            <Tr>
                                <Td>2024-10-17</Td>
                                <Td color='green'>+$30</Td>
                                <Td>Restaurant Bill</Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </CardBody>
                <CardFooter display='flex' justifyContent='center'>
                    <Button>View Full History</Button>
                </CardFooter>
            </Card>
            <Card className='animated-card' backgroundColor='#F0FFF0' boxShadow='md' height='460px'>
                <CardHeader textAlign='center'>
                    <Box display='flex' alignItems='center' justifyContent='center'>
                        <FaCalendarAlt style={{ marginRight: '8px' }} />
                        <Heading size='md'>Customer Dashboard</Heading>
                    </Box>
                </CardHeader>
                <CardBody overflowY='auto'>
                    <Box display='flex' alignItems='center' justifyContent='center'>
                        <PieChart width={200} height={200}>
                            <Pie
                                data={dataCustomerPie}
                                cx={100}
                                cy={100}
                                innerRadius={40}
                                outerRadius={80}
                                fill='#8884d8'
                                paddingAngle={5}
                                dataKey='value'>
                                {dataCustomerPie.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </Box>
                    <Box overflowX='auto' width='100%'>
                        <Table variant='simple' mt={4} size='sm'>
                            <Thead>
                                <Tr>
                                    <Th>Name</Th>
                                    <Th>Email</Th>
                                    <Th>Status</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr>
                                    <Td>John Doe</Td>
                                    <Td>john.doe@example.com</Td>
                                    <Td>New</Td>
                                </Tr>
                                <Tr>
                                    <Td>Jane Smith</Td>
                                    <Td>jane.smith@example.com</Td>
                                    <Td>Returning</Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </Box>
                </CardBody>
                <CardFooter display='flex' justifyContent='center'>
                    <Button>View Here</Button>
                </CardFooter>
            </Card>
        </SimpleGrid>
    )
}

export default MultipleCards