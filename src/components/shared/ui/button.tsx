import { type ButtonHTMLAttributes, forwardRef } from 'react'
import Loader from './loader'
import cn from '@/lib/cn'

type CustomProps = {
	variant?: 'primary' | 'secondary' | 'ghost' | 'error'
	loading?: boolean
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & CustomProps

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{ className, children, loading = false, variant = 'primary', ...props },
		ref,
	) => {
		const getVariantStyles = () => {
			switch (variant) {
				case 'primary':
					return 'py-2 bg-indigo-600 disabled:bg-indigo-600 hover:bg-indigo-700 text-white border-2 border-indigo-600 hover:border-indigo-700 disabled:hover:border-indigo-600'
				case 'secondary':
					return 'border-2 py-[6px] border-indigo-600 hover:border-indigo-600 text-indigo-600 hover:text-indigo-600 bg-transparent disabled:bg-transparent border-indigo-600 disabled:hover:border-indigo-600 hover:border-indigo-600 hover:bg-indigo-600 dark:hover:bg-gray-500'
				case 'ghost':
					return 'py-2 text-indigo-600 hover:text-indigo-600 bg-transparent disabled:bg-transparent hover:bg-indigo-100'
				case 'error':
					return 'py-2 bg-red-700 disabled:bg-red-600 hover:bg-red-800 text-white border-2 border-red-700 disabled:hover:border-red-600 hover:border-red-800'
			}
		}

		return (
			<button
				ref={ref}
				className={cn(
					'transition-all flex justify-center cursor-pointer items-center m-1 h-9 px-3 rounded-xs disabled:cursor-not-allowed',
					getVariantStyles(),
					className,
				)}
				{...props}
			>
				{loading ? (
					<Loader
						variant={
							variant === 'primary' ? 'secondary' : 'primary'
						}
					/>
				) : (
					children
				)}
			</button>
		)
	},
)

Button.displayName = 'Button'

export default Button
