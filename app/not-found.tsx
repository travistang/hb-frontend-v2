"use client";
import Link from "next/link";
import { ArrowLeftIcon, HomeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="space-y-6 max-w-md">
        {/* 404 Illustration */}
        <div className="relative">
          <div className="text-9xl font-bold text-gray-200">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl">😵</div>
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Page Not Found</h1>
          <p className="text-gray-600">
            Sorry, we couldn&apos;t find the page you&apos;re looking for.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            asChild
            variant="default"
            className="inline-flex items-center gap-2"
            onClick={() => window.history.back()}
          >
            <button>
              <ArrowLeftIcon className="w-4 h-4" />
              Go Back
            </button>
          </Button>

          <Button
            asChild
            variant="outline"
            className="inline-flex items-center gap-2"
          >
            <Link href="/">
              <HomeIcon className="w-4 h-4" />
              Go Home
            </Link>
          </Button>
        </div>

        {/* Additional Help */}
        <div className="pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            If you think this is a mistake, please{" "}
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              contact us
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
