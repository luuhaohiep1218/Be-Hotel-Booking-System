const { openAIRequest } = require("../config/openaiconfig");

const getAIResponse = async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: "Vui lòng nhập câu hỏi." });
  }

  try {
    const aiResponse = await openAIRequest(query);
    res.json({ response: aiResponse });
  } catch (error) {
    res.status(500).json({ error: "Không thể lấy phản hồi từ AI" });
  }
};

module.exports = { getAIResponse };
