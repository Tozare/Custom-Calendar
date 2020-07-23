import { useEffect, useState } from 'react'

export interface Observable<T> {
    subscribe: (
        listener: (value: T) => void
    ) => {
        unsubscribe: () => void
    }
}

export function useObservable<T>(observable: Observable<T>): T | undefined
export function useObservable<T>(observable: Observable<T>, initialState: T): T | undefined
export function useObservable<T>(observable: Observable<T>, initialState?: T): T | undefined {
    const [value, setValue] = useState<T | undefined>(initialState)

    useEffect(() => {
        const subscription = observable.subscribe(setValue)
        return () => subscription.unsubscribe()
    }, [observable])
    return value
}