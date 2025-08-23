import TagForm from './tag-form'
import AllTags from './all-tags'
import { useTags } from '../../hooks/tags'
import { useEffect } from 'react'

const TagManager = () => {
	const { fetching, fetchTags } = useTags()

	useEffect(() => {
		fetchTags()
	}, [fetchTags])

	return (
		<div className="bg-gray-100 rounded-xl max-h-[400px] overflow-hidden overflow-y-scroll flex flex-col shadow-md">
			<p className="text-2xl font-semibold px-4 pt-4">Tags</p>
			<TagForm />
			{fetching ? (
				<div className="w-full">
					<p className="text-center my-10">Loading...</p>
				</div>
			) : (
				<AllTags />
			)}
		</div>
	)
}

export default TagManager
