import { useTags } from "../../hooks/tags";
import EditTagBudgetModal from "./edit-tag-budget-modal";
import TagCard from "./tag-card";

const AllTags = () => {
	const { tags } = useTags();

	return (
		<>
			<div className="flex-grow h-full overflow-hidden overflow-y-scroll relative">
				<span className="flex items-center text-[18px] font-semibold px-3 py-2 gap-x-4 border-y border-y-gray-200 bg-indigo-600 text-white sticky top-0">
					<span className="w-4"></span>
					<p className="w-1/2">All Tags</p>
					{/* <p className="w-1/4">Tag Budget</p> */}
				</span>
				{tags.length > 0 ? (
					<>
						{tags.map((tag, index) => (
							<TagCard
								key={tag.id}
								tag={tag}
								index={index}
								className="last:border-b-transparent"
							/>
						))}
					</>
				) : (
					<div className="w-full">
						<p className="text-center my-10">
							No tags created yet!
						</p>
					</div>
				)}
			</div>
			<EditTagBudgetModal />
		</>
	);
};

export default AllTags;
