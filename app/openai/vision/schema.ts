export const functionSchema = [
  {
    $schema: "http://json-schema.org/draft-07/schema#",
    type: "object",
    properties: {
      name: {
        const: "generate_image_description",
      },
      description: {
        type: "string",
        description:
          "This function generates a detailed and engaging description for a provided image.",
      },
      parameters: {
        type: "object",
        properties: {
          type: {
            const: "object",
          },
          properties: {
            type: "object",
            properties: {
              imageDescription: {
                type: "object",
                properties: {
                  type: {
                    const: "object",
                  },
                  properties: {
                    type: "object",
                    properties: {
                      description: {
                        type: "string",
                        description:
                          "A concise and engaging description of the image.",
                      },
                      visualElements: {
                        type: "array",
                        items: {
                          type: "string",
                          description:
                            "A visual element in the image (e.g., colors, textures, shapes).",
                        },
                        description:
                          "An array of visual elements in the image.",
                      },
                      objectsScenes: {
                        type: "array",
                        items: {
                          type: "string",
                          description:
                            "A notable object or scenery in the image.",
                        },
                        description:
                          "An array of notable objects or scenery in the image.",
                      },
                    },
                    required: [
                      "description",
                      "visualElements",
                      "objectsScenes",
                    ],
                  },
                },
                required: ["type", "properties"],
              },
            },
            required: ["imageDescription"],
          },
        },
        required: ["type", "properties"],
      },
    },
    required: ["name", "description", "parameters"],
  },
];
