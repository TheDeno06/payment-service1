import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ServiceChooser } from './services/service-chooser';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RULES_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'rules',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'rules-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [PaymentController],
  providers: [PaymentService, ServiceChooser],
})
export class PaymentModule {}
