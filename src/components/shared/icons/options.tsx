const OptionsIcon = (props: React.SVGAttributes<SVGElement>) => {
	return (
		<svg
			stroke="currentColor"
			fill="none"
			strokeWidth="2"
			viewBox="0 0 24 24"
			aria-hidden="true"
			height="1em"
			width="1em"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
			></path>
		</svg>
	);
};

export default OptionsIcon;
