<template>
    <div class="flex items-center flex-none -mx-4 sm:mx-2">
        <button
            v-for="(language, index) in languages"
            :key="index"
            class="
                flex-shrink-0
                w-12
                h-6
                mr-1
                font-mono
                text-sm
                transition-colors
                duration-200
                hover:bg-sonolus-ui-button-highlighted
                active:bg-sonolus-ui-button-pressed
            "
            :class="{ 'bg-sonolus-ui-button-normal': index === languageIndex }"
            @click="codeLanguage = language"
        >
            {{ language }}
        </button>
        <div class="flex-grow" />
        <a
            v-if="path.url"
            class="
                ml-2
                overflow-hidden
                font-mono
                text-xs
                overflow-ellipsis
                whitespace-nowrap
                text-rtl
            "
            :href="path.url"
            target="_blank"
        >
            <OutboundLink />
            <span>{{ path.display }}</span>
        </a>
    </div>
    <div
        class="-mt-4 code-language"
        :style="{ [`--code-language-${languageIndex}`]: 'block' }"
    >
        <slot />
    </div>
</template>

<script setup lang="ts">
import { usePageFrontmatter } from '@vuepress/client'
import { computed, ref, watch } from 'vue'
import { useThemeData } from '../../composables/theme-data'
import { useCodeLanguage } from './language'
import { CodeConfig } from './types'

const props = defineProps<{
    languages?: string[]
    pathTemplate?: string
    pathParams?: string[][]
}>()

const themeData = useThemeData()
const codeLanguage = useCodeLanguage()
const frontmatter = usePageFrontmatter<CodeConfig>()

const languages = computed(
    () =>
        props.languages ||
        frontmatter.value.codeLanguages ||
        themeData.value.codeLanguages ||
        []
)

const languageIndex = ref(0)
watch(
    codeLanguage,
    (value) => {
        const index = languages.value.indexOf(value)
        if (index === -1) return
        languageIndex.value = index
    },
    { immediate: true }
)

const paths = computed(() => {
    const template = [
        props.pathTemplate,
        frontmatter.value.codePathTemplate,
        themeData.value.codePathTemplate,
    ]
        .filter((value): value is string => value != undefined)
        .reduce((sum, current) => replaceAll(sum, '\\{0\\}', current), '{0}')

    const params =
        props.pathParams ||
        frontmatter.value.codePathParams ||
        themeData.value.codePathParams ||
        []

    return languages.value.map((_, i) =>
        (params[i] || []).reduce(
            (sum, value, j) => replaceAll(sum, `\\{${j + 1}\\}`, value),
            template
        )
    )
})

const path = computed(() => {
    const path = paths.value[languageIndex.value] || ''
    const index = path.lastIndexOf('|')
    if (index === -1) {
        return {
            display: path,
            url: path,
        }
    } else {
        return {
            display: path.slice(index + 1),
            url: replaceAll(path, '\\|', ''),
        }
    }
})

function replaceAll(str: string, find: string, replace: string) {
    return str.replace(new RegExp(find, 'g'), replace)
}
</script>

<style>
.code-language div:nth-child(1) {
    display: var(--code-language-0, none);
}
.code-language div:nth-child(2) {
    display: var(--code-language-1, none);
}
.code-language div:nth-child(3) {
    display: var(--code-language-2, none);
}
.code-language div:nth-child(4) {
    display: var(--code-language-3, none);
}
.code-language div:nth-child(5) {
    display: var(--code-language-4, none);
}
.code-language div:nth-child(6) {
    display: var(--code-language-5, none);
}
.code-language div:nth-child(7) {
    display: var(--code-language-6, none);
}
.code-language div:nth-child(8) {
    display: var(--code-language-7, none);
}
</style>
