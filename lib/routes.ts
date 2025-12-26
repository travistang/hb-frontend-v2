export const routes = {
  api: {
    auth: {
      login: "/api/auth/login",
      logout: "/api/auth/logout",
    },

    me: "/api/me",

    dashboard: "/api/dashboard",

    events: {
      list: "/api/events",
      detail: (id: string | number) => `/api/events/${id}`,
      newsFeed: "/api/events/news-feed",
    },
  },

  pages: {
    home: "/",
    events: "/events",
    eventDetail: (id: string | number) => `/events/${id}`,
    signin: "/signin",
  },
} as const;

export type Routes = typeof routes;

export function buildRoute(
  template: string,
  params: Record<string, string | number>
): string {
  let result = template;
  Object.entries(params).forEach(([key, value]) => {
    result = result.replace(`:${key}`, String(value));
  });
  return result;
}
