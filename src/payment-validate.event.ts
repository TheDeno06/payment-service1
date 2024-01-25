import { PaymentMethod } from './dtos/payment-request-body.dto';

export class PaymentValidateEvent {
  constructor(public readonly paymentMethod: PaymentMethod) {}

  toString() {
    return JSON.stringify({ paymentMethod: this.paymentMethod });
  }
}
