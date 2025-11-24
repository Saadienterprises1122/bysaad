import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API Key not found");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export type ContentType = 
  | 'taglines' 
  | 'blog-ideas' 
  | 'social-posts' 
  | 'news-feed' 
  | 'marketing-angles' 
  | 'content-outlines' 
  | 'topic-ideas'
  | 'code-snippets'
  | 'api-integrations'
  | 'innovative-expansions';

export const generateMarketingContent = async (
  topic: string, 
  industry: string,
  type: ContentType
): Promise<string[]> => {
  const ai = getClient();
  if (!ai) return ["AI Service Unavailable - Check API Key"];

  try {
    const model = 'gemini-2.5-flash';
    
    const basePrompt = `Act as a world-class content strategist for the "${industry}" industry, focusing on "${topic}".`;
    
    const prompts: Record<ContentType, string> = {
      'taglines': `${basePrompt} Generate 5 punchy, high-converting marketing taglines (max 10 words each). Return ONLY a raw JSON array of strings. Do not use markdown formatting.`,
      'blog-ideas': `${basePrompt} Generate 5 engaging blog post titles that would drive SEO traffic. Return ONLY a raw JSON array of strings. Do not use markdown formatting.`,
      'social-posts': `${basePrompt} Generate 5 viral-ready social media post ideas/captions. Return ONLY a raw JSON array of strings. Do not use markdown formatting.`,
      'news-feed': `${basePrompt} Generate 5 trending news feed headline ideas or current event hooks relevant to this niche. Return ONLY a raw JSON array of strings. Do not use markdown formatting.`,
      'marketing-angles': `${basePrompt} Generate 5 unique marketing angles, psychological hooks, or value propositions to sell products/services in this niche. Return ONLY a raw JSON array of strings. Do not use markdown formatting.`,
      'content-outlines': `${basePrompt} Generate 5 high-level content outlines or structures (e.g., "Intro -> Problem -> Solution -> Call to Action"). Return ONLY a raw JSON array of strings. Do not use markdown formatting.`,
      'topic-ideas': `${basePrompt} Generate 5 specific, high-interest sub-topics or themes to explore within this niche. Return ONLY a raw JSON array of strings. Do not use markdown formatting.`,
      'code-snippets': `${basePrompt} Generate 3 useful, short code snippets (Python, JS, or SQL) that solve a common problem in this domain. Return ONLY a raw JSON array of strings. Do not use markdown formatting.`,
      'api-integrations': `${basePrompt} Generate 5 creative ideas for API integrations or software workflows that would benefit this industry. Return ONLY a raw JSON array of strings. Do not use markdown formatting.`,
      'innovative-expansions': `${basePrompt} Generate 5 innovative sub-services, emerging trends, or complementary tools that would expand this service offering. Return ONLY a raw JSON array of strings. Do not use markdown formatting.`
    };

    const response = await ai.models.generateContent({
      model,
      contents: prompts[type],
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text;
    if (!text) return ["Could not generate text."];

    return JSON.parse(text);
  } catch (error) {
    console.error("Error generating content:", error);
    return ["Error connecting to AI Strategy Engine."];
  }
};

export type ToolType = 
  | 'code-refactor' 
  | 'sql-query' 
  | 'color-palette' 
  | 'regex-generator'
  | 'image-generator'
  | 'resume-analyzer'
  | 'user-persona'
  | 'readme-generator'
  | 'unit-test-writer'
  | 'api-ideas';

export const generateToolResult = async (type: ToolType, input: string): Promise<any> => {
  const ai = getClient();
  if (!ai) return { error: "AI Service Unavailable" };

  try {
    // Handle Image Generation separately using gemini-2.5-flash-image
    if (type === 'image-generator') {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: input }] }
      });
      
      const candidates = response.candidates;
      if (candidates && candidates.length > 0) {
        for (const part of candidates[0].content?.parts || []) {
          if (part.inlineData) {
            return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
          }
        }
      }
      return "No image generated. Please try a more specific prompt.";
    }

    const model = 'gemini-2.5-flash';
    let isJson = false;

    const prompts: Record<ToolType, { prompt: string; json: boolean }> = {
      'code-refactor': {
        prompt: `Act as a Senior Software Engineer. Refactor the following code to be more efficient, readable, and follow best practices. Provide a brief explanation of changes followed by the code block. \n\nCode to refactor:\n${input}`,
        json: false
      },
      'sql-query': {
        prompt: `Act as a Senior Database Administrator. Write an optimized SQL query for the following request: "${input}". Provide the SQL code and a brief explanation of how it works.`,
        json: false
      },
      'color-palette': {
        prompt: `Act as a Professional UI/UX Designer. Generate a 5-color palette based on this mood/description: "${input}". Return ONLY a raw JSON array of objects. Each object must have: "hex" (string), "name" (creative name string), and "usage" (short suggestion string like "Background", "Accent"). Do not use markdown formatting.`,
        json: true
      },
      'regex-generator': {
        prompt: `Act as a Regex Expert. Create a Regular Expression for the following requirement: "${input}". Provide the regex pattern, flags, and a breakdown of how it works.`,
        json: false
      },
      'image-generator': { prompt: '', json: false }, // Handled above
      'resume-analyzer': {
        prompt: `Act as an expert Hiring Manager and Career Coach. Analyze the following resume text. Provide a report in Markdown format with: \n1. Key Strengths (Bullet points)\n2. Areas for Improvement (Bullet points)\n3. Missing Keywords (if specific role inferred)\n4. Formatting Check\n\nResume Text:\n${input}`,
        json: false
      },
      'user-persona': {
        prompt: `Act as a UX Researcher. Create 2 distinct User Personas for the product described below. For each, include Name, Age, Occupation, Bio, Core Needs, and Pain Points. Format in Markdown.\n\nProduct Description:\n${input}`,
        json: false
      },
      'readme-generator': {
        prompt: `Act as a Senior Open Source Maintainer. Generate a comprehensive README.md for the project described below. Include sections: Title, Description, Key Features, Installation, Usage, and Tech Stack. Return the content in raw Markdown.\n\nProject Description:\n${input}`,
        json: false
      },
      'unit-test-writer': {
        prompt: `Act as a Senior QA Automation Engineer. Write a complete unit test file for the provided function/code. Detect the language (e.g., Python/Pytest, JS/Jest, TS/Vitest). Include edge cases and comments explaining the tests. Return code in a code block.\n\nSource Code:\n${input}`,
        json: false
      },
      'api-ideas': {
        prompt: `Act as a Senior Solution Architect. Suggest 5 API integrations or external services that would enhance the system described below. For each, explain 'Why' (the benefit) and 'How' (conceptual implementation). Format as Markdown.\n\nSystem Description:\n${input}`,
        json: false
      }
    };

    const config: any = {};
    if (prompts[type].json) {
      config.responseMimeType = "application/json";
      isJson = true;
    }

    const response = await ai.models.generateContent({
      model,
      contents: prompts[type].prompt,
      config
    });

    const text = response.text;
    if (!text) return "Could not generate result.";

    if (isJson) {
      try {
        return JSON.parse(text);
      } catch (e) {
        return text;
      }
    }

    return text;
  } catch (error) {
    console.error("Error using AI Tool:", error);
    return "Error processing your request. Please try again.";
  }
};
