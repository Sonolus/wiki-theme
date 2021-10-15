<template>
    <div v-if="cards" class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <a
            v-for="(card, index) in cards"
            :key="index"
            class="
                flex flex-col
                justify-center
                p-4
                transition-colors
                duration-200
                bg-sonolus-ui-button-normal
                hover:bg-sonolus-ui-button-highlighted
                active:bg-sonolus-ui-button-pressed
            "
            :href="card.url"
        >
            <div class="text-lg font-semibold">{{ card.title }}</div>
            <div class="mt-2 text-sm">{{ card.description }}</div>
        </a>
    </div>
</template>

<script setup lang="ts">
import { usePageData } from '@vuepress/client'
import { computed } from 'vue'
import { CardListConfig } from './types'

const props = defineProps<{
    category: string
}>()

const pageData = usePageData()

const cards = computed(
    () =>
        (pageData.value.frontmatter.cardList as CardListConfig | undefined)?.[
            props.category
        ]
)
</script>
