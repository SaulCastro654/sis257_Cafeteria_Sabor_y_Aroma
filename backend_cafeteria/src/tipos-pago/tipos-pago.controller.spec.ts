import { Test, TestingModule } from '@nestjs/testing';
import { TiposPagoController } from './tipos-pago.controller';
import { TiposPagoService } from './tipos-pago.service';

describe('TiposPagoController', () => {
  let controller: TiposPagoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TiposPagoController],
      providers: [TiposPagoService],
    }).compile();

    controller = module.get<TiposPagoController>(TiposPagoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
