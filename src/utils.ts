import { withBase } from '@vuepress/client'

export function asset(path: string) {
    path = `/assets/${path}`
    return __VUEPRESS_DEV__ ? withBase(path) : path
}

export function removeTrailing(path: string, toRemove: string) {
    return path.endsWith(toRemove) ? path.slice(0, -toRemove.length) : path
}
