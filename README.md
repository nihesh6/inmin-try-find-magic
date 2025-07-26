# inmin-try-find-magic - AI-Powered Shopping Platform

An intelligent shopping platform powered by Google's Gemini AI that understands natural language queries and provides personalized product recommendations.

## 🚀 Features

- **Gemini AI Search**: Natural language product search powered by Google's Gemini AI
- **Virtual Try-On**: AR experience for clothes, glasses, and electronics
- **Intelligent Recommendations**: AI-driven product suggestions based on user preferences
- **Smart Filtering**: AI analyzes search intent and suggests relevant filters
- **Real-time Insights**: Get explanations about why products were recommended

## 🤖 AI Integration

This project uses Google's Gemini AI as an intelligent shopping agent that:

- Analyzes search queries to understand user intent
- Provides contextual product recommendations
- Explains search results with intelligent insights
- Suggests relevant filters based on the query
- Acts as a personal shopping assistant

## 🛠️ Setup

### Prerequisites

- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- Google Gemini API key - [Get it here](https://makersuite.google.com/app/apikey)

### Installation

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd inmin-try-find-magic

# Step 3: Install dependencies
npm install

# Step 4: Set up environment variables
cp .env.example .env
# Edit .env and add your Gemini API key:
# VITE_GEMINI_API_KEY=your_actual_api_key_here

# Step 5: Start the development server
npm run dev
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

⚠️ **Important**: Never commit your API keys to version control. The `.env` file is already added to `.gitignore`.

## 🎯 How the AI Agent Works

The Gemini AI agent acts as an intelligent shopping assistant:

1. **Query Analysis**: When you search for "comfortable running shoes for marathon", the AI understands you need high-performance athletic footwear
2. **Intent Recognition**: It recognizes your specific needs (comfort, durability, marathon distance)
3. **Smart Matching**: The AI matches products based on semantic similarity, not just keywords
4. **Contextual Ranking**: Products are ranked by relevance, considering ratings, features, and user intent
5. **Intelligent Insights**: The AI explains why each product was recommended

### Example Search Queries

Try these natural language searches:

- "I need something comfortable for working from home"
- "Affordable wireless headphones for gym workouts"
- "Luxury skincare for sensitive skin"
- "Professional clothes for job interviews"
- "Gadgets that would impress a tech enthusiast"

## 🏗️ Project Structure

```
src/
├── components/         # React components
│   ├── AISearchResults.tsx    # AI-powered search results
│   ├── SearchBar.tsx          # Search interface
│   └── VirtualTryOn.tsx       # AR try-on feature
├── services/
│   └── geminiService.ts       # Gemini AI integration
├── data/
│   └── mockProducts.ts        # Product data (replace with real database)
└── pages/
    └── Index.tsx              # Main application page
```

## 📱 Usage

1. **Search**: Enter natural language queries in the search bar
2. **AI Results**: View AI-powered search results with explanations
3. **Virtual Try-On**: Click "Try Now" to experience AR try-on
4. **Smart Filters**: Use AI-suggested filters to refine results

## 🔧 Development

### Local Development

- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/b875eb0f-5b26-4418-aa2c-ea4d25d97285) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
