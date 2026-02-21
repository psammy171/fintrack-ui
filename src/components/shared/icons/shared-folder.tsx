const SharedFolderIcon = (props: React.SVGAttributes<SVGElement>) => {
	return (
		<svg
			stroke="currentColor"
			fill="currentColor"
			strokeWidth="0"
			viewBox="0 0 24 24"
			aria-hidden="true"
			height="1em"
			width="1em"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			{/* The Main Folder Body (Uses prop/CSS color) */}
			<path d="M19.906 9c.382 0 .749.057 1.094.162V9a3 3 0 0 0-3-3h-3.879a.75.75 0 0 1-.53-.22L11.47 3.66A2.25 2.25 0 0 0 9.879 3H6a3 3 0 0 0-3 3v3.162A3.756 3.756 0 0 1 4.094 9h15.812ZM4.094 10.5a2.25 2.25 0 0 0-2.227 2.568l.857 6A2.25 2.25 0 0 0 4.951 21H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-2.227-2.568H4.094Z"></path>

			{/* The White Asterisk (*) */}
			<path
				fill="white"
				d="M16.5 13a.5.5 0 0 1 .5.5v1.134l.982-.567a.5.5 0 1 1 .5.866L17.5 15.5l.982.567a.5.5 0 1 1-.5.866l-.982-.567V17.5a.5.5 0 1 1-1 0v-1.134l-.982.567a.5.5 0 1 1-.5-.866l.982-.567-.982-.567a.5.5 0 1 1 .5-.866l.982.567V13.5a.5.5 0 0 1 .5-.5Z"
			></path>
		</svg>
	);
};

export default SharedFolderIcon;
