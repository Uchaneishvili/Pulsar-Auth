export default class FormatData {
	static formatDateTime(val: string) {
		if (val) {
			return new Intl.DateTimeFormat("en-GB", {
				year: "numeric",
				month: "numeric",
				day: "2-digit",
				hour: "2-digit",
				minute: "2-digit",
			}).format(new Date(val));
		}
		return "";
	}
}
