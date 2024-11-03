import { NextRequest, NextResponse } from 'next/server';
import Anthropic from "@anthropic-ai/sdk";

interface BlogPost {
  title: string;
  metaDescription: string;
  content: string;
}
interface TextBlock {
  type: 'text';
  text: string;
}

interface ContentBlock {
  type: string;
  [key: string]: any;
}

type MessageContent = TextBlock | ContentBlock;

interface ClaudeMessage {
  content: MessageContent[];
  role: string;
  // ... other properties
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, apiKey, generatePost = false } = body;

    if (!message || !apiKey) {
      return NextResponse.json(
        { error: 'Message and API key are required' },
        { status: 400 }
      );
    }

    const anthropic = new Anthropic({
      apiKey: apiKey,
    });

    const msg = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      messages: [{ 
        role: "user", 
        content: generatePost ? 
          `Generate a blog post about: ${message}. Return ONLY a valid JSON object with exactly this structure: { "title": string, "metaDescription": string, "content": string }. The metaDescription must be under 155 characters. Do not include any other text or explanation.` :
          message 
      }],
    });

    // Access the content properly based on the new API structure
    const firstContent = msg.content[0];
    let responseText  = firstContent && 'text' in firstContent 
      ? String(firstContent.text).trim()
      : '';
    

    if (generatePost) {
      try {
        responseText = responseText.trim();
      if (responseText.startsWith('```json')) {
        responseText = responseText.replace(/```json\n?/, '').replace(/```$/, '');
      }
      
      // Clean the response text
      const cleanedResponse = responseText
        .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, '') // Remove control characters except \n
        .replace(/\r\n/g, '\n') // Normalize line endings
        .replace(/\\([^"\\\/bfnrt])/g, '$1'); // Remove
       
        return NextResponse.json({ content: cleanedResponse });
      } catch (error) {
        console.error('Failed to parse Claude response:', error);
        // If parsing fails, create a structured response
        const fallbackResponse: BlogPost = {
          title: "Blog Post",
          metaDescription: responseText.substring(0, 155),
          content: responseText
        };
        return NextResponse.json({ 
          content: JSON.stringify(fallbackResponse)
        });
      }
    }

    return NextResponse.json({ content: responseText });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}