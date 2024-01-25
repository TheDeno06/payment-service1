import { PaymentMethod } from './dtos/payment-request-body.dto';

export class MakePaymentEvent {
  constructor(
    public readonly paymentId,
    public readonly paymentMethod: PaymentMethod,
    public readonly paymentDetails: {
      amount: number;
      cardDetails: {
        cardNumber: string;
        cvv: string;
        expiryDate: string;
      };
      payerDetails: {
        fullName: string;
        address: {
          line1: string;
          line2: string;
          city: string;
          state: string;
          country: string;
          postalCode: string;
        };
      };
      payeeDetails: {
        fullName: string;
        iban: string;
      };
    },
  ) {}
}
