import { Observable, Subject } from 'rxjs'
import { GlobalStorage } from '../globalStorage/globalStorage'

export type Task = {
    id: string,
    title: string,
    description: string,
    startTime: Date,
    endTime: Date
}

export type StateData = {
    tasks: Task[]
}

export class TasksManagement {
    stateData: StateData
    private tasksStream: Subject<StateData> = new Subject()
    tasksObservable: Observable<StateData | undefined>

    constructor(){
        this.stateData = this.getInitialState()
        this.tasksObservable = this.tasksStream.asObservable()
    }

    private getInitialState(){
        if (GlobalStorage.get('tasks') === null){
            const initialStateData: StateData = {
                tasks: []
            }
            return initialStateData
        } else {
            const initialStateData: StateData = {
                tasks: GlobalStorage.get('tasks')
            }
            return initialStateData
        }
    }

    addTask(task: Task){
        const tasks: Task[] | null = GlobalStorage.get('tasks')
        if (tasks === null){
            this.stateData.tasks.push(task)
            this.tasksStream.next(this.stateData)
            GlobalStorage.store('tasks', [task])
        } else {
            tasks.push(task)
            const stateData: StateData = {
                tasks: tasks
            }
            this.tasksStream.next(stateData)
            GlobalStorage.store('tasks', tasks)
        }
    }
    modifyTask(task: Task){
        const oldTasks: Task[] = GlobalStorage.get('tasks')
        const newTasks = oldTasks.map(oldTask => {
            if (oldTask.id === task.id){
                return task
            } else {
                return oldTask
            }
        })
        this.stateData.tasks = newTasks
        this.tasksStream.next(this.stateData)
        GlobalStorage.store('tasks', newTasks)
    }
    deleteTask(task: Task) {
        const oldTasks: Task[] = GlobalStorage.get('tasks')
        const newTasks: Task[] = oldTasks.filter(oldTask => {
            return oldTask.id !== task.id
        })
        this.stateData.tasks = newTasks
        this.tasksStream.next(this.stateData)
        GlobalStorage.store('tasks', newTasks)
    }

    getDayTasks(day: number){
        const tasks: Task[] = GlobalStorage.get('tasks')
        const dayTasks: Task[] = tasks.filter(task => {
            return task.startTime.getDay()===day
        })
        return dayTasks
    }


    getWeekTasks(){

    }

}


