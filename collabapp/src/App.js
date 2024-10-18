import './styles/App.css'
import { ChakraProvider } from '@chakra-ui/react'
import CalendarModal from './components/MainCalendar.jsx'

function App() {
	return (
		<ChakraProvider>
			<CalendarModal />
		</ChakraProvider>
	)
}

export default App
