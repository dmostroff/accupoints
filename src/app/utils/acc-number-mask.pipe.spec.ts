import { AccNumberMaskPipe } from './acc-number-mask.pipe';

describe('AccNumberMaskPipe', () => {
  it('create an instance', () => {
    const pipe = new AccNumberMaskPipe();
    expect(pipe).toBeTruthy();
  });
});
