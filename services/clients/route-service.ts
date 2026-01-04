"use client";

import { routes } from "@/lib/routes";
import {
  CreateRouteParams,
  RouteDetails,
  RouteSearchQuery,
  RouteSearchResults,
  RouteServiceProvider,
  UpdateRouteParams,
} from "../route-service";

/**
 * Service for client side to fetch routes info
 */
class RouteServiceClient implements RouteServiceProvider {
  async getOne(id: number): Promise<RouteDetails | null> {
    const response = await fetch(routes.api.routes.detail(id));
    const data = await response.json();
    return data as RouteDetails;
  }

  async search(query: RouteSearchQuery = {}): Promise<RouteSearchResults> {
    const urlSearchParams = new URLSearchParams(
      Object.fromEntries(
        Object.entries(query).map(([k, v]) => [k, v.toString()])
      )
    );
    const url = `${routes.api.routes.search}?${urlSearchParams.toString()}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch routes");
    }
    const data = await response.json();
    return data as RouteSearchResults;
  }

  async create(route: CreateRouteParams): Promise<RouteDetails> {
    const formData = new FormData();
    formData.append("description", route.description);
    formData.append("name", route.name);
    formData.append("gpx", route.gpx);
    route.images.forEach((imageUpload) => {
      formData.append("images", imageUpload.file, imageUpload.name);
    });

    const response = await fetch(routes.api.routes.create, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    return data as RouteDetails;
  }

  async update(id: number, route: UpdateRouteParams): Promise<RouteDetails> {
    const formData = new FormData();
    if (route.name) {
      formData.append("name", route.name);
    }
    if (route.description) {
      formData.append("description", route.description);
    }
    if (route.deleteImageNames) {
      route.deleteImageNames.forEach((name) => {
        formData.append("deleteImageNames", name);
      });
    }

    if (route.gpx) {
      formData.append("gpx", route.gpx);
    }

    if (route.images) {
      route.images.forEach((imageUpload) => {
        formData.append("images", imageUpload.file, imageUpload.name);
      });
    }

    const response = await fetch(routes.api.routes.update(id), {
      method: "PATCH",
      body: formData,
    });

    const data = await response.json();
    return data as RouteDetails;
  }

  async delete(id: number): Promise<void> {
    await fetch(routes.api.routes.delete(id), {
      method: "DELETE",
    });
  }
}

export default new RouteServiceClient();
