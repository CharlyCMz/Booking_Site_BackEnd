import { Test, TestingModule } from '@nestjs/testing';
import { PolicyTypeService } from './policy-type.service';

describe('PolicyTypeService', () => {
  let service: PolicyTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PolicyTypeService],
    }).compile();

    service = module.get<PolicyTypeService>(PolicyTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
