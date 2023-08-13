export { default } from "next-auth/middleware";

// all the pages we want to be protected
export const config = { matcher: ["/dashboard"] };
