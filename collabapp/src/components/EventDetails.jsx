import React from 'react';
import { Textarea, FormLabel, Input, Box } from '@chakra-ui/react';

const EventDetails = ({ selectedDate, eventDescription, setEventDescription, setEventHour, userEmail, setUserEmail, eventTitle, setEventTitle }) => {
  return (
    <Box>
	 {/* Event title */}
	 <FormLabel mt={4} htmlFor='event-title'>
        Title
      </FormLabel>
      <Input
        id='event-title'
        placeholder='Enter event title'
        value={eventTitle} // Controlled input
        onChange={e => setEventTitle(e.target.value)} // Handle change
      />
	  
      {/* Show the selected date */}
      <FormLabel>Date</FormLabel>
      <Input value={selectedDate?.toDateString()} isReadOnly />

      {/* Hour picker */}
      <FormLabel mt={4}>Select Hour</FormLabel>
      <Input type='time' onChange={e => setEventHour(e.target.value)} />

      {/* Event description */}
      <FormLabel mt={4} htmlFor='event-description'>
        Description
      </FormLabel>
      <Textarea
        id='event-description'
        placeholder='Write your event details here...'
        value={eventDescription}
        onChange={e => setEventDescription(e.target.value)}
        resize='none'
      />

      {/* User email */}
      <FormLabel mt={4} htmlFor='user-email'>
        Email
      </FormLabel>
      <Input
        id='user-email'
        type='email'
        placeholder='Enter your email'
        value={userEmail}
        onChange={e => setUserEmail(e.target.value)} // Handle email change
      />
    </Box>
  );
};

export default EventDetails;
