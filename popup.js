const buttonStart = document.getElementById("startButton");
const buttonClear = document.getElementById("clearButton");
const buttonExportCSV = document.getElementById("exportButton");
const savedProductsLabel = document.getElementById("savedProducts")

buttonStart.addEventListener("click", () => {
  sendMessageToService();
});

buttonClear.addEventListener("click", () => {
  chrome.storage.local.remove(["productList"], () => {
    alert('Product list has been cleared');
  })
});

chrome.storage.local.get(["productList"]).then((result) => {
  savedProductsLabel.innerHTML = result.productList ? result.productList.length : 0;
});

document.addEventListener("DOMContentLoaded", async () => {
  createDownloadLink();
});

// helper functions
const createDownloadLink = async () => {
  const result = await chrome.storage.local.get(["productList"])

  const productList = result.productList;
  let data = "Name;Unit Price"
  for (let i = 0; i < productList.length; i++) {
    data += `\n${productList[i].title}; ${productList[i].priceUnit}`;
  }

  const blob = new Blob([data], { type: 'text/plain' });

  const url = URL.createObjectURL(blob);

  buttonExportCSV.download = 'scraped_data.txt'; // Set the desired file name
  buttonExportCSV.href = url;
}

const sendMessageToService = async () => {
  const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
  await chrome.tabs.sendMessage(tab.id, { action: "scrape" });
}