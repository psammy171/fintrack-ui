import type { FC } from 'react'

interface Props {
	errorMessage: string
}

const ErrorMessage: FC<Props> = ({ errorMessage }) => {
	return <p className="text-red-800 text-right text-[13px]">{errorMessage}</p>
}

export default ErrorMessage
