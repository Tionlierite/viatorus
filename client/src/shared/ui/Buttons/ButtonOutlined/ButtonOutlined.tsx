export const ButtonOutlined = ({
	label,
	disabled
}: {
	label: string
	disabled?: boolean
}) => {
	return (
		<button
			className='border-2 border-viat-primary text-viat-primary font-viat-body font-bold py-2 px-4 rounded-md'
			disabled={disabled}
		>
			{label}
		</button>
	)
}
