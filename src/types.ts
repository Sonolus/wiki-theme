import { CodeConfig } from './components/code/types'

declare module '@vuepress/shared/lib' {
    interface SiteLocaleData {
        name: string
    }
}

export type Category = Record<string, string>

export type Sidebar = Record<string, Category>

export type ThemeData = {
    sidebar: Record<string, Sidebar>
} & CodeConfig
