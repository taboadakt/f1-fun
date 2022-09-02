import { createClient } from "urql";

export const client = createClient({
  url: "https://rest-to-graphql-api-f1.vercel.app/graphql",
});
