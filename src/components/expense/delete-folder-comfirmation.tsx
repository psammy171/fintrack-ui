import { useCreateFolders } from "@/hooks/folders/use-create-folder";
import PopUp from "../shared/ui/pop-up";
import Button from "../shared/ui/button";
import WarnIcon from "../shared/icons/warn";

const DeleteFolderConfirmation = () => {
	const {
		closeDeleteConfirmationPopUp,
		deleteConfirmationModal,
		deleteFolder,
		deleteFolderById,
	} = useCreateFolders();

	const deleteFolderHandler = () => {
		if (deleteFolder) {
			deleteFolderById(deleteFolder.id);
		}

		closeDeleteConfirmationPopUp();
	};

	return (
		<PopUp
			open={deleteConfirmationModal}
			close={closeDeleteConfirmationPopUp}
			title="Delete Folder"
		>
			<h2>
				Are you sure you want to delete folder{" "}
				<span className="font-semibold">{deleteFolder?.name}</span> ?
			</h2>
			<div className="flex items-center gap-x-2 my-2">
				<WarnIcon className="inline w-6 h-6 text-yellow-500 shrink-0" />
				<span className="text-sm text-nowrap">
					All expenses from this folder will be moved to root folder.
				</span>
			</div>
			<div className="flex justify-end gap-x-4">
				<Button variant="ghost" onClick={closeDeleteConfirmationPopUp}>
					Cancel
				</Button>
				<Button variant="error" onClick={deleteFolderHandler}>
					Delete
				</Button>
			</div>
		</PopUp>
	);
};

export default DeleteFolderConfirmation;
