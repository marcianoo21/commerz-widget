import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Button } from '@chakra-ui/react'
import { EmailIcon } from '@chakra-ui/icons';


const MailsAutomate = () => {
  const [emailSent, setEmailSent] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    const templateParams = {
      to_name: "Code'n Pray",
      user_email: 'mgrzelak218@gmail.com',
      message: 'This is a programmatically generated message without form inputs.',
      event: 'appointment',
      event_date: '21.10.2024',
    };

    emailjs
      .send(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID, templateParams, process.env.REACT_APP_PUBLIC_KEY)
      .then(
        (response) => {
          console.log('SUCCESS!', response.status, response.text);
          setEmailSent(true); 
        },
        (error) => {
          console.log('FAILED...', error.text);
        }
      );
  };

  return (
    <div>
      <Button  onClick={sendEmail} leftIcon={<EmailIcon />} colorScheme='teal' variant='outline'>
         Email
        </Button>
      {emailSent && <p>Email has been sent successfully!</p>}
    </div>
  );
};

export default MailsAutomate;