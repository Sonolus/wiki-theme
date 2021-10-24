<template>
    <Navbar
        :sidebar="true"
        @toggle-sidebar="toggle('sidebar')"
        @toggle-language="toggle('language')"
    />

    <Sidebar :open="isOpen('sidebar')" @close="close" />
    <Language :open="isOpen('language')" @close="close" />

    <Page />
    <BackToTop />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BackToTop from '../components/BackToTop.vue'
import Language from '../components/Language.vue'
import Navbar from '../components/Navbar.vue'
import Page from '../components/Page.vue'
import Sidebar from '../components/Sidebar.vue'

type Overlay = 'sidebar' | 'language'
const overlay = ref<Overlay>()

function isOpen(type: Overlay) {
    return overlay.value === type
}
function toggle(type: Overlay) {
    overlay.value = overlay.value === type ? undefined : type
}
function close() {
    overlay.value = undefined
}
</script>

<style src="../styles/index.css" />
