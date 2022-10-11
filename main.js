const operationText = document.querySelector("#previous-operation")
const currentText = document.querySelector("#current-operation")
const buttons = document.querySelectorAll("#buttons button")

class Calcular {
    constructor(operationText, currentText) {
        this.operationText = operationText;
        this.currentText = currentText;
        this.current = "";
    }

    addDigit(digit) {

        if (digit === "." && this.currentText.innerText.includes(".")) {
            return;
        }
        this.current = digit
        this.updatescreen()
    }

    processOperation(operation) {
        if (this.currentText.innerText === "" && operation !== "C") {

            if (this.operationText.innerText !== "") {
                this.changeoperation(operation);
            }

            return;
        }

        let operationValue;
        let previous = +this.operationText.innerText.split(" ")[0]
        let currentsPre = +this.currentText.innerText;

        switch (operation) {
            case "+":
                operationValue = previous + currentsPre;
                this.updatescreen(operationValue, operation, currentsPre, previous)
                break;

            case "-":
                operationValue = previous - currentsPre;
                this.updatescreen(operationValue, operation, currentsPre, previous)
                break;

            case "x":
                operationValue = previous * currentsPre;
                this.updatescreen(operationValue, operation, currentsPre, previous)
                break;

            case "/":
                operationValue = previous / currentsPre;
                this.updatescreen(operationValue, operation, currentsPre, previous)
                break;

            case "DEL":
                this.processDelOperator();
                break;

            case "CE":
                this.processClearCurrentOperator();
                break;

            case "C":
                this.processClearOperator();
                break;
            case "=":
                this.processEqualOperator();
                break;

            default:
                return;

        }
    }

    updatescreen(
        operationValue = null,
        operation = null,
        currentsPre = null,
        previous = null
    ) {
        if (operationValue == null) {
            this.currentText.innerText += this.current;
        } else {
            if (previous === 0) {
                operationValue = currentsPre;
            }

            this.operationText.innerText = `${operationValue} ${operation}`;
            this.currentText.innerText = "";
        }
    }

    changeoperation(operation) {
        const mathOperations = ["x", "-", "+", "/"];

        if (!mathOperations.includes(operation)) {
            return;
        }

        this.operationText.innerText =
            this.operationText.innerText.slice(0, -1) + operation;
    }

    processDelOperator() {
        this.currentText.innerText =
            this.currentText.innerText.slice(0, -1);
    }

    processClearCurrentOperator() {
        this.currentText.innerText = "";
    }

    processClearOperator() {
        this.currentText.innerText = "";
        this.operationText.innerText = "";
    }

    processEqualOperator() {
        let operation = this.operationText.innerText.split("")[1];

        this.processOperation(operation);
    }
}

const calc = new Calcular(operationText, currentText);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if (+value >= 0 || value === ".") {
            calc.addDigit(value);
        } else {
            calc.processOperation(value);
        }
    });
});