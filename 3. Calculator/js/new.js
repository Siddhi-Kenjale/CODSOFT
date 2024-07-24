// script.js
document.addEventListener("DOMContentLoaded", function () {
    const display = document.getElementById("display");
    const buttons = Array.from(document.querySelectorAll(".btn"));
    let currentInput = "";
    let operator = null;
    let previousInput = "";

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const value = button.innerText;

            if (value === "C") {
                currentInput = "";
                previousInput = "";
                operator = null;
                updateDisplay("0");
            } else if (value === "←") {
                currentInput = currentInput.slice(0, -1);
                updateDisplay(currentInput || "0");
            } else if (["+", "-", "*", "/"].includes(value)) {
                if (currentInput === "") return;
                if (previousInput !== "") {
                    currentInput = calculate(previousInput, currentInput, operator);
                    updateDisplay(currentInput);
                }
                operator = value;
                previousInput = currentInput;
                currentInput = "";
                updateDisplay(`${previousInput} ${operator}`);
            } else if (value === "=") {
                if (currentInput === "" || previousInput === "") return;
                currentInput = calculate(previousInput, currentInput, operator);
                updateDisplay(currentInput);
                previousInput = "";
                operator = null;
            } else {
                currentInput += value;
                updateDisplay(currentInput);
            }
        });
    });

    function updateDisplay(value) {
        display.innerText = value;
    }

    function calculate(a, b, operator) {
        const numA = parseFloat(a);
        const numB = parseFloat(b);
        if (operator === "+") return (numA + numB).toString();
        if (operator === "-") return (numA - numB).toString();
        if (operator === "*") return (numA * numB).toString();
        if (operator === "/") return (numA / numB).toString();
    }
});
