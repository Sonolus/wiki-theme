import { useSiteData } from '@vuepress/client'
import { computed } from 'vue'

export function useIsHome() {
    const siteData = useSiteData()

    return computed(() => siteData.value.base === '/')
}
