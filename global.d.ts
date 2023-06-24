export {};

declare global {
  namespace PlaywrightTest {
    interface Matchers<R> {
      toBeOneOfValues(array: any[]): R;
      toBeString(): R;
    }
  }
}
