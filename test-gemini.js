import { searchProductsWithGemini } from "../src/services/geminiService";

// Simple test to verify Gemini AI integration
async function testGeminiIntegration() {
  console.log("🤖 Testing Gemini AI Integration...");

  try {
    const testQuery = "comfortable running shoes";
    console.log(`\n📝 Testing query: "${testQuery}"`);

    const result = await searchProductsWithGemini({
      query: testQuery,
      maxResults: 5,
    });

    console.log("\n✅ AI Search Results:");
    console.log(`📊 Found ${result.products.length} products`);
    console.log(`💡 AI Insights: ${result.searchInsights}`);
    console.log("\n🛍️ Recommended Products:");

    result.products.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} - $${product.price}`);
      console.log(
        `   Category: ${product.category} | Rating: ${product.rating}⭐`
      );
    });

    console.log("\n🎯 Suggested Filters:");
    console.log(`Categories: ${result.suggestedFilters.categories.join(", ")}`);
    console.log(
      `Price Ranges: ${result.suggestedFilters.priceRanges.join(", ")}`
    );

    console.log("\n🎉 Gemini AI integration test completed successfully!");
  } catch (error) {
    console.error("❌ Test failed:", error);
    console.log("\n💡 Make sure you have:");
    console.log("1. Added your Gemini API key to .env file");
    console.log("2. Internet connection for API calls");
    console.log("3. Valid API key with proper permissions");
  }
}

// Run the test
testGeminiIntegration();
