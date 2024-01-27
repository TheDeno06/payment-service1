import { TestingModule } from '@nestjs/testing';
import { PaymentService } from 'src/payment.service';

describe('PaymentService', () => {
  let app: TestingModule;
  let paymentService: PaymentService;

  it('should be defined', () => {
    expect(app).toBeDefined();
    expect(paymentService).toBeDefined();
  });

  describe('methods should be defined', () => {
    it('should call make_payment', async () => {
      expect(await paymentService.make_payment).toBeTruthy();
    });
  });

  describe('make_payment', () => {
    it('should emit validation message', async () => {});
  });

  describe('validateMsg', () => {
    it('should call payment services to make the payment', async () => {});
  });
});
