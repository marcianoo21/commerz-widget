import React from 'react'
import { Table, Thead, Tbody, Tr, Th, Td, Box, Text } from '@chakra-ui/react'

const TransactionList = ({ transactions }) => {
	return (
		<Box maxHeight='400px' overflowY='auto' width='100%'>
			{transactions.length > 0 ? ( // Check if there are transactions
				<Table variant='simple'>
					<Thead>
						<Tr>
							<Th>Amount</Th>
							<Th>Description</Th>
							<Th>Operation Type</Th>
							<Th>Transaction Type</Th>
							<Th>Recipient Name</Th>
							<Th>Transaction Date</Th>
							<Th>Settlement Date</Th>
							<Th>Linked Account Number</Th>
						</Tr>
					</Thead>
					<Tbody>
						{transactions.map(transaction => (
							<Tr key={transaction.id}>
								<Td color={transaction.amount.startsWith('-') ? 'red' : 'green'}>{transaction.amount}</Td>
								<Td>{transaction.description}</Td>
								<Td>{transaction.operationType}</Td>
								<Td>{transaction.transactionType}</Td>
								<Td>{transaction.recipientName}</Td>
								<Td>{transaction.transactionDate}</Td>
								<Td>{transaction.settlementDate}</Td>
								<Td>{transaction.linkedAccountNumber}</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			) : (
				// If no transactions, show this message
				<Text color='gray.500' textAlign='center' mt={4}>
					No transactions
				</Text>
			)}
		</Box>
	)
}

export default TransactionList
