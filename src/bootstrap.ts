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

        head: [
            [
                'link',
                {
                    rel: 'apple-touch-icon',
                    sizes: '57x57',
                    href: '/apple-icon-57x57.png',
                },
            ],
            [
                'link',
                {
                    rel: 'apple-touch-icon',
                    sizes: '60x60',
                    href: '/apple-icon-60x60.png',
                },
            ],
            [
                'link',
                {
                    rel: 'apple-touch-icon',
                    sizes: '72x72',
                    href: '/apple-icon-72x72.png',
                },
            ],
            [
                'link',
                {
                    rel: 'apple-touch-icon',
                    sizes: '76x76',
                    href: '/apple-icon-76x76.png',
                },
            ],
            [
                'link',
                {
                    rel: 'apple-touch-icon',
                    sizes: '114x114',
                    href: '/apple-icon-114x114.png',
                },
            ],
            [
                'link',
                {
                    rel: 'apple-touch-icon',
                    sizes: '120x120',
                    href: '/apple-icon-120x120.png',
                },
            ],
            [
                'link',
                {
                    rel: 'apple-touch-icon',
                    sizes: '144x144',
                    href: '/apple-icon-144x144.png',
                },
            ],
            [
                'link',
                {
                    rel: 'apple-touch-icon',
                    sizes: '152x152',
                    href: '/apple-icon-152x152.png',
                },
            ],
            [
                'link',
                {
                    rel: 'apple-touch-icon',
                    sizes: '180x180',
                    href: '/apple-icon-180x180.png',
                },
            ],
            [
                'link',
                {
                    rel: 'icon',
                    type: 'image/png',
                    sizes: '192x192',
                    href: '/android-icon-192x192.png',
                },
            ],
            [
                'link',
                {
                    rel: 'icon',
                    type: 'image/png',
                    sizes: '32x32',
                    href: '/favicon-32x32.png',
                },
            ],
            [
                'link',
                {
                    rel: 'icon',
                    type: 'image/png',
                    sizes: '96x96',
                    href: '/favicon-96x96.png',
                },
            ],
            [
                'link',
                {
                    rel: 'icon',
                    type: 'image/png',
                    sizes: '16x16',
                    href: '/favicon-16x16.png',
                },
            ],
            ['link', { rel: 'manifest', href: '/manifest.json' }],
            ['meta', { name: 'msapplication-TileColor', content: '#000020' }],
            [
                'meta',
                {
                    name: 'msapplication-TileImage',
                    content: '/ms-icon-144x144.png',
                },
            ],
            ['meta', { name: 'theme-color', content: '#000020' }],
            [
                'meta',
                {
                    property: 'og:image',
                    content: 'https://wiki.sonolus.com/icon.png',
                },
            ],
        ],

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
