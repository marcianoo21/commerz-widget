import './styles/App.css'
import Calendar from './components/Calendar.jsx'
import { ChakraProvider } from '@chakra-ui/react'

function App() {
	return (
		<ChakraProvider>
			<Calendar />
		</ChakraProvider>
	)
}

export default App
