'use client';

import { createContext, useState, ReactNode, useContext } from 'react';

interface BackgroundImage {
  id: string;
  url: string;
}

interface Padding {
  unit: string;
  top: string;
  right: string;
  bottom: string;
  left: string;
  isLinked: boolean;
}

interface Setting {
  background_background?: string;
  background_image?: BackgroundImage;
  background_position?: string;
  background_attachment?: string;
  background_repeat?: string;
  background_size?: string;
  padding?: Padding;
  flex_direction?: string;
}

interface Content {
  id: string;
  settings: Setting;
  elements: any[];
  isInner: boolean;
  elType: string;
}

interface Data {
  content: Content[];
  page_settings: any[];
  version: string;
  title: string;
  type: string;
}


//type TemplateMap = Partial<Data>;
type TemplateMap = { [key: string]: any }; // Update this type according to your actual template structure


const presetTemplates: TemplateMap = {
  // ... your existing presetTemplates data
  content: [
    {
      id: "a7c458d",
      settings: {
        background_background: "classic",
        background_image: {
          id: "2744",
          url: "https://www.mabris.fr/wp-content/uploads/2024/10/lefranc-patrick-amenagement-paysager-a-la-croixille-Vers-Allees-et-cours.webp",
        },
        background_position: "center center",
        background_attachment: "fixed",
        background_repeat: "no-repeat",
        background_size: "cover",
        padding: {
          unit: "px",
          top: "150",
          right: "20",
          bottom: "150",
          left: "20",
          isLinked: false,
        },
      },
      elements: [],
      isInner: false,
      elType: "container",
    },
    {
      id: "7f206c2",
      settings: {
        padding: {
          unit: "px",
          top: "50",
          right: "0",
          bottom: "0",
          left: "0",
          isLinked: false,
        },
      },
      elements: [
        {
          id: "16d6f5f3",
          settings: { content_width: "full" },
          elements: [
            {
              id: "766c9382",
              settings: {
                title: "Ajoutez votre titre ici (H1)",
                header_size: "h1",
              },
              elements: [],
              isInner: false,
              widgetType: "heading",
              elType: "widget",
            },
            {
              id: "7a4c811",
              settings: {
                editor:
                  "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.<br />Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>",
              },
              elements: [],
              isInner: false,
              widgetType: "text-editor",
              elType: "widget",
            },
          ],
          isInner: true,
          elType: "container",
        },
      ],
      isInner: false,
      elType: "container",
    },
    {
      id: "15a1f314",
      settings: {
        padding: {
          unit: "px",
          top: "30",
          right: "0",
          bottom: "0",
          left: "0",
          isLinked: false,
        },
      },
      elements: [
        {
          id: "e1473e6",
          settings: { content_width: "full" },
          elements: [
            {
              id: "2893e86c",
              settings: { title: "Ajoutez votre titre ici (H2)" },
              elements: [],
              isInner: false,
              widgetType: "heading",
              elType: "widget",
            },
            {
              id: "286e48de",
              settings: {
                editor:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
              },
              elements: [],
              isInner: false,
              widgetType: "text-editor",
              elType: "widget",
            },
          ],
          isInner: true,
          elType: "container",
        },
      ],
      isInner: false,
      elType: "container",
    },
    {
      id: "2ea43a4b",
      settings: {
        padding: {
          unit: "px",
          top: "30",
          right: "0",
          bottom: "0",
          left: "0",
          isLinked: false,
        },
      },
      elements: [
        {
          id: "42fa7b30",
          settings: { content_width: "full" },
          elements: [
            {
              id: "48c111ab",
              settings: { title: "Ajoutez votre titre ici (H2)" },
              elements: [],
              isInner: false,
              widgetType: "heading",
              elType: "widget",
            },
            {
              id: "3b4b49e6",
              settings: {
                editor:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
              },
              elements: [],
              isInner: false,
              widgetType: "text-editor",
              elType: "widget",
            },
          ],
          isInner: true,
          elType: "container",
        },
      ],
      isInner: false,
      elType: "container",
    },
    {
      id: "3b1e839",
      settings: {
        padding: {
          unit: "px",
          top: "50",
          right: "0",
          bottom: "50",
          left: "0",
          isLinked: false,
        },
      },
      elements: [
        {
          id: "53e087e2",
          settings: {
            content_width: "full",
            border_border: "solid",
            border_width: {
              unit: "px",
              top: "1",
              right: "1",
              bottom: "1",
              left: "1",
              isLinked: true,
            },
            border_radius: {
              unit: "px",
              top: "10",
              right: "10",
              bottom: "10",
              left: "10",
              isLinked: true,
            },
            padding: {
              unit: "px",
              top: "40",
              right: "20",
              bottom: "40",
              left: "20",
              isLinked: false,
            },
            __globals__: { border_color: "globals/colors?id=primary" },
          },
          elements: [
            {
              id: "9273fd4",
              settings: {
                editor:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
                align: "center",
                typography_typography: "custom",
                typography_font_family: "Comfortaa",
                typography_font_size: { unit: "px", size: 25, sizes: [] },
                typography_font_weight: "600",
                _element_width: "initial",
                _element_custom_width: { unit: "%", size: 73, sizes: [] },
                _flex_align_self: "center",
              },
              elements: [],
              isInner: false,
              widgetType: "text-editor",
              elType: "widget",
            },
            {
              id: "10b22917",
              settings: {
                width: { unit: "px", size: 223, sizes: [] },
                text: "Contactez-nous",
                align: "center",
                typography_typography: "custom",
                typography_font_size: { unit: "px", size: 18, sizes: [] },
                typography_font_weight: "700",
                border_border: "solid",
                border_width: {
                  unit: "px",
                  top: "2",
                  right: "2",
                  bottom: "2",
                  left: "2",
                  isLinked: true,
                },
                border_radius: {
                  unit: "px",
                  top: "0",
                  right: "0",
                  bottom: "0",
                  left: "0",
                  isLinked: true,
                },
                text_padding: {
                  unit: "px",
                  top: "16",
                  right: "16",
                  bottom: "16",
                  left: "16",
                  isLinked: true,
                },
                button_text_color: "#FFFFFF",
                button_background_hover_color: "#02010100",
                __globals__: {
                  border_color: "globals/colors?id=primary",
                  hover_color: "globals/colors?id=primary",
                },
              },
              elements: [],
              isInner: false,
              widgetType: "coherence-Button-widget",
              elType: "widget",
            },
          ],
          isInner: true,
          elType: "container",
        },
      ],
      isInner: false,
      elType: "container",
    },
    {
      id: "2cf807ec",
      settings: {
        padding: {
          unit: "px",
          top: "0",
          right: "0",
          bottom: "30",
          left: "0",
          isLinked: false,
        },
      },
      elements: [
        {
          id: "28e81b84",
          settings: { content_width: "full" },
          elements: [
            {
              id: "623b7659",
              settings: { title: "Ajoutez votre titre ici (H2)" },
              elements: [],
              isInner: false,
              widgetType: "heading",
              elType: "widget",
            },
            {
              id: "7b148847",
              settings: {
                editor:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
              },
              elements: [],
              isInner: false,
              widgetType: "text-editor",
              elType: "widget",
            },
          ],
          isInner: true,
          elType: "container",
        },
      ],
      isInner: false,
      elType: "container",
    },
    {
      id: "15e349b5",
      settings: {
        flex_direction: "row",
        padding: {
          unit: "px",
          top: "30",
          right: "0",
          bottom: "30",
          left: "0",
          isLinked: false,
        },
      },
      elements: [
        {
          id: "2303e4f9",
          settings: {
            content_width: "full",
            width: { unit: "%", size: 33, sizes: [] },
            border_border: "solid",
            border_width: {
              unit: "px",
              top: "1",
              right: "1",
              bottom: "1",
              left: "1",
              isLinked: true,
            },
            border_color: "#E0E0E0",
            padding: {
              unit: "px",
              top: "17",
              right: "17",
              bottom: "17",
              left: "17",
              isLinked: true,
            },
          },
          elements: [
            {
              id: "13c5201b",
              settings: {
                title: "Ajoutez votre titre ici (H3)",
                header_size: "h3",
                align: "center",
              },
              elements: [],
              isInner: false,
              widgetType: "heading",
              elType: "widget",
            },
            {
              id: "699db993",
              settings: {
                editor:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
                align: "center",
              },
              elements: [],
              isInner: false,
              widgetType: "text-editor",
              elType: "widget",
            },
          ],
          isInner: true,
          elType: "container",
        },
        {
          id: "1ca42d3e",
          settings: {
            content_width: "full",
            width: { unit: "%", size: 33, sizes: [] },
            border_border: "solid",
            border_width: {
              unit: "px",
              top: "1",
              right: "1",
              bottom: "1",
              left: "1",
              isLinked: true,
            },
            border_color: "#E0E0E0",
            padding: {
              unit: "px",
              top: "17",
              right: "17",
              bottom: "17",
              left: "17",
              isLinked: true,
            },
          },
          elements: [
            {
              id: "7e72fa47",
              settings: {
                title: "Ajoutez votre titre ici (H3)",
                header_size: "h3",
                align: "center",
              },
              elements: [],
              isInner: false,
              widgetType: "heading",
              elType: "widget",
            },
            {
              id: "29acbd7f",
              settings: {
                editor:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
                align: "center",
              },
              elements: [],
              isInner: false,
              widgetType: "text-editor",
              elType: "widget",
            },
          ],
          isInner: true,
          elType: "container",
        },
        {
          id: "17dc2ba7",
          settings: {
            content_width: "full",
            width: { unit: "%", size: 33, sizes: [] },
            border_border: "solid",
            border_width: {
              unit: "px",
              top: "1",
              right: "1",
              bottom: "1",
              left: "1",
              isLinked: true,
            },
            border_color: "#E0E0E0",
            padding: {
              unit: "px",
              top: "17",
              right: "17",
              bottom: "17",
              left: "17",
              isLinked: true,
            },
          },
          elements: [
            {
              id: "4db7052",
              settings: {
                title: "Ajoutez votre titre ici (H3)",
                header_size: "h3",
                align: "center",
              },
              elements: [],
              isInner: false,
              widgetType: "heading",
              elType: "widget",
            },
            {
              id: "4c430317",
              settings: {
                editor:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
                align: "center",
              },
              elements: [],
              isInner: false,
              widgetType: "text-editor",
              elType: "widget",
            },
          ],
          isInner: true,
          elType: "container",
        },
      ],
      isInner: false,
      elType: "container",
    },
    {
      id: "444bced4",
      settings: {
        padding: {
          unit: "px",
          top: "40",
          right: "20",
          bottom: "20",
          left: "20",
          isLinked: false,
        },
      },
      elements: [
        {
          id: "73e5d63e",
          settings: { content_width: "full" },
          elements: [
            {
              id: "498f7fda",
              settings: {
                title: "FAQ (Questions fréquemment posées)",
                header_size: "h3",
              },
              elements: [],
              isInner: false,
              widgetType: "heading",
              elType: "widget",
            },
            {
              id: "16048bde",
              settings: {
                advanced_accordion: [
                  {
                    accordion_title: "Question 1 :",
                    accordion_icon: { value: "", library: "" },
                    accordion_content:
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
                    _id: "e66eadb",
                  },
                  {
                    accordion_title: "Question 2 :",
                    accordion_icon: { value: "", library: "" },
                    accordion_content:
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
                    _id: "64dea8b",
                  },
                  {
                    accordion_title: "Question 3 :",
                    accordion_icon: { value: "", library: "" },
                    accordion_content:
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
                    _id: "e17fdf2",
                  },
                  {
                    accordion_title: "Question 4 :",
                    accordion_icon: { value: "", library: "" },
                    accordion_content:
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
                    _id: "fa97b6f",
                  },
                  {
                    accordion_title: "Question 5 :",
                    accordion_icon: { value: "", library: "" },
                    accordion_content:
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
                    _id: "9009480",
                  },
                ],
                accordion_title_icon_box_style: "no-box",
                accordion_title_icon_box_width: {
                  unit: "px",
                  size: 0,
                  sizes: [],
                },
                tab_typography_font_size: { unit: "px", size: 19, sizes: [] },
                tab_typography_font_weight: "700",
                __globals__: { tab_color: "globals/colors?id=primary" },
              },
              elements: [],
              isInner: false,
              widgetType: "coherence-accordion",
              elType: "widget",
            },
          ],
          isInner: true,
          elType: "container",
        },
      ],
      isInner: false,
      elType: "container",
    },
  ],  // Add your content here
  page_settings: [],
  version: "0.4",
  title: "LP Wiframe Cohérence (Elementor)",
  type: "page",
};




// Define the interface for the context value
// Define the ResultsContextType interface if it hasn't been defined
interface ResultsContextType {
  inputMethod: "preset" | "paste";
  setInputMethod: (method: "preset" | "paste") => void;
  templateJson: TemplateMap; // Adjust `TemplateMap` if it has a specific structure
  setTemplateJson: (template: TemplateMap) => void;
}


// Create the context with a default value matching the interface
export const ResultsContext = createContext<ResultsContextType>({
  inputMethod: "preset",
  setInputMethod: () => {},
  templateJson: presetTemplates,
  setTemplateJson: () => {},
});

// Custom hook for using the context
export const useResults = () => {
  const context = useContext(ResultsContext);
  if (!context) {
    throw new Error("useResults must be used within a ResultsProvider");
  }
  return context;
};

// Define provider props interface
interface ResultsProviderProps {
  children: ReactNode;
}

// Create the provider component with proper typing
export const ResultsProvider = ({ children }: ResultsProviderProps) => {
  const [inputMethod, setInputMethod] = useState<"preset" | "paste">("preset");
  const [templateJson, setTemplateJson] = useState<TemplateMap>(presetTemplates);

  const value: ResultsContextType = {
    inputMethod,
    setInputMethod,
    templateJson,
    setTemplateJson,
  };

  return (
    <ResultsContext.Provider value={value}>
      {children}
    </ResultsContext.Provider>
  );
};