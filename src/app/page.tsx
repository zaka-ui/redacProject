"use client";
import type { NextPage } from "next";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tag, Loader2, Plus, X } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { log } from "console";


// Define all necessary interfaces
interface WPConfig {
  siteUrl: string;
  username: string;
  applicationPassword: string;
}

interface BlogPost {
  title: string;
  metaDescription: string;
  content: string;
}

interface ElementorData {
  title: string;
  content: string;
  elementor_data: string;
}

type TagType = "name" | "phone" | "keyword" | "siteURL";

interface Tags {
  name: string;
  phone: string;
  keyword: string;
  siteURL: string;
}

interface ClaudeAPIResponse {
  content: BlogPost | string;
  error?: string;
  htmlContent?: boolean;
}

interface PresetTemplate {
  name: string;
  template: {
    id: string;
    elType: string;
    settings: Record<string, any>;
    elements: any[];
  };
}

interface PresetTemplates {
  [key: string]: PresetTemplate;
}

interface ElementorTemplateInputProps {
  onTemplateChange: (template: any) => void;
  className?: string;
}

// Fixed ElementorTemplateInput component
const ElementorTemplateInput: React.FC<ElementorTemplateInputProps> = ({
  onTemplateChange,
}) => {
  const [inputMethod, setInputMethod] = useState<"preset" | "paste">("preset");
  const [templateJson, setTemplateJson] = useState<string>("");

  const presetTemplates: PresetTemplates = {
    default: {
      name: "Default Template",
      template: {
        id: "default-template",
        elType: "section",
        settings: {},
        elements: [],
      },
    },
  };

  const handleMethodChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputMethod(e.target.value as "preset" | "paste");
    setTemplateJson("");
    onTemplateChange(null);
  };

  return (
    <div className="space-y-4 border p-4 rounded-lg">
      <div className="space-y-2">
        <h3 className="font-medium text-base">Choose Template Method</h3>
        <div className="flex gap-4">
          <div className="flex items-center">
            <input
              id="preset"
              type="radio"
              name="templateMethod"
              value="preset"
              checked={inputMethod === "preset"}
              onChange={handleMethodChange}
              className="w-4 h-4 border-gray-300"
            />
            <label htmlFor="preset" className="ml-2 text-sm font-medium text-gray-900">
              Use Preset Template
            </label>
          </div>

          <div className="flex items-center">
            <input
              id="paste"
              type="radio"
              name="templateMethod"
              value="paste"
              checked={inputMethod === "paste"}
              onChange={handleMethodChange}
              className="w-4 h-4 border-gray-300"
            />
            <label htmlFor="paste" className="ml-2 text-sm font-medium text-gray-900">
              Paste Custom Template
            </label>
          </div>
        </div>
      </div>

      {inputMethod === "preset" ? (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-900">Select Template</h3>
          <div className="grid gap-2">
            {Object.entries(presetTemplates).map(([key, template]) => (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setTemplateJson(JSON.stringify(template.template, null, 2));
                  onTemplateChange(template.template);
                }}
                className="px-4 py-2 text-left border rounded hover:bg-gray-50 text-sm"
              >
                {template.name}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-900">
            Paste Elementor Template JSON
          </h3>
          <textarea
            value={templateJson}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
              const value = e.target.value;
              setTemplateJson(value);
              try {
                const parsed = JSON.parse(value);
                onTemplateChange(parsed);
              } catch (error) {
                console.error("Invalid JSON template:", error);
              }
            }}
            placeholder="Paste your Elementor template JSON here..."
            className="w-full h-48 p-2 text-sm font-mono border rounded-md"
            spellCheck="false"
          />
          <p className="text-sm text-gray-500">
            Use {"{{content}}"} as a placeholder where you want the content to be inserted.
          </p>
        </div>
      )}

      {templateJson && (
        <div className="p-3 rounded-md bg-green-50 text-green-700 text-sm">
          Template loaded successfully
        </div>
      )}
    </div>
  );
};


const Home: NextPage = () => {
  const [wpUrl, setWpUrl] = useState<string>("");
  const [wpConfig, setWpConfig] = useState<WPConfig>({
    siteUrl: "",
    username: "", // Add username state
    applicationPassword: "",
  });

  const [autoPost, setAutoPost] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>("");
  const [enterprise, setEnterprise] = useState<string>("");
  const [siteURL, setSiteURL] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [keywords, setKeywords] = useState<string>("");
  const [keywordList, setKeywordList] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [submittedText, setSubmittedText] = useState<string>("");
  const [showResult, setShowResult] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const [processingStatus, setProcessingStatus] = useState<string>("");
  const [currentKeyword, setCurrentKeyword] = useState<string>("");
  const [elementorTemplate, setElementorTemplate] = useState<any>(null);

  const insertTag = (tagType: TagType): void => {
    const tags: Tags = {
      name: "{{enterprise}}",
      phone: "{{phone}}",
      keyword: "{{keyword}}",
      siteURL: "{{siteURL}}",
    };

    const textarea = document.getElementById(
      "messageArea"
    ) as HTMLTextAreaElement;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const currentText = text;
      const newText =
        currentText.substring(0, start) +
        tags[tagType] +
        currentText.substring(end);

      setText(newText);
      // Restore focus to textarea after inserting tag
      textarea.focus();
    }
  };

  const handleAddKeywords = (): void => {
    if (keywords.trim()) {
      const newKeywords = keywords
        .split(",")
        .map((k) => k.trim())
        .filter((k) => k);
      setKeywordList((prevList: string[]) => {
        // Create array from unique values without using spread on Set
        return Array.from(new Set([...prevList, ...newKeywords]));
      });
      setKeywords("");
    }
  };

  const removeKeyword = (keywordToRemove: string): void => {
    setKeywordList((prevList) => prevList.filter((k) => k !== keywordToRemove));
  };

  const getPreviewText = (customKeyword: string | null = null): string => {
    let processed = text
      .replace(/{{enterprise}}/g, enterprise || "[ENTERPRISE]")
      .replace(/{{phone}}/g, phone || "[PHONE]")
      .replace(/{{siteURL}}/g, siteURL || "[SITE URL]");

    const keywordToUse =
      customKeyword !== null ? customKeyword : currentKeyword || "[KEYWORD]";
    processed = processed.replace(/{{keyword}}/g, keywordToUse);

    return processed;
  };

  const downloadTextFile = (content: string, filename: string): void => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const callClaudeAPI = async (
    message: string,
    apiKey: string,
    generatePost: boolean = false
  ): Promise<BlogPost> => {
    try {
      const response = await fetch("/api/claude", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          apiKey,
          generatePost,
        }),
      });
  
      if (!response.ok) {
        throw new Error(
          `API request failed: ${response.status} ${response.statusText}`
        );
      }
  
      const data = await response.json() as ClaudeAPIResponse;
    

      
      if (data.error) {
        throw new Error(data.error);
      }
  
      // If it's a blog post, content will be a BlogPost object
      if (generatePost) {
        if (typeof data.content === 'string') {
          // Handle string response (fallback case)
          return {
            title: `Blog Post`,
            metaDescription: message.substring(0, 155),
            content: data.content
          };
        }
        return data.content as BlogPost;
      }
  
      // If it's not a blog post, content will be a string
      throw new Error('Expected blog post but received string content');
    } catch (error) {
      console.error("Error calling Claude API:", error);
      throw error;
    }
  };


const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
  e.preventDefault();

  if (!apiKey) {
    alert("Please enter your Claude API key.");
    return;
  }

  if (keywordList.length === 0) {
    alert("Please add at least one keyword before submitting.");
    return;
  }

  setIsLoading(true);
  setShowResult(true);
  setProgress(0);

  try {
    for (let i = 0; i < keywordList.length; i++) {
      const keyword = keywordList[i];
      setCurrentKeyword(keyword);
      setProcessingStatus(
        `Processing keyword: ${keyword} (${i + 1}/${keywordList.length})`
      );

      const messageWithKeyword = getPreviewText(keyword);
      setSubmittedText(messageWithKeyword);

      try {
        // Now returns BlogPost directly
        const blogPost = await callClaudeAPI(
          messageWithKeyword,
          apiKey,
          true
        );
     
        // No need for additional parsing since we get a BlogPost object
       if (autoPost && wpConfig.siteUrl && wpConfig.username && wpConfig.applicationPassword) {
          try {
            const wpResponse = await fetch("/api/wordpress", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                title: blogPost.title,
                content: blogPost.content,
                yoastMeta: {
                  focusKeyphrase: keyword,
                  metaDesc: blogPost.metaDescription,
                  metaTitle: blogPost.title,
                },
                elementorData: JSON.stringify(elementorTemplate.template),
                templateType: elementorTemplate.type,
                wpCredentials: {
                  url: wpConfig.siteUrl.trim(),
                  username: wpConfig.username.trim(),
                  applicationPassword: wpConfig.applicationPassword,
                },
              }),
            });

            if (!wpResponse.ok) {
              throw new Error(`WordPress API failed: ${wpResponse.status} ${wpResponse.statusText}`);
            }

            setProcessingStatus(
              `Posted to WordPress with Elementor: ${blogPost.title}`
            );
          } catch (error) {
            console.error("Failed to post to WordPress:", error);
            setProcessingStatus(
              `Failed to post to WordPress: ${
                error instanceof Error ? error.message : "Unknown error"
              }`
            );
          }
        }
       //Save response to file
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const filename = `${keyword}-${timestamp}.txt`;
    
      
        const fileContent = `
            Keyword: ${keyword}
            Title: ${blogPost.title}
            Content:${blogPost.content}`;
        
        downloadTextFile(fileContent, filename);
       setProgress(((i + 1) / keywordList.length) * 100);
      } catch (error) {
        console.error(`Error processing keyword "${keyword}":`, error);
      setProcessingStatus(
          `Error processing keyword "${keyword}": ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );
      
        continue;
      }
    }

    setProcessingStatus("All keywords processed successfully!");
  } catch (error) {
    console.error("Processing error:", error);
    if (error instanceof Error) {
      alert("Error processing request: " + error.message);
    } else {
      alert("An unknown error occurred");
    }
    setProcessingStatus("Error occurred during processing");
  } finally {
    setIsLoading(false);
  }
    
};


  const handleReset = (): void => {
    setPhone("");
    setEnterprise("");
    setText("");
    setKeywords("");
    setKeywordList([]);
    setShowPreview(false);
    setShowResult(false);
    setSubmittedText("");
    setProgress(0);
    setProcessingStatus("");
    setCurrentKeyword("");
    setSiteURL("");
    setWpConfig({
      siteUrl: "",
      username: "",
      applicationPassword: "",
    });
    setAutoPost(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 m-10">
      <Card className="w-full max-w-2xl mx-auto p-2 rounded-md">
        <CardHeader>
          <CardTitle>Dynamic Message Form with Keywords</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-5 rounded-md">
          <div className="space-y-2">
            <Label htmlFor="apiKey">Claude API Key</Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="Enter your Claude API key"
              value={apiKey}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setApiKey(e.target.value)
              }
              className="w-full p-2"
              required
            />
          </div>

          {/*wordpress */}
          <div className="space-y-4 border-t pt-4 mt-4">
            <h3 className="font-medium">WordPress Configuration (Optional)</h3>
            <ElementorTemplateInput
              onTemplateChange={(template) => setElementorTemplate(template)}
            />
            <div className="space-y-2 ">
              <Label htmlFor="wpUrl">WordPress Site URL</Label>
              <Input
                id="wpUrl"
                type="url"
                placeholder="https://your-wordpress-site.com"
                value={wpConfig.siteUrl}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setWpConfig((prev) => ({ ...prev, siteUrl: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wpUsername">WordPress Username</Label>
              <Input
                id="wpUsername"
                type="text"
                placeholder="Enter WordPress username"
                value={wpConfig.username}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setWpConfig((prev) => ({ ...prev, username: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wpAppPassword">Application Password</Label>
              <Input
                id="wpAppPassword"
                type="password"
                placeholder="Enter WordPress application password"
                value={wpConfig.applicationPassword}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setWpConfig((prev) => ({
                    ...prev,
                    applicationPassword: e.target.value,
                  }))
                }
              />
              <p className="text-sm text-gray-500">
                Generate an application password in WordPress Dashboard → Users
                → Profile → Application Passwords
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="autoPost"
                checked={autoPost}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setAutoPost(e.target.checked)
                }
              />
              <Label htmlFor="autoPost">Automatically post to WordPress</Label>
            </div>
          </div>
          {/* phone number */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPhone(e.target.value)
              }
              className="w-full"
              required
            />
          </div>
          {/* enterprise name */}
          <div className="space-y-2">
            <Label htmlFor="enterprise">Enterprise Name</Label>
            <Input
              id="enterprise"
              type="text"
              placeholder="Enter enterprise name"
              value={enterprise}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEnterprise(e.target.value)
              }
              className="w-full"
              required
            />
          </div>
          {/* site url */}
          <div className="space-y-2">
            <Label htmlFor="siteURL">Site URL</Label>
            <div className="flex gap-2">
              <Input
                id="siteURL"
                type="text"
                placeholder="Enter site url"
                value={siteURL}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setSiteURL(e.target.value)
                }
                className="w-full"
              />
            </div>
            {/* keywords */}
          </div>
          <div className="space-y-2">
            <Label htmlFor="keywords">Keywords (comma-separated)</Label>
            <div className="flex gap-2">
              <Input
                id="keywords"
                type="text"
                placeholder="Enter keywords, separated by commas"
                value={keywords}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setKeywords(e.target.value)
                }
                className="w-full"
              />
              <Button type="button" onClick={handleAddKeywords} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {keywordList.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {keywordList.map((keyword, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 bg-blue-100 px-2 py-1 rounded"
                  >
                    <span>{keyword}</span>
                    <button
                      type="button"
                      onClick={() => removeKeyword(keyword)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="messageArea">Message</Label>
            <div className="flex gap-2 mb-2">
              <Button
                type="button"
                onClick={() => insertTag("name")}
                size="sm"
                variant="outline"
                className="flex gap-1 mb-2"
              >
                <Tag className="w-4 h-4 mr-2" />
                Insert Enterprise Name
              </Button>
              <Button
                type="button"
                onClick={() => insertTag("phone")}
                size="sm"
                variant="outline"
                className="flex gap-1 mb-2"
              >
                <Tag className="w-4 h-4 mr-2" />
                Insert Phone
              </Button>
              <Button
                type="button"
                onClick={() => insertTag("keyword")}
                size="sm"
                variant="outline"
                className="flex gap-1 mb-2"
              >
                <Tag className="w-4 h-4 mr-2" />
                Insert Keyword
              </Button>
              <Button
                type="button"
                onClick={() => insertTag("siteURL")}
                size="sm"
                variant="outline"
                className="flex gap-1 mb-2"
              >
                <Tag className="w-4 h-4 mr-2" />
                Insert site URL
              </Button>
            </div>
            <textarea
              id="messageArea"
              rows={4}
              className="w-full p-2 border rounded-md"
              value={text}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setText(e.target.value)
              }
              placeholder="Enter your message here. Use the buttons above to insert tags."
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              variant="outline"
            >
              {showPreview ? "Hide Preview" : "Show Preview"}
            </Button>
            <Button
              type="button"
              onClick={handleReset}
              variant="outline"
              className="bg-red-50 hover:bg-red-100"
            >
              Reset Form
            </Button>
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </div>

          {showPreview && (
            <div className="mt-4 p-4 border rounded-md bg-gray-50">
              <h3 className="font-medium mb-2">Preview:</h3>
              <p className="whitespace-pre-wrap">{getPreviewText()}</p>
              <p className="mt-2 text-sm text-gray-600">
                Note: {"{"}
                {"{"}keyword{"}"}
                {"}"} will be replaced with each keyword in your list
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {showResult && (
        <div id="result-section" className="w-full max-w-2xl mx-auto">
          <Alert className="bg-green-50 border-green-200">
            <AlertDescription>
              <h3 className="font-medium mb-2">Processing Status:</h3>
              <Progress value={progress} className="mb-2" />
              <p className="text-sm text-gray-600 mb-4">{processingStatus}</p>

              <h3 className="font-medium mb-2">Current Message:</h3>
              <div className="p-4 bg-white rounded-md shadow-sm">
                <p className="whitespace-pre-wrap">{submittedText}</p>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      )}
    </form>
  );
};

export default Home;
