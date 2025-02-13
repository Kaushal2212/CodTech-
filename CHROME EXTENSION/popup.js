document.addEventListener("DOMContentLoaded", () => {
    console.log("Popup script loaded!");

    chrome.runtime.sendMessage({ action: "getTimeSpent" }, (response) => {
        console.log("Received response:", response);
        const timeList = document.getElementById("time-list");
        timeList.innerHTML = "";

        if (response && response.data) {
            for (let tabId in response.data) {
                let li = document.createElement("li");
                li.textContent = `Tab ${tabId}: ${(response.data[tabId] / 1000).toFixed(2)} seconds`;
                timeList.appendChild(li);
            }
        } else {
            timeList.innerHTML = "<li>No data available</li>";
        }
    });
});
