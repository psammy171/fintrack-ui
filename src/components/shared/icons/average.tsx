const AverageIcon = (props: React.SVGAttributes<SVGElement>) => {
	return (
		<svg
			stroke="currentColor"
			fill="none"
			strokeWidth="2"
			viewBox="0 0 24 24"
			strokeLinecap="round"
			strokeLinejoin="round"
			height="1em"
			width="1em"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path d="M3 3v16a2 2 0 0 0 2 2h16"></path>
			<path d="M18 17V9"></path>
			<path d="M13 17V5"></path>
			<path d="M8 17v-3"></path>
		</svg>
	);
};

export default AverageIcon;
