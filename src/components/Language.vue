<template>
    <div
        class="
            fixed
            bottom-0
            left-0
            z-10
            w-full
            overflow-y-auto
            transition-opacity
            duration-200
            top-12
            sm:top-16
            bg-sonolus-main
        "
        :class="open ? 'opacity-100' : 'opacity-0 pointer-events-none'"
    >
        <ul class="max-w-md mx-auto mt-8 sm:mt-16">
            <li
                v-for="{ path, title } in locales"
                :key="path"
                class="mx-2 my-1 sm:my-2"
            >
                <RouterLink
                    class="
                        flex
                        items-center
                        p-1
                        transition-colors
                        duration-200
                        sm:p-2
                        bg-sonolus-ui-button-normal
                        hover:bg-sonolus-ui-button-highlighted
                        active:bg-sonolus-ui-button-pressed
                    "
                    :to="path"
                    @click="$emit('close')"
                >
                    <img
                        class="h-5 sm:h-6"
                        :src="asset('/language-solid.png')"
                        alt="Language"
                    />
                    <div
                        class="
                            flex-grow
                            ml-1
                            text-sm text-center
                            sm:ml-2 sm:text-base
                        "
                    >
                        {{ title }}
                    </div>
                </RouterLink>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { usePageData, useSiteLocaleData } from '@vuepress/client'
import { computed } from 'vue'
import { useThemeData } from '../composables/theme-data'
import { Sidebar } from '../types'
import { asset, removeTrailing } from '../utils'

defineProps<{
    open: boolean
}>()

defineEmits<{
    (e: 'close'): void
}>()

const pageData = usePageData()
const themeData = useThemeData()
const siteLocaleData = useSiteLocaleData()

const locales = computed(() => {
    const locales = Object.entries(siteLocaleData.value.locales)

    const currentBasePath =
        locales.find(
            ([, locale]) => locale.lang === pageData.value.lang
        )?.[0] || '/'

    return locales.map(([basePath, locale]) => {
        const path = replaceBasePath(
            removeTrailing(pageData.value.path, '.html'),
            currentBasePath,
            basePath
        )
        return hasPage(themeData.value.sidebar[locale.lang!], path)
            ? {
                  path,
                  title: locale.name,
              }
            : {
                  path: basePath,
                  title: locale.name,
              }
    })
})

function replaceBasePath(path: string, from: string, to: string) {
    return path.startsWith(from) ? to + path.slice(from.length) : to + path
}

function hasPage(sidebar: Sidebar, path: string) {
    return Object.values(sidebar).some((category) =>
        Object.values(category).includes(path)
    )
}
</script>
