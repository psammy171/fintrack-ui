const LowestIcon = (props: React.SVGAttributes<SVGElement>) => {
	return (
		<svg
			stroke="currentColor"
			fill="currentColor"
			strokeWidth="0"
			viewBox="0 0 512 512"
			height="1em"
			width="1em"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				fill="none"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="48"
				d="m112 268 144 144 144-144M256 392V100"
			></path>
		</svg>
	);
};

export default LowestIcon;
