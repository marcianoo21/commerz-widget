import { Box, Text, HStack, Icon } from '@chakra-ui/react'
import { CalendarIcon, InfoOutlineIcon, ArrowForwardIcon, ArrowBackIcon } from '@chakra-ui/icons'
import { SiCommerzbank } from 'react-icons/si' // Ensure you import your icon correctly

const IconLegend = () => {
	return (
		<Box mt={4} p={4} borderWidth={1} borderRadius='lg' bg='gray.50'>
			<Text fontWeight='bold' mb={2}>
				Legend
			</Text>
			<HStack spacing={4}>
				<HStack>
					<Icon as={SiCommerzbank} boxSize={6} color='yellow.400' />
					<Text>Bank event</Text>
				</HStack>
				<HStack>
					<ArrowBackIcon boxSize={6} color='red.400' />
					<Text>Transaction</Text>
				</HStack>
				<HStack>
					<CalendarIcon boxSize={6} color='green.400' />
					<Text>Event</Text>
				</HStack>
				<HStack>
					<ArrowForwardIcon boxSize={6} color='yellow.400' />
					<Text>Planned Payment</Text>
				</HStack>
			</HStack>
		</Box>
	)
}

export default IconLegend
