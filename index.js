import { menuArray } from "./data.js";
let orders = [];
const orderList = document.getElementById("order-list");
const orderContainer = document.querySelector(".order-container");
document.addEventListener("click", function (e) {
  if (e.target.dataset.btn) {
    // orderContainer.style.display = "block";
    addOrder(e.target.dataset.btn);
  }
});

function addOrder(items) {
  const targetItem = menuArray.filter(function (item) {
    return item.id === items;
  })[0];
  console.log(targetItem.id);

  if (targetItem) {
    console.log(targetItem);
  }
}

// let orderItems = "";
// if (targetTweetObj) {
//   orderItems += `
//       <li class="order-list">
//             <h2 class="item-title">${targetTweetObj.name} <span>remove</span></h2>
//             <p class="item-price">$${targetTweetObj.price}</p>
//           </li>

//     `;
// }
// // orders.push({ name: "Pizza", price: 14 });
// // let orderItems = "";
// // for (let item of orders) {
// //   orderItems += `
// //     <li class="order-list">
// //           <h2 class="item-title">${item.name} <span>remove</span></h2>
// //           <p class="item-price">$${item.price}</p>
// //         </li>

// //   `;
// // }
// orderList.innerHTML = orderItems;

function getHtml() {
  let html = "";
  menuArray.forEach(function (item) {
    html += `
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
            <button class="item-btn" data-btn="${item.id}">+</button>
        </div>
    </div>
    `;
  });
  return html;
}
function render() {
  document.getElementById("menu").innerHTML = getHtml();
}
render();
