export default class Calculator {
  constructor(previousInput, currentInput) {
    this.previousInput = previousInput
    this.currentInput = currentInput
    this.keys = ['C', '<', '/', '*', '7', '8', '9', '+', '4', '5', '6', '-', '1', '2', '3', '=', '0', '.']
    this.mathOperation = {
      '+': (a, b) => a + b,
    
      '-': (a, b) => a - b,
    
      '*': (a, b) => a * b,
    
      '/': (a, b) => a / b,
    }
    this.mathOperators = Object.keys(this.mathOperation)
  }

  updateDisplay(digit, { firstOperand, secondOperand, operator, result, showResult }) {
    if (result === undefined) {
      if (digit === '.' && (this.currentInput.innerText.includes('.') || this.currentInput.innerText === '')) return
      this.currentInput.innerText += digit
      return
    }

    if (showResult) {
      this.previousInput.innerText = `${firstOperand} ${operator} ${secondOperand} =`
      this.currentInput.innerText = result
      return
    }

    this.previousInput.innerText = `${result} ${operator}`
    this.currentInput.innerText = ''
  }

  operation(keyFunction) {
    const thereIsPreviousOperator = this.mathOperators.includes(this.previousInput.innerText.split(' ')[1])
    const showResult = keyFunction === '='

    let operator = !showResult ? keyFunction : undefined
    let firstOperand = +this.previousInput.innerText.split(' ')[0]
    let secondOperand = +this.currentInput.innerText
    let result

    if (this.previousInput.innerText === '') {
      firstOperand = +this.currentInput.innerText
      secondOperand = operator === '/' || operator === '*' ? 1 : 0

    } else if (this.previousInput.innerText.slice(-1) === '=') {
      switch (operator) {
        case '*':
          firstOperand = 1
          break

        case '/':
          firstOperand = +this.currentInput.innerText
          secondOperand = 1
          break
        
        case '-':
          firstOperand = +this.currentInput.innerText * 2
          break
        
        default:
          firstOperand = 0
      }
    }

    if (thereIsPreviousOperator) {
      operator = this.previousInput.innerText.split(' ')[1]
    }

    if (operator) {
      if (this.previousInput.innerText.slice(-1) === '=') {
        operator = keyFunction
      }

      if (operator === '/' && secondOperand === 0) throw '[ERROR] Division by zero.'
      
      const mathFunction = this.mathOperation[operator]
      result = mathFunction(firstOperand, secondOperand)

      operator = thereIsPreviousOperator && !showResult ? keyFunction : operator
    }

    return { firstOperand, secondOperand, operator, result, showResult }
  }

  clearDisplay() {
    this.currentInput.innerText = ''
    this.previousInput.innerText = ''
  }

  backspace() {
    this.currentInput.innerText = this.currentInput.innerText.slice(0, -1)
    if (this.previousInput.innerText.slice(-1) === '=') {
      this.previousInput.innerText = ''
    }
  }

  changeOperation(operation) {
    if (this.mathOperators.includes(operation)) {
      this.previousInput.innerText = this.previousInput.innerText.slice(0, -1) + operation
    }
  }
}
