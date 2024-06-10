/**
 * ImageToImageRequest, Generate an image from another image (+ text)!
 */
export interface VisionImageToImage {
  /**
   * Cfg Scale, Scale for the configuration
   */
  cfg_scale: number
  /**
   * The engine to use for image generation
   */
  engine: Engine
  /**
   * Height, Height of the generated image
   */
  height: number
  /**
   * Image Strength, The strength of the init image
   */
  image_strength: number
  /**
   * init_image, The base64 encoded image
   */
  init_image: string
  /**
   * Steps, Number of steps in the image generation process
   */
  steps: number
  /**
   * text_prompts, Prompts for the image generation
   */
  text_prompts: TextPrompt[]
  /**
   * Width, Width of the generated image
   */
  width: number
  [property: string]: any
}

/**
 * The engine to use for image generation
 *
 * EngineEnum, An enumeration.
 */
export enum Engine {
  Dreamshaper = 'dreamshaper',
  Playground = 'playground',
  Proteus = 'proteus'
}

/**
 * TextPrompt
 */
export interface TextPrompt {
  /**
   * Text
   */
  text: string
  /**
   * Weight
   */
  weight?: number
  [property: string]: any
}
