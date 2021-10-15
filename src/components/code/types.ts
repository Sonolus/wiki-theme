export type CodeConfig = Partial<{
    languages: string[]
    path: Partial<{
        template: string
        params: string[][]
    }>
}>
