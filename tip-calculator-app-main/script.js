const billInput = document.getElementById("bill-amount");
const peopleInput = document.getElementById("number-of-people");
const tipButtons = document.querySelectorAll(".tip-button");
const customTip = document.querySelector(".custom-tip");
const tipAmountDisplay = document.querySelector(".tip-amount .amount-display");
const totalAmountDisplay = document.querySelector(
  ".total-amount .amount-display"
);
const resetButton = document.querySelector(".reset-button");
const message = document.getElementById("message");

let billValue = 0.0;
let tipValue = 0.15; // default tip = 15%
let peopleValue = 1;

function calculateTip() {
  if (peopleValue >= 1) {
    let tipAmount = (billValue * tipValue) / peopleValue;
    let total = (billValue * (1 + tipValue)) / peopleValue;

    tipAmountDisplay.textContent = `$${tipAmount.toFixed(2)}`;
    totalAmountDisplay.textContent = `$${total.toFixed(2)}`;
  } else {
    message.textContent = "Number of people can't be zero!";
    tipAmountDisplay.textContent = "$0.00";
    totalAmountDisplay.textContent = "$0.00";
  }
}

billInput.addEventListener("input", function () {
  billValue = parseFloat(billInput.value) || 0;
  calculateTip();
});

tipButtons.forEach((button) => {
  button.addEventListener("click", function () {
    tipButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    tipValue = parseFloat(button.textContent) / 100;
    customTip.value = ""; // clear custom tip
    calculateTip();
  });
});

customTip.addEventListener("input", function () {
  tipButtons.forEach((btn) => btn.classList.remove("active"));
  tipValue = parseFloat(customTip.value) / 100 || 0;
  calculateTip();
});

peopleInput.addEventListener("input", function () {
  peopleValue = parseInt(peopleInput.value) || 0;

  if (peopleValue === 0) {
    message.style.color = "red";
    message.textContent = "Number of people can't be zero!";
  } else {
    message.textContent = "";
  }

  calculateTip();
});

resetButton.addEventListener("click", function () {
  billInput.value = "";
  peopleInput.value = "";
  customTip.value = "";
  tipButtons.forEach((btn) => btn.classList.remove("active"));
  tipValue = 0.15;
  billValue = 0.0;
  peopleValue = 1;
  tipAmountDisplay.textContent = "$0.00";
  totalAmountDisplay.textContent = "$0.00";
  message.textContent = "";
});
