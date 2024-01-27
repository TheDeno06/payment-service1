import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { MakePaymentEvent } from './make-payment.event';
import { PaymentValidateEvent } from './payment-validate.event';
import { ServiceChooser } from './services/service-chooser';

@Injectable()
export class PaymentService {
  constructor(
    private readonly serviceChooser: ServiceChooser,
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

  validateMsg(validatedMessage: {}, method: string) {
    console.log('validation message received: ');
    console.log(validatedMessage);
    this.serviceChooser.chooseService(method);
  }
}
