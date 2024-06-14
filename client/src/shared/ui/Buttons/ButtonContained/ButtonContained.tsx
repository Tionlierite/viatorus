export const ButtonContained = ({ label }: { label: string }) => {
	return (
		<button className='bg-viat-primary text-viat-bg font-viat-body font-bold py-2 px-4 rounded-md border-2 border-viat-primary'>
			{label}
		</button>
	)
}
