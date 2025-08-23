import { useState, type FormEvent } from 'react'
import apiClient from '../../lib/axios'
import toast from 'react-hot-toast'
import { useTags } from '../../hooks/tags'
import Input from '../shared/ui/input'
import Button from '../shared/ui/button'

const TagForm = () => {
	const { addTag } = useTags()
	const [name, setName] = useState('')
	const [nameErr, setNameErr] = useState('')

	const submitHandler = async (e: FormEvent) => {
		e.preventDefault()
		if (name.trim().length === 0) {
			setNameErr('Please enter a tag name')
			return
		}
		if (name.trim().length < 3) {
			setNameErr('Tag name must be at least 3 characters long')
			return
		}
		setNameErr('')
		const request = apiClient.post('/tags', { name })
		toast.promise(request, {
			loading: 'Creating tag...',
			success: 'Tag created successfully!',
			error: 'Error creating tag',
		})
		try {
			const response = await request
			const tag = response.data
			addTag(tag)
			setName('')
		} catch (error) {
			console.error('Error creating tag:', error)
		}
	}

	return (
		<form
			onSubmit={submitHandler}
			className="bg-gray-100 flex gap-x-4 p-4 mb-2"
		>
			<span className="relative">
				<Input
					type="text"
					placeholder="Enter tag"
					value={name}
					// className="h-8 bg-gray-300 p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-violet-700 min-w-72"
					onFocus={() => setNameErr('')}
					onChange={(e) => setName(e.target.value)}
				/>
				{nameErr && (
					<p className="error absolute text-red-800 text-[12px]">
						{nameErr}
					</p>
				)}
			</span>
			<Button type="submit" variant="primary" className="my-0">
				Create Tag
			</Button>
		</form>
	)
}

export default TagForm
