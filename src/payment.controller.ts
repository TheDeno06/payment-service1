import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { ClientKafka, EventPattern } from '@nestjs/microservices';

@Controller()
export class PaymentController implements OnModuleInit {
  constructor(
    private readonly paymentService: PaymentService,
    @Inject('RULES_SERVICE') private readonly rulesClient: ClientKafka,
  ) {}

  @Get()
  getHello(): string {
    return this.paymentService.getHello();
  }

  @EventPattern('payment_request')
  makePaymentC(data: any) {
    this.paymentService.make_payment(data);
  }

  @EventPattern('visa_payment_validated')
  handleVisaValidated(data: any) {
    this.paymentService.validateMsg(data, 'VISA');
  }

  @EventPattern('mastercard_payment_validated')
  handleMasterCardValidated(data: any) {
    this.paymentService.validateMsg(data, 'MASTERCARD');
  }

  onModuleInit() {
    this.rulesClient.subscribeToResponseOf('payment_request');
  }
}
