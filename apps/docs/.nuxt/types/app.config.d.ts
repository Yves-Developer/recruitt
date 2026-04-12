
import type { AppConfigInput, CustomAppConfig } from 'nuxt/schema'
import type { Defu } from 'defu'
import cfg0 from "../../app.config"
import cfg1 from "../../../../node_modules/.pnpm/@nuxt-themes+typography@0.11.0_magicast@0.5.2_postcss@8.5.9_vue@3.5.32_typescript@5.9.2_/node_modules/@nuxt-themes/typography/app.config"
import cfg2 from "../../../../node_modules/.pnpm/@nuxt-themes+elements@0.9.5_magicast@0.5.2_postcss@8.5.9_vue@3.5.32_typescript@5.9.2_/node_modules/@nuxt-themes/elements/app.config"

declare global {
  const defineAppConfig: <C extends AppConfigInput> (config: C) => C
}

declare const inlineConfig = {
  "nuxt": {}
}
type ResolvedAppConfig = Defu<typeof inlineConfig, [typeof cfg0, typeof cfg1, typeof cfg2]>
type IsAny<T> = 0 extends 1 & T ? true : false

type MergedAppConfig<Resolved extends Record<string, unknown>, Custom extends Record<string, unknown>> = {
  [K in keyof (Resolved & Custom)]: K extends keyof Custom
    ? unknown extends Custom[K]
      ? Resolved[K]
      : IsAny<Custom[K]> extends true
        ? Resolved[K]
        : Custom[K] extends Record<string, any>
            ? Resolved[K] extends Record<string, any>
              ? MergedAppConfig<Resolved[K], Custom[K]>
              : Exclude<Custom[K], undefined>
            : Exclude<Custom[K], undefined>
    : Resolved[K]
}

declare module 'nuxt/schema' {
  interface AppConfig extends MergedAppConfig<ResolvedAppConfig, CustomAppConfig> { }
}
declare module '@nuxt/schema' {
  interface AppConfig extends MergedAppConfig<ResolvedAppConfig, CustomAppConfig> { }
}
