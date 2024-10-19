import { useState, useEffect } from 'react'
import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	Box,
	Button,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	ModalContent,
	ModalCloseButton,
	useDisclosure,
	useToast,
	Input,
	Text,
} from '@chakra-ui/react'

const Payments = ({ payments, addPayment, deletePayment, editPayment }) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [paymentName, setPaymentName] = useState('')
	const [paymentSurname, setPaymentSurname] = useState('')
	const [paymentAccountNum, setPaymentAccountNum] = useState('')
	const [paymentAmount, setPaymentAmount] = useState('')
	const [paymentTime, setPaymentTime] = useState('') // New state for payment time
	const [isEditing, setIsEditing] = useState(false)
	const [currentPaymentId, setCurrentPaymentId] = useState(null)
	const toast = useToast()

	// NEW STATE FOR USER'S CURRENT BALANCE
	const [currentBalance, setCurrentBalance] = useState(1000) // Set an initial balance (e.g., 1000€)

	// Calculate total planned payments
	const totalPlannedPayments = payments.reduce((total, payment) => total + parseFloat(payment.amount || 0), 0)

	// Calculate the user's future balance after payments
	const futureBalance = currentBalance - totalPlannedPayments

	// NEW - Calculate future balance dynamically based on the payment being entered in the modal
	const futureBalanceWithNewPayment = currentBalance - totalPlannedPayments - parseFloat(paymentAmount || 0)

	// Handle adding or editing the payment
	const handleSavePayment = () => {
		if (!paymentName || !paymentSurname || !paymentAccountNum || !paymentAmount || !paymentTime) {
			// Validate all fields including time
			toast({
				title: 'Warning',
				description: 'Please fill in all fields, including time.',
				status: 'warning',
				duration: 3000,
				isClosable: true,
			})
		} else {
			if (isEditing) {
				editPayment(currentPaymentId, {
					name: paymentName,
					surname: paymentSurname,
					accountNum: paymentAccountNum,
					amount: paymentAmount,
					time: paymentTime, // Include time in edited payment
				})
				toast({
					title: 'Success',
					description: 'Payment edited successfully.',
					status: 'success',
					duration: 3000,
					isClosable: true,
				})
			} else {
				addPayment({
					name: paymentName,
					surname: paymentSurname,
					accountNum: paymentAccountNum,
					amount: paymentAmount,
					time: paymentTime, // Include time in new payment
				})
				toast({
					title: 'Success',
					description: 'Payment added successfully.',
					status: 'success',
					duration: 3000,
					isClosable: true,
				})
			}
			// Clear fields and close modal
			setPaymentName('')
			setPaymentSurname('')
			setPaymentAccountNum('')
			setPaymentAmount('')
			setPaymentTime('') // Clear time field
			setIsEditing(false)
			setCurrentPaymentId(null)
			onClose()
		}
	}

	// Handle opening the edit modal
	const handleEditPayment = payment => {
		setPaymentName(payment.name)
		setPaymentSurname(payment.surname)
		setPaymentAccountNum(payment.accountNum)
		setPaymentAmount(payment.amount)
		setPaymentTime(payment.time) // Set time for editing
		setCurrentPaymentId(payment.id)
		setIsEditing(true)
		onOpen()
	}

	return (
		<Box width='100%'>
			{/* Current balance and future balance section */}
			<Box mb={4} p={4} bg='#e6f7ff' borderRadius='md'>
				<Text fontSize='lg' fontWeight='bold'>
					Current Balance: {currentBalance} €
				</Text>
				<Text fontSize='lg' fontWeight='bold' color={futureBalance < 0 ? 'red.500' : 'green.500'}>
					Projected Balance after Planned Payments: {futureBalance} €
				</Text>
			</Box>

			{/* Payments Table */}
			<Box maxHeight='400px' overflowY='auto' width='100%'>
				{payments.length > 0 ? (
					<Table variant='simple'>
						<Thead>
							<Tr>
								<Th>Name</Th>
								<Th>Surname</Th>
								<Th>Account Number</Th>
								<Th>Amount</Th>
								<Th>Time</Th> {/* New Time column */}
								<Th>Action</Th>
							</Tr>
						</Thead>
						<Tbody>
							{payments.map(payment => (
								<Tr key={payment.id}>
									<Td>{payment.name} </Td>
									<Td>{payment.surname}</Td>
									<Td>{payment.accountNum}</Td>
									<Td>{payment.amount} </Td>
									<Td>{payment.time}</Td> {/* Display planned time */}
									<Td>
										<Button colorScheme='blue' size='sm' onClick={() => handleEditPayment(payment)}>
											Edit
										</Button>
										<Button colorScheme='red' size='sm' ml={2} onClick={() => deletePayment(payment.id)}>
											Delete
										</Button>
									</Td>
								</Tr>
							))}
						</Tbody>
					</Table>
				) : (
					<p>No payments added for this day.</p>
				)}

				{/* Button to add a new payment */}
				<Button
					backgroundColor='#0a3046'
					color='#ffd700'
					mt={4}
					onClick={() => {
						setIsEditing(false)
						onOpen()
					}}>
					Plan Payment
				</Button>

				{/* Modal for adding or editing a payment */}
				<Modal isOpen={isOpen} onClose={onClose}>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>{isEditing ? 'Edit Payment' : 'Add New Payment'}</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<Box>
								<Input placeholder='Name' value={paymentName} onChange={e => setPaymentName(e.target.value)} mb={2} />
								<Input
									placeholder='Surname'
									value={paymentSurname}
									onChange={e => setPaymentSurname(e.target.value)}
									mb={2}
								/>
								<Input
									placeholder='Account Number'
									value={paymentAccountNum}
									onChange={e => setPaymentAccountNum(e.target.value)}
									mb={2}
								/>
								<Input
									placeholder='Amount €'
									type='number' // Ensure amount is a number
									value={paymentAmount}
									onChange={e => setPaymentAmount(e.target.value)}
									mb={2}
								/>
								<Input
									placeholder='Time (e.g., 14:30)'
									type='time' // Input field for time
									value={paymentTime}
									onChange={e => setPaymentTime(e.target.value)}
									mb={2}
								/>
							</Box>
							<Box mt={4} p={4} bg='#f9f9f9' borderRadius='md'>
								<Text fontSize='md'>
									Current Balance: <strong>{currentBalance} €</strong>
								</Text>
								<Text fontSize='md' color={futureBalanceWithNewPayment < 0 ? 'red.500' : 'green.500'}>
									Projected Balance after this Payment: <strong>{futureBalanceWithNewPayment} €</strong>
								</Text>
							</Box>
						</ModalBody>
						<ModalFooter>
							<Button backgroundColor='#0a3046' color='#ffd700' mr={3} onClick={handleSavePayment}>
								{isEditing ? 'Save Changes' : 'Add Payment'}
							</Button>
							<Button variant='ghost' onClick={onClose}>
								Cancel
							</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
			</Box>
		</Box>
	)
}

export default Payments
