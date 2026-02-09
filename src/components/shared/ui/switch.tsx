import React, { useEffect, useState, type ChangeEvent } from "react";

interface SwitchProps {
	label?: string;
	checked?: boolean;
	onChange?: (checked: boolean) => void;
	disabled?: boolean;
	className?: string;
}

const Switch: React.FC<SwitchProps> = ({
	label,
	checked = false,
	onChange,
	disabled = false,
	className,
}) => {
	const [isChecked, setIsChecked] = useState<boolean>(checked);

	const handleToggle = (e: ChangeEvent<HTMLInputElement>) => {
		const newChecked = e.target.checked;
		setIsChecked(newChecked);
		if (onChange) {
			onChange(newChecked);
		}
	};

	useEffect(() => setIsChecked(checked), [checked]);

	return (
		<span className={className}>
			<label className="inline-flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed">
				{label && <span>{label}</span>}
				<div className="relative">
					<input
						type="checkbox"
						checked={isChecked}
						onChange={handleToggle}
						disabled={disabled}
						className="opacity-0 w-0 h-0 absolute"
					/>
					{/* Track */}
					<div
						className={`w-8 h-5 rounded-[20px] transition-opacity duration-200 ${
							isChecked ? "bg-indigo-600" : "bg-gray-400"
						}`}
					>
						{/* Thumb */}
						<div
							className={`w-4 h-4 rounded-full bg-white absolute top-[2px] transition-all duration-200 ${
								isChecked ? "left-[14px]" : "left-[2px]"
							}`}
						/>
					</div>
				</div>
			</label>
		</span>
	);
};

export default Switch;
