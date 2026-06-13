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
