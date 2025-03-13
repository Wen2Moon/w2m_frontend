import { i18nRouter } from "next-i18n-router";
import { i18n } from "../next-i18next.config";

export function middleware(request: any) {
  return i18nRouter(request, i18n);
}

// applies this middleware only to files in the app directory
export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
