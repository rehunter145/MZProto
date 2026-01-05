export interface Holiday {
  id: string
  name: string
  date: string
  everyYear: boolean
  halfDay: boolean
  mandatoryLeave: boolean
  usedInLocations: number
}

export interface Employee {
  id: string
  name: string
  initials: string
  email: string
  vacationAllowance: number
  vacationUsed: number
  vacationLeft: number
}

export interface AbsenceRequest {
  id: string
  employeeId: string
  employeeName: string
  startDate: string
  endDate: string
  days: number
  status: 'pending' | 'approved' | 'rejected'
  requestedAt: string
  approvedBy?: string
  approvedAt?: string
  notes?: string
}

export interface TodayAbsence {
  id: string
  employeeId: string
  employeeName: string
  employeeInitials: string
  startDate: string
  endDate: string
  daysRemaining: number
}
