export class GlobalStorage {
    static store(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value))
    }

    static get(key: string): any {
        const elements: string | null = localStorage.getItem(key)
        if (elements === null){
            return null
        }
        return JSON.parse(elements)
    }
}


export const addTaskArrayToLocalStorage = () => {
    if (localStorage.getItem('tasks') === null){
        localStorage.setItem('tasks', JSON.stringify([]))
    }
}