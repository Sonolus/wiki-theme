import { path } from '@vuepress/utils'

export const theme = {
    name: 'Sonolus Theme',

    layouts: {
        Layout: path.resolve(__dirname, './layouts/Layout.vue'),
        404: path.resolve(__dirname, './layouts/404.vue'),
    },
}
