import { useTags } from "../../hooks/tags";
import EditTagBudgetModal from "./edit-tag-budget-modal";
import TagCard from "./tag-card";

const AllTags = () => {
	const { ownedTags } = useTags();

	return (
		<>
			<div className="flex-grow h-full overflow-hidden overflow-y-scroll relative">
				{ownedTags.length > 0 ? (
					<>
						{ownedTags.map((tag, index) => (
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
