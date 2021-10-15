import { defineClientAppEnhance } from '@vuepress/client'
import CardList from './CardList.vue'

export default defineClientAppEnhance(({ app }) => {
    app.component('CardList', CardList)
})
