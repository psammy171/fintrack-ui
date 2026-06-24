import { useFolders } from "@/hooks/folders/use-folders";
import CreateFolderIcon from "../shared/icons/create-folder";
import ExpenseFolderList from "./expense-folder-list";
import ExpenseFolderForm from "./expense-folder-form";
import { useCreateFolders } from "@/hooks/folders/use-create-folder";
import DeleteFolderConfirmation from "./delete-folder-comfirmation";
import AddUserModal from "./add-user-modal";
import cn from "@/lib/cn";
import Button from "../shared/ui/button";
import FolderLoader from "../shared/ui/loaders/folder-loader";

const ExpenseFolders = ({ className }: { className?: string }) => {
	const { fetching, folders } = useFolders();
	const { openCreateForm } = useCreateFolders();

	return (
		<div
			className={cn(
				`sm:w-64 border-r bg-white overflow-hidden overflow-y-scroll`,
				className,
			)}
		>
			<span className="bg-indigo-600 hidden w-full py-2 text-[18px] px-2 text-white sm:flex justify-between items-center sticky top-0">
				<p className="font-semibold">Folders</p>
				<span
					className="mr-2 hover:bg-gray-100/20 rounded-md cursor-pointer"
					title="Create Folder"
					onClick={openCreateForm}
				>
					<CreateFolderIcon className="m-1" />
				</span>
			</span>

			<span className="flex items-center px-2 sm:hidden sticky top-0 bg-white z-10 pb-3">
				<span>
					<p className="font-semibold">Folders</p>
					<p className="text-sm text-gray-500">
						Organize your expenses
					</p>
				</span>
				<span className="flex-1"></span>
				<Button onClick={openCreateForm}>Create Folder</Button>
			</span>

			{fetching ? (
				<span>
					{Array.from({ length: 10 }).map(() => (
						<FolderLoader />
					))}
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
