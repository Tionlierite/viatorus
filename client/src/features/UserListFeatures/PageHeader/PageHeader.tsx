import { AddToListButton } from "../../NavbarFeatures/AddToListButton"
import { useDispatch, useSelector } from "react-redux"
import { closeModal } from "../../NavbarFeatures/AddToListButton/model/AddToListModalSlice.ts"
import { WorkspacePageModalView } from "../../../shared/ui/Modals/WorkspacePageModalView"
import { RootState } from "../../../app/store/store.ts"
import { AddToListModalFields } from "../AddToListModalFields"

export const PageHeader = () => {
	const dispatch = useDispatch()
	const isModalOpen = useSelector(
		(state: RootState) => state.AddToListModal.isOpen
	)
	const handleCloseModal = () => {
		dispatch(closeModal())
	}

	return (
		<div className='p-6'>
			<div className='flex justify-between items-center mb-4'>
				<p className='text-viat-primary font-viat-title text-viat-size-title font-bold'>
					My Lists
				</p>
				<AddToListButton />
				<WorkspacePageModalView isOpen={isModalOpen} onClose={handleCloseModal}>
					<AddToListModalFields />
				</WorkspacePageModalView>
			</div>
		</div>
	)
}
