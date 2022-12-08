import { menuArray } from "./data.js";
let orderArray = [];
let totalPrice = 0;

document.addEventListener("click", function (e) {
  if (e.target.dataset.add) {
    renderOrder(e.target.dataset.add);
  }
});

function renderOrder(itemId) {
  if (orderArray) {
    document.getElementById("order-container").classList.remove("hidden");
  }
  document.getElementById("ordered-items").innerHTML = getOrderHtml(itemId);
  document.getElementById("total-price").textContent =
    "$" + getTotalPrice(itemId);
}

function addItemToOrder(itemId) {
  const targetItemObj = menuArray.filter(function (item) {
    return item.id == itemId;
  })[0];
  orderArray.push(targetItemObj);
}
function getTotalPrice() {
  orderArray.forEach(function (item) {
    totalPrice += item.price;
  });
  return totalPrice;
}

function getOrderHtml(itemId) {
  addItemToOrder(itemId);
  let orderHtml = "";
  orderArray.forEach(function (item) {
    orderHtml += `
      <div class="order-list ordered-items">
        <h2 class="item-title item-total">${item.name} <button class="remove-item-btn" data-remove="${item.id}">remove</button></h2>    
        <p class="item-price right">$${item.price}</p>
      </div>
    `;
  });
  return orderHtml;
}

function getFeedHtml() {
  let menuHtml = "";
  menuArray.forEach(function (item) {
    menuHtml += `
    <div class="items">
        <div class="item-img">
            <p>${item.emoji}</p>
        </div>
        <div class="item-details">
          <h2 class="item-title">${item.name}</h2>
          <p class="item-ingredients"> ${item.ingredients}</p>
          <p class="item-price"> $${item.price}</p>
        </div>
        <div>
            <button class="item-btn" data-btn="${item.id}">
            <i class="fa-solid fa-plus" data-add="${item.id}"></i>
            </button>
        </div>
    </div>
    `;
  });
  return menuHtml;
}
function render() {
  document.getElementById("menu").innerHTML += getFeedHtml();
}
render();
