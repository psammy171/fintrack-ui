import type { FC } from "react";
import type { Tag } from "../../types/tag";
import EditIcon from "../shared/icons/edit";
import { useTagForm } from "../../hooks/tags";
import cn from "../../lib/cn";
import { useFolders } from "@/hooks/folders/use-folders";
import SharedFolderIcon from "../shared/icons/shared-folder";

interface Props {
	tag: Tag;
	index: number;
	className?: string;
}

const TagCard: FC<Props> = ({ tag, index, className }) => {
	const { ownFolders } = useFolders();
	const { openEditTagPopup } = useTagForm();

	return (
		<div
			key={tag.id}
			className={cn(
				`border-b border-b-gray-200 py-1.5 pl-4 pr-5 cursor-pointer hover:bg-gray-200 transition-colors duration-300 flex items-center group gap-x-4 ${
					index % 2 === 0 ? "bg-white" : "bg-gray-100"
				}`,
				className,
			)}
		>
			<span className="w-4 inline-block">{index + 1}.</span>
			<span className="text-ellipsis line-clamp-1"> {tag.name}</span>
			{tag.folderId && (
				<span className="relative w-4 h-4">
					<SharedFolderIcon className="w-4 h-4 peer" />
					<div className="hidden peer-hover:block whitespace-nowrap absolute shadow-md rounded-md bg-gray-200 border border-gray-400 px-2 text-gray-700 bottom-5 left-1/2 -translate-x-1/2">
						{ownFolders.find((f) => f.id === tag.folderId)?.name ||
							"Folder"}
					</div>
				</span>
			)}
			{/* {tag.budget && tag.tagBudgetPeriod && (
				<span className="w-1/4">
					{formatToINR(tag.budget)} /{" "}
					{getDisplayValueOfEnum(tag.tagBudgetPeriod)}
				</span>
			)} */}
			<span className="flex-grow"></span>
			<span
				className="shrink-0 w-7 h-7 rounded-lg bg-gray-300 flex items-center justify-center invisible group-hover:visible"
				onClick={() => openEditTagPopup(tag)}
				title="Edit tag value"
			>
				<EditIcon className="text-blue-800" />
			</span>
			{/* <span
				className="w-7 h-7 rounded-lg bg-gray-300 flex items-center justify-center invisible group-hover:visible"
				onClick={() => openEditTagBudgetPopup(tag)}
				title="Edit tag budget"
			>
				<GoalIcon className="text-[#11710D]" />
			</span> */}
		</div>
	);
};

export default TagCard;
