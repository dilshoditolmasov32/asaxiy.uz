const productApi_Url = "https://fakestoreapi.com/products";

async function card(data) {
  let query = new URLSearchParams(window.location.search);
  let id = query.get("id");
  let products = await fetch(`${data}/${id}`);

  products
    .json()
    .then((result) => checkId(result))
    .catch((Error) => console.log("xatolik bor"))
    .finally(() => {
      loading.style.background = "none";
    });
}
card(productApi_Url);
