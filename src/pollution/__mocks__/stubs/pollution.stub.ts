import { Pollution } from 'src/pollution/Pollution';

export const pollutionStub = (): Pollution => {
  return {
    ts: new Date('2021-08-25T21:00:00.000Z'),
    aqius: 52,
    mainus: 'p2',
    aqicn: 18,
    maincn: 'p2',
  };
};
