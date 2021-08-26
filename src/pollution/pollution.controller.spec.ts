import { Test, TestingModule } from '@nestjs/testing';
import { Pollution } from './Pollution';
import { PollutionController } from './pollution.controller';
import { PollutionService } from './pollution.service';
import { pollutionStub } from './__mocks__/stubs/pollution.stub';

jest.mock('./pollution.service.ts');
describe('PollutionController', () => {
  let controller: PollutionController;
  let service: PollutionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [PollutionController],
      providers: [PollutionService],
    }).compile();

    controller = module.get<PollutionController>(PollutionController);
    service = module.get<PollutionService>(PollutionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('index', () => {
    describe('when index is called', () => {
      let pollutions: Pollution[];

      beforeEach(async () => {
        pollutions = await controller.index();
      });

      it('should call Pollution Service', () => {
        expect(service.findAll).toBeCalled();
      });

      it('should return a list of pollutions', () => {
        expect(pollutions).toEqual([pollutionStub()]);
      });
    });
  });

  describe('max', () => {
    describe('when index is called', () => {
      let pollutions: Pollution[];

      beforeEach(async () => {
        pollutions = await controller.max();
      });

      it('should call Pollution Service', () => {
        expect(service.findMax).toBeCalled();
      });

      it('should return a list of pollutions', () => {
        expect(pollutions).toEqual([pollutionStub()]);
      });
    });
  });

  describe('getPollution', () => {
    describe('when getPollution is called', () => {
      let pollution: any;

      beforeEach(async () => {
        pollution = await controller.getPollution({
          lat: 48.856613,
          lon: 2.352222,
        });
      });

      it('should call Pollution Service', () => {
        expect(service.getByLatLon).toBeCalled();
      });

      it('should return a pollution', () => {
        expect(pollution).toEqual(pollutionStub());
      });
    });
  });
});
