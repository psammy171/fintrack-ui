import type { FC } from "react";
import Dropdown, { type Option } from "../shared/ui/dropdown";
import Input from "../shared/ui/input";
import { useFolders } from "@/hooks/folders/use-folders";
import type { Folder } from "@/types/folder";

interface Props {
	startDate: string;
	setStartDate: (date: string) => void;
	endDate: string;
	setEndDate: (date: string) => void;
	folder: Folder | undefined;
	setFolder: (folder: Folder | undefined) => void;
}

const DashboardFilters: FC<Props> = ({
	startDate,
	setStartDate,
	endDate,
	setEndDate,
	folder,
	setFolder,
}) => {
	const { folders } = useFolders();

	const onFolderChange = (option: Option) => {
		setFolder(folders.find((f) => f.id === option.id));
	};

	const onStartDateChangeHandler = (
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		const dateString = e.target.value;
		if (!dateString || dateString.trim() === "") {
			const now = new Date();
			setStartDate(
				new Date(
					now.getFullYear(),
					now.getMonth(),
					1,
				).toLocaleDateString("en-CA"),
			);
		} else {
			setStartDate(e.target.value);
		}
	};

	const onEndDateChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const dateString = e.target.value;
		if (!dateString || dateString.trim() === "") {
			setEndDate(new Date().toLocaleDateString("en-CA"));
		} else {
			setEndDate(e.target.value);
		}
	};

	return (
		<span className="flex flex-col sm:flex-row sm:items-center gap-4 mt-4 border-b pb-4 mb-6">
			<span className="grid grid-cols-2 gap-x-4">
				<span className="flex-grow sm:flex-initial">
					<label
						htmlFor="start-date"
						className="block text-sm font-medium text-gray-700"
					>
						Start Date
					</label>
					<Input
						type="date"
						id="start-date"
						value={startDate}
						max={endDate}
						onChange={onStartDateChangeHandler}
						className="bg-white border w-full sm:w-auto"
					/>
				</span>

				<span className="flex-grow">
					<label
						htmlFor="end-date"
						className="block text-sm font-medium text-gray-700"
					>
						End Date
					</label>
					<Input
						type="date"
						id="end-date"
						value={endDate}
						min={startDate}
						onChange={onEndDateChangeHandler}
						className="bg-white border w-full sm:w-auto"
					/>
				</span>
			</span>
			<span className="flex-grow hidden sm:block"></span>
			<span className="w-full sm:w-72">
				<label className="block text-sm font-medium text-gray-700">
					Folder
				</label>
				<Dropdown
					options={[
						{ id: "0", option: "Root" },
						...folders.map((folder) => ({
							...folder,
							option: folder.name,
						})),
					]}
					value={
						folder ? { ...folder, option: folder.name } : undefined
					}
					onChange={onFolderChange}
					className="w-full bg-white border border-gray-300"
				/>
			</span>
		</span>
	);
};

export default DashboardFilters;
