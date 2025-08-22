"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Lightbulb, Target, Users, DollarSign, Sparkles, TrendingUp, CheckCircle, AlertCircle } from "lucide-react"

interface IdeaValidation {
  idea: string
  category: string
  viability: number
  feasibility: number
  usability: number
  persona: string
  valueProposition: string
  monetization: string[]
  developmentTime: string
  marketSize: string
}

const categories = [
  "Productivity & Organization",
  "Health & Fitness",
  "E-commerce & Marketplaces",
  "Social & Community",
  "Education & Learning",
  "Finance & Fintech",
  "Content Creation",
  "Local Services",
  "Entertainment",
  "Random (AI chooses)",
]

const sampleIdeas: IdeaValidation[] = [
  {
    idea: "AI-powered meal planning app that creates personalized weekly menus based on dietary restrictions, budget, and local grocery store inventory",
    category: "Health & Fitness",
    viability: 8,
    feasibility: 7,
    usability: 9,
    persona: "Busy professionals aged 25-40 with dietary restrictions or health goals",
    valueProposition:
      "Saves 3+ hours weekly on meal planning while ensuring nutritional goals are met within budget constraints",
    monetization: ["Freemium subscription", "Grocery store partnerships", "Premium recipe collections"],
    developmentTime: "3-4 weeks",
    marketSize: "Large - $12B meal kit market growing 12% annually",
  },
  {
    idea: "Smart habit tracker that uses AI to predict when you're most likely to break habits and sends personalized intervention messages",
    category: "Productivity & Organization",
    viability: 7,
    feasibility: 8,
    usability: 8,
    persona: "Self-improvement enthusiasts aged 22-45 struggling with consistency",
    valueProposition: "Increases habit success rate by 40% through predictive behavioral interventions",
    monetization: ["Premium analytics", "Corporate wellness programs", "Coaching integrations"],
    developmentTime: "2-3 weeks",
    marketSize: "Medium - $4.2B personal development app market",
  },
]

export default function AIAppIdeaGenerator() {
  const [activeTab, setActiveTab] = useState("generate")
  const [userIdea, setUserIdea] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [validation, setValidation] = useState<IdeaValidation | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerateIdea = async () => {
    setIsGenerating(true)
    // Simulate AI generation delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // For demo, randomly select a sample idea
    const randomIdea = sampleIdeas[Math.floor(Math.random() * sampleIdeas.length)]
    setValidation(randomIdea)
    setIsGenerating(false)
  }

  const handleValidateIdea = async () => {
    if (!userIdea.trim()) return

    setIsGenerating(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock validation for user's idea
    const mockValidation: IdeaValidation = {
      idea: userIdea,
      category: selectedCategory || "Productivity & Organization",
      viability: Math.floor(Math.random() * 3) + 7, // 7-9
      feasibility: Math.floor(Math.random() * 3) + 6, // 6-8
      usability: Math.floor(Math.random() * 3) + 7, // 7-9
      persona: "Tech-savvy millennials aged 25-35 seeking efficiency solutions",
      valueProposition: "Streamlines daily workflows and reduces time spent on repetitive tasks by 30%",
      monetization: ["Freemium model", "Enterprise licensing", "API access fees"],
      developmentTime: "2-4 weeks",
      marketSize: "Medium - Growing market with strong demand",
    }

    setValidation(mockValidation)
    setIsGenerating(false)
  }

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-emerald-600"
    if (score >= 6) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 8) return "Excellent"
    if (score >= 6) return "Good"
    return "Needs Work"
  }

  const generateRecommendations = (validation: IdeaValidation) => {
    const recommendations = []

    if (validation.viability < 8) {
      recommendations.push({
        type: "viability",
        title: "Improve Market Viability Score",
        suggestions: [
          "Target a larger addressable market or expand to adjacent markets",
          "Increase pricing power by adding premium AI features that justify higher costs",
          "Reduce customer acquisition costs by focusing on viral or referral mechanics",
          "Demonstrate stronger product-market fit through user retention metrics",
          "Add network effects that make the product more valuable as more users join",
        ],
      })
    }

    if (validation.feasibility < 8) {
      recommendations.push({
        type: "feasibility",
        title: "Enhance Technical Feasibility Score",
        suggestions: [
          "Reduce technical complexity by using pre-built AI APIs instead of custom models",
          "Minimize data requirements by starting with simpler input/output patterns",
          "Lower infrastructure costs by choosing serverless or managed services",
          "Decrease development time by leveraging existing frameworks and templates",
          "Reduce technical risk by building on proven technology stacks",
        ],
      })
    }

    if (validation.usability < 8) {
      recommendations.push({
        type: "usability",
        title: "Boost User Experience Score",
        suggestions: [
          "Simplify the user interface by reducing the number of steps to core value",
          "Improve onboarding flow to get users to 'aha moment' faster",
          "Enhance mobile experience since most users will access via mobile devices",
          "Add intuitive AI interactions that feel natural rather than technical",
          "Increase user engagement through gamification or progress tracking",
        ],
      })
    }

    if (validation.viability >= 8 && validation.feasibility >= 8 && validation.usability >= 8) {
      recommendations.push({
        type: "general",
        title: "Optimization Tips for High-Scoring Ideas",
        suggestions: [
          "Focus on rapid MVP development to validate assumptions quickly",
          "Implement analytics to measure the key metrics that drive your scores",
          "Consider premium positioning to maximize viability score potential",
          "Build in feedback loops to continuously improve usability metrics",
        ],
      })
    } else {
      recommendations.push({
        type: "general",
        title: "Cross-Cutting Score Improvements",
        suggestions: [
          "Conduct user interviews to validate both market need (viability) and ease of use (usability)",
          "Create a technical proof-of-concept to de-risk feasibility concerns",
          "Research competitor weaknesses that you can exploit across all three dimensions",
          "Consider pivoting to a simpler version that scores higher across all metrics",
        ],
      })
    }

    return recommendations
  }

  return (
   <div className="min-h-screen bg-gray-50">
      {/* Header */}
    <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Lightbulb className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold text-foreground">AI App Idea Generator</h1>
              <p className="text-muted-foreground">Validate and generate monetizable AI app ideas in 2-4 weeks</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="generate" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Generate Ideas
            </TabsTrigger>
            <TabsTrigger value="validate" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Validate My Idea
            </TabsTrigger>
          </TabsList>

          <TabsContent value="generate" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Generate AI App Ideas</CardTitle>
                <CardDescription>
                  Get AI-powered app ideas tailored to specific categories with built-in validation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="category">App Category (Optional)</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a category or leave blank for random" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleGenerateIdea} disabled={isGenerating} className="w-full" size="lg">
                  {isGenerating ? "Generating..." : "Generate App Idea"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="validate" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Validate Your App Idea</CardTitle>
                <CardDescription>
                  Enter your app idea to get viability, feasibility, and usability scores
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="idea">Your App Idea</Label>
                  <Textarea
                    id="idea"
                    placeholder="Describe your app idea in detail..."
                    value={userIdea}
                    onChange={(e) => setUserIdea(e.target.value)}
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">App Category</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select the most relevant category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.slice(0, -1).map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  onClick={handleValidateIdea}
                  disabled={isGenerating || !userIdea.trim()}
                  className="w-full"
                  size="lg"
                >
                  {isGenerating ? "Validating..." : "Validate Idea"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Validation Results */}
        {validation && (
          <div className="mt-8 space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-serif font-bold">Validation Results</h2>
            </div>

            {/* Idea Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">App Idea</CardTitle>
                <Badge variant="secondary">{validation.category}</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed">{validation.idea}</p>
              </CardContent>
            </Card>

            {/* Scoring Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-serif flex items-center gap-2">
                    <Target className="h-5 w-5 text-chart-1" />
                    Viability
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold font-serif">{validation.viability}/10</span>
                      <Badge className={getScoreColor(validation.viability)}>
                        {getScoreLabel(validation.viability)}
                      </Badge>
                    </div>
                    <Progress value={validation.viability * 10} className="h-2" />
                    <p className="text-sm text-muted-foreground">Market potential and demand</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-serif flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-chart-2" />
                    Feasibility
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold font-serif">{validation.feasibility}/10</span>
                      <Badge className={getScoreColor(validation.feasibility)}>
                        {getScoreLabel(validation.feasibility)}
                      </Badge>
                    </div>
                    <Progress value={validation.feasibility * 10} className="h-2" />
                    <p className="text-sm text-muted-foreground">Technical implementation difficulty</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-serif flex items-center gap-2">
                    <Users className="h-5 w-5 text-chart-3" />
                    Usability
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold font-serif">{validation.usability}/10</span>
                      <Badge className={getScoreColor(validation.usability)}>
                        {getScoreLabel(validation.usability)}
                      </Badge>
                    </div>
                    <Progress value={validation.usability * 10} className="h-2" />
                    <p className="text-sm text-muted-foreground">User experience and adoption</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Analysis */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Target Persona
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground leading-relaxed">{validation.persona}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-serif flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Value Proposition
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground leading-relaxed">{validation.valueProposition}</p>
                </CardContent>
              </Card>
            </div>

            {/* Monetization & Development */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    Monetization Strategies
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {validation.monetization.map((strategy, index) => (
                      <Badge key={index} variant="outline">
                        {strategy}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Development Timeline</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Estimated Time:</span>
                    <Badge>{validation.developmentTime}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Market Size:</span>
                    <span className="text-sm font-medium">{validation.marketSize}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recommendations Section */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  Recommendations to Improve Your Scores
                </CardTitle>
                <CardDescription>
                  Actionable suggestions to enhance viability, feasibility, and usability
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {generateRecommendations(validation).map((rec, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-muted-foreground" />
                        <h4 className="font-semibold text-foreground">{rec.title}</h4>
                        {rec.type !== "general" && (
                          <Badge variant="outline" className="text-xs">
                            {rec.type}
                          </Badge>
                        )}
                      </div>
                      <ul className="space-y-2 ml-6">
                        {rec.suggestions.map((suggestion, suggestionIndex) => (
                          <li key={suggestionIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
