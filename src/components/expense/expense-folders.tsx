import { useFolders } from "@/hooks/folders/use-folders";
import CreateFolderIcon from "../shared/icons/create-folder";
import { useEffect } from "react";
import Loader from "../shared/ui/loader";
import ExpenseFolderList from "./expense-folder-list";
import ExpenseFolderForm from "./expense-folder-form";
import { useCreateFolders } from "@/hooks/folders/use-create-folder";
import DeleteFolderConfirmation from "./delete-folder-comfirmation";
import AddUserModal from "./add-user-modal";

const ExpenseFolders = () => {
	const { fetchFolders, fetching, folders } = useFolders();
	const { openCreateForm } = useCreateFolders();

	useEffect(() => {
		fetchFolders();
	}, [fetchFolders]);

	return (
		<div className="w-44 border-r bg-gray-100 overflow-hidden overflow-y-scroll">
			<span className="bg-indigo-600 w-full py-2 text-[18px] px-2 text-white flex justify-between items-center sticky top-0">
				<p className="font-semibold">Folders</p>
				<span
					className="mr-2 hover:bg-gray-100/20 rounded-md cursor-pointer"
					title="Create Folder"
					onClick={openCreateForm}
				>
					<CreateFolderIcon className="m-1" />
				</span>
			</span>

			{fetching ? (
				<span className="w-full flex justify-center mt-[20%]">
					<Loader />
				</span>
			) : (
				<ExpenseFolderList folders={folders} />
			)}
			<ExpenseFolderForm />
			<AddUserModal />
			<DeleteFolderConfirmation />
		</div>
	);
};

export default ExpenseFolders;
