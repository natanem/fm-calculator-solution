const displayEl = document.querySelector(".display")
const buttonsContainer = document.querySelector(".buttons-container")

const calculatorObj = {
    currentValue: "",
    operator: null,
    result: 0,
    clear() {
        this.currentValue = ""
        this.operator= null
        this.result= 0
    },
    display(value = 0) {
        displayEl.textContent = value
    },
    calculate() {
        switch(this.operator) {
            case "add":
                this.result = this.result + Number(this.currentValue)
                break;
            case "subtract":
                this.result = this.result - Number(this.currentValue)
                break;
            case "multiply":
                this.result = this.result * Number(this.currentValue)
                break;
            case "divide":
                this.result = this.result / Number(this.currentValue)
                break;
            default: 
                return
        }
    }
}


buttonsContainer.addEventListener("click", (e) => {
    const {role, value} = e.target.dataset
    if(role === "number"){
        calculatorObj.currentValue += value
        calculatorObj.display(calculatorObj.currentValue)
    } else if (role === "operator") {
        if(calculatorObj.currentValue && calculatorObj.operator) {
            calculatorObj.calculate()
            calculatorObj.display(calculatorObj.result)
        }else {

            calculatorObj.result = calculatorObj.result || Number(calculatorObj.currentValue)
           
        }
         calculatorObj.operator = value
            calculatorObj.currentValue = ""
    } else if (role === "calculate") {
        if(!calculatorObj.operator) {
            calculatorObj.result = Number(calculatorObj.currentValue)
        }
        calculatorObj.calculate()
        calculatorObj.display(calculatorObj.result)
        calculatorObj.currentValue = ""
    } else if(role === "clear") {
        calculatorObj.clear()
        calculatorObj.display()
    } else if(role === "dot" && !calculatorObj.currentValue.includes(".")) {
        calculatorObj.currentValue += "."
        calculatorObj.display(calculatorObj.currentValue)
    } else if(role == "percent") {
        calculatorObj.result = Number(calculatorObj.currentValue) / 100 || 0;
        calculatorObj.display(calculatorObj.result)
    } else if(role == "absolute" && calculatorObj.currentValue !== "") {
        if(!calculatorObj.currentValue && calculatorObj.result !== 0) {
            calculatorObj.result = -1 * calculatorObj.result
            calculatorObj.display(calculatorObj.result)
        }else {
            calculatorObj.currentValue = -1 * Number(calculatorObj.currentValue)
            calculatorObj.display(calculatorObj.currentValue)
        }
    }


    console.log(calculatorObj)


})

window.addEventListener("load", () => calculatorObj.display())

