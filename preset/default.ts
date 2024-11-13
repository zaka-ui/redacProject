export interface Data {
    id: string;
    elType: "container" | "widget";
    settings: ContainerSettings | WidgetSettings;
    elements?: any[];
    isInner: boolean;
    widgetType?: string;
  }
  
  interface PaddingSettings {
    unit: string;
    top: string;
    right: string;
    bottom: string;
    left: string;
    isLinked: boolean;
  }
  
  export interface BackgroundImage {
    id: number;
    url: string;
  }
  
  export interface ContainerSettings {
    background_background?: string;
    background_image?: BackgroundImage;
    background_position?: string;
    background_attachment?: string;
    background_repeat?: string;
    background_size?: string;
    padding?: PaddingSettings;
    content_width?: string;
  }
  
  export interface WidgetSettings {
    title?: string;
    header_size?: string;
    editor?: string;
  }



function cleanAndParseJSON(jsonString: string): any[] {
    try {
      // Remove escaped quotes and clean up the string
      const cleanedString = jsonString
        .replace(/\\/g, '')  // Remove backslashes
          // Remove extra quotes after objects
        //.replace(/\"\[/g, '[')  // Remove extra quotes before arrays
        //.replace(/\]\"/g, ']'); // Remove extra quotes after arrays
  
      // Parse the cleaned string
      return JSON.parse(cleanedString);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      throw error;
    }
  }
  
  // Function to restore JSON to original format
  function restoreJSONFormat(jsonObj: any[]): string {
    try {
      // Convert to string with proper escaping
      const jsonString = JSON.stringify(jsonObj, null, 2)
        .replace(/"/g, '\\"')  // Escape quotes
        .replace(/\\\\/g, '\\'); // Fix double escaping
  
      return jsonString;
    } catch (error) {
      console.error('Error formatting JSON:', error);
      throw error;
    }
  }
  
  // Function to modify template data
  function modifyTemplateData(template: any[]): any[] {
    return template.map(item => {
      // Deep clone the item to avoid mutations
      const modifiedItem = JSON.parse(JSON.stringify(item));
  
      // Example modifications:
      if (modifiedItem.settings && modifiedItem.settings.background_image) {
        modifiedItem.settings.background_image.url = modifiedItem.settings.background_image.url
          .replace(/\\\//g, '/');  // Fix escaped forward slashes
      }
  
      // Recursively modify elements
      if (modifiedItem.elements && Array.isArray(modifiedItem.elements)) {
        modifiedItem.elements = modifyTemplateData(modifiedItem.elements);
      }
  
      return modifiedItem;
    });
  }
  
  // Usage example:
 export const templateHandler = {
    transform: (jsonString: string) => {
      // Parse the JSON string to object
      const parsedData = cleanAndParseJSON(jsonString);
      
      // Now you can modify the data
      const modifiedData = modifyTemplateData(parsedData);
      
      // Convert back to the original format
      const restoredString = restoreJSONFormat(modifiedData);
      
      return {
        parsed: parsedData,
        modified: modifiedData,
        restored: restoredString
      };
    }
  };
  
  // Example usage:
  const inputJSON = `[{
  "id": "5e291ead",
  "elType": "container",
  "settings": {
    "background_background": "classic",
    "background_image": {
      "id": 85,
      "url": "http://testapi.local/wp-content/uploads/2024/11/lefranc-patrick-amenagement-paysager-a-la-croixille-Vers-Allees-et-cours.webp"
    },
    "background_position": "center center",
    "background_attachment": "fixed",
    "background_repeat": "no-repeat",
    "background_size": "cover",
    "padding": {
      "unit": "px",
      "top": "150",
      "right": "20",
      "bottom": "150",
      "left": "20",
      "isLinked": false
    }
  },
  "elements": [],
  "isInner": false
}, {
  "id": "1e4fee41",
  "elType": "container",
  "settings": {
    "padding": {
      "unit": "px",
      "top": "50",
      "right": "0",
      "bottom": "0",
      "left": "0",
      "isLinked": false
    }
  },
  "elements": [
    {
      "id": "55445f9f",
      "elType": "container",
      "settings": {
        "content_width": "full"
      },
      "elements": [
        {
          "id": "4bc1b502",
          "elType": "widget",
          "settings": {
            "title": "Ajoutez votre titre ici ",
            "header_size": "h1"
          },
          "elements": [],
          "widgetType": "heading"
        },
        {
          "id": "567d9aa9",
          "elType": "widget",
          "settings": {
            "editor": "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.<br />Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>"
          },
          "elements": [],
          "widgetType": "text-editor"
        }
      ],
      "isInner": true
    }
  ],
  "isInner": false
}, {
  "id": "796bb8e7",
  "elType": "container",
  "settings": {
    "padding": {
      "unit": "px",
      "top": "30",
      "right": "0",
      "bottom": "0",
      "left": "0",
      "isLinked": false
    }
  },
  "elements": [
    {
      "id": "70a39a00",
      "elType": "container",
      "settings": {
        "content_width": "full"
      },
      "elements": [
        {
          "id": "5242351e",
          "elType": "widget",
          "settings": {
            "title": "Ajoutez votre titre ici (H2)"
          },
          "elements": [],
          "widgetType": "heading"
        },
        {
          "id": "2e53f894",
          "elType": "widget",
          "settings": {
            "editor": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.nLorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.nLorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo."
          },
          "elements": [],
          "widgetType": "text-editor"
        }
      ],
      "isInner": true
    }
  ],
  "isInner": false
}, {
  "id": "591bf7e4",
  "elType": "container",
  "settings": {
    "padding": {
      "unit": "px",
      "top": "30",
      "right": "0",
      "bottom": "0",
      "left": "0",
      "isLinked": false
    }
  },
  "elements": [
    {
      "id": "66c0d1ae",
      "elType": "container",
      "settings": {
        "content_width": "full"
      },
      "elements": [
        {
          "id": "1388abb",
          "elType": "widget",
          "settings": {
            "title": "Ajoutez votre titre ici (H2)"
          },
          "elements": [],
          "widgetType": "heading"
        },
        {
          "id": "39852c74",
          "elType": "widget",
          "settings": {
            "editor": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.nLorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.nLorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo."
          },
          "elements": [],
          "widgetType": "text-editor"
        }
      ],
      "isInner": true
    }
  ],
  "isInner": false
}, {
  "id": "6e7980b9",
  "elType": "container",
  "settings": {
    "padding": {
      "unit": "px",
      "top": "50",
      "right": "0",
      "bottom": "50",
      "left": "0",
      "isLinked": false
    }
  },
  "elements": [
    {
      "id": "176d1780",
      "elType": "container",
      "settings": {
        "content_width": "full",
        "border_border": "solid",
        "border_width": {
          "unit": "px",
          "top": "1",
          "right": "1",
          "bottom": "1",
          "left": "1",
          "isLinked": true
        },
        "border_radius": {
          "unit": "px",
          "top": "10",
          "right": "10",
          "bottom": "10",
          "left": "10",
          "isLinked": true
        },
        "padding": {
          "unit": "px",
          "top": "40",
          "right": "20",
          "bottom": "40",
          "left": "20",
          "isLinked": false
        },
        "__globals__": {
          "border_color": "globals/colors?id=primary"
        }
      },
      "elements": [
        {
          "id": "52dbd677",
          "elType": "widget",
          "settings": {
            "editor": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
            "align": "center",
            "typography_typography": "custom",
            "typography_font_family": "Comfortaa",
            "typography_font_size": {
              "unit": "px",
              "size": 25,
              "sizes": []
            },
            "typography_font_weight": "600",
            "_element_width": "initial",
            "_element_custom_width": {
              "unit": "%",
              "size": 73,
              "sizes": []
            },
            "_flex_align_self": "center"
          },
          "elements": [],
          "widgetType": "text-editor"
        }
      ],
      "isInner": true
    }
  ],
  "isInner": false
}, {
  "id": "197a4ca2",
  "elType": "container",
  "settings": {
    "padding": {
      "unit": "px",
      "top": "0",
      "right": "0",
      "bottom": "30",
      "left": "0",
      "isLinked": false
    }
  },
  "elements": [
    {
      "id": "6be83578",
      "elType": "container",
      "settings": {
        "content_width": "full"
      },
      "elements": [
        {
          "id": "1a00c222",
          "elType": "widget",
          "settings": {
            "title": "Ajoutez votre titre ici (H2)"
          },
          "elements": [],
          "widgetType": "heading"
        },
        {
          "id": "55e26b94",
          "elType": "widget",
          "settings": {
            "editor": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.nLorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.nLorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo."
          },
          "elements": [],
          "widgetType": "text-editor"
        }
      ],
      "isInner": true
    }
  ],
  "isInner": false
}, {
  "id": "8e526cf",
  "elType": "container",
  "settings": {
    "flex_direction": "row",
    "padding": {
      "unit": "px",
      "top": "30",
      "right": "0",
      "bottom": "30",
      "left": "0",
      "isLinked": false
    }
  },
  "elements": [
    {
      "id": "794108b4",
      "elType": "container",
      "settings": {
        "content_width": "full",
        "width": {
          "unit": "%",
          "size": 33,
          "sizes": []
        },
        "border_border": "solid",
        "border_width": {
          "unit": "px",
          "top": "1",
          "right": "1",
          "bottom": "1",
          "left": "1",
          "isLinked": true
        },
        "border_color": "#E0E0E0",
        "padding": {
          "unit": "px",
          "top": "17",
          "right": "17",
          "bottom": "17",
          "left": "17",
          "isLinked": true
        }
      },
      "elements": [
        {
          "id": "592043d5",
          "elType": "widget",
          "settings": {
            "title": "Ajoutez votre titre ici (H3)",
            "header_size": "h3",
            "align": "center"
          },
          "elements": [],
          "widgetType": "heading"
        },
        {
          "id": "1716d02d",
          "elType": "widget",
          "settings": {
            "editor": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.nLorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.nLorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
            "align": "center"
          },
          "elements": [],
          "widgetType": "text-editor"
        }
      ],
      "isInner": true
    },
    {
      "id": "6c65dd8b",
      "elType": "container",
      "settings": {
        "content_width": "full",
        "width": {
          "unit": "%",
          "size": 33,
          "sizes": []
        },
        "border_border": "solid",
        "border_width": {
          "unit": "px",
          "top": "1",
          "right": "1",
          "bottom": "1",
          "left": "1",
          "isLinked": true
        },
        "border_color": "#E0E0E0",
        "padding": {
          "unit": "px",
          "top": "17",
          "right": "17",
          "bottom": "17",
          "left": "17",
          "isLinked": true
        }
      },
      "elements": [
        {
          "id": "53b58657",
          "elType": "widget",
          "settings": {
            "title": "Ajoutez votre titre ici (H3)",
            "header_size": "h3",
            "align": "center"
          },
          "elements": [],
          "widgetType": "heading"
        },
        {
          "id": "178c5ed3",
          "elType": "widget",
          "settings": {
            "editor": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.nLorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.nLorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
            "align": "center"
          },
          "elements": [],
          "widgetType": "text-editor"
        }
      ],
      "isInner": true
    },
    {
      "id": "6838a5f3",
      "elType": "container",
      "settings": {
        "content_width": "full",
        "width": {
          "unit": "%",
          "size": 33,
          "sizes": []
        },
        "border_border": "solid",
        "border_width": {
          "unit": "px",
          "top": "1",
          "right": "1",
          "bottom": "1",
          "left": "1",
          "isLinked": true
        },
        "border_color": "#E0E0E0",
        "padding": {
          "unit": "px",
          "top": "17",
          "right": "17",
          "bottom": "17",
          "left": "17",
          "isLinked": true
        }
      },
      "elements": [
        {
          "id": "aba0956",
          "elType": "widget",
          "settings": {
            "title": "Ajoutez votre titre ici (H3)",
            "header_size": "h3",
            "align": "center"
          },
          "elements": [],
          "widgetType": "heading"
        },
        {
          "id": "62e38c61",
          "elType": "widget",
          "settings": {
            "editor": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.nLorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.nLorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
            "align": "center"
          },
          "elements": [],
          "widgetType": "text-editor"
        }
      ],
      "isInner": true
    }
  ],
  "isInner": false
}, {
  "id": "171e4892",
  "elType": "container",
  "settings": {
    "padding": {
      "unit": "px",
      "top": "40",
      "right": "20",
      "bottom": "20",
      "left": "20",
      "isLinked": false
    }
  },
  "elements": [
    {
      "id": "1ee9c40d",
      "elType": "container",
      "settings": {
        "content_width": "full"
      },
      "elements": [
        {
          "id": "7da58458",
          "elType": "widget",
          "settings": {
            "title": "FAQ (Questions fru00e9quemment posu00e9es)",
            "header_size": "h3"
          },
          "elements": [],
          "widgetType": "heading"
        }
      ],
      "isInner": true
    }
  ],
  "isInner": false
}] `;
  
  
  
  // Type definitions
  export interface ElementorTemplate {
    id: string;
    elType: string;
    settings: {
      background_background?: string;
      background_image?: {
        id: number;
        url: string;
      };
      background_position?: string;
      background_attachment?: string;
      background_repeat?: string;
      background_size?: string;
      padding?: {
        unit: string;
        top: string;
        right: string;
        bottom: string;
        left: string;
        isLinked: boolean;
      };
      content_width?: string;
      [key: string]: any;
    };
    elements: ElementorTemplate[];
    isInner: boolean;
    widgetType?: string;
  }



export const presetTemplates: ElementorTemplate[] | string  = inputJSON;
   
  