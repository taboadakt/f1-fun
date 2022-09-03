import { createClient } from "urql";

export const client = createClient({
  url:
    process.env.REACT_APP_MOCK === "true"
      ? "http://localhost:4000/graphql"
      : "https://rest-to-graphql-api-f1.vercel.app/graphql",
});
