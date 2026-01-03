/**
 * Turnover Budget Builder Types
 */

export interface BudgetCategory {
  name: string
  estimatedCost: number
}

export interface PhotoLinks {
  inspection1: string
  inspection2: string
  moveOut: string
}

export interface CashFlowData {
  historicalIncome: number
  historicalExpense: number
  estimatedRentalRate: number
  projectedIncome: number
  projectedExpense: number
}

export interface TurnoverData {
  // Property Info
  propertyAddress: string
  propertyName: string

  // Budget Categories
  budgetCategories: {
    maintenanceRepair: number
    paint: number
    appliances: number
    floorsCarpets: number
    housekeeping: number
    landscapingExterior: number
    keysLocks: number
    other: number
    smokeFireVerification: number
  }

  // Cash Flow
  cashFlow: CashFlowData

  // Photo Links
  photoLinks: PhotoLinks

  // Cover Letter
  coverLetter: string

  // Additional Info
  estimatedTurnoverDays: number
  leaseLength: number
}

export const DEFAULT_COVER_LETTER = `We have completed the move-out inspection for your property and wanted to provide a clear summary of where things stand and how we recommend moving forward.

Attached you will find the following:

- A summary of the move-out results and current property condition
- Inspection photos documenting observed issues
- A rough turnover budget outlining what we believe will be needed to return the property to rent-ready condition
- A cash flow report showing performance to date
- An estimated cash flow projection assuming we proceed with this turnover plan

Based on the inspection and our experience with similar properties, the attached budget reflects what we believe is a reasonable and efficient scope of work. Our goal is to complete the turnover quickly, control costs, and position the property to perform well going forward.

Rather than requesting approval for each individual work order, we are asking for approval to complete the necessary repairs within the attached overall budget. If approved, we will manage the work internally and only authorize repairs that fit within this budget.

If at any point we determine the work cannot be completed within the approved amount, we will stop and request further direction before proceeding.

In some cases, once work has started, unforeseen issues can arise. When that happens, any change orders are handled through a formal process. This includes an updated overall budget estimate that can be directly compared to the original, clearly highlighting any changes and their impact before additional work is authorized. We actively work to avoid change orders, but this process ensures transparency if they become necessary.

Please let us know if you approve proceeding with the turnover under the attached budget, or if you would like to discuss any part of the plan in more detail.`

export const DISCLAIMER_TEXT = `Of course this estimate is subject to change. We're considering the information we have in hand now. If we haven't inspected recently we will soon, and will update you if needed. It's imperative to know that we can't account for move out damage, which is actually one of the more common problems. We're focusing on costs you will need to pay at least a portion of (usually split with resident depending on length of term), but omitting those that would be a full deposit charge like junk haul. However those costs come into play if the deposit is depleted.

This projection reflects operating performance based on items we manage and pay on the owner's behalf. It does not include owner-paid expenses such as taxes, insurance, debt service, or other items outside our management scope.`

export const BUDGET_CATEGORIES = [
  { key: 'maintenanceRepair', label: 'Maintenance / Repair' },
  { key: 'paint', label: 'Paint' },
  { key: 'appliances', label: 'Appliances' },
  { key: 'floorsCarpets', label: 'Floors / Carpets' },
  { key: 'housekeeping', label: 'Housekeeping' },
  { key: 'landscapingExterior', label: 'Landscaping / Exterior' },
  { key: 'keysLocks', label: 'Keys / Locks' },
  { key: 'other', label: 'Other' },
  { key: 'smokeFireVerification', label: 'Smoke / Fire Verification' },
] as const
