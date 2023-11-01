const calculator = {
    displayNumber: "0",
    operator: null,
    firstNumber: null,
    waitingForSecondNumber: false,
};

function updateDisplay() {
    document.querySelector("#displayNumber").innerText = calculator.displayNumber;
}

function clearCalculator() {
    calculator.displayNumber = "0";
    calculator.operator = null;
    calculator.firstNumber = null;
    calculator.waitingForSecondNumber = false;
}

function inputDigit(digit) {
    if (calculator.displayNumber === "0" || calculator.waitingForSecondNumber) {
        calculator.displayNumber = digit;
        calculator.waitingForSecondNumber = false;
    } else {
        calculator.displayNumber += digit;
    }
    updateDisplay();
}

const buttons = document.querySelectorAll(".button");
for (let button of buttons) {
    button.addEventListener("click", function (event) {
        const target = event.target;

        if (target.classList.contains("clear")) {
            clearCalculator();
            updateDisplay();
            return;
        }

        if (target.classList.contains("negative")) {
            inverseNumber();
            updateDisplay();
            return;
        }

        if (target.classList.contains("equals")) {
            performCalculation();
            updateDisplay();
            return;
        }

        if (target.classList.contains("operator")) {
            handleOperator(target.innerText);
            return;
        }

        inputDigit(target.innerText);
    });
}

function inverseNumber() {
    if (calculator.displayNumber === "0") {
        return;
    }
    calculator.displayNumber = (
        parseFloat(calculator.displayNumber) * -1
    ).toString();
    updateDisplay();
}

function handleOperator(operator) {
    if (calculator.firstNumber === null) {
        calculator.firstNumber = calculator.displayNumber;
        calculator.operator = operator;
        calculator.waitingForSecondNumber = true;
    } else {
        if (!calculator.waitingForSecondNumber) {
            performCalculation();
            calculator.operator = operator;
            calculator.waitingForSecondNumber = true;
            calculator.firstNumber = calculator.displayNumber;
            calculator.displayNumber = "0";
        }
    }
}

function performCalculation() {
    if (calculator.firstNumber !== null && calculator.operator !== null) {
        const first = parseFloat(calculator.firstNumber);
        const second = parseFloat(calculator.displayNumber);
        switch (calculator.operator) {
            case "+":
                calculator.displayNumber = (first + second).toString();
                break;
            case "-":
                calculator.displayNumber = (first - second).toString();
                break;
            // Tambahkan operator lainnya seperti *, /, dsb. jika diperlukan.
        }
        calculator.operator = null;
        calculator.firstNumber = null;
        calculator.waitingForSecondNumber = false;
    }
}