import { useCreateFolders } from "@/hooks/folders/use-create-folder";
import PopUp from "../shared/ui/pop-up";
import type { FormEvent } from "react";
import Input from "../shared/ui/input";
import Button from "../shared/ui/button";
import Switch from "../shared/ui/switch";
import WarnIcon from "../shared/icons/warn";

const ExpenseFolderForm = () => {
	const {
		isShared,
		setIsShared,
		formModal,
		closeForm,
		editFolderId,
		submitForm,
		folderName,
		folderNameErr,
		setFolderName,
		setFolderNameErr,
	} = useCreateFolders();

	const submitHandler = (e: FormEvent) => {
		e.preventDefault();
		submitForm();
	};

	return (
		<PopUp
			open={formModal}
			close={closeForm}
			title={editFolderId ? "Edit Folder" : "Create Folder"}
		>
			<form onSubmit={submitHandler} className="flex flex-col">
				<label htmlFor="folderName" className="text-[13px]">
					Folder Name
				</label>
				<Input
					type="text"
					id="folderName"
					name="folderName"
					value={folderName}
					placeholder="Fuel"
					onFocus={() => setFolderNameErr("")}
					onChange={(e) => setFolderName(e.target.value)}
				/>
				{folderNameErr && (
					<p className="text-red-800 text-right text-[13px]">
						{folderNameErr}
					</p>
				)}

				{!editFolderId && (
					<>
						<Switch
							label="Shared Folder"
							checked={isShared}
							className="mt-4"
							onChange={(checked) => setIsShared(checked)}
						/>
						<span className="flex items-center gap-x-2 text-sm">
							<WarnIcon className="inline w-4 h-4 text-yellow-500 shrink-0" />
							<p className="leading-none">
								Once you share a folder, you won't be able to
								unshare it.
							</p>
						</span>
					</>
				)}
				<Button className="mx-0 mt-4" type="submit">
					{editFolderId ? "Update Folder" : "Create Folder"}
				</Button>
			</form>
		</PopUp>
	);
};

export default ExpenseFolderForm;
