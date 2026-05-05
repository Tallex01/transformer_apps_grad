const formEl = document.getElementById("ask-form");
const inputEl = document.getElementById("input-text");
const statusEl = document.getElementById("status");
const responseWithoutEl = document.getElementById("response-without");
const responseWithEl = document.getElementById("response-with");

async function fetchEndpoint(endpoint, text) {
	const query = new URLSearchParams({ text });
	const response = await fetch(`/${endpoint}?${query.toString()}`);
	if (!response.ok) {
		throw new Error(`${endpoint} failed with status ${response.status}`);
	}
	const result = await response.json();
	return typeof result === "string" ? result : JSON.stringify(result);
}

formEl.addEventListener("submit", async (event) => {
	event.preventDefault();

	const text = inputEl.value.trim();
	if (!text) {
		statusEl.textContent = "Please enter text first.";
		return;
	}

	statusEl.textContent = "Submitting...";
	responseWithoutEl.textContent = "-";
	responseWithEl.textContent = "-";

	const [withoutResult, withResult] = await Promise.allSettled([
		fetchEndpoint("ask_without", text),
		fetchEndpoint("ask_with", text),
	]);

	responseWithoutEl.textContent =
		withoutResult.status === "fulfilled" ? withoutResult.value : `Error: ${withoutResult.reason.message}`;
	responseWithEl.textContent =
		withResult.status === "fulfilled" ? withResult.value : `Error: ${withResult.reason.message}`;

	statusEl.textContent = "Done.";
});