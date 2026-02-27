import cn from "@/lib/cn";
import { type InputHTMLAttributes, forwardRef } from "react";

const CheckBox = forwardRef<
	HTMLInputElement,
	InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
	return (
		<input
			ref={ref}
			type="checkbox"
			className={cn(
				"bg-gray-200 dark:bg-gray-800 p-2 border-none rounded-sm focus:ring-0 text-primary-700 cursor-pointer accent-indigo-600 focus:outline-none transition-all",
				className,
			)}
			{...props}
		/>
	);
});

CheckBox.displayName = "CheckBox";

export default CheckBox;
