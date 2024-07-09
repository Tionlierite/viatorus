import React from "react"

import { IconButton } from "@mui/material"

interface ModalProps {
	titleMessage: string
	isOpen: boolean
	onClose: () => void
	children: React.ReactNode
}

export const WorkspacePageModalView: React.FC<ModalProps> = ({
	titleMessage,
	isOpen,
	onClose,
	children
}) => {
	if (!isOpen) return null

	return (
		<div className='fixed inset-0 flex items-center justify-center z-50'>
			<div
				className='fixed inset-0 bg-viat-bg bg-opacity-90 transition-opacity'
				onClick={onClose}
			/>
			<div className='relative grid grid-cols-12 gap-8 bg-white border-2 border-viat-primary rounded-md p-8 w-8/12 max-w-screen-md'>
				<div className='col-span-11'>
					<h2 className='text-2xl font-bold mb-4'>{titleMessage}</h2>
				</div>
				<div className='col-span-1 flex justify-end'>
					<IconButton onClick={onClose}>X</IconButton>
				</div>
				{children}
			</div>
		</div>
	)
}
