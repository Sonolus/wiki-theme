type Card = {
    url: string
    title: string
    description: string
}

export type CardListConfig = Record<string, Card[]>
