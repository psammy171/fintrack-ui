import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import apiClient from '../lib/axios'
import Login from '../components/shared/ui/login'

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
				navigate('/expenses')
			} catch (error) {
				console.log(error)
			}
		}

		authorize()
	}, [code, navigate])

	return (
		<>
			<div>Loading...</div>
			<Login />
		</>
	)
}

export default Callback
