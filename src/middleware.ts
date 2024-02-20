import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
import { withAuth } from "next-auth/middleware";

// middleware is applied to all routes, use conditionals to select
export default withAuth(function middleware(req: NextRequest) {}, {
  callbacks: {
    authorized: ({ req, token }) => {
      if (req.nextUrl.pathname.startsWith("/mix") && token === null) {
        return false;
      }
      return true;
    },
  },
});
