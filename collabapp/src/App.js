import './styles/App.css'
import { ChakraProvider } from '@chakra-ui/react'
import CalendarModal from './components/MainCalendar.jsx'
import UpperTab from './components/UpperTab.jsx'
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
	return (
		<ChakraProvider>
			<UpperTab />
		</ChakraProvider>
	)
}

export default App
