import { Test, TestingModule } from '@nestjs/testing';
import { PolicyTypesController } from './policy-types.controller';

describe('PolicyTypesController', () => {
  let controller: PolicyTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PolicyTypesController],
    }).compile();

    controller = module.get<PolicyTypesController>(PolicyTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
