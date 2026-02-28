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
				className={`flex border-b border-l-[3px] p-2 items-center gap-x-2 cursor-pointer ${
					undefined === folder?.id
						? "border-l-indigo-600 bg-indigo-100 text-indigo-600 font-semibold"
						: "border-l-transparent hover:bg-gray-200"
				}`}
				onClick={() => {
					setFolder(undefined);
					setIsFolderSection(false);
				}}
			>
				<FolderIcon />
				Root
			</div>
			{folders.map((folder) => (
				<FolderCard folder={folder} key={folder.id} />
			))}
		</>
	);
};

export default ExpenseFolderList;
