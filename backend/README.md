# Backend - Blockchain Block Explorer API

A Node.js/Express.js backend API for blockchain block data management and real-time monitoring.

## 🚀 Features

- **Block Data Management**: Store and retrieve blockchain block information
- **Real-time Data Fetching**: Integration with Bitquery API for live blockchain data
- **Database Integration**: PostgreSQL with Drizzle ORM for data persistence
- **RESTful API**: Clean API endpoints for frontend integration
- **Transfer Tracking**: Monitor and store blockchain transfers
- **CORS Support**: Cross-origin resource sharing enabled

## 🛠️ Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL with Neon serverless
- **ORM**: Drizzle ORM with Drizzle Kit
- **Blockchain**: Ethers.js v6
- **API Integration**: GraphQL Request for Bitquery
- **Development**: Nodemon with ts-node

## 📦 Installation

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env
   ```

   Configure the following variables in `.env`:

   ```env
   DATABASE_URL=your_postgresql_connection_string
   BITQUERY_API_KEY=your_bitquery_api_key
   PORT=3000
   ```

## 🗄️ Database Setup

1. Run database migrations:

   ```bash
   npm run migrate
   ```

2. The migration will create the `blocks` table with the following schema:
   - `id` (serial, primary key)
   - `blockNumber` (bigint, unique)
   - `timestamp` (timestamp)
   - `hash` (varchar)
   - `mixDigest` (varchar)
   - `baseFee` (bigint)
   - `coinbase` (varchar)
   - `latestTxHash` (varchar)
   - `txCount` (integer)

## 🚀 Development

Start the development server:

```bash
npm run dev
```

The API will be available at [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run migrate` - Generate and run database migrations
- `npm run test-bitquery` - Test Bitquery API integration

## 🏗️ Project Structure

```
src/
├── controllers/           # API route handlers
│   └── blocksController.ts # Block-related endpoints
├── models/               # Database models and schema
│   ├── db.ts            # Database connection
│   └── schema.ts        # Drizzle schema definitions
├── services/            # Business logic services
│   └── bitquery.ts      # Bitquery API integration
├── index.ts             # Main application entry point
└── testBitquery.ts      # Bitquery testing utility
```

## 🌐 API Endpoints

### Blocks

- `GET /api/blocks` - Retrieve all stored blocks
- `POST /api/fetch-blocks` - Fetch and store new blocks from blockchain

### Transfers

- `GET /api/transfers` - Retrieve transfer data

## 🔧 Configuration

### Drizzle Configuration

The project uses Drizzle Kit for database management:

- Schema location: `./src/models/schema.ts`
- Migrations output: `./drizzle`
- Database: PostgreSQL

### Environment Variables

- `DATABASE_URL` - PostgreSQL connection string
- `BITQUERY_API_KEY` - API key for Bitquery blockchain data
- `PORT` - Server port (default: 3000)

## 🔄 Data Flow

1. **Block Fetching**: API calls Bitquery to get latest blockchain data
2. **Data Processing**: Raw blockchain data is processed and validated
3. **Database Storage**: Processed data is stored in PostgreSQL
4. **API Response**: Stored data is served to frontend via REST endpoints

## 🧪 Testing

Test the Bitquery integration:

```bash
npm run test-bitquery
```

This will verify that the Bitquery API is properly configured and accessible.

## 🚀 Deployment

1. Build the application:

   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## 🔒 Security

- CORS is enabled for cross-origin requests
- Environment variables are used for sensitive configuration
- Input validation should be added for production use

## 📊 Database Migrations

The project includes several migration files:

- `0000_orange_gorilla_man.sql` - Initial schema
- `0001_concerned_true_believers.sql` - Schema updates
- `0002_extend_blocks_with_more_fields.sql` - Extended block fields
- `0002_sleepy_morgan_stark.sql` - Additional schema changes

## 🤝 Contributing

1. Follow TypeScript best practices
2. Use Drizzle ORM for database operations
3. Add proper error handling
4. Test API endpoints thoroughly
5. Update migrations when changing schema

## 📝 API Documentation

### Block Object Structure

```typescript
{
  id: number;
  blockNumber: number;
  timestamp: string;
  hash?: string;
  mixDigest?: string;
  baseFee?: number;
  coinbase?: string;
  latestTxHash?: string;
  txCount?: number;
}
```

## 🔧 Troubleshooting

### Common Issues

1. **Database Connection**: Ensure `DATABASE_URL` is correctly set
2. **Bitquery API**: Verify `BITQUERY_API_KEY` is valid
3. **Port Conflicts**: Change `PORT` if 3000 is already in use

### Logs

The application logs:

- Database connection status
- Bitquery API key status
- Server startup confirmation

## 📄 License

This project is part of the blockchain block explorer application.
