export class Badge {
  name: string
  description: string
  currency_thresholds: [CurrencyThreshold]
}

export class CurrencyThreshold {
  currendyId: string
  threshold: number
}
