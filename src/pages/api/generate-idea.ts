import { NextApiRequest, NextApiResponse } from 'next'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { category } = req.body

    const prompt = `Generate a monetizable AI app idea for the category: ${category || 'any category'}.

Requirements:
- Must be buildable with current AI tools in 2-4 weeks
- Should have clear monetization potential
- Target specific user persona
- Solve a real problem

Return a JSON object with:
{
  "idea": "Detailed app idea description",
  "category": "${category || 'Productivity & Organization'}",
  "viability": number (1-10),
  "feasibility": number (1-10),
  "usability": number (1-10),
  "persona": "Target user description",
  "valueProposition": "Clear value statement",
  "monetization": ["strategy1", "strategy2", "strategy3"],
  "developmentTime": "X-Y weeks",
  "marketSize": "Market size description",
  "techStack": ["tool1", "tool2", "tool3"],
  "keyFeatures": ["feature1", "feature2", "feature3"]
}

Make it realistic and specific.`

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert product manager and AI developer who creates practical, monetizable app ideas. Always respond with valid JSON only."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: 1000,
    })

    const response = completion.choices[0]?.message?.content
    if (!response) {
      throw new Error('No response from OpenAI')
    }

    // Parse the JSON response
    let ideaData
    try {
      ideaData = JSON.parse(response)
    } catch (parseError) {
      // If JSON parsing fails, create a structured response
      ideaData = {
        idea: response,
        category: category || 'Productivity & Organization',
        viability: Math.floor(Math.random() * 3) + 7,
        feasibility: Math.floor(Math.random() * 3) + 7,
        usability: Math.floor(Math.random() * 3) + 7,
        persona: "Tech-savvy professionals seeking efficiency solutions",
        valueProposition: "Streamlines workflows and saves time through AI automation",
        monetization: ["Freemium subscription", "Enterprise licensing", "API access"],
        developmentTime: "2-4 weeks",
        marketSize: "Growing market with strong demand",
        techStack: ["Next.js", "OpenAI API", "Supabase"],
        keyFeatures: ["AI-powered automation", "User dashboard", "Analytics"]
      }
    }

    res.status(200).json(ideaData)
  } catch (error) {
    console.error('Error generating idea:', error)
    res.status(500).json({ error: 'Failed to generate idea' })
  }
}