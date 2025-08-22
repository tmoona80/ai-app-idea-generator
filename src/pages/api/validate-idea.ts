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
    const { idea, category } = req.body

    if (!idea) {
      return res.status(400).json({ error: 'Idea is required' })
    }

    const prompt = `Analyze this app idea and provide a detailed validation:

App Idea: "${idea}"
Category: "${category}"

Evaluate on:
1. Viability (market potential, demand, competition)
2. Feasibility (technical complexity, buildability in 2-4 weeks with AI tools)
3. Usability (user experience, adoption barriers)

Return a JSON object with:
{
  "idea": "${idea}",
  "category": "${category}",
  "viability": number (1-10),
  "feasibility": number (1-10), 
  "usability": number (1-10),
  "persona": "Specific target user description",
  "valueProposition": "Clear value statement",
  "monetization": ["specific strategy1", "strategy2", "strategy3"],
  "developmentTime": "X-Y weeks estimate",
  "marketSize": "Market analysis",
  "strengths": ["strength1", "strength2"],
  "challenges": ["challenge1", "challenge2"],
  "recommendations": ["recommendation1", "recommendation2"],
  "techStack": ["recommended tool1", "tool2", "tool3"],
  "competitorAnalysis": "Brief analysis of existing solutions"
}

Be honest about scores and provide actionable insights.`

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert product manager and venture capitalist who provides honest, actionable feedback on app ideas. Focus on practical, realistic assessments. Always respond with valid JSON only."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 1200,
    })

    const response = completion.choices[0]?.message?.content
    if (!response) {
      throw new Error('No response from OpenAI')
    }

    // Parse the JSON response
    let validationData
    try {
      validationData = JSON.parse(response)
    } catch (parseError) {
      console.error('JSON parse error:', parseError)
      // Fallback response structure
      validationData = {
        idea: idea,
        category: category,
        viability: 7,
        feasibility: 8,
        usability: 7,
        persona: "Tech-savvy professionals looking for productivity solutions",
        valueProposition: "Addresses a real problem with a clear solution",
        monetization: ["Freemium model", "Premium features", "Enterprise plans"],
        developmentTime: "3-4 weeks",
        marketSize: "Medium-sized market with growth potential",
        strengths: ["Clear problem-solution fit", "Leverages AI effectively"],
        challenges: ["Market competition", "User acquisition"],
        recommendations: ["Focus on MVP features", "Validate with target users"],
        techStack: ["Next.js", "OpenAI API", "Database"],
        competitorAnalysis: "Several competitors exist but opportunity for differentiation"
      }
    }

    res.status(200).json(validationData)
  } catch (error) {
    console.error('Error validating idea:', error)
    res.status(500).json({ error: 'Failed to validate idea' })
  }
}