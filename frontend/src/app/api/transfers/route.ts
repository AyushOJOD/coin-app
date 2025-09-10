import { NextResponse } from "next/server";
import { GraphQLClient, gql } from "graphql-request";
import { getAddress as toChecksumAddress } from "ethers";

function tokenLogoUrl(address?: string): string {
  if (!address) return "https://via.placeholder.com/64?text=NA";
  try {
    const checksum = toChecksumAddress(address);
    return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${checksum}/logo.png`;
  } catch {
    return "https://via.placeholder.com/64?text=NA";
  }
}

export async function GET() {
  try {
    const apiKey = (process.env.BITQUERY_API_KEY || "").trim();
    if (!apiKey) {
      return NextResponse.json({ error: "Missing BITQUERY_API_KEY" }, { status: 500 });
    }

    const client = new GraphQLClient("https://streaming.bitquery.io/graphql", {
      headers: { Authorization: `Bearer ${apiKey}` },
    });

    const query = gql`
      {
        EVM(network: eth, dataset: archive) {
          Transfers(limit: {count: 10}) {
            Transaction {
              Hash
              Block {
                Number
                Time
              }
            }
            Currency {
              Address
              Symbol
              Name
            }
            Amount
            From { Address }
            To { Address }
          }
        }
      }
    `;

    const data = (await client.request(query)) as any;
    const transfers = (data?.EVM?.Transfers || []).map((t: any) => {
      const currencyAddress = t?.Currency?.Address as string | undefined;
      return {
        blockNumber: parseInt(t?.Transaction?.Block?.Number),
        timestamp: t?.Transaction?.Block?.Time,
        txHash: t?.Transaction?.Hash,
        symbol: t?.Currency?.Symbol,
        name: t?.Currency?.Name,
        amount: t?.Amount,
        imageUrl: tokenLogoUrl(currencyAddress),
      };
    });

    return NextResponse.json(transfers, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Failed to fetch" }, { status: 500 });
  }
}


