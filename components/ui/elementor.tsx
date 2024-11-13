import { useState, ChangeEvent } from "react";
import {  Data } from "@/preset/default";


interface ElementorTemplateInputProps {
  elementorTemplate: Data | any; // The current template data, use `Data` or any appropriate type
  onTemplateChange: (template: any) => void; // Function to handle template updates
  className?: string; // Optional className for styling
}

export const ElementorTemplateInput: React.FC<ElementorTemplateInputProps> = ({
  elementorTemplate,
  onTemplateChange,
}) => {
  const [inputMethod, setInputMethod] = useState<"preset" | "paste">("preset");
  const [templateJson, setTemplateJson] = useState<string>("");

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
            <label
              htmlFor="preset"
              className="ml-2 text-sm font-medium text-gray-900"
            >
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
            <label
              htmlFor="paste"
              className="ml-2 text-sm font-medium text-gray-900"
            >
              Paste Custom Template
            </label>
          </div>
        </div>
      </div>

      {inputMethod === "preset" ? (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-900">Select Template</h3>
          <div className="grid gap-2">
            {elementorTemplate && (
              <button
                type="button"
                onClick={() => {
                  console.log(JSON.stringify(elementorTemplate));
                  
                  setTemplateJson(JSON.stringify(elementorTemplate));
                  onTemplateChange(elementorTemplate);
                }}
                className="px-4 py-2 text-left border rounded hover:bg-gray-50 text-sm"
              >
                Default template
              </button>
            )}
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
            Use {"{{content}}"} as a placeholder where you want the content to
            be inserted.
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

export default ElementorTemplateInput;
