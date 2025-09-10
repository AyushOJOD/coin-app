import { GraphQLClient, gql } from 'graphql-request'
import { getAddress as toChecksumAddress } from 'ethers'

const cleanedApiKey = (process.env.BITQUERY_API_KEY || '').trim()
if (!cleanedApiKey) {
  // Surface a clear error early if the key is missing
  throw new Error('BITQUERY_API_KEY is missing or empty after trimming.')
}

// Minimal debug to help diagnose 401s without exposing the key
console.log(
  'Bitquery API key detected. length:',
  cleanedApiKey.length > 4 ? cleanedApiKey.length : 'short'
)

const client = new GraphQLClient('https://streaming.bitquery.io/graphql', {
  headers: {
    Authorization: `Bearer ${cleanedApiKey}`,
  },
})

export async function fetchBlockData() {
  const query = gql`
    {
      EVM(network: eth, dataset: archive) {
        Blocks(limit: { count: 10 }) {
          Block {
            Number
            Time
            Hash
            MixDigest
            BaseFee
            Coinbase
            TxHash
            TxCount
          }
        }
      }
    }
  `
  const data = (await client.request(query)) as any

  console.log('Raw Bitquery response:')
  console.dir(data, { depth: null, colors: true })

  return data.EVM.Blocks.map((block: any) => ({
    blockNumber: parseInt(block.Block.Number),
    timestamp: new Date(block.Block.Time),
    hash: block.Block.Hash,
    mixDigest: block.Block.MixDigest,
    baseFee: block.Block.BaseFee ? parseInt(block.Block.BaseFee) : null,
    coinbase: block.Block.Coinbase,
    latestTxHash: block.Block.TxHash,
    txCount: block.Block.TxCount ? parseInt(block.Block.TxCount) : null,
  }))
}

export async function fetchTransfersData() {
  const query = gql`
    {
      EVM(network: eth, dataset: archive) {
        Transfers(limit: { count: 10 }) {
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
          From {
            Address
          }
          To {
            Address
          }
        }
      }
    }
  `
  const data = (await client.request(query)) as any

  const tokenLogoUrl = (address?: string): string => {
    if (!address) return 'https://via.placeholder.com/64?text=NA'
    try {
      const checksum = toChecksumAddress(address)
      return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${checksum}/logo.png`
    } catch {
      return 'https://via.placeholder.com/64?text=NA'
    }
  }

  return data.EVM.Transfers.map((t: any) => {
    const currencyAddress = t.Currency?.Address as string | undefined
    return {
      blockNumber: parseInt(t.Transaction.Block.Number),
      timestamp: new Date(t.Transaction.Block.Time),
      txHash: t.Transaction.Hash,
      symbol: t.Currency?.Symbol,
      name: t.Currency?.Name,
      amount: t.Amount,
      imageUrl: tokenLogoUrl(currencyAddress),
    }
  })
}
