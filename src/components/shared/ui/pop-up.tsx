import type { FC } from 'react'
import type React from 'react'
import CloseIcon from '../icons/close'

interface Props {
	open: boolean
	title?: string
	close: () => void
	children: React.ReactNode
}

const PopUp: FC<Props> = ({ open, close, children, title }) => {
	return (
		<div
			className={`inset-0 absolute top-0 left-0 z-50 bg-black/90 flex items-center justify-center ${
				open ? 'visible opacity-100' : 'invisible opacity-0'
			}`}
		>
			<div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full relative">
				{title ? (
					<h2 className="text-lg font-semibold mb-1">{title}</h2>
				) : null}
				<CloseIcon
					className="absolute top-2 right-2 cursor-pointer w-6 h-6 text-gray-400 hover:text-gray-500 transition-colors"
					onClick={close}
				/>
				{children}
			</div>
		</div>
	)
}

export default PopUp
