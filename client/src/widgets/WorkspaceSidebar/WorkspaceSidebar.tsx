import { useLocation } from "react-router-dom"

import { ProfileBox } from "../../features/SidebarFeatures/ProfileBox"
import { SidebarLinks } from "../../features/SidebarFeatures/SidebarLinks"

import Logo from "../../shared/media/ViatorusLogo.svg"
import Home from "../../shared/media/Home.svg"
import HomeAlt from "../../shared/media/HomeAlt.svg"
import Feed from "../../shared/media/Feed.svg"
import FeedAlt from "../../shared/media/FeedAlt.svg"

interface SidebarLink {
	name: string
	path: string
	icon: {
		img: string
		imgAlt: string
		altName: string
		classes: string
	}
	isSelected: boolean
}

export const WorkspaceSidebar = () => {
	const location = useLocation()
	const sidebarLinksConfig: SidebarLink[] = [
		{
			name: "My Lists",
			path: "/workspace",
			icon: {
				img: Home.toString(),
				imgAlt: HomeAlt.toString(),
				altName: "Home Icon",
				classes: "h-5 w-5"
			}
		},
		{
			name: "Feed",
			path: "/workspace/feed",
			icon: {
				img: Feed.toString(),
				imgAlt: FeedAlt.toString(),
				altName: "Feed Icon",
				classes: "h-5 w-5"
			}
		}
	].map(link => ({
		...link,
		isSelected: location.pathname === link.path
	}))

	return (
		<div className='bg-viat-bg-shade col-span-3 h-screen sticky top-0 px-6'>
			<img
				src={Logo.toString()}
				alt='Viatorus Logo'
				className='h-10 w-auto mt-4'
			/>
			<ProfileBox />
			<SidebarLinks linksConfig={sidebarLinksConfig} />
		</div>
	)
}
