import { type FormEvent } from "react";
import { useTagForm } from "../../hooks/tags";
import Input from "../shared/ui/input";
import PopUp from "../shared/ui/pop-up";
import Button from "../shared/ui/button";

const TagForm = () => {
	const {
		tagFormPopup,
		closeTagFormPopup,
		editTagId,
		tagName,
		setTagName,
		tagError,
		setTagError,
		createTag,
		updateTagValue,
	} = useTagForm();

	const submitHandler = async (e: FormEvent) => {
		e.preventDefault();

		if (editTagId) {
			updateTagValue();
		} else {
			createTag();
		}
	};

	return (
		<PopUp
			open={tagFormPopup}
			close={closeTagFormPopup}
			title={editTagId ? "Edit Tag" : "Create Tag"}
		>
			<form onSubmit={submitHandler} className="">
				<span>
					<Input
						type="text"
						placeholder="Enter tag"
						value={tagName}
						className="w-full"
						onFocus={() => setTagError("")}
						onChange={(e) => setTagName(e.target.value)}
					/>
					{tagError && (
						<p className=" text-red-800 text-[13px] text-right">
							{tagError}
						</p>
					)}
				</span>
				<Button className="w-full mx-0 mt-4">
					{editTagId ? "Update Tag" : "Create Tag"}
				</Button>
			</form>
		</PopUp>
	);
};

export default TagForm;
