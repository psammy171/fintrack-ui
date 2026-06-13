import { formatToINR } from "@/utils/numbers";
import type { FC } from "react";
import SummarySkeleton from "./summary-skeleton";
import cn from "@/lib/cn";

interface Props {
	total: number;
	icon: React.ReactNode;
	title: string;
	fetching: boolean;
	message: string;
	textColor: string;
}

const Summary: FC<Props> = ({
	total,
	icon,
	title,
	message,
	fetching,
	textColor,
}) => {
	if (fetching) {
		return <SummarySkeleton />;
	}

	return (
		<div className="border p-4 w-full bg-gray-50/60 shadow-md rounded-sm">
			<div className="flex items-center justify-center gap-2">
				{icon}
				<div className="flex-1">
					<div className="w-full h-4 rounded-xs text-sm font-light">
						{title}
					</div>
					<div
						className={cn(
							"w-full h-6 rounded-xs mt-2 font-bold text-[18px]",
							textColor,
						)}
					>
						{formatToINR(total)}
					</div>
				</div>
			</div>
			<p
				className="h-6 font-light text-sm mt-1 p-1 rounded text-gray-700 truncate text-ellipsis"
				title={message}
			>
				{message}
			</p>
		</div>
	);
};

export default Summary;
