import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import apiClient from '../lib/axios'

const Callback = () => {
	const navigate = useNavigate()
	const [searchParams] = useSearchParams()
	const code = searchParams.get('code')

	useEffect(() => {
		const authorize = async () => {
			if (!code) return

			try {
				await apiClient.get('/oauth2/callback', {
					params: {
						code,
					},
				})
			} catch (error) {
				console.log(error)
			} finally {
				navigate('/')
			}
		}

		authorize()
	}, [code, navigate])

	return (
		<div className="h-screen w-full flex items-center justify-center">
			<div>Loading...</div>
		</div>
	)
}

export default Callback
