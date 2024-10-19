// client/src/voiceAssistant.js
export const handleVoiceCommand = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
  
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      processCommand(transcript);
    };
  
    recognition.start();
  };
  
  const processCommand = (command) => {
    fetch('/api/dialogflow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ command }),
    })
    .then(response => response.json())
    .then(data => {
      handleIntent(data.intent, data.parameters);
    });
  };
  
  const handleIntent = (intent, parameters) => {
    switch (intent) {
      case 'CreateEvent':
        // Call function to create event using parameters
        console.log('Creating event with:', parameters);
        break;
      case 'LogExpense':
        // Call function to log expense using parameters
        console.log('Logging expense with:', parameters);
        break;
      default:
        console.log('Command not recognized');
    }
  };
  