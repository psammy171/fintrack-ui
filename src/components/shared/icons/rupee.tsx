const RupeeIcon = (props: React.SVGAttributes<SVGElement>) => {
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
			<path d="M18 5h-11h3a4 4 0 0 1 0 8h-3l6 6"></path>
			<path d="M7 9l11 0"></path>
		</svg>
	);
};

export default RupeeIcon;
