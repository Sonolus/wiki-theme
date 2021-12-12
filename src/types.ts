import { CodeConfig } from './components/code/types'

declare module '@vuepress/shared/lib' {
    interface SiteLocaleData {
        name: string
    }
}

export type Sidebar = {
    title: string
    pages: Record<string, string>
}[]

export type ThemeData = {
    sidebar: Record<string, Sidebar>
} & CodeConfig
