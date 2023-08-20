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

  updateScreen(digit, { result, operator, firstOperand, secondOperand, newOperation }) {
    if (result === undefined) {
      if (digit === '.' && (this.currentInput.innerText.includes('.') || this.currentInput.innerText === '')) {
        return
      }
      this.currentInput.innerText += digit
      return
    }
    const isEqual = newOperation === '='

    this.previousInput.innerText = isEqual ? `${firstOperand} ${operator} ${secondOperand} =` : `${result} ${operator}`
    this.currentInput.innerText = isEqual ? result : ''
  }

  operation(keyFunction) {
    const thereIsPreviousOperator = this.mathOperators.includes(this.previousInput.innerText.split(' ')[1])
    let newOperation = thereIsPreviousOperator ? keyFunction : undefined
    let firstOperand = +this.previousInput.innerText.split(' ')[0]
    let secondOperand = +this.currentInput.innerText
    let operator = keyFunction !== '=' ? keyFunction : undefined
    let result

    if (this.previousInput.innerText === '') {
      firstOperand = +this.currentInput.innerText
      secondOperand = operator === '/' || operator === '*' ? 1 : 0

    } else if (this.previousInput.innerText[this.previousInput.innerText.length - 1] === '=') {
      if (operator === '*') {
        firstOperand = 1
      
      } else if (operator === '/') {
        firstOperand = +this.currentInput.innerText
        secondOperand = 1

      } else if (operator === '-') {
        firstOperand = +this.currentInput.innerText * 2

      } else {
        firstOperand = 0
      }
    }

    if (thereIsPreviousOperator && this.currentInput.innerText !== '') {
      operator = this.previousInput.innerText.split(' ')[1]
    }

    if (operator) {  
      if (this.previousInput.innerText[this.previousInput.innerText.length - 1] === '=') {
        operator = newOperation
      }

      const operationFunction = this.mathOperation[operator]
      result = operationFunction(firstOperand, secondOperand)

      operator = thereIsPreviousOperator && newOperation !== '=' ? newOperation : operator
    }

    if (keyFunction === '=' && this.previousInput.innerText !== '') {
      operator = this.previousInput.innerText.split(' ')[1]
      const operationFunction = this.mathOperation[operator]
      result = operationFunction(firstOperand, secondOperand)
    }

    return {result, operator, firstOperand, secondOperand, newOperation}
  }

  clearScreen() {
    this.currentInput.innerText = ''
    this.previousInput.innerText = ''
  }

  backspace() {
    this.currentInput.innerText = this.currentInput.innerText.slice(0, -1)
    if (this.previousInput.innerText[this.previousInput.innerText.length - 1] === '=') {
      this.previousInput.innerText = ''
    }
  }

  changeOperation(operation) {
    this.previousInput.innerText = this.previousInput.innerText.slice(0, -1) + operation
  }
}
