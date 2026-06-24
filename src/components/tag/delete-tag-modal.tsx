import { useTagForm } from "@/hooks/tags";
import PopUp from "../shared/ui/pop-up";
import Button from "../shared/ui/button";
import WarnIcon from "../shared/icons/warn";

const DeleteTagModal = () => {
	const {
		deleteTagPopup,
		closeDeleteTagPopup,
		tagName,
		deleteTagId,
		deleteTag,
	} = useTagForm();

	const deleteTagHandler = () => {
		if (deleteTagId) {
			deleteTag(deleteTagId);
		}

		closeDeleteTagPopup();
	};

	return (
		<PopUp
			open={deleteTagPopup}
			close={closeDeleteTagPopup}
			title="Delete Tag"
		>
			<div>
				<p>
					Are you sure want to deletge the tag{" "}
					<span className="font-bold">{tagName}</span>
				</p>
				<div className="flex items-center gap-x-2 mt-1 mb-2">
					<WarnIcon className="inline w-6 h-6 text-yellow-500 shrink-0" />
					<span className="text-sm text-nowrap">
						Tag will be archived and referenced in the expenses.
					</span>
				</div>
				<div className="flex justify-end gap-x-4">
					<Button variant="ghost" onClick={closeDeleteTagPopup}>
						Cancel
					</Button>
					<Button variant="error" onClick={deleteTagHandler}>
						Delete
					</Button>
				</div>
			</div>
		</PopUp>
	);
};

export default DeleteTagModal;
