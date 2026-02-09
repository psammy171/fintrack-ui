import { useCreateFolders } from "@/hooks/folders/use-create-folder";
import PopUp from "../shared/ui/pop-up";
import WarnIcon from "../shared/icons/warn";
import Button from "../shared/ui/button";

const ShareFolderModal = () => {
	const {
		shareFolderModal,
		shareFolder,
		closeShareFolderModal,
		shareFolderById,
	} = useCreateFolders();

	const shareFolderHandler = () => {
		if (shareFolder) {
			shareFolderById(shareFolder.id);
		}
		closeShareFolderModal();
	};

	return (
		<PopUp open={shareFolderModal} close={closeShareFolderModal}>
			<div>
				<h2 className="text-lg mb-1">
					Share Folder <b>"{shareFolder?.name}"</b>
				</h2>
				<span className="flex items-center gap-x-2 my-2">
					<WarnIcon className="inline w-6 h-6 text-yellow-500 shrink-0" />
					<p className="leading-none">
						Once you share a folder, you won't be able to unshare
						it.
					</p>
				</span>
				{/* <Switch label="Share Folder" /> */}
				<div className="flex justify-end gap-x-4">
					<Button variant="ghost" onClick={closeShareFolderModal}>
						Cancel
					</Button>
					<Button variant="primary" onClick={shareFolderHandler}>
						Share
					</Button>
				</div>
			</div>
		</PopUp>
	);
};

export default ShareFolderModal;
