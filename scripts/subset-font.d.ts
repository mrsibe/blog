declare module 'subset-font' {
  type VariationAxis = number | { min?: number; max?: number; default?: number }

  type SubsetFontOptions = {
    targetFormat?: 'sfnt' | 'truetype' | 'woff' | 'woff2'
    preserveNameIds?: number[]
    keepFeatures?: string[]
    variationAxes?: Record<string, VariationAxis>
    keepAllGlyphs?: boolean
    noLayoutClosure?: boolean
    glyphNames?: boolean
    noHinting?: boolean
    dropTables?: string[]
  }

  export default function subsetFont(font: Buffer, text?: string | null, options?: SubsetFontOptions): Promise<Buffer>
}
