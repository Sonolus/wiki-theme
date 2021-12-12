<template>
    <aside
        class="
            fixed
            bottom-0
            left-0
            z-10
            w-full
            overflow-y-auto
            transition-all
            duration-200
            -translate-x-full
            sm:opacity-50 sm:w-64
            hover:opacity-100
            top-12
            md:w-72
            lg:w-80
            sm:top-16 sm:translate-x-0
        "
        :class="{
            'translate-x-0 bg-sonolus-main': open,
            'sm:hidden': isHome,
        }"
    >
        <ul class="my-6 sm:hidden">
            <li>
                <a
                    class="
                        block
                        px-4
                        py-2
                        text-lg
                        font-semibold
                        transition-colors
                        duration-200
                        hover:bg-sonolus-ui-button-highlighted
                        active:bg-sonolus-ui-button-pressed
                    "
                    :href="`${localeBasePath}#${i18n.nav.player.toLowerCase()}`"
                    @click="$emit('close')"
                >
                    {{ i18n.nav.player }}
                </a>
                <a
                    class="
                        block
                        px-4
                        py-2
                        text-lg
                        font-semibold
                        transition-colors
                        duration-200
                        hover:bg-sonolus-ui-button-highlighted
                        active:bg-sonolus-ui-button-pressed
                    "
                    :href="`${localeBasePath}#${i18n.nav.developer.toLowerCase()}`"
                    @click="$emit('close')"
                >
                    {{ i18n.nav.developer }}
                </a>
            </li>
        </ul>
        <ul>
            <li
                v-for="(category, i) in themeData.sidebar[pageData.lang]"
                :key="i"
                class="my-6"
            >
                <div class="px-4 py-2 text-lg font-semibold">
                    {{ category.title }}
                </div>
                <ul>
                    <li
                        v-for="(pageTitle, pagePath, j) in category.pages"
                        :key="j"
                    >
                        <RouterLink
                            class="
                                block
                                py-2
                                pl-8
                                pr-6
                                transition-colors
                                duration-200
                                hover:bg-sonolus-ui-button-highlighted
                                active:bg-sonolus-ui-button-pressed
                            "
                            :class="{
                                'bg-sonolus-ui-button-normal':
                                    pagePath === path && !slug,
                            }"
                            :to="pagePath"
                            @click="$emit('close')"
                        >
                            {{ pageTitle }}
                        </RouterLink>
                        <ul v-if="pagePath === path && pageData.headers.length">
                            <li
                                v-for="(header, k) in pageData.headers"
                                :key="k"
                            >
                                <RouterLink
                                    class="
                                        block
                                        py-2
                                        pl-12
                                        pr-6
                                        text-sm
                                        transition-colors
                                        duration-200
                                        sidebar-item
                                        hover:bg-sonolus-ui-button-highlighted
                                        active:bg-sonolus-ui-button-pressed
                                    "
                                    :class="{
                                        'bg-sonolus-ui-button-normal':
                                            header.slug === slug,
                                    }"
                                    :to="`#${header.slug}`"
                                    @click="$emit('close')"
                                >
                                    {{ header.title }}
                                </RouterLink>
                            </li>
                        </ul>
                    </li>
                </ul>
            </li>
        </ul>
    </aside>
</template>

<script setup lang="ts">
import { usePageData, useRoute } from '@vuepress/client'
import { computed } from 'vue'
import { useI18n } from '../composables/i18n'
import { useIsHome } from '../composables/is-home'
import { useLocaleBasePath } from '../composables/locale-base-path'
import { useThemeData } from '../composables/theme-data'
import { removeTrailing } from '../utils'

defineProps<{
    open: boolean
}>()

defineEmits<{
    (e: 'close'): void
}>()

const i18n = useI18n()
const route = useRoute()
const isHome = useIsHome()
const pageData = usePageData()
const themeData = useThemeData()
const localeBasePath = useLocaleBasePath()

const path = computed(() => removeTrailing(pageData.value.path, '.html'))

const slug = computed(() =>
    pageData.value.headers
        .map(({ slug }) => slug)
        .find((slug) => `#${slug}` === route.hash)
)
</script>

<style scoped>
aside {
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.125);
}

aside::-webkit-scrollbar {
    width: 0.5rem;
}
aside::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.125);
}
aside::-webkit-scrollbar-thumb:hover {
    background-color: rgba(255, 255, 255, 0.25);
}
aside::-webkit-scrollbar-thumb:active {
    background-color: rgba(255, 255, 255, 0.0625);
}
</style>
