const keysValue = ["AC", "DEL", "%", "/", "7", "8", "9", "*", "4", "5", "6", "-", "1", "2", "3", "+", "0", ".", "="];
const operators = ["%", "/", "*", "-", "+", "="];
const display = document.querySelector('.display');

function generateKeys() {
    const keys = document.querySelector('.keys');

    keysValue.forEach(element => {
        const button = document.createElement('span');
        button.textContent = element;
        button.dataset.value = element;
        if (operators.includes(element)) button.classList.add('operator');
        keys.appendChild(button);
    });
}

generateKeys();

const calculate = (btnValue) => {
    let result = display.value;
    if (result.includes("Invalid input")) {
        result = display.value = "";
    }
    if (btnValue === "=" && result !== "") {
        try {
            result = eval(result.replace("%", "/100"));
        } catch (err) {
            result = "Invalid input";
        }
    } else if (btnValue === "AC") {
        result = "";
    } else if (btnValue === "DEL") {
        result = result.toString().slice(0, -1);
    } else {
        if (btnValue === "=") return;
        if (result === "" && operators.includes(btnValue)) {
            display.value = "0" + btnValue;
            return;
        }
        result += btnValue;
    }
    display.value = result;
};

document.querySelectorAll('span').forEach(element => {
    element.addEventListener("click", el => {
        calculate(el.target.textContent);
    });
});

window.addEventListener("click", () => {
    display.focus();
})
display.addEventListener("keypress", (event) => {
    if (event.key === "Enter" || event.key === "=") {
        event.preventDefault();
        calculate("=");
    }
    if (!keysValue.includes(event.key))
        event.preventDefault();
});