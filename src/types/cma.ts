/**
 * CMA (Comparative Market Analysis) / Rental Estimate Types
 */

export interface SeasonalAdjustment {
  nextShiftDate: string
  description: string
}

export interface ScreenshotData {
  zillowEstimate: string
  zillowMap: string
  comparison1: string
  comparison2: string
  comparison3: string
}

export interface CMAData {
  // Property Info
  propertyAddress: string
  propertyName: string
  estimatedListingDate: string

  // Seasonal Adjustment
  seasonalAdjustment: SeasonalAdjustment

  // Screenshots (URLs or base64)
  screenshots: ScreenshotData

  // Rent Estimates
  startingRate: number
  lowRate: number

  // Summary
  summaryFindings: string
}

export const DEFAULT_SEASONAL_DESCRIPTION = `This winter started off stronger than we've seen in years, and that lasted to about mid-April. At that point, the market slowed dramatically, which continued into late summer, typically the peak for the year. So in many ways the most important period to push rents higher for the year was a dud in 2025. Then the market began its standard fall season 10% decline from there. So rents are low overall. Some homes do pretty well, and some struggle a lot. It's been difficult to quantify why. Homes that check all the boxes do well but minor issues have turned into thorny problems for many. Because rents are so low this fall has been a bit better than usual. Things almost always pick up a good bit in late October to mid December.

We cover more seasonal market points to know in this article. Rents have dropped considerably, especially in the sunbelt, since early 2023, as shown by these three leading rate-tracking indexes.

We expect all of our markets to hit their long-term bottom this winter.`

export const NET_INCOME_EXPLANATION = `Let's consider the annual potential rent picture, or how much cash will the rental produce over the next 12 months.

How much cash can we send you while we manage your important asset? Since 2020 that has averaged 80% of the rent that we collect (including our own cost), and our homes are only vacant 4% of that time. We've achieved these stellar results because we maximize all aspects of the management process, a surprisingly rare approach.`

export const RATE_ESTIMATE_EXPLANATION = `As the owner you can set the strategy, but if you opt for our recommendation we guarantee we can achieve this rate range, or you can leave with no penalty after allowing us at least 30 days to market at the low range rate. This quote expires after 30 days.

We typically recommend systematically reducing 3% every 7-10 days. This method moves the listing to the top of most searches, emails hundreds of people to let them know, and dramatically boosts traffic in most cases. It's a professional and highly effective method that rarely fails to perfectly balance rate and vacancy. It's also objective and keeps emotion out of the equation.

Most rental markets are fast and efficient these days. If the price is right and we're highly responsive, they rent fast.`

export const HELPFUL_LINKS = {
  vacancyCalculator: 'https://movezen360.com/rental-vacancy-cost-calculator/',
  cashFlowCalculator: 'https://movezen360.com/rental-investment-cash-flow-calculator/',
  investmentAnalysis: 'https://movezen360.com/rental-property-investment-analysis/',
  seasonalArticle: 'https://movezen360.com/seasonal-rental-market/',
  pricing: 'https://movezen360.com/pricing/',
  marketNews: 'https://movezen360.com/market-news/',
}

// Calculate income projections
export const calculateIncomeProjections = (startingRate: number, lowRate: number) => {
  // High range: Starting rate × 9 months (accepting 3 months vacancy)
  const highRangeIncome = startingRate * 9
  // Low range: Low rate × 11 months (accepting 1 month vacancy)
  const lowRangeIncome = lowRate * 11

  return {
    highRangeIncome,
    lowRangeIncome,
    startingRateAnnual: startingRate * 12,
    lowRateAnnual: lowRate * 12,
  }
}
