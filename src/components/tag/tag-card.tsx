import type { FC } from "react";
import type { Tag } from "../../types/tag";
import EditIcon from "../shared/icons/edit";
import { useTagForm } from "../../hooks/tags";
import cn from "../../lib/cn";
import { useFolders } from "@/hooks/folders/use-folders";
import FolderIcon from "../shared/icons/folder";
import PersonalIcon from "../shared/icons/personal";

interface Props {
	tag: Tag;
	index: number;
	className?: string;
}

const TagCard: FC<Props> = ({ tag, index, className }) => {
	const { ownFolders } = useFolders();
	const { openEditTagPopup } = useTagForm();
	const folder = ownFolders.find((f) => f.id === tag.folderId);

	const getShareStatus = () => {
		if (folder) {
			return (
				<span className="sm:flex items-center gap-2 text-[16px] hidden">
					<FolderIcon className="w-5 h-5 peer text-indigo-600" />
					<p>{folder.name}</p>
				</span>
			);
		}

		return (
			<span className="sm:flex items-center gap-2 text-[16px] hidden">
				<PersonalIcon className="w-5 h-5 peer text-indigo-600" />
				<p>Personal</p>
			</span>
		);
	};

	return (
		<tr
			key={tag.id}
			className={cn(
				`border-b border-b-gray-200 py-4 cursor-pointer hover:bg-gray-200 transition-colors duration-300 w-full first:border-t border-t-gray-200 ${
					index % 2 === 0 ? "bg-white" : "bg-gray-100"
				}`,
				className,
			)}
		>
			<td className="w-4 px-4 py-3 sm:py-2.5 text-sm hidden sm:table-cell">
				{index + 1}.
			</td>
			<td className="text-ellipsis line-clamp-1 px-4 py-3 sm:py-2.5 flex items-center gap-1 text-sm">
				<span className="sm:hidden bg-gray-300 rounded-lg flex items-center justify-center w-9 h-9 shrink-0 mr-2">
					{folder ? (
						<FolderIcon className="w-5 h-5 peer text-indigo-600" />
					) : (
						<PersonalIcon className="w-5 h-5 peer text-indigo-600" />
					)}
				</span>
				<span>
					<p className="text-[16px]">{tag.name}</p>
					<p className="text-gray-500 text-sm sm:hidden">
						{folder ? folder.name : "Personal"}
					</p>
				</span>
			</td>

			<td className="flex-grow px-4 py-3 sm:py-2.5">
				{getShareStatus()}
			</td>
			<td
				className="px-4 py-3 sm:py-2.5"
				onClick={() => openEditTagPopup(tag)}
				title="Edit tag value"
			>
				<EditIcon className="text-indigo-600" />
			</td>
		</tr>
	);
};

export default TagCard;
