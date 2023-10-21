const button = document.getElementById("startButton")

button.addEventListener("click", () => {
  alert('start button has been clickedddd')
  sendMessageToService();
});


const sendMessageToService = async () => {
  const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
  const response = await chrome.tabs.sendMessage(tab.id, { greeting: "hello" });
}
