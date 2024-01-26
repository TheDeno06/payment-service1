export enum PaymentMethod {
  MASTERCARD = 'MASTERCARD',
  VISA = 'VISA',
}

export class PaymentValidateEvent {
  constructor(public readonly paymentMethod: PaymentMethod) {}

  toString() {
    return JSON.stringify({ paymentMethod: this.paymentMethod });
  }
}
