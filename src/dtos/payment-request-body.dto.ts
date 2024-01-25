export class PaymentRequestBodyDto {
  paymentMethod: PaymentMethod;
  paymentDetails: {
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
  };
}

export enum PaymentMethod {
  MASTERCARD = 'MASTERCARD',
  VISA = 'VISA',
}
