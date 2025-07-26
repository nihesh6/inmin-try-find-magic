# Gemini AI Integration Guide

## Overview

This project now uses Google's Gemini AI as an intelligent shopping agent to provide advanced product search and recommendations. The AI acts as a personal shopping assistant that understands natural language queries and provides contextual results.

## How It Works

### 1. AI-Powered Search Agent

The Gemini AI service (`src/services/geminiService.ts`) acts as an intelligent agent that:

- **Analyzes Intent**: Understands what the user is really looking for
- **Semantic Matching**: Goes beyond keyword matching to understand context
- **Smart Ranking**: Prioritizes products based on relevance, ratings, and user intent
- **Provides Insights**: Explains why products were recommended
- **Suggests Filters**: Recommends relevant categories and price ranges

### 2. Natural Language Processing

Users can search using natural language like:

- "I need comfortable shoes for long walks"
- "Find me affordable wireless headphones for the gym"
- "Show me luxury skincare for sensitive skin"
- "What electronics would impress a tech enthusiast?"

### 3. Intelligent Responses

The AI provides:

- **Ranked Results**: Products ordered by relevance and quality
- **Search Insights**: Explanations of why products match the query
- **Contextual Filters**: Suggested categories and price ranges
- **Personalized Recommendations**: Based on user preferences and behavior

## Setup Instructions

### 1. Get Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the API key

### 2. Configure Environment

1. Copy the example environment file:

   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your API key:

   ```env
   VITE_GEMINI_API_KEY=your_actual_api_key_here
   ```

3. **Important**: Never commit your API key to version control!

### 3. Install Dependencies

```bash
npm install
```

### 4. Start Development Server

```bash
npm run dev
```

## Code Structure

### Gemini Service (`src/services/geminiService.ts`)

```typescript
// Main search function
export async function searchProductsWithGemini(
  request: ProductSearchRequest
): Promise<ProductSearchResponse>;

// Personalized recommendations
export async function getPersonalizedRecommendations(
  userPreferences
): Promise<ProductSearchResponse>;
```

### Key Features:

1. **Intelligent Prompting**: Creates detailed prompts for Gemini AI
2. **Error Handling**: Graceful fallback to basic search if AI fails
3. **Response Parsing**: Safely parses AI responses
4. **Product Matching**: Maps AI recommendations to actual products

### Updated Components

1. **AISearchResults.tsx**: Now uses Gemini instead of mock search
2. **SearchBar.tsx**: Enhanced with AI-focused suggestions and hints
3. **Product Database**: Comprehensive mock data for testing

## AI Agent Prompting Strategy

The system uses carefully crafted prompts to make Gemini act as a shopping agent:

```typescript
const prompt = `
You are an intelligent shopping assistant AI agent. A customer is searching for products with the following query: "${
  request.query
}"

Here is the available product catalog:
${JSON.stringify(mockProductDatabase, null, 2)}

As a smart shopping agent, please:
1. Analyze the customer's query to understand their intent, preferences, and needs
2. Find the most relevant products from the catalog that match their query
3. Rank them by relevance, considering factors like:
   - Direct keyword matches
   - Semantic similarity
   - User intent (price sensitivity, quality preferences, specific features)
   - Product ratings and reviews
   - Stock availability
4. Provide intelligent insights about the search
5. Suggest helpful filters based on the query
`;
```

## Example API Responses

### Search Query: "comfortable running shoes"

**AI Response:**

```json
{
  "productIds": ["c3", "s1"],
  "searchInsights": "I found athletic footwear designed for comfort and performance. The running shoes feature advanced cushioning and breathable materials, while the yoga mat complements your fitness routine.",
  "suggestedFilters": {
    "categories": ["Clothing", "Sports"],
    "priceRanges": ["under-100", "100-300"],
    "features": ["Breathable", "Cushioning", "Non-slip"]
  }
}
```

## Testing the AI Agent

### Try These Search Queries:

1. **Basic Product Search**: "wireless headphones"
2. **Intent-Based Search**: "I need something for working from home"
3. **Context-Aware Search**: "comfortable shoes for long walks"
4. **Price-Sensitive Search**: "affordable electronics for students"
5. **Feature-Specific Search**: "waterproof sports gear"
6. **Lifestyle Search**: "professional clothes for job interviews"

### Expected AI Behaviors:

- **Understanding Context**: "working from home" → comfortable clothes, desk accessories
- **Price Sensitivity**: "affordable" → filters to budget-friendly options
- **Feature Recognition**: "waterproof" → prioritizes IPX-rated products
- **Lifestyle Matching**: "professional" → business attire and accessories

## Error Handling

The system includes robust error handling:

1. **API Failures**: Falls back to basic keyword search
2. **Invalid Responses**: Parses AI responses safely
3. **Network Issues**: Shows user-friendly error messages
4. **Rate Limits**: Graceful degradation to prevent API overuse

## Performance Considerations

- **Response Caching**: Consider implementing caching for common queries
- **Rate Limiting**: Monitor API usage to stay within limits
- **Fallback Strategy**: Always provide results, even if AI fails
- **Loading States**: Clear feedback during AI processing

## Future Enhancements

1. **User Preference Learning**: Remember user choices to improve recommendations
2. **Voice Search**: Integrate speech-to-text for voice queries
3. **Visual Search**: Upload images to find similar products
4. **Conversation Memory**: Multi-turn conversations with context
5. **Real-time Inventory**: Connect to actual product databases
6. **Personalization**: User accounts with preference tracking

## Security & Privacy

- **API Key Protection**: Never expose keys in client-side code
- **User Data**: No personal data is sent to Gemini (only search queries)
- **Rate Limiting**: Implement proper rate limiting for production
- **Error Logging**: Monitor API usage and errors

## Troubleshooting

### Common Issues:

1. **"AI search temporarily unavailable"**

   - Check your API key in `.env`
   - Verify internet connection
   - Check Gemini API status

2. **No results for searches**

   - Ensure product database is loaded
   - Check console for errors
   - Verify API key permissions

3. **Slow responses**
   - Normal for AI processing (1-3 seconds)
   - Consider implementing loading states
   - Monitor API rate limits

### Debug Mode:

Enable console logging to debug AI responses:

```javascript
// In geminiService.ts
console.log("AI Response:", response);
console.log("Parsed Results:", aiResponse);
```

## Production Deployment

### Environment Variables:

```env
# Production
VITE_GEMINI_API_KEY=prod_api_key_here

# Staging
VITE_GEMINI_API_KEY=staging_api_key_here
```

### Security Best Practices:

1. Use environment-specific API keys
2. Implement rate limiting
3. Add request logging and monitoring
4. Set up error alerting
5. Regular security audits

---

This integration transforms the shopping experience from basic keyword search to intelligent, conversational product discovery powered by Google's Gemini AI.
