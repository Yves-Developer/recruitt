import _RemarkEmoji from 'remark-emoji'
import _Highlight from 'C:/Users/Yves/Desktop/Project0/recruitt/node_modules/.pnpm/@nuxtjs+mdc@0.9.5_magicast@0.5.2/node_modules/@nuxtjs/mdc/dist/runtime/highlighter/rehype-nuxt.js'

export const remarkPlugins = {
  'remark-emoji': { instance: _RemarkEmoji },
}

export const rehypePlugins = {
  'highlight': { instance: _Highlight, options: {} },
}

export const highlight = {"theme":{"dark":"github-dark","default":"github-light"}}