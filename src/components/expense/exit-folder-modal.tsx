import { useExitFolder } from "@/store/folder/folder.store";
import PopUp from "../shared/ui/pop-up";
import Button from "../shared/ui/button";
import { useAuth } from "@/auth/hooks/use-auth";
import { useState } from "react";
import apiClient from "@/lib/axios";
import type { Folder } from "@/types/folder";
import Dropdown from "../shared/ui/dropdown";
import type { PublicUser } from "@/types/public-user";
import ErrorMessage from "../shared/ui/error-message";
import toast from "react-hot-toast";
import { useFolders } from "@/hooks/folders/use-folders";

const ExitFolderModal = () => {
	const { userContext } = useAuth();
	const [step, setStep] = useState<"CONFIRM" | "SELECT_ADMIN">("CONFIRM");
	const [newAdmin, setNewAdmin] = useState<PublicUser | undefined>();
	const [newAdminErr, setNewAdminErr] = useState("");

	const { deleteFolder } = useFolders();

	const { deleteFolderModal, setDeleteFolderModal, folder, folderUsers } =
		useExitFolder();

	const closeModal = () => {
		setNewAdmin(undefined);
		setNewAdminErr("");
		setStep("CONFIRM");
		setDeleteFolderModal(false);
	};

	const onConfirmHandler = () => {
		if (userContext?.userId === folder?.userId && folderUsers.length >= 2) {
			setStep("SELECT_ADMIN");
			return;
		}

		if (folder) {
			exitFolder(folder);
		}
	};

	const exitFolder = async (folder: Folder) => {
		const req = apiClient.post(`/folders/${folder.id}/exit`, {
			newAdminUserId: null,
		});
		toast.promise(req, {
			loading: "Exiting...",
			success: "Folder exited!",
			error: "Failed to exit from folder",
		});
		closeModal();
		await req;
		deleteFolder(folder.id);
	};

	const exitFolderWithNewAdmin = async () => {
		if (!folder) return;

		if (!newAdmin) {
			setNewAdminErr("Please select new admin");
			return;
		}

		const req = apiClient.post(`/folders/${folder.id}/exit`, {
			newAdminUserId: newAdmin.id,
		});

		toast.promise(req, {
			loading: "Exiting...",
			success: "Folder exited!",
			error: "Failed to exit from folder",
		});
		closeModal();
		await req;
		deleteFolder(folder.id);
	};

	const getComponent = () => {
		switch (step) {
			case "CONFIRM":
				return (
					<div className="flex justify-end">
						<Button variant="ghost" onClick={closeModal}>
							Cancel
						</Button>
						<Button
							variant="error"
							className="px-6"
							onClick={onConfirmHandler}
						>
							Exit
						</Button>
					</div>
				);
			case "SELECT_ADMIN":
				return (
					<div>
						<label className="text-[12px]">Select new admin</label>
						<Dropdown
							options={folderUsers
								.filter(
									(user) => user.id !== userContext?.userId,
								)
								.map((user) => ({
									option: user.firstName,
									...user,
								}))}
							onChange={(val) => {
								setNewAdminErr("");
								setNewAdmin(
									folderUsers.find(
										(user) => user.id === val.id,
									),
								);
							}}
						/>
						{<ErrorMessage errorMessage={newAdminErr} />}
						<div className="flex justify-end">
							<Button variant="ghost" onClick={closeModal}>
								Cancel
							</Button>
							<Button
								variant="error"
								className="px-6"
								onClick={exitFolderWithNewAdmin}
							>
								Exit
							</Button>
						</div>
					</div>
				);
		}
	};

	return (
		<PopUp open={deleteFolderModal} close={closeModal} title="Exit Folder">
			<p>
				Are you sure you want to exit folder
				<span className="font-bold">{` ${folder?.name} `}</span>?
			</p>
			{getComponent()}
		</PopUp>
	);
};

export default ExitFolderModal;
