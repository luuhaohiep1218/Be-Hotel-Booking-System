require("dotenv").config();
const axios = require("axios");
console.log("Environment Variables Loaded:");
console.log(process.env);  // Log tất cả các biến môi trường để kiểm tra
console.log("OPENAI_API_KEY:", process.env.OPENAI_API_KEY);  // Log chỉ API Key
const API_URL = "https://api.openai.com/v1/chat/completions";
const API_KEY = process.env.OPENAI_API_KEY;

// Debugging: Log the current working directory and API_KEY
console.log("Current working directory:", process.cwd());
console.log("OPENAI_API_KEY:", API_KEY);
const openAIRequest = async (userInput) => {
  try {
    const response = await axios.post(
      API_URL,
      {
      model: "gpt-4o-mini",
        messages: [{ role: "user", content: userInput }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI API Error:", error.response?.data || error.message);
    throw new Error("Lỗi khi gọi OpenAI API");
  }
};

module.exports = { openAIRequest };