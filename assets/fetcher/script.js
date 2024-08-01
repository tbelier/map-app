const form = document.getElementById("fetch-data");
const sendBtn = document.getElementById("send");

const urlInput = document.getElementById("url");
const methodSelect = document.getElementById("method");

const preResult = document.querySelector("#results pre");

const bodyContent = document.getElementById("body-content");

// Check if method selected need body
methodSelect.addEventListener("input", (e) => {
	const method = methodSelect.value;

	if (method === "POST" || method === "PUT") {
		bodyContent.style.display = "block";
	} else {
		bodyContent.style.display = "none";
	}
});

form.addEventListener("submit", (event) => {
	event.preventDefault();

	const url = urlInput.value;
	const method = methodSelect.value;
	const body = bodyContent?.value || null;

	console.log("url :", url);
	console.log("method :", method);
	console.log("body :", body);

	doFetch(url, method, body);
});

function doFetch(url, method, body = null) {
	try {
		fetch(url, {
			method: method,
			body: body != null ? JSON.stringify(body) : null,
		})
			.then((response) => response.text())
			.then(async (text) => {
				try {
					// Try to parse the response as JSON
					const data = JSON.parse(text);
					// The response was a JSON object
					preResult.textContent = JSON.stringify(data);

					console.log(data);
				} catch (err) {
					// The response wasn't a JSON object
					preResult.textContent = text;
					// Do your text handling here
					console.log(text);
				}
			})
			.catch((error) => {
				preResult.textContent = error;
				console.error(error);
			});
	} catch (error) {
		preResult.textContent = error;
		console.error(error);
	}
}
