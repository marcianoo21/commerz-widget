import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Text, Heading, Button, Box } from '@chakra-ui/react';
import { FaChartBar, FaUsers, FaCalendarAlt } from 'react-icons/fa'; // Import ikon z Font Awesome
import '../styles/UpperTab.css'; // Upewnij się, że importujesz odpowiedni plik CSS

const MultipleCards = () => {
    return (
        <div className="multiple-cards">
            <Card>
                <CardHeader textAlign="center">
                    <Box display="flex" alignItems="center" justifyContent="center">
                        <FaChartBar style={{ marginRight: '8px' }} />
                        <Heading size='md'>Customer dashboard</Heading>
                    </Box>
                </CardHeader>
                <CardBody>
                    <Text>View a summary of all your customers over the last month.</Text>
                </CardBody>
                <CardFooter>
                    <Button>View here</Button>
                </CardFooter>
            </Card>
            <Card>
                <CardHeader textAlign="center">
                    <Box display="flex" alignItems="center" justifyContent="center">
                        <FaUsers style={{ marginRight: '8px' }} />
                        <Heading size='md'>Customer dashboard</Heading>
                    </Box>
                </CardHeader>
                <CardBody>
                    <Text>View a summary of all your customers over the last month.</Text>
                </CardBody>
                <CardFooter>
                    <Button>View here</Button>
                </CardFooter>
            </Card>
            <Card>
                <CardHeader textAlign="center">
                    <Box display="flex" alignItems="center" justifyContent="center">
                        <FaCalendarAlt style={{ marginRight: '8px' }} />
                        <Heading size='md'>Customer dashboard</Heading>
                    </Box>
                </CardHeader>
                <CardBody>
                    <Text>View a summary of all your customers over the last month.</Text>
                </CardBody>
                <CardFooter>
                    <Button>View here</Button>
                </CardFooter>
            </Card>
        </div>
    );
}

export default MultipleCards;