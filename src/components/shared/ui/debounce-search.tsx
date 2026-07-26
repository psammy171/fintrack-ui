import cn from "@/lib/cn";
import { useRef, useState, type FC } from "react";
import Input from "./input";

interface Props {
	placeholder?: string;
	delay: number;
	className?: string;
	setLoading?: (loading: boolean) => void;
	onChange: (value: string) => void;
}

const DebounceSearch: FC<Props> = ({
	delay = 500,
	setLoading,
	onChange,
	placeholder,
	className,
}) => {
	const [search, setSearch] = useState<string>("");
	const timeOutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const onChangeHandler = (value: string) => {
		setSearch(value);

		if (setLoading) {
			setLoading(true);
		}
		debouncedSearch(value);
	};

	const debouncedSearch = (value: string) => {
		if (timeOutRef.current) {
			clearTimeout(timeOutRef.current);
		}

		const timeOutId = setTimeout(() => {
			onChange(value);
		}, delay);
		timeOutRef.current = timeOutId;
	};

	return (
		<Input
			name="user-name"
			type="text"
			id="user-name"
			value={search}
			placeholder={placeholder || "Search..."}
			maxLength={32}
			required
			onChange={(e) => onChangeHandler(e.target.value)}
			className={cn(` border-gray-300 p-2 rounded-md`, className)}
		/>
	);
};

export default DebounceSearch;
