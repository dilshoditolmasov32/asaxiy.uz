const productApi_Url = "https://fakestoreapi.com/products";
const products = document.querySelector(".products");
const loading = document.querySelector(".loading");
let array = [];
console.log(productApi_Url);

Array(12).fill("");

async function card(data) {
  let products = await fetch(data);

  products
    .json()
    .then((result) => {
      productCard(result);
      createCategory(result);
    })
    .catch((Error) => console.log("xatolik bor"))
    .finally(() => {
      loading.style.background = "none";
    });
}
card(productApi_Url);

function productCard(dataProduct) {
  while (products.firstChild) {
    products.firstChild.remove();
  }
  let fragment = document.createDocumentFragment();
  dataProduct.forEach((element) => {
    let card = document.createElement("div");
    card.classList.add("product");
    card.innerHTML = ` 
    <div class="item-image"><img data-id=${element.id} name="product-name" src="${element.image}" alt="productCard" /></div>
    <p class="item-text">"${element.description}</p>
    <div><img  id="baholash" src="./images/icon-beshYulduz.png"  alt="baholash" /></div>
    <span class="price-product"> ${element.price}  ming so'm </span>
    <button class="btn-price">
      <a href="#">697 000 so'm x 12 oy</a>
    </button>
    <div class="xarid">
      <button class="xarid-qilish">Hoziroq xarid qilish</button>
      <p><img src="./images/savatcha.png" alt="savatcha" /></p>
    </div>
    <div class="more-product-about">
      <div id="new">Yangi</div>
      <div><img src="./images/like.png" alt="like" /></div>
    </div>
`;
    fragment.appendChild(card);
  });
  products.appendChild(fragment);
}

//////// BACKTOP

const ToBacktop = document.querySelector(".backtop");

window.addEventListener("scroll", () => {
  ToBacktop.classList.toggle("active");
});

const category = document.querySelector(".category");

function createCategory(data) {
  let categoriesItem = Array.from(new Set(data.map((el) => el.category)));
  categoriesItem.forEach((element) => {
    let option = document.createElement("option"); // createElement() funksiyasini to'g'irladim
    option.innerHTML = element;
    option.value = element;
    category.appendChild(option);
  });
}

category.addEventListener("change", async (e) => {
  let value = e.target.value;
  let products = await fetch(`${productApi_Url}/category/${value}`);
  products
    .json()
    .then((result) => productCard(result))
    .catch((Error) => console.log("xatolik bor"))
    .finally(() => {
      loading.style.background = "none";
    });
});

const singleRoute = (id) => {
  window.open(`/pages/single.html?=${id}`, "_self");
};

products.addEventListener("click", (e) => {
  if (e.target.name == "product-name") {
    let id = e.target.dataset.id;
    singleRoute(id);
  }
});
