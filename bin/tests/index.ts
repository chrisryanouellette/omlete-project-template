type HandleMocksArgs =
  | jest.MockedFunction<(...args: unknown[]) => unknown>
  | jest.SpyInstance;

export const handleMocks = (...mocks: HandleMocksArgs[]): void => {
  afterEach(() => {
    mocks.forEach((mock) => {
      mock.mockClear();
    });
  });

  afterAll(() => {
    mocks.forEach((mock) => {
      mock.mockRestore();
    });
  });
};
