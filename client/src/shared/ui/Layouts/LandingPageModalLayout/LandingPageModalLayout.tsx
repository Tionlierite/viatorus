import React from "react"

interface LayoutProps {
	children: React.ReactNode
	message: string
}

export const LandingPageModalLayout = ({ children, message }: LayoutProps) => {
	return (
		<div className='col-span-10 col-start-2 grid grid-cols-2 gap-8'>
			<div className='bg-viat-bg p-8 rounded-md'>{children}</div>
			<div className='flex items-center justify-center'>
				<h2 className='text-3xl font-bold'>{message}</h2>
			</div>
		</div>
	)
}
