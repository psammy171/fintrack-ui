import type { Folder } from "@/types/folder";
import type { FC } from "react";
import FolderIcon from "../shared/icons/folder";
import { useExpenses } from "@/hooks/expenses/use-expenses";
import FolderCard from "./folder-card";

interface Props {
	folders: Folder[];
}

const ExpenseFolderList: FC<Props> = ({ folders }) => {
	const { setFolder, folder, setIsFolderSection } = useExpenses();

	return (
		<>
			<div
				key={0}
				className={`flex border-y sm:border-t-0  py-3 sm:py-2.5 px-4 items-center gap-x-2 cursor-pointer ${
					undefined === folder?.id
						? "bg-indigo-100 text-indigo-600"
						: "hover:bg-gray-100 font-light "
				}`}
				onClick={() => {
					setFolder(undefined);
					setIsFolderSection(false);
				}}
			>
				<span
					className={` rounded-lg flex items-center justify-center w-9 h-9 shrink-0 mr-2 bg-gray-300`}
				>
					<FolderIcon className="w-5 h-5" />
				</span>
				<span>
					<p
						className={`${folder?.id === undefined ? "text-indigo-600 font-extrabold" : ""}`}
					>
						Root
					</p>
					<p className="text-sm text-gray-500">Personal</p>
				</span>
			</div>
			{folders.map((folder) => (
				<FolderCard folder={folder} key={folder.id} />
			))}
		</>
	);
};

export default ExpenseFolderList;
