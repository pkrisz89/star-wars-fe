import '@testing-library/jest-dom';
import {mswServer} from "./test-utils/msw-server"

// Polyfill "window.fetch" used in the React component.
import 'whatwg-fetch'

beforeAll(() => mswServer.listen());
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());