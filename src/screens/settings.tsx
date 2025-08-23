import SettingsIcon from '../components/shared/icons/settings'
import TagManager from '../components/tag/tag-manager'

const Settings = () => {
	return (
		<div className="max-w-[1024px] mx-auto pt-12">
			<span className="flex items-center gap-x-2">
				<SettingsIcon className="text-3xl" />
				<p className="text-3xl my-4 font-bold">Settings</p>
			</span>

			<TagManager />
		</div>
	)
}

export default Settings
