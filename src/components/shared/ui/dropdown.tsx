import { useEffect, useRef, useState } from 'react'
import cn from '@/lib/cn'
import ArrowIcon from '../icons/arrow'

type Option = {
	id: string
	option: string
} & Record<string, unknown>

interface Props {
	placeholder?: string
	options: Option[]
	value?: Option
	className?: string
	onChange?: (value: Option) => void
}

const Dropdown = ({
	options,
	placeholder,
	className,
	value,
	onChange,
}: Props) => {
	const ref = useRef<HTMLDivElement>(null)
	// const [isTop, setIsTop] = useState<boolean>(false)
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [selectedValue, setSelectedValue] = useState<Option | undefined>()

	useEffect(() => {
		setSelectedValue(value)
	}, [value])

	useEffect(() => {
		const clickHandler = (e: Event) => {
			if (!ref.current?.contains(e.target as Node)) closeDropdown()
		}

		if (isOpen) document.addEventListener('click', clickHandler)
		else document.removeEventListener('click', clickHandler)
	}, [isOpen])

	const openDropdown = () => {
		setIsOpen(true)
	}

	const closeDropdown = () => {
		setIsOpen(false)
	}

	const onSelectValue = (val: Option) => {
		setSelectedValue(val)
		if (onChange) onChange(val)
		closeDropdown()
	}

	return (
		<div className="relative" ref={ref}>
			<div
				className={cn(
					'bg-gray-300 dark:bg-gray-800 dark:text-gray-300 transition-colors duration-300 px-3 h-9 border-none rounded-xs focus:ring-indigo-600 focus:ring-2 flex items-center cursor-pointer',
					className,
				)}
				tabIndex={1}
				onClick={openDropdown}
			>
				{selectedValue?.option
					? selectedValue.option
					: placeholder
					? placeholder
					: 'Select'}
			</div>
			<ArrowIcon
				className={`absolute top-2 right-2 dark:text-gray-300 ${
					isOpen ? 'rotate-0' : 'rotate-180'
				} transition-transform duration-300`}
			/>
			{/* ${false ? '-top-20' : 'top-10'} */}
			<div
				className={`w-full bg-gray-200 dark:bg-gray-700 shadow-md absolute max-h-72 overflow-y-scroll ${
					isOpen ? 'visible' : 'hidden'
				} 
				 top-10 rounded-xs`}
			>
				{options.map((opt, indx) => (
					<p
						key={opt.id}
						className={`px-2 py-1 dark:text-gray-300 ${
							selectedValue?.id === opt.id
								? 'bg-violet-700/20'
								: 'hover:bg-violet-100'
						} cursor-pointer ${
							indx !== 0 ? 'border-t' : ''
						} border-t-gray-300 dark:border-t-gray-500`}
						onClick={() => onSelectValue(opt)}
					>
						{opt.option}
					</p>
				))}
			</div>
		</div>
	)
}

export default Dropdown
