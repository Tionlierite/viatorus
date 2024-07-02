import emptyListPicture from "../../../shared/media/EmptyList.svg"

export const EmptyListPicture = () => {
	return (
		<div className='flex justify-center items-center h-full col-span-6 col-start-4'>
			<img
				src={emptyListPicture.toString()}
				alt='Your list is empty'
				className='mx-auto'
			/>
		</div>
	)
}
