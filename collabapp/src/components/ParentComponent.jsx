import React, { useState } from 'react';
import { Box, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@chakra-ui/react';
import EventDetails from './EventDetails';
import MailsAutomate from '../services/mailsAutomate';

const ParentComponent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [eventDescription, setEventDescription] = useState('');
  const [eventHour, setEventHour] = useState('');
  const [userEmail, setUserEmail] = useState('person@gmail.com');

  return (
    <Box>
      <Button onClick={onOpen}>Open Event Details</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Event Details</ModalHeader>
          <ModalBody>
            <EventDetails
              selectedDate={selectedDate}
              eventDescription={eventDescription}
              setEventDescription={setEventDescription}
              setEventHour={setEventHour}
              userEmail={userEmail}
              setUserEmail={setUserEmail}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <MailsAutomate userEmail={userEmail} />
    </Box>
  );
};

export default ParentComponent;