import React, { useState } from 'react'
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
} from '@chakra-ui/react'

const Payments = ({ payments, addPayment, deletePayment, editPayment }) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [paymentName, setPaymentName] = useState('')
	const [paymentSurname, setPaymentSurname] = useState('')
	const [paymentAccountNum, setPaymentAccountNum] = useState('')
	const [isEditing, setIsEditing] = useState(false)
	const [currentPaymentId, setCurrentPaymentId] = useState(null)
	const toast = useToast()

	// Handle adding or editing the payment
	const handleSavePayment = () => {
		if (!paymentName || !paymentSurname || !paymentAccountNum) {
			toast({
				title: 'Warning',
				description: 'Please fill in all fields.',
				status: 'warning',
				duration: 3000,
				isClosable: true,
			})
		} else {
			if (isEditing) {
				editPayment(currentPaymentId, { name: paymentName, surname: paymentSurname, accountNum: paymentAccountNum })
				toast({
					title: 'Success',
					description: 'Payment edited successfully.',
					status: 'success',
					duration: 3000,
					isClosable: true,
				})
			} else {
				addPayment({ name: paymentName, surname: paymentSurname, accountNum: paymentAccountNum })
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
		setCurrentPaymentId(payment.id)
		setIsEditing(true)
		onOpen()
	}

	return (
		<Box maxHeight='400px' overflowY='auto' width='100%'>
			{payments.length > 0 ? (
				<Table variant='simple'>
					<Thead>
						<Tr>
							<Th>Name</Th>
							<Th>Surname</Th>
							<Th>Account Number</Th>
							<Th>Action</Th>
						</Tr>
					</Thead>
					<Tbody>
						{payments.map(payment => (
							<Tr key={payment.id}>
								<Td>{payment.name}</Td>
								<Td>{payment.surname}</Td>
								<Td>{payment.accountNum}</Td>
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
				colorScheme='green'
				mt={4}
				onClick={() => {
					setIsEditing(false)
					onOpen()
				}}>
				Add Payment
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
						</Box>
					</ModalBody>
					<ModalFooter>
						<Button colorScheme='blue' mr={3} onClick={handleSavePayment}>
							{isEditing ? 'Save Changes' : 'Add Payment'}
						</Button>
						<Button variant='ghost' onClick={onClose}>
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Box>
	)
}

export default Payments
