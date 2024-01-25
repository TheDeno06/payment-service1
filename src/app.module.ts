import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
  controllers: [AppController],
  providers: [AppService, ServiceChooser],
})
export class AppModule {}
