import UserIcon from "../../shared/media/Profile.svg"
import { httpService } from "../../shared/services/http-service"

export const UserFeedPage = () => {
	const handleClick = async (postId: number) => {
		try {
			const response = await httpService.post(`service-click`, {
				post_id: postId
			})

			if (response.status === 200) {
				window.location.href = "https://www.aeroflot.ru/ru-ru"
			}

			return response.data
		} catch (error) {
			console.error("Error recording post click:", error)
			throw error
		}
	}

	return (
		<main className='col-span-9'>
			<div className='p-8'>
				<p className='text-viat-primary font-viat-title text-viat-size-title font-bold'>
					Feed
				</p>
				<div className='flex items-start space-x-4 p-4 bg-white rounded-lg shadow'>
					<img
						src={UserIcon.toString()}
						alt='User Avatar'
						className='w-12 h-12 rounded-full'
					/>

					<div className='flex-1'>
						<div className='flex items-center justify-between'>
							<h3 className='font-viat-body text-viat-size-body text-viat-primary'>
								John Doe
							</h3>

							<button
								className='font-viat-body text-viat-size-body text-viat-primary focus:outline-none'
								onClick={() => handleClick(4176)}
							>
								Service
							</button>
						</div>
						<p className='mt-2 font-viat-body text-viat-size-body text-viat-text'>
							Здорово я выкатился в Чебоксары!
							ТекстТекстТекстТекстТекстТекстТекстТекстТекстТекстТекстТекстТекстТекстТекстТекстТекстТекстТекстТекстТекстТекстТекстТекст
						</p>

						<div className='mt-4 flex items-center space-x-4'>
							<span className='font-viat-small text-viat-size-small text-viat-secondary'>
								{new Date().toLocaleDateString()}
							</span>

							<span className='font-viat-small text-viat-size-small text-viat-accent'>
								Russia, Cheboksary
							</span>
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}
