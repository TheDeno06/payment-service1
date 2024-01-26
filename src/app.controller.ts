import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka, EventPattern } from '@nestjs/microservices';

@Controller()
export class AppController implements OnModuleInit {
  constructor(
    private readonly appService: AppService,
    @Inject('RULES_SERVICE') private readonly rulesClient: ClientKafka,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('payment_request')
  makePaymentC(data: any) {
    this.appService.make_payment(data);
  }

  @EventPattern('visa_payment_validated')
  handleVisaValidated(data: any) {
    this.appService.validateMsg(data, 'VISA');
  }

  @EventPattern('mastercard_payment_validated')
  handleMasterCardValidated(data: any) {
    this.appService.validateMsg(data, 'MASTERCARD');
  }

  onModuleInit() {
    this.rulesClient.subscribeToResponseOf('payment_request');
  }
}
