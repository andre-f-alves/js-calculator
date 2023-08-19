export default class Calculator {
  constructor(previousInput, currentInput) {
    this.previousInput = previousInput
    this.currentInput = currentInput
    this.currentValue = ''
    this.keys = ['C', '<', '/', '*', '7', '8', '9', '+', '4', '5', '6', '-', '1', '2', '3', '=', '0', '.']
    this.mathOperation = {
      '+': (a, b) => a + b,
    
      '-': (a, b) => a - b,
    
      '*': (a, b) => a * b,
    
      '/': (a, b) => a / b,
    }
    this.mathOperators = Object.keys(this.mathOperation)
  }

  showDigitOnScreen(digit) {
    if (digit === '.' && (this.currentInput.innerText.includes('.') || this.currentInput.innerText === '')) {
      return
    }
    this.currentValue = digit
    this.updateScreen()
  }

  updateScreen(result, operation, firstOperand, secondOperand, newOperation) {
    if (result === undefined) {
      this.currentInput.innerText += this.currentValue
      return
    }
    const isEqual = newOperation === '='

    this.previousInput.innerText = isEqual ? `${firstOperand} ${operation} ${secondOperand} =` : `${result} ${operation}`
    this.currentInput.innerText = isEqual ? result : ''
  }

  operation(keyFunction) {
    const thereIsPreviousOperator = this.mathOperators.includes(this.previousInput.innerText.split(' ')[1])
    let newOperation = thereIsPreviousOperator ? keyFunction : false
    let firstOperand = +this.previousInput.innerText.split(' ')[0]
    let secondOperand = +this.currentInput.innerText
    let result

    if (this.previousInput.innerText === '') {
      firstOperand = +this.currentInput.innerText
      secondOperand = keyFunction === '/' || keyFunction === '*' ? 1 : 0

    } else if (this.previousInput.innerText[this.previousInput.innerText.length - 1] === '=') {
      if (keyFunction === '*') {
        firstOperand = 1
      
      } else if (keyFunction === '/') {
        firstOperand = +this.currentInput.innerText
        secondOperand = 1

      } else if (keyFunction === '-') {
        firstOperand = +this.currentInput.innerText * 2

      } else {
        firstOperand = 0
      }
    }

    if (thereIsPreviousOperator && this.currentInput.innerText !== '') {
      keyFunction = this.previousInput.innerText.split(' ')[1]
    }

    if (this.mathOperators.includes(keyFunction)) {
      let operator = keyFunction
      if (this.previousInput.innerText[this.previousInput.innerText.length - 1] === '=') {
        operator = newOperation
      }
      const operationFunction = this.mathOperation[operator]
      result = operationFunction(firstOperand, secondOperand)

      operator = thereIsPreviousOperator && newOperation !== '=' ? newOperation : keyFunction
      this.updateScreen(result, operator, firstOperand, secondOperand, newOperation)
      return
    }

    if (keyFunction === '=') {
      const operator = this.previousInput.innerText.split(' ')[1]
      const operationFunction = this.mathOperation[operator]
      result = operationFunction(firstOperand, secondOperand)
      this.updateScreen(result, operator, firstOperand, secondOperand, newOperation)
    }
  }

  clearScreen() {
    this.currentInput.innerText = ''
    this.previousInput.innerText = ''
  }

  backspace() {
    this.currentInput.innerText = this.currentInput.innerText.slice(0, -1)
    if (this.previousInput.innerText.includes('=')) {
      this.previousInput.innerText = ''
    }
  }

  changeOperation(operation) {
    if (!this.mathOperators.includes(operation)) {
      return
    }
    this.previousInput.innerText = this.previousInput.innerText.slice(0, -1) + operation
  }
}