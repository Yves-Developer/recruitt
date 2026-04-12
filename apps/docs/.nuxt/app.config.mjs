
import { defuFn } from 'defu'

const inlineConfig = {
  "nuxt": {}
}

/** client **/
import { _replaceAppConfig } from '#app/config'

// Vite - webpack is handled directly in #app/config
if (import.meta.dev && !import.meta.nitro && import.meta.hot) {
  import.meta.hot.accept((newModule) => {
    _replaceAppConfig(newModule.default)
  })
}
/** client-end **/

import cfg0 from "C:/Users/Yves/Desktop/Project0/recruitt/apps/docs/app.config.ts"
import cfg1 from "C:/Users/Yves/Desktop/Project0/recruitt/node_modules/.pnpm/@nuxt-themes+typography@0.11.0_magicast@0.5.2_postcss@8.5.9_vue@3.5.32_typescript@5.9.2_/node_modules/@nuxt-themes/typography/app.config.ts"
import cfg2 from "C:/Users/Yves/Desktop/Project0/recruitt/node_modules/.pnpm/@nuxt-themes+elements@0.9.5_magicast@0.5.2_postcss@8.5.9_vue@3.5.32_typescript@5.9.2_/node_modules/@nuxt-themes/elements/app.config.ts"

export default /*@__PURE__*/ defuFn(cfg0, cfg1, cfg2, inlineConfig)
