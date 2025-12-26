import { MockedRouteServiceProvider } from "./mocked-route-service-provider";

export * from "./types";
export { MockedRouteServiceProvider };

// Default export: the mocked provider instance
export default new MockedRouteServiceProvider();
