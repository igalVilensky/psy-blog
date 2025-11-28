import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useNotification } from './useNotification'

export interface FlowSchedule {
    enabled: boolean
    type: 'once' | 'daily' | 'weekly'
    time: string
    days?: number[]
    startDate?: string
    endDate?: string
    reminderMinutes?: number
    lastTriggered?: any
    nextTrigger?: any
}

export interface LabFlow {
    id?: string
    name: string
    schedule?: FlowSchedule
    [key: string]: any
}

export const useScheduler = (notificationCallback?: (message: string, type: string, options: any) => void) => {
    const router = useRouter()

    /**
     * Show an in-app notification for a flow reminder
     */
    const showReminder = (flow: LabFlow, minutesUntil: number) => {
        if (!notificationCallback) {
            console.error('No notification callback provided to useScheduler')
            return
        }

        const message = minutesUntil > 0
            ? `${flow.name} - через ${minutesUntil} минут`
            : `Время начать: ${flow.name}`

        notificationCallback(message, 'reminder', {
            duration: 0, // Don't auto-dismiss
            routePath: '/lab/builder',
            ctaText: 'Запустить',
            flowId: flow.id // Pass flow ID so we can trigger execution
        })
    }

    /**
     * Calculate the next trigger time for a schedule
     */
    const calculateNextTrigger = (schedule: FlowSchedule): Date | null => {
        if (!schedule.enabled || !schedule.time) {
            return null
        }

        const now = new Date()
        const [hours, minutes] = schedule.time.split(':').map(Number)

        let nextTrigger = new Date()
        nextTrigger.setHours(hours, minutes, 0, 0)

        // If start date is set and in the future, use it
        if (schedule.startDate) {
            const startDate = new Date(schedule.startDate)
            if (startDate > now) {
                nextTrigger = new Date(startDate)
                nextTrigger.setHours(hours, minutes, 0, 0)
            }
        }

        switch (schedule.type) {
            case 'once':
                // If the time has passed today, it's a one-time schedule that's done
                if (nextTrigger <= now) {
                    return null
                }
                break

            case 'daily':
                // If the time has passed today, schedule for tomorrow
                if (nextTrigger <= now) {
                    nextTrigger.setDate(nextTrigger.getDate() + 1)
                }
                break

            case 'weekly':
                // Find the next occurrence of the scheduled day
                if (!schedule.days || schedule.days.length === 0) {
                    return null
                }

                const currentDay = now.getDay()
                const sortedDays = [...schedule.days].sort((a, b) => a - b)

                // Find next scheduled day
                let nextDay = sortedDays.find(day => day > currentDay)

                // If no day found this week, use first day of next week
                if (nextDay === undefined) {
                    nextDay = sortedDays[0]
                    nextTrigger.setDate(nextTrigger.getDate() + (7 - currentDay + nextDay))
                } else {
                    nextTrigger.setDate(nextTrigger.getDate() + (nextDay - currentDay))
                }

                // If the calculated time is in the past, move to next week
                if (nextTrigger <= now) {
                    nextTrigger.setDate(nextTrigger.getDate() + 7)
                }
                break
        }

        // Check end date
        if (schedule.endDate) {
            const endDate = new Date(schedule.endDate)
            endDate.setHours(23, 59, 59, 999)
            if (nextTrigger > endDate) {
                return null
            }
        }

        return nextTrigger
    }

    /**
   * Check if a flow should trigger now or send a reminder
   */
    const checkSchedules = async (flows: LabFlow[]): Promise<void> => {
        const now = new Date()

        for (const flow of flows) {
            if (!flow.schedule || !flow.schedule.enabled || !flow.id) {
                continue
            }

            const nextTrigger = calculateNextTrigger(flow.schedule)
            if (!nextTrigger) {
                continue
            }

            const diffMs = nextTrigger.getTime() - now.getTime()
            const minutesUntil = Math.floor(diffMs / (1000 * 60))


            // Check if it's time to execute (trigger window: 0 to -5 minutes)
            if (minutesUntil <= 0 && minutesUntil > -5) {
                showReminder(flow, 0)
                continue
            }

            // Check if it's time for a reminder
            if (flow.schedule.reminderMinutes && minutesUntil === flow.schedule.reminderMinutes) {
                showReminder(flow, minutesUntil)
            }
        }
    }

    /**
     * Format next trigger time for display
     */
    const formatNextTrigger = (schedule: FlowSchedule): string | null => {
        const nextTrigger = calculateNextTrigger(schedule)
        if (!nextTrigger) {
            return null
        }

        const now = new Date()
        const diff = nextTrigger.getTime() - now.getTime()
        const days = Math.floor(diff / (1000 * 60 * 60 * 24))
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

        if (days > 0) {
            return `через ${days}д ${hours}ч`
        } else if (hours > 0) {
            return `через ${hours}ч ${minutes}м`
        } else if (minutes > 0) {
            return `через ${minutes}м`
        } else {
            return 'сейчас'
        }
    }

    return {
        showReminder,
        calculateNextTrigger,
        checkSchedules,
        formatNextTrigger
    }
}
