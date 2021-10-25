<template>
    <header
        class="
            fixed
            top-0
            left-0
            right-0
            z-20
            flex
            justify-between
            sm:justify-start
            bg-sonolus-ui-surface
        "
    >
        <button
            v-if="sidebar"
            class="
                p-3
                transition-colors
                duration-200
                sm:hidden
                hover:bg-sonolus-ui-button-highlighted
                active:bg-sonolus-ui-button-pressed
            "
            @click="$emit('toggle-sidebar')"
        >
            <img
                class="w-auto h-6"
                :src="asset('/bars-solid.png')"
                alt="Sidebar"
                width="128"
                height="128"
            />
        </button>
        <a class="p-3 sm:p-4" :href="localeBasePath">
            <img
                class="w-auto h-6 sm:h-8"
                :src="asset('/logo.png')"
                alt="Sonolus Wiki"
                width="2700"
                height="360"
            />
        </a>
        <div class="flex-grow hidden sm:block" />
        <a
            class="
                hidden
                p-4
                transition-colors
                duration-200
                hover:bg-sonolus-ui-button-highlighted
                active:bg-sonolus-ui-button-pressed
                sm:flex sm:items-center
            "
            :href="`${localeBasePath}#${i18n.nav.player.toLowerCase()}`"
        >
            <div class="text-lg font-semibold">
                {{ i18n.nav.player }}
            </div>
        </a>
        <a
            class="
                hidden
                p-4
                transition-colors
                duration-200
                hover:bg-sonolus-ui-button-highlighted
                active:bg-sonolus-ui-button-pressed
                sm:flex sm:items-center
            "
            :href="`${localeBasePath}#${i18n.nav.developer.toLowerCase()}`"
        >
            <div class="text-lg font-semibold">
                {{ i18n.nav.developer }}
            </div>
        </a>
        <button
            class="
                p-3
                transition-colors
                duration-200
                sm:p-4
                hover:bg-sonolus-ui-button-highlighted
                active:bg-sonolus-ui-button-pressed
            "
            @click="$emit('toggle-language')"
        >
            <img
                class="w-auto h-6 sm:h-8"
                :src="asset('/globe-solid.png')"
                alt="Language"
                width="128"
                height="128"
            />
        </button>
    </header>
</template>

<script setup lang="ts">
import { useI18n } from '../composables/i18n'
import { useLocaleBasePath } from '../composables/locale-base-path'
import { asset } from '../utils'

defineProps<{
    sidebar?: boolean
}>()

defineEmits<{
    (e: 'toggle-sidebar'): void
    (e: 'toggle-language'): void
}>()

const i18n = useI18n()
const localeBasePath = useLocaleBasePath()
</script>
