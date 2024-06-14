import { SignUpButton } from "../../features/SignUpButton"
import { SignInButton } from "../../features/SignInButton"

// TODO: Do something with it.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import Logo from "../../shared/media/ViatorusLogo.svg"

export const LandingPageNavBar = () => {
	const linkClasses: string =
		"text-viat-primary font-viat-body hover:text-viat-accent font-bold"
	return (
		<header className='relative h-20'>
			<div className='container mx-auto px-24 h-full'>
				<div className='flex items-center justify-between h-full'>
					<div className='flex items-center'>
						<img src={Logo} alt='Viatorus Logo' className='h-10 w-auto' />
					</div>
					<nav className='flex space-x-8'>
						{/*TODO: Make actual links*/}
						<a href='' className={linkClasses}>
							HOME
						</a>
						<a href='' className={linkClasses}>
							FEATURES
						</a>
						<a href='' className={linkClasses}>
							TIPS
						</a>
						<a href='' className={linkClasses}>
							COMMUNITY
						</a>
						<a href='' className={linkClasses}>
							SHOP
						</a>
					</nav>
					<div className='flex space-x-4'>
						<SignInButton />
						<SignUpButton />
					</div>
				</div>
			</div>
			<div className='absolute bottom-0 left-0 right-0 border-b-2 border-viat-primary'></div>
		</header>
	)
}
