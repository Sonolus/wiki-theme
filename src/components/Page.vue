<template>
    <Transition
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        enter-active-class="transition-opacity duration-200"
        leave-from-class="hidden"
        leave-to-class="hidden"
    >
        <main
            class="py-12 sm:py-16"
            :class="{ 'sm:ml-64 md:ml-72 lg:ml-80': !isHome }"
            :key="pageData.path"
        >
            <div class="max-w-3xl px-6 mx-auto">
                <div class="markdown">
                    <Content />
                </div>

                <nav v-if="nav.next || nav.prev" class="flex gap-2 mt-12">
                    <RouterLink
                        v-if="nav.prev"
                        class="
                            flex
                            items-center
                            p-1
                            underline
                            transition-colors
                            duration-200
                            sm:p-2
                            hover:bg-sonolus-ui-button-highlighted
                            active:bg-sonolus-ui-button-pressed
                        "
                        :to="nav.prev[1]"
                        @click="$emit('close')"
                    >
                        <img
                            class="h-5 sm:h-6"
                            :src="asset('/angle-left-solid.png')"
                            alt="Previous"
                        />
                        <div
                            class="flex-grow mx-1 text-sm sm:mx-2 sm:text-base"
                        >
                            {{ nav.prev[0] }}
                        </div>
                    </RouterLink>
                    <div class="flex-grow" />
                    <RouterLink
                        v-if="nav.next"
                        class="
                            flex
                            items-center
                            p-1
                            underline
                            transition-colors
                            duration-200
                            sm:p-2
                            hover:bg-sonolus-ui-button-highlighted
                            active:bg-sonolus-ui-button-pressed
                        "
                        :to="nav.next[1]"
                        @click="$emit('close')"
                    >
                        <div
                            class="
                                flex-grow
                                mx-1
                                text-sm text-right
                                sm:mx-2 sm:text-base
                            "
                        >
                            {{ nav.next[0] }}
                        </div>
                        <img
                            class="h-5 sm:h-6"
                            :src="asset('/angle-right-solid.png')"
                            alt="Next"
                        />
                    </RouterLink>
                </nav>
            </div>
        </main>
    </Transition>
</template>

<script setup lang="ts">
import { usePageData } from '@vuepress/client'
import { computed } from 'vue'
import { useIsHome } from '../composables/is-home'
import { useThemeData } from '../composables/theme-data'
import { asset, removeTrailing } from '../utils'

const isHome = useIsHome()
const pageData = usePageData()
const themeData = useThemeData()

const nav = computed(() => {
    const nav: {
        prev?: [string, string]
        next?: [string, string]
    } = {}

    const path = removeTrailing(pageData.value.path, '.html')
    const sidebar = themeData.value.sidebar[pageData.value.lang]

    for (const category of Object.values(sidebar)) {
        const entries = Object.entries(category)
        const index = entries.findIndex((entry) => entry[1] === path)
        if (index === -1) continue

        if (index > 0) {
            nav.prev = entries[index - 1]
        }
        if (index < entries.length + 1) {
            nav.next = entries[index + 1]
        }
        break
    }

    return nav
})
</script>
