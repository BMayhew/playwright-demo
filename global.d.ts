export {};

declare global {
  namespace PlaywrightTest {
    interface Matchers<R> {
      toBeOneOfValues(array: any[]): R;
      toBeOneOfTypes(a: string[]): R;
      toBeNumber(): R;
      toBeString(): R;
      toBeBoolean(): R;
      toBeValidDate(): R;
    }
  }
}

/*eslint-disable*/
export {};
