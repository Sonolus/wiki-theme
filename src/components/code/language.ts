import { ref, watch } from 'vue'

const key = 'code.language'
const language = ref((!__VUEPRESS_SSR__ && localStorage.getItem(key)) || '')

watch(language, (value) => localStorage.setItem(key, value))

export function useCodeLanguage() {
    return language
}
