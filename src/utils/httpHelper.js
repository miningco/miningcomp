export function GetAsync(request) {
	return fetch(request.url)
		.then(checkStatus)
		.then(formatResponse);
}

function checkStatus(res) {
	if (res.ok) {
		return res;
	} else {
		console.error(res.status, res.statusText);
		throw new Error('Error in api request');
	}
}

function formatResponse(res) {
	return res.json();
}