export default class Calculator {
  constructor(previousInput, currentInput) {
    this.previousInput = previousInput
    this.currentInput = currentInput
    this.currentValue = ''
    this.keys = ['C', '<', '/', '*', '7', '8', '9', '+', '4', '5', '6', '-', '1', '2', '3', '=', '0', '.']
  }

  showDigitOnScreen(digit) {
    if (digit === '.' && this.currentInput.innerText.includes('.')) {
      return
    }
    this.currentValue = digit
    this.updateScreen()
  }

  updateScreen(
    result = null,
    operation = null,
    firstOperand = null,
    secondOperand = null,
    newOperation
  ) {
    if (result === null) {
      this.currentInput.innerText += this.currentValue
      return
    }
    const isEqual = newOperation === '='

    this.previousInput.innerText = isEqual ? `${firstOperand} ${operation} ${secondOperand} =` : `${result} ${operation}`
    this.currentInput.innerText = isEqual ? result : ''
  }

  operation(keyFunction) {
    if (this.currentInput.innerText === '' && keyFunction !== 'C' && this.previousInput.innerText !== '') {
      this.changeOperation(keyFunction)
      return
    }

    const thereIsPreviousOperator = ['+', '-', '/', '*'].includes(this.previousInput.innerText.split(' ')[1])
    let newOperation = thereIsPreviousOperator ? keyFunction : false
    let result
    let firstOperand = +this.previousInput.innerText.split(' ')[0]
    let secondOperand = +this.currentInput.innerText

    if (this.previousInput.innerText === '') {
      firstOperand = +this.currentInput.innerText
      secondOperand = keyFunction === '/' || keyFunction === '*' ? 1 : 0

    } else if (this.previousInput.innerText[this.previousInput.innerText.length - 1] === '=') {
      firstOperand = keyFunction === '*' ? 1 : keyFunction === '/' ? this.currentInput.innerText : 0
      secondOperand = keyFunction === '/' ? 1 : +this.currentInput.innerText
    }

    const operations = {
      '+': (a, b) => a + b,
    
      '-': (a, b) => a - b,
    
      '*': (a, b) => a * b,
    
      '/': (a, b) => a / b
    }

    if (thereIsPreviousOperator && this.currentInput.innerText !== '' && !['C', '<', '.'].includes(keyFunction)) {
      keyFunction = this.previousInput.innerText.split(' ')[1]
    }

    if (['+', '-', '/', '*'].includes(keyFunction)) {
      if (this.previousInput.innerText[this.previousInput.innerText.length - 1] === '=') {
        keyFunction = newOperation
      }
      const operationFunction = operations[keyFunction]
      result = operationFunction(firstOperand, secondOperand)

      keyFunction = thereIsPreviousOperator && ['+', '-', '/', '*'].includes(newOperation) ? newOperation : keyFunction
      this.updateScreen(result, keyFunction, firstOperand, secondOperand, newOperation)
      return
    }

    switch (keyFunction) {
      case '=':
        const operator = this.previousInput.innerText.split(' ')[1]
        const operationFunction = operations[operator]
        result = operationFunction(firstOperand, secondOperand)
        this.updateScreen(result, operator, firstOperand, secondOperand, newOperation)
        break

      case 'C':
        this.currentInput.innerText = ''
        this.previousInput.innerText = ''
        break

      case '<':
        this.currentInput.innerText = this.currentInput.innerText.slice(0, -1)
        if (this.previousInput.innerText.includes('=')) {
          this.previousInput.innerText = ''
        }
        break
    }
  }

  changeOperation(operation) {
    const mathOperations = ['/', '*', '+', '-']
    if (!mathOperations.includes(operation)) {
      return
    }
    this.previousInput.innerText = this.previousInput.innerText.slice(0, -1) + operation
  }
}