import { Pixel } from './pixel';

describe('Pixel', () => {
  it('should create an instance', () => {
    expect(new Pixel(100, 100, 100)).toBeTruthy();
  });
});
