export async function request(path, opts) {
	if (!opts) opts = {};
	if (!opts.headers) opts.headers = {};
	if (opts.body) {
		opts.headers = { ...opts.headers, "content-type": "application/json" };
		opts.body = JSON.stringify(opts.body);
		if (!opts.method) opts.method = "POST";
	}
	const base = "/api"; //process.env.REACT_APP_API_URL;
	const res = await fetch(`${base}${path}`, opts);
	const text = await res.text();

	try {
		const json = JSON.parse(text);
		if (json.error) throw json.error;
		return json;
	} catch (error) {
		return text;
	}
}
