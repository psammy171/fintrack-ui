const GoalIcon = (props: React.SVGAttributes<SVGElement>) => {
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
			<path d="M12 13V2l8 4-8 4"></path>
			<path d="M20.561 10.222a9 9 0 1 1-12.55-5.29"></path>
			<path d="M8.002 9.997a5 5 0 1 0 8.9 2.02"></path>
		</svg>
	)
}

export default GoalIcon
