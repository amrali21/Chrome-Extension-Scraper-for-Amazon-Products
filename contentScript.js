(() => {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.greeting === "hello") {
      alert('answering from content script, HELLO BACK!')

      productList = scrapeItems();

    }
  });
})();

const scrapeItems = () => {
  try {
    const test = document.querySelectorAll(`div[data-component-type="s-search-result"]`);
    const productList = [];

    test.forEach((el) => {
      let title = el.querySelector('.s-title-instructions-style span').innerHTML;

      let price, unit, priceUnit;

      try {
        price = el.querySelector('.a-price-whole').innerHTML.split('<span')[0];
        unit = el.querySelector('.a-price-symbol').innerHTML;

        priceUnit = `${price} ${unit}`;
      } catch {
        priceUnit = 'No Offers Available'
      }

      productList.push({ title, priceUnit });

      console.log(`${title}, ${priceUnit}`);
    })

    alert(`no of results: ${test.length}`);
    return productList;
  }
  catch (e) {
    alert(`a7a error! ${e.message}`)
  }
}