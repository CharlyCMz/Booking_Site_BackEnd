import { Test, TestingModule } from '@nestjs/testing';
import { PolicyTypeController } from './policy-type.controller';

describe('PolicyTypeController', () => {
  let controller: PolicyTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PolicyTypeController],
    }).compile();

    controller = module.get<PolicyTypeController>(PolicyTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
