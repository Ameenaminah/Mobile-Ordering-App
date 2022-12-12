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
    addOrder(+e.target.dataset.add);
  } else if (e.target.dataset.minus) {
    removeOrder(+e.target.dataset.minus);
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

function addOrder(itemId) {
  addItemToOrder(itemId);

  if (orderArray.length > 0) {
    orderContainer.classList.remove("hidden");
  }

  document.getElementById("ordered-items").innerHTML = getOrderHtml();
  document.getElementById("total-price").textContent = "$" + getTotalPrice();
}

function removeOrder(itemId) {
  removeItemFromOrder(itemId);

  // console.log("orderArray => ", orderArray);
  if (orderArray.length <= 0) {
    orderContainer.classList.add("hidden");
    return;
  }

  document.getElementById("ordered-items").innerHTML = getOrderHtml();
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
  }, 2000);
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
  const targetFilteredItems = menuArray.filter((item) => item.id === itemId);
  if (isArrayNullOrEmpty(targetFilteredItems)) {
    return;
  }

  const currentOrderLines = orderArray.filter((item) => item.id === itemId);

  if (isArrayNullOrEmpty(currentOrderLines)) {
    orderArray.push({
      id: itemId,
      count: 1,
      price: targetFilteredItems[0].price,
    });
    return;
  }

  const currentOrderLine = currentOrderLines[0];
  orderArray = orderArray.filter((item) => item.id !== itemId);
  orderArray.push({
    id: itemId,
    count: currentOrderLine.count + 1,
    price: targetFilteredItems[0].price,
  });
}

function removeItemFromOrder(itemId) {
  const targetFilteredItems = menuArray.filter((item) => item.id === itemId);
  if (isArrayNullOrEmpty(targetFilteredItems)) {
    return;
  }

  const currentOrderLines = orderArray.filter((item) => item.id === itemId);

  if (isArrayNullOrEmpty(currentOrderLines)) {
    return;
  }

  const currentOrderLine = currentOrderLines[0];
  orderArray = orderArray.filter((item) => item.id !== itemId);

  if (currentOrderLine.count > 1) {
    orderArray.push({
      id: itemId,
      count: currentOrderLine.count - 1,
      price: targetFilteredItems[0].price,
    });
  }
}

function isArrayNullOrEmpty(array) {
  return !array || array.length === 0;
}

function getOrderHtml() {
  let orderHtml = "";
  orderArray.forEach((orderItem) => {
    const targetFilteredItems = menuArray.filter(
      (item) => item.id === orderItem.id
    );
    if (isArrayNullOrEmpty(targetFilteredItems)) {
      // don't render anything
      return;
    }

    const targetFilteredItem = targetFilteredItems[0];
    // <button class="remove-item-btn" data-remove="${targetFilteredItem.id}">remove</button>
    orderHtml += `
    <div class="order-list ordered-items">
      <h2 class="item-title item-total">${targetFilteredItem.name}</h2>
      <p class="item-price right">$${targetFilteredItem.price} <span>(x ${orderItem.count})</span></p>
    </div>
    `;
  });

  return orderHtml;
}

function getTotalPrice() {
  totalPrice = 0;
  orderArray.forEach(function (item) {
    totalPrice += item.price * item.count;
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
          <p class="item-ingredients"> ${item.ingredients.join(", ")}</p>
          <p class="item-price"> $${item.price}</p>
        </div>
        <div class="button-group">
          <button class="item-btn" data-minus="${item.id}">
            <i class="fa-solid fa-minus" data-minus="${item.id}"></i>
          </button>
          <button class="item-btn" data-add="${item.id}">
            <i class="fa-solid fa-plus" data-add="${item.id}"></i>
          </button>
        </div>
    </div>
    `;
  });
  return menuHtml;
}

function renderMenu() {
  document.getElementById("menu").innerHTML += getFeedHtml();
}

renderMenu();
