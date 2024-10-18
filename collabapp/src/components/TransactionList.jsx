import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react'

function TransactionList({ selectedDate, transactions }) {
	return (
		<>
			{transactions.length > 0 ? (
				<Table variant='simple'>
					<Thead>
						<Tr>
							<Th>Amount</Th>
							<Th>Description</Th>
						</Tr>
					</Thead>
					<Tbody>
						{transactions.map(transaction => (
							<Tr key={transaction.id}>
								<Td>{transaction.amount}</Td>
								<Td>{transaction.description}</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			) : (
				<p>No transactions recorded for this day.</p>
			)}
		</>
	)
}

export default TransactionList
