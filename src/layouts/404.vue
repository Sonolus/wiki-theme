<template>
    <Navbar @toggle-language="isOpen = !isOpen" />

    <Language :open="isOpen" @close="isOpen = false" />

    <main
        class="fixed top-0 bottom-0 left-0 right-0 flex flex-col justify-center"
    >
        <div class="px-6 text-center">
            <p class="text-4xl font-bold sm:text-6xl">404 :(</p>
            <p class="sm:text-lg">{{ i18n.notFound.description }}</p>
            <RouterLink
                class="
                    flex
                    items-center
                    w-24
                    p-1
                    mx-auto
                    mt-8
                    transition-colors
                    duration-200
                    sm:mt-12 sm:w-32 sm:p-2
                    bg-sonolus-ui-button-normal
                    hover:bg-sonolus-ui-button-highlighted
                    active:bg-sonolus-ui-button-pressed
                "
                :to="localeBasePath"
            >
                <img
                    class="w-auto h-5 sm:h-6"
                    :src="asset('/home-solid.png')"
                    alt="Home"
                    width="128"
                    height="128"
                />
                <div
                    class="
                        flex-grow
                        ml-1
                        text-sm text-center
                        sm:ml-2 sm:text-base
                    "
                >
                    {{ i18n.notFound.home }}
                </div>
            </RouterLink>
        </div>
    </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Language from '../components/Language.vue'
import Navbar from '../components/Navbar.vue'
import { useI18n } from '../composables/i18n'
import { useLocaleBasePath } from '../composables/locale-base-path'
import { asset } from '../utils'

const isOpen = ref(false)

const i18n = useI18n()
const localeBasePath = useLocaleBasePath()
</script>

<style src="../styles/index.css" />
