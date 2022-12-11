import { menuArray } from "./data.js";
const orderContainer = document.getElementById("order-container");
const modalContainer = document.getElementById("modal-container");
const paymentForm = document.getElementById("payment-form");
const completeOrderBtn = document.getElementById("complete-order-btn");
const payBtn = document.getElementById("pay-btn");
const allStars = document.querySelectorAll(".star");
const currentRating = document.querySelector(".current-rating");
const ratingContainer = document.querySelector(".rating-container");
const orderAmount = document.getElementById("order-amount");

const starRating = document.getElementById("star-rating");
let orderArray = [];
let totalPrice = 0;
let count = 0;

// ---------- EventListeners ----------

document.addEventListener("click", function (e) {
  if (e.target.dataset.add) {
    renderOrder(e.target.dataset.add);
    // add();
  } else if (e.target.id === "complete-order-btn") {
    showModalContainer();
  } else if (e.target.id === "rate-btn") {
    feedbackMessage();
  }
});
paymentForm.addEventListener("submit", paymentBtnOption);

allStars.forEach((star, i) => {
  star.addEventListener("click", function () {
    let currentStarLevel = i + 1;
    currentRating.innerHTML = `${currentStarLevel} of 5`;
    allStars.forEach((star, j) => {
      if (currentStarLevel >= j + 1) {
        star.innerHTML = "&#9733";
      } else {
        star.innerHTML = "&#9734";
      }
    });
  });
});

// ---------- EventListeners Functions ----------

function renderOrder(itemId) {
  // if (orderArray.length > 0) {
  //   orderContainer.classList.remove("hidden");
  // }
  orderContainer.classList.remove("hidden");
  document.getElementById("ordered-items").innerHTML = getOrderHtml(itemId);
  document.getElementById("total-price").textContent = "$" + getTotalPrice();
}

function showModalContainer() {
  setTimeout(() => {
    modalContainer.classList.remove("hidden");
  }, 2000);

  document.getElementById("order-amount").textContent = "$" + getTotalPrice();
}

function paymentBtnOption(e) {
  e.preventDefault();
  const paymentFormData = new FormData(paymentForm);
  const name = paymentFormData.get("CustomerName");
  setTimeout(() => {
    orderContainer.classList.add("hidden");
    modalContainer.classList.add("hidden");
    ratingContainer.classList.remove("hidden");
    document.querySelector(
      ".rating-title"
    ).innerHTML = `<h1>Thanks, ${name}! your order is on its way!</h1>`;
  }, 3000);
}
function feedbackMessage() {
  starRating.innerHTML = `<p class="current-rating">Thanks for your feedback!</p>`;

  setTimeout(function () {
    ratingContainer.classList.add("hidden");
    paymentForm.reset();
  }, 3000);

  orderArray = [];
  totalPrice = 0;
}

// ---------- Add item to the order and render order ----------

function addItemToOrder(itemId) {
  const targetItemObj = menuArray.filter(function (item) {
    return item.id == itemId;
  })[0];
  orderArray.push(targetItemObj);
}

function getOrderHtml(itemId) {
  addItemToOrder(itemId);
  let orderHtml = "";
  // const newItemsArray = orderArray.map((item) => [item.id, item]);
  // const newMap = new Map(newItemsArray);
  // const iterator = newMap.values();
  // const uniqueItems = [...iterator];
  // if (uniqueItems.length > 0) {
  //   uniqueItems.forEach((item) => {
  //     orderHtml += `
  //       <div class="order-list ordered-items">
  //        <h2 class="item-title item-total">${item.name} <button class="remove-item-btn" data-remove="${item.id}">remove</button></h2>
  //        <p class="item-price right">() $${item.price}</p>
  //       </div>
  //   `;
  //   });
  // }
  orderArray.forEach((item) => {
    orderHtml += `
    <div class="order-list ordered-items">
      <h2 class="item-title item-total">${item.name} <button class="remove-item-btn" data-remove="${item.id}">remove</button></h2>
      <p class="item-price right">$${item.price}</p>
    </div>
    `;
  });
  return orderHtml;
}
function getTotalPrice() {
  totalPrice = 0;
  orderArray.forEach(function (item) {
    totalPrice += item.price;
  });
  return totalPrice;
}

// ---------- Render the menu ----------
function getFeedHtml() {
  let menuHtml = "";
  menuArray.forEach(function (item) {
    menuHtml += `
    <div class="items">
        <span class="item-emoji">${item.emoji}</span>
        <div class="item-details">
          <h2 class="item-title">${item.name}</h2>
          <p class="item-ingredients"> ${item.ingredients}</p>
          <p class="item-price"> $${item.price}</p>
        </div>
        <button class="item-btn" data-btn="${item.id}">
            <i class="fa-solid fa-plus" data-add="${item.id}"></i>
            </button>
    </div>
    `;
  });
  return menuHtml;
}
function renderMenu() {
  document.getElementById("menu").innerHTML += getFeedHtml();
}
renderMenu();
