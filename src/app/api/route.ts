import {NextRequest, NextResponse } from 'next/server';
import Anthropic from "@anthropic-ai/sdk";

interface RequestBody {
  message: string;
  apiKey: string;
  generatePost?: boolean;
}

interface BlogPostResponse {
  title: string;
  metaDescription: string;
  content: string;
}

interface ApiResponse {
  content: string | BlogPostResponse;
}

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({ 
      message: 'hi there' 
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}