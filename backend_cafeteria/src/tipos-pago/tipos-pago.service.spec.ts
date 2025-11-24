import { Test, TestingModule } from '@nestjs/testing';
import { TiposPagoService } from './tipos-pago.service';

describe('TiposPagoService', () => {
  let service: TiposPagoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TiposPagoService],
    }).compile();

    service = module.get<TiposPagoService>(TiposPagoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
