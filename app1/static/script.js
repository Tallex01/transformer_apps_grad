const formEl = document.getElementById("classify-form");
const inputEl = document.getElementById("input-text");
const statusEl = document.getElementById("status");
const responseEl = document.getElementById("response-text");

formEl.addEventListener("submit", async (event) => {
	event.preventDefault();

	const text = inputEl.value.trim();
	if (!text) {
		statusEl.textContent = "Please enter text first.";
		return;
	}

	statusEl.textContent = "Submitting...";
	responseEl.textContent = "-";

	try {
		const query = new URLSearchParams({ text });
		const response = await fetch(`/classify?${query.toString()}`);

		if (!response.ok) {
			throw new Error(`Request failed with status ${response.status}`);
		}

		const result = await response.json();
		responseEl.textContent = typeof result === "string" ? result : JSON.stringify(result);
		statusEl.textContent = "Done.";
	} catch (error) {
		statusEl.textContent = "Could not get model response.";
		console.error(error);
	}
});
