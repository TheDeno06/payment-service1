import { MasterCardService } from './mastercard-service';
import { VisaService } from './visa-service';

export class ServiceChooser {
  chooseService(service: string): any {
    console.log(`Running ${service} services: `);
    switch (service) {
      case 'VISA':
        let visaService = new MasterCardService();
        return visaService.makePayment(), visaService.verifyAddress();

      case 'MASTERCARD':
        let mastercardService = new VisaService();
        return (
          mastercardService.makePayment(), mastercardService.verifyAddress()
        );

      default:
        console.log('No such payment method available!');
    }
  }
}
