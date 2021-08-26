import { pollutionStub } from './stubs/pollution.stub';

export const PollutionService = jest.fn().mockReturnValue({
  findMax: jest.fn().mockResolvedValue([pollutionStub()]),
  findAll: jest.fn().mockResolvedValue([pollutionStub()]),
  create: jest.fn().mockResolvedValue(pollutionStub()),
  getByLatLon: jest.fn().mockResolvedValue(pollutionStub()),
});
