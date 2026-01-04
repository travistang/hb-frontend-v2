import { MockedEventServiceProvider } from "./mocked-event-service-provider";

// Export default instance - can be swapped with different implementations later
const eventServiceProvider = new MockedEventServiceProvider();

export default eventServiceProvider;
