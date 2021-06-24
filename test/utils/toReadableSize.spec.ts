import {toReadableSize} from "../../src/lib/utils";

describe('toReadableSize', () => {
  it('should return a bytes example', () => {
    expect(toReadableSize(90))
      .toEqual('90B');
  });

  it('should return a KB example', () => {
    expect(toReadableSize(2548))
      .toEqual('2.5KB');
  });

  it('should return a MB example', () => {
    expect(toReadableSize(25481235))
      .toEqual('24.3MB');
  });

  it('should return a GB example', () => {
    expect(toReadableSize(254856481234))
      .toEqual('237.4GB');
  });
});
