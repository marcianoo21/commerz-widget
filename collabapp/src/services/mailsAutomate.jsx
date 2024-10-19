// import React, { useState } from 'react';
// import emailjs from '@emailjs/browser';
// import { Button } from '@chakra-ui/react';
// import { EmailIcon } from '@chakra-ui/icons';

// const MailsAutomate = ({ userEmail }) => {
//   const [emailSent, setEmailSent] = useState(false);
//   const [sendTime, setSendTime] = useState('');

//   const calculateDelay = (sendTime) => {
//     const [hours, minutes] = sendTime.split(':').map(Number);
//     const now = new Date();
//     const sendDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0, 0);
//     const delay = sendDate - now;
//     return delay > 0 ? delay : 0;
//   };

//   const sendEmail = (e) => {
//     e.preventDefault();

//     const templateParams = {
//       to_name: "Code'n Pray",
//       user_email: userEmail,
//       message: 'This is a programmatically generated message without form inputs.',
//       event: 'appointment',
//       event_date: '21.10.2024',
//     };

//     const delay = calculateDelay(sendTime);
//     setTimeout(() => {
//       emailjs
//         .send(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID, templateParams, process.env.REACT_APP_PUBLIC_KEY)
//         .then(
//           (response) => {
//             console.log('SUCCESS!', response.status, response.text);
//             setEmailSent(true);
//           },
//           (error) => {
//             console.log('FAILED...', error.text);
//           }
//         );
//     }, 0); //delay
//   };

//   return (
//     <div>
//       <Button onClick={sendEmail} leftIcon={<EmailIcon />} colorScheme='teal' variant='outline'>
//         Email
//       </Button>
//       {emailSent && <p>Email has been sent successfully!</p>}
//     </div>
//   );
// };

// export default MailsAutomate;


import emailjs from '@emailjs/browser';

const sendEmail = (userEmail, eventHour, eventDescription, eventTitle) => {
  const templateParams = {
    to_name: "Code'n Pray",
    user_email: userEmail,
    message: eventDescription, 
    event: eventTitle,
    event_hour: eventHour, // Pass the event hour
    event_date: new Date().toLocaleDateString(), // Optional: Add the event date if needed
  };

  emailjs
    .send(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID, templateParams, process.env.REACT_APP_PUBLIC_KEY)
    .then(
      (response) => {
        console.log('SUCCESS!', response.status, response.text);
      },
      (error) => {
        console.log('FAILED...', error.text);
      }
    );
};

export default sendEmail;
