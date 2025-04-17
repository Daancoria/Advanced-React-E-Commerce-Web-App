import '@testing-library/jest-dom';

//  Fix for "TextEncoder is not defined"
import { TextEncoder, TextDecoder } from 'util';

Object.assign(globalThis, {
  TextEncoder,
  TextDecoder,
});
