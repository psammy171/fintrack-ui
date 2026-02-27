import { useCreateFolders } from "@/hooks/folders/use-create-folder";
import WarnIcon from "../shared/icons/warn";
import Button from "../shared/ui/button";
import PopUp from "../shared/ui/pop-up";
import Input from "../shared/ui/input";
import { useEffect, useState } from "react";
import apiClient from "@/lib/axios";
import SearchUserIcon from "../shared/icons/search-user";
import type { PublicUser } from "@/types/public-user";
import PublicUserList from "./public-user-list";
import shareWithUser from "@/assets/share-with-user.png";
import BackIcon from "../shared/icons/back";
import toast from "react-hot-toast";
import { useAuth } from "@/auth/hooks/use-auth";

const AddUserModal = () => {
	const { userContext } = useAuth();
	const [search, setSearch] = useState("");
	const [searchedUsers, setSearchedUsers] = useState<PublicUser[]>([]);
	const [selectedUsers, setSelectedUsers] = useState<PublicUser[]>([]);
	const [sharedUsers, setSharedUsers] = useState<PublicUser[]>([]);
	const { shareFolder, addUserModal, closeAddUserModal } = useCreateFolders();
	const [addUserTab, setAddUserTab] = useState<boolean>(false);

	useEffect(() => {
		const fetchSharedUsers = async () => {
			if (!shareFolder || !addUserModal) return;

			const response = await apiClient.get(
				`/folders/${shareFolder.id}/shared-users`,
			);
			setSharedUsers(response.data.data);
		};
		fetchSharedUsers();
	}, [shareFolder, addUserModal]);

	useEffect(() => {
		const searchUsers = async () => {
			if (search.trim() === "") {
				setSearchedUsers([]);
				return;
			}
			const response = await apiClient.get(`/users?search=${search}`);
			setSearchedUsers(response.data.data);
		};
		searchUsers();
	}, [search]);

	const selectUser = (user: PublicUser) => {
		const isUserAlreadySelected = selectedUsers.some(
			(selectedUser) => selectedUser.userId === user.userId,
		);

		if (isUserAlreadySelected) {
			setSelectedUsers((prevSelectedUsers) =>
				prevSelectedUsers.filter(
					(selectedUser) => selectedUser.userId !== user.userId,
				),
			);
		} else {
			setSelectedUsers((prevSelectedUsers) => [
				...prevSelectedUsers,
				user,
			]);
		}
	};

	const resetForm = () => {
		setSelectedUsers([]);
		setAddUserTab(false);
		setSearchedUsers([]);
		setSearch("");
	};

	const shareFolderWithUsers = async () => {
		if (selectedUsers.length === 0 || !shareFolder) return;

		try {
			const req = apiClient.patch(
				`/folders/${shareFolder.id}/add-users`,
				{
					userIds: selectedUsers.map((user) => user.userId),
				},
			);
			toast.promise(req, {
				loading: "Sharing folder...",
				success: "Folder shared successfully!",
				error: "Failed to share folder. Please try again.",
			});
			await req;
			closeAddUserModal();
			resetForm();
		} catch (error) {
			console.error("Error sharing folder:", error);
		}
	};

	return (
		<PopUp
			open={addUserModal}
			close={() => {
				closeAddUserModal();
				resetForm();
			}}
		>
			<div>
				<h2 className="text-lg">
					Share Folder <b>"{shareFolder?.name}"</b> with users
				</h2>
				<span className="flex items-center text-sm gap-x-1 mb-2">
					<WarnIcon className="inline w-4 h-4 text-yellow-500 shrink-0" />
					<p className="leading-none">
						Once you share a folder, you won't be able to unshare
						it.
					</p>
				</span>
				<div className="rounded-2xl border border-slate-300 w-full h-80 relative overflow-hidden">
					<div
						className={`border rounded-md absolute top-0 bottom-0 m-2 flex flex-col overflow-hidden overflow-y-scroll ${addUserTab ? "right-full -left-full" : "right-0 left-0"} transition-all duration-300`}
					>
						<span className="font-semibold border-b py-1 px-2 bg-gray-200 flex items-center">
							<p>Shared Users</p>
							<span className="flex-grow"></span>
							{shareFolder?.userId === userContext?.userId && (
								<Button
									variant="primary"
									onClick={() => setAddUserTab(true)}
									className="m-0"
								>
									Add user
								</Button>
							)}
						</span>
						<div className="flex-grow">
							{sharedUsers.length === 0 ? (
								<div className="flex flex-col items-center gap-y-2 py-4">
									<p className="mt-10">No users yet!</p>
									<Button
										variant="primary"
										onClick={() => setAddUserTab(true)}
									>
										Add user
									</Button>
								</div>
							) : (
								<>
									{sharedUsers.map((user) => (
										<p
											key={user.userId}
											className="border-b p-2"
										>{`${user.firstName} ${user.lastName}`}</p>
									))}
								</>
							)}
						</div>
					</div>
					<div
						className={`border rounded-md absolute top-0 bottom-0 m-2 flex flex-col overflow-hidden overflow-y-scroll ${addUserTab ? "right-0 left-0" : "-right-full left-full"} transition-all duration-300`}
					>
						<span className="font-semibold p-2 border-b bg-gray-200 flex items-center gap-x-2">
							<BackIcon
								onClick={() => setAddUserTab(false)}
								className="cursor-pointer"
							/>
							<p>Add user modal</p>
						</span>
						<span className="w-full relative p-2">
							<Input
								placeholder="Search User..."
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								className="w-full pl-8 peer placeholder-slate-600 focus:placeholder-black transition-colors duration-300 rounded-lg"
							/>
							<SearchUserIcon className="absolute top-4.5 left-4 text-slate-600 peer-focus:text-black transition-colors duration-300" />
						</span>
						{search.trim() === "" && selectedUsers.length === 0 ? (
							<span className="flex flex-col items-center gap-y-2 py-4">
								<img
									src={shareWithUser}
									alt="Share with user"
									className="w-20 h-20"
								/>
								<p className="text-center pt-1 pb-3">
									Search Users to share folder with
								</p>
							</span>
						) : (
							<div className="p-2 h-full overflow-hidden overflow-y-scroll">
								<PublicUserList
									searchedUsers={searchedUsers}
									selectedUsers={selectedUsers}
									selectUser={selectUser}
									sharedUsers={sharedUsers}
								/>
							</div>
						)}

						<Button
							variant="primary"
							disabled={selectedUsers.length === 0}
							onClick={shareFolderWithUsers}
							className="rounded-md mx-2"
						>
							Share
						</Button>
					</div>
				</div>
			</div>
		</PopUp>
	);
};

export default AddUserModal;
