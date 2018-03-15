import { SsnPipe } from './ssnfmt.pipe.ts';

describe('SsnPipe', () => {
  it('create an instance', () => {
    const pipe = new SsnPipe();
    expect(pipe).toBeTruthy();
  });
});
