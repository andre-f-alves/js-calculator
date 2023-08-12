export default class Calculator {
  constructor(previousValue, currentValue) {
    this.previousValue = previousValue
    this.currentValue = currentValue
    this.currentOperation = ''
  }

  showDigitOnScreen(digit) {
    this.currentValue.innerText += digit
  }
}