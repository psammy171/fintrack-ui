export function getDisplayDate(date: string): string {
	const d = new Date(date);

	if (isNaN(d.getTime())) {
		return "";
	}

	return new Intl.DateTimeFormat("en-GB", {
		day: "numeric",
		month: "long",
		year: "numeric",
	}).format(d);
}

export function getShortDisplayDate(dateString: string): string {
	const date = new Date(dateString);

	const months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];

	const day = date.getDate();
	const month = months[date.getMonth()];

	return `${day} ${month}`;
}
