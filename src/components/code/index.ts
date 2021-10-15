import { defineClientAppEnhance } from '@vuepress/client'
import Code from './Code.vue'

export default defineClientAppEnhance(({ app }) => {
    app.component('Code', Code)
})
