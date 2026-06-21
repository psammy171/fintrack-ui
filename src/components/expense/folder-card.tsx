import type { Folder } from "@/types/folder";
import React, {
	useCallback,
	useEffect,
	useRef,
	useState,
	type FC,
} from "react";
import FolderIcon from "../shared/icons/folder";
import { useExpenses } from "@/hooks/expenses/use-expenses";
import { useCreateFolders } from "@/hooks/folders/use-create-folder";
import OptionsIcon from "../shared/icons/options";
import DeleteIcon from "../shared/icons/delete";
import EditIcon from "../shared/icons/edit";
import SharedUserIcon from "../shared/icons/shared-user";
import { useAuth } from "@/auth/hooks/use-auth";
import SharedFolderIcon from "../shared/icons/shared-folder";

interface Props {
	folder: Folder;
}

const FolderCard: FC<Props> = ({ folder }) => {
	const { userContext } = useAuth();

	const folderCardRef = useRef<HTMLDivElement>(null);
	const folderOptionsRef = useRef<HTMLDivElement>(null);
	const {
		setFolder,
		folder: selectedFolder,
		setIsFolderSection,
	} = useExpenses();
	const { openEditForm, openDeleteConfirmationPopUp, openAddUserModal } =
		useCreateFolders();
	const [showOptions, setShowOptions] = useState(false);

	const isClickOutside = (
		event: MouseEvent | React.MouseEvent,
		element: HTMLElement | null,
	): boolean => {
		if (!element) return false;
		return !element.contains(event.target as Node);
	};

	const closeOptions = useCallback(
		(event: MouseEvent) => {
			if (isClickOutside(event, folderCardRef.current))
				setShowOptions(false);
		},
		[folderCardRef],
	);

	useEffect(() => {
		if (showOptions) {
			document.addEventListener("click", closeOptions);
		} else {
			document.removeEventListener("click", closeOptions);
		}
	}, [closeOptions, showOptions]);

	const openFolder = (e: React.MouseEvent) => {
		if (
			isClickOutside(e, folderOptionsRef.current) &&
			!isClickOutside(e, folderCardRef.current)
		) {
			setFolder(folder);
			setIsFolderSection(false);
		}
	};

	return (
		<div
			key={folder.id}
			className={`flex group border-b py-2.5 sm:py-2 pr-1 pl-2 items-start sm:items-center cursor-pointer relative ${
				folder.id === selectedFolder?.id
					? " bg-indigo-100"
					: "border-l-transparent hover:bg-gray-100 font-light"
			}`}
			ref={folderCardRef}
			onClick={(e: React.MouseEvent) => openFolder(e)}
		>
			<span
				className={` rounded-lg flex items-center justify-center w-9 h-9 shrink-0 mr-2 bg-gray-300`}
			>
				{folder?.shared ? (
					<SharedFolderIcon
						className={`${folder.id === selectedFolder?.id ? "text-indigo-600" : ""}`}
					/>
				) : (
					<FolderIcon
						className={`${folder.id === selectedFolder?.id ? "text-indigo-600" : ""}`}
					/>
				)}
			</span>
			<span
				className="flex-1 truncate text-ellipsis mr-1 ml-2"
				title={folder.name}
			>
				<p
					className={`${folder.id === selectedFolder?.id ? "text-indigo-600 font-extrabold" : ""}`}
				>
					{folder.name}
				</p>
				<p className="text-sm text-gray-500">
					{folder.shared ? "Shared" : "Personal"}
				</p>
			</span>
			<span
				ref={folderOptionsRef}
				onClick={() => {
					setShowOptions(true);
				}}
			>
				<OptionsIcon />
			</span>
			<div
				onClick={(e) => e.stopPropagation()}
				className={`absolute text-sm group-hover:bg-gray-100 overflow-hidden bg-gray-100 w-28 shadow-lg z-10 top-8 rounded-lg border border-gray-300 right-5 ${showOptions ? "block" : "hidden"}`}
			>
				<span
					onClick={() => {
						if (userContext?.userId === folder.userId)
							openEditForm(folder);
					}}
					className={`flex items-center px-2 py-1.5 gap-x-2 border-b border-b-gray-300 ${userContext?.userId === folder.userId ? `hover:bg-gray-200 cursor-pointer text-blue-700` : "cursor-not-allowed bg-gray-100 text-gray-400"}`}
				>
					<EditIcon />
					<p>Edit</p>
				</span>
				{folder.shared && (
					<span
						onClick={() => openAddUserModal(folder)}
						className={`flex items-center px-2 py-1.5 gap-x-2 border-b border-b-gray-300 hover:bg-gray-200 cursor-pointer text-green-700`}
					>
						<SharedUserIcon />
						<p>Users</p>
					</span>
				)}
				<span
					onClick={() => {
						if (!folder.shared) openDeleteConfirmationPopUp(folder);
					}}
					className={`flex items-center px-2 py-1.5 gap-x-2 ${folder.shared ? "cursor-not-allowed bg-gray-100 text-gray-400" : "hover:bg-gray-200 cursor-pointer text-red-800"}`}
				>
					<DeleteIcon />
					<p>Delete</p>
				</span>
			</div>
		</div>
	);
};

export default FolderCard;
