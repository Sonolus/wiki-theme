import { useSiteLocaleData } from '@vuepress/client'
import { computed } from 'vue'

export function useLocaleBasePath() {
    const siteLocaleData = useSiteLocaleData()

    return computed(
        () =>
            Object.entries(siteLocaleData.value.locales).find(
                ([, locale]) => locale.lang === siteLocaleData.value.lang
            )?.[0] || '/'
    )
}
