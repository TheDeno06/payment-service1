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

  @EventPattern('payment_validated')
  handleValidated(data: any) {
    this.appService.validateMsg(data);
  }

  onModuleInit() {
    this.rulesClient.subscribeToResponseOf('payment_request');
  }
}
