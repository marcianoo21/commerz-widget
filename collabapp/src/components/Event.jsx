import { useState } from 'react';
import {
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import EventDetails from './EventDetails'; // Assuming you already have the EventDetails component

function Event({ selectedDate, events, addEvent, deleteEvent }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [eventDescription, setEventDescription] = useState('');
  const [eventHour, setEventHour] = useState('');
  const toast = useToast(); // Initialize useToast hook

  // Handle adding the new event
  const handleAddEvent = () => {
    if (!eventDescription || !eventHour) {
      toast({
        title: 'Warning',
        description: 'Please fill in all fields.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
    } else {
      addEvent({ description: eventDescription, hour: eventHour });
      setEventDescription(''); // Clear after adding
      setEventHour('');
      toast({
        title: 'Success',
        description: 'Event added successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onClose();
    }
  };

  return (
    <Box>
      {events.length > 0 ? (
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Hour</Th>
              <Th>Description</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {events.map(event => (
              <Tr key={event.id}>
                <Td>{event.hour}</Td>
                <Td>{event.description}</Td>
                <Td>
                  <Button colorScheme='red' size='sm' onClick={() => deleteEvent(event.id)}>
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <p>No events added for this day.</p>
      )}

      {/* Button to add a new event */}
      <Button colorScheme='green' mt={4} onClick={onOpen}>
        Add Event
      </Button>

      {/* Modal for adding a new event */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EventDetails
              selectedDate={selectedDate}
              eventDescription={eventDescription}
              setEventDescription={setEventDescription}
              setEventHour={setEventHour} // Pass setEventHour for handling hour input
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleAddEvent}>
              Add Event
            </Button>
            <Button variant='ghost' onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default Event;