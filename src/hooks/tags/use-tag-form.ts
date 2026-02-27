import { useContext } from "react";
import { TagFormContext } from "../../context/tags/edit-tag";

export const useTagForm = () => {
	const context = useContext(TagFormContext);
	if (!context) {
		throw new Error("useTagForm must be used within a TagFormProvider");
	}
	return context;
};
