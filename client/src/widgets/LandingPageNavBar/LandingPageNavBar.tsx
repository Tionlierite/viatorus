import { useLocation } from "react-router-dom"

import { SignUpButton } from "../../features/SignUpButton"
import { SignInButton } from "../../features/SignInButton"
import { NavbarLinks } from "../../features/NavbarFeatures/NavbarLinks"

import Logo from "../../shared/media/ViatorusLogo.svg"

interface NavbarLink {
	name: string
	path: string
	isSelected: boolean
}

export const LandingPageNavBar = () => {
	const location = useLocation()
	const navbarLinksConfig: NavbarLink[] = [
		{
			name: "HOME",
			path: "/"
		},
		{
			name: "FEATURES",
			path: "/features"
		},
		{
			name: "TIPS",
			path: "/tips"
		},
		{
			name: "COMMUNITY",
			path: "/community"
		},
		{
			name: "SHOP",
			path: "/shop"
		}
	].map(link => ({
		...link,
		isSelected: location.pathname === link.path
	}))

	return (
		<header className='relative h-20'>
			<div className='container mx-auto px-24 h-full'>
				<div className='flex items-center justify-between h-full'>
					<div className='flex items-center'>
						<img
							src={Logo.toString()}
							alt='Viatorus Logo'
							className='h-10 w-auto'
						/>
					</div>
					<NavbarLinks linksConfig={navbarLinksConfig} />
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
