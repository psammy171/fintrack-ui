export const getDisplayValueOfEnum = (enumValue: string): string => {
	return (
		enumValue.charAt(0).toUpperCase() +
		enumValue.slice(1).replace(/_/g, ' ').toLowerCase()
	)
}
