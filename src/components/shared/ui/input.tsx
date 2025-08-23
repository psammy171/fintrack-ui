import { type InputHTMLAttributes, forwardRef, useState } from 'react'
import CheckBox from './check-box'
import cn from '@/lib/cn'

const Input = forwardRef<
	HTMLInputElement,
	InputHTMLAttributes<HTMLInputElement>
>(({ className, type = 'text', ...props }, ref) => {
	const [show, setShow] = useState(false)

	return (
		<>
			<input
				ref={ref}
				className={cn(
					'bg-gray-300 dark:bg-gray-800 dark:text-gray-200 transition-colors duration-300 px-3 h-9 focus:outline-none rounded-xs focus:ring-2 focus:ring-indigo-600',
					className,
				)}
				type={show ? 'text' : type}
				{...props}
			/>
			{type === 'password' && (
				<span className="flex items-center mt-1 gap-2">
					<CheckBox onChange={(e) => setShow(e.target.checked)} />{' '}
					<p className="text-[14px] text-gray-700 dark:text-gray-300">
						Show password
					</p>
				</span>
			)}
		</>
	)
})

Input.displayName = 'Input'

export default Input
