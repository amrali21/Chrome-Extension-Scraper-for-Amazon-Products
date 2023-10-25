chrome.runtime.onMessage.addListener((request) => {
  if (request.action === "scrape") {
    scrapeItems();
  }
})

const scrapeItems = async () => {
  try {
    const searchResults = document.querySelectorAll(`div[data-component-type="s-search-result"]`);
    const productList = [];

    searchResults.forEach((el) => {

      let title = el.querySelector('.s-title-instructions-style span').innerHTML;
      let price, unit, priceUnit;

      try {
        price = el.querySelector('.a-price-whole').innerHTML.split('<span')[0];
        unit = el.querySelector('.a-price-symbol').innerHTML;
        priceUnit = `${price} ${unit}`;
      } catch {
        priceUnit = 'No Offers Available';
      }

      productList.push({ title, priceUnit });
    });

    const storedProducts = await chrome.storage.local.get(["productList"])
    const newProductList = storedProducts.productList ? storedProducts.productList.concat(productList) : productList

    chrome.storage.local.set({ productList: newProductList });
    alert('Products stored successfully')
  }
  catch (e) {
    alert(`error! ${e.message}`)
  }
}