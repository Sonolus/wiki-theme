import { useSiteLocaleData } from '@vuepress/client'
import { computed } from 'vue'
import i18n from '../i18n.json'

export function useI18n() {
    const siteLocaleData = useSiteLocaleData()

    return computed(() => i18n[siteLocaleData.value.lang])
}
