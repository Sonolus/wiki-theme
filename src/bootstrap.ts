import { path } from '@vuepress/utils'
import callsites from 'callsites'
import { existsSync, readdirSync } from 'fs'
import { PluginConfig, UserConfig } from 'vuepress'
import { CodeConfig } from './components/code/types'

const { resolve } = path

type BootstrapOptions = {
    docsPath: string

    base: string

    prism: string[]
    code: CodeConfig
    cardList: boolean
}

export function bootstrap(options: Partial<BootstrapOptions> = {}): UserConfig {
    const { docsPath, base, prism, code, cardList } = {
        docsPath: resolve(
            callsites()[1].getFileName() || __dirname,
            '..',
            '..'
        ),

        ...options,
    }

    const localePaths = [
        '/',
        ...readdirSync(docsPath).map((path) => `/${path}/`),
    ].filter((path) => existsSync(resolve(docsPath, `.${path}`, 'locale.json')))

    const locales = Object.fromEntries(
        localePaths.map((path) => [
            path,
            require(resolve(docsPath, `.${path}`, 'locale.json')),
        ])
    )

    const sidebar = Object.fromEntries(
        localePaths.map((path) => {
            const lang = locales[path].lang
            const sidebarPath = resolve(docsPath, `.${path}`, 'sidebar.json')
            if (existsSync(sidebarPath)) {
                return [lang, prefixPath(require(sidebarPath), path)]
            } else {
                return [lang, {}]
            }
        })
    )

    const plugins: PluginConfig[] = [
        [
            '@vuepress/plugin-active-header-links',
            {
                delay: 100,
            },
        ],
        '@vuepress/plugin-nprogress',
        [
            '@vuepress/plugin-theme-data',
            {
                themeData: {
                    sidebar,
                    code,
                },
            },
        ],
    ]

    if (prism) {
        plugins.push([
            '@vuepress/plugin-prismjs',
            {
                preloadLanguages: prism,
            },
        ])
    }

    const clientAppEnhanceFiles: string[] = []

    if (code) {
        clientAppEnhanceFiles.push(resolve(__dirname, './components/code'))
    }
    if (cardList) {
        clientAppEnhanceFiles.push(resolve(__dirname, './components/card-list'))
    }

    return {
        base,

        locales,
        theme: __dirname,

        markdown: {
            code: {
                lineNumbers: false,
            },
            extractHeaders: {
                level: [2],
            },
        },

        plugins,

        clientAppEnhanceFiles,
    }
}

function prefixPath(
    sidebar: Record<string, Record<string, string>>,
    path: string
) {
    return Object.fromEntries(
        Object.entries(sidebar).map(([title, pages]) => [
            title,
            Object.fromEntries(
                Object.entries(pages).map(([title, link]) => [
                    title,
                    path + link.slice(1),
                ])
            ),
        ])
    )
}
