import { data } from "./data";

const productsContainer = document.querySelector(".products");
const searchInput = document.querySelector(".search");
const categoriesContainer = document.querySelector(".categories");
const priceRange = document.querySelector(".priceRange");
const priceValue = document.querySelector(".priceValue");

const displayProducts = (filteredPoducts) => {
  productsContainer.innerHTML = filteredPoducts
    .map((product) => {
      return `
      <div class="product">
        <img src=${product.img} alt="">
        <span class="name">${product.name}</span>
        <span class="productPrice">$ ${product.price}</span>
      </div> 
    `;
    })
    .join("");
};
displayProducts(data);

searchInput.addEventListener("keyup", (e) => {
  const value = e.target.value.toLowerCase();

  if (value) {
    displayProducts(
      data.filter((item) => item.name.toLowerCase().indexOf(value) !== -1)
    );
  } else {
    // console.log('product not found');
    // productsContainer.innerHTML = `<h1>no item found</h1>`
    displayProducts(data);
  }
});

const setCategories = () => {
  const allCats = data.map((item) => item.cat);
  const categories = [
    "All",
    ...allCats.filter((item, i) => {
      return allCats.indexOf(item) === i;
    }),
  ];

  categoriesContainer.innerHTML = categories
    .map((category) => {
      return `
      <span class="category">${category}</span>
    `;
    })
    .join("");

  categoriesContainer.addEventListener("click", (e) => {
    const selectedCategory = e.target.textContent;

    selectedCategory === "All"
      ? displayProducts(data)
      : displayProducts(data.filter((item) => item.cat === selectedCategory));
  });
};

const setPrices = () => {
  const priceList = data.map((item) => item.price);
  const minPrice = Math.min(...priceList);
  const maxPrice = Math.max(...priceList);

  priceRange.min = minPrice;
  priceRange.max = maxPrice;
  priceRange.value = maxPrice;
  priceValue.textContent = "$" + maxPrice;

  priceRange.addEventListener("input", (e) => {
    priceValue.textContent = "$" + e.target.value;
    displayProducts(data.filter((item) => item.price <= e.target.value))
  });

  // The redue method is preferable with big arrays
  // const max = priceList.reduce((a, b) => Math.max(a, b), -Infinity);
  // const min = priceList.reduce((a, b) => Math.min(a, b), +Infinity);
  // console.log(min);
  // console.log(max);
};

setCategories();
setPrices();
