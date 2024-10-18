import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Text, Heading, Button, Box, SimpleGrid } from '@chakra-ui/react';
import { FaChartBar, FaUsers, FaCalendarAlt, FaMoneyCheckAlt, FaEnvelope } from 'react-icons/fa'; // Import ikon z Font Awesome
import '../styles/UpperTab.css'; // Upewnij się, że importujesz odpowiedni plik CSS

const MultipleCards = () => {
    return (
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={4} padding={4}>
            <Card className="animated-card" backgroundColor="#F0FFF0" boxShadow="md" height="280px">
                <CardHeader textAlign="center">
                    <Box display="flex" alignItems="center" justifyContent="center">
                        <FaMoneyCheckAlt style={{ marginRight: '8px' }} />
                        <Heading size='md'>Account Balance</Heading>
                    </Box>
                </CardHeader>
                <CardBody overflowY="auto">
                    <Text ml={4} mb={2}>Account Balance: <strong>10,000 PLN</strong></Text>
                    <Text ml={4} mt={2} lineHeight="1.8">Available Funds: <strong>5,000 PLN</strong></Text>
                </CardBody>
                <CardFooter display="flex" justifyContent="center">
                    <Button>Detailed View</Button>
                </CardFooter>
            </Card>
            <Card className="animated-card" backgroundColor="#F0FFF0" boxShadow="md" height="280px">
                <CardHeader textAlign="center">
                    <Box display="flex" alignItems="center" justifyContent="center">
                        <FaEnvelope style={{ marginRight: '8px' }} />
                        <Heading size='md'>Messages</Heading>
                    </Box>
                </CardHeader>
                <CardBody overflowY="auto">
                    <Text ml={4} mb={2}>Total Messages: <strong>50</strong></Text>
                    <Text ml={4} mt={2} lineHeight="1.8">Unread: <strong>5</strong></Text>
                    <Box mt={4} p={2} border="1px solid #ccc" borderRadius="md" backgroundColor="#fff">
                        <Heading size='sm'>Sample Message</Heading>
                    </Box>
                </CardBody>
                <CardFooter display="flex" justifyContent="center">
                    <Button>View Messages</Button>
                </CardFooter>
            </Card>
            <Card className="animated-card" backgroundColor="#F0FFF0" boxShadow="md" height="280px">
                <CardHeader textAlign="center">
                    <Box display="flex" alignItems="center" justifyContent="center">
                        <FaCalendarAlt style={{ marginRight: '8px' }} />
                        <Heading size='md'>Customer Dashboard</Heading>
                    </Box>
                </CardHeader>
                <CardBody overflowY="auto">
                    <Text>View a summary of all your customers over the last month.</Text>
                </CardBody>
                <CardFooter display="flex" justifyContent="center">
                    <Button>View Here</Button>
                </CardFooter>
            </Card>
            <Card className="animated-card" backgroundColor="#F0FFF0" boxShadow="md" height="280px">
                <CardHeader textAlign="center">
                    <Box display="flex" alignItems="center" justifyContent="center">
                        <FaCalendarAlt style={{ marginRight: '8px' }} />
                        <Heading size='md'>Customer Dashboard</Heading>
                    </Box>
                </CardHeader>
                <CardBody overflowY="auto">
                    <Text>View a summary of all your customers over the last month.</Text>
                </CardBody>
                <CardFooter display="flex" justifyContent="center">
                    <Button>View Here</Button>
                </CardFooter>
            </Card>
        </SimpleGrid>
    );
}

export default MultipleCards;