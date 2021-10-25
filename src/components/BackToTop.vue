<template>
    <button
        class="
            fixed
            p-1
            transition-all
            duration-200
            sm:p-2
            bottom-4
            right-4
            bg-sonolus-ui-button-normal
            hover:bg-sonolus-ui-button-highlighted
            active:bg-sonolus-ui-button-pressed
        "
        :class="show ? 'opacity-100' : 'opacity-0 pointer-events-none'"
        @click="scrollToTop"
    >
        <img
            class="w-auto h-4 sm:h-6"
            :src="asset('/angle-up-solid.png')"
            alt="Back to Top"
            width="128"
            height="128"
        />
    </button>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { asset } from '../utils'

const show = ref(false)

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

let timeout: number | undefined
function onScroll() {
    if (timeout) return
    timeout = setTimeout(() => {
        show.value = window.scrollY >= window.innerHeight / 2
        timeout = undefined
    }, 100)
}

onMounted(() => document.addEventListener('scroll', onScroll))
onUnmounted(() => document.removeEventListener('scroll', onScroll))
</script>
