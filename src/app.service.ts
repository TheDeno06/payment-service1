import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { MakePaymentEvent } from './make-payment.event';
import { PaymentValidateEvent } from './payment-validate.event';

@Injectable()
export class AppService {
  constructor(
    @Inject('RULES_SERVICE') private readonly rulesClient: ClientKafka,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  make_payment(makePaymentEvent: MakePaymentEvent) {
    console.log(
      `Payment request for user named ${makePaymentEvent.paymentDetails.payerDetails.fullName}, an amount of ${makePaymentEvent.paymentDetails.amount}...`,
    );
    this.rulesClient.emit(
      'payment_validate',
      new PaymentValidateEvent(makePaymentEvent.paymentMethod),
    );
  }

  validateMsg(validatedMessage: string) {
    console.log(validatedMessage);
  }
}
