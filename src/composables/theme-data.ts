import { useThemeData as _useThemeData } from '@vuepress/plugin-theme-data/lib/client'
import { ThemeData } from '../types'

export function useThemeData() {
    return _useThemeData<ThemeData>()
}
