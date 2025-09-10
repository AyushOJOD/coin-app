import { GraphQLClient, gql } from "graphql-request";
import dotenv from "dotenv";

dotenv.config();
const cleanedApiKey = (process.env.BITQUERY_API_KEY || "").trim();
console.log(
  "Testing BITQUERY_API_KEY:",
  cleanedApiKey ? `Set (len=${cleanedApiKey.length})` : "Not set"
);

const client = new GraphQLClient("https://streaming.bitquery.io/graphql", {
  headers: { Authorization: `Bearer ${cleanedApiKey}` },
});

async function testBitquery() {
  try {
    const query = gql`
      {
        EVM(network: eth, dataset: archive) {
          Blocks(limit: { count: 10 }) {
            Block {
              Number
              Time
            }
          }
        }
      }
    `;
    const data = await client.request(query);
    console.log("Bitquery response:", JSON.stringify(data, null, 2));
  } catch (error: any) {
    console.error(
      "Bitquery test failed:",
      error.message,
      error.response?.status,
      error.response?.headers
    );
  }
}

testBitquery();
