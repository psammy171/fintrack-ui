import { useTags } from "../../hooks/tags";
import EditTagBudgetModal from "./edit-tag-budget-modal";
import TagCard from "./tag-card";

const AllTags = () => {
	const { ownedTags } = useTags();

	return (
		<>
			<table className="w-full border-collapse sm:rounded-lg sm:shadow-sm overflow-hidden">
				<thead className="hidden sm:table-header-group">
					<tr className="border-b border-b-gray-300 bg-gray-200 sticky top-0 z-10">
						<th className="text-left text-[15px] font-extrabold text-gray-500 px-4 py-3 w-4">
							#
						</th>
						<th className="text-left text-[15px] font-extrabold text-gray-500 px-4 py-3">
							Name
						</th>
						<th className="text-left text-[15px] font-extrabold text-gray-500 px-4 py-3">
							Folder
						</th>
						<th className="text-left text-[15px] font-extrabold text-gray-500 px-4 py-3">
							Actions
						</th>
					</tr>
				</thead>
				{ownedTags.length > 0 ? (
					<tbody>
						{ownedTags.map((tag, index) => (
							<TagCard
								key={tag.id}
								tag={tag}
								index={index}
								className="last:border-b-transparent"
							/>
						))}
					</tbody>
				) : (
					<div className="w-full">
						<p className="text-center my-10">
							No tags created yet!
						</p>
					</div>
				)}
			</table>
			<EditTagBudgetModal />
		</>
	);
};

export default AllTags;
