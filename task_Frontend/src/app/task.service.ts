import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private webReqService: WebRequestService
  ) { }

  getLists(): Observable<any> {
    return this.webReqService.get('lists');
  }

  createList(title: string){
    // we want to send a web request to create a list
    return this.webReqService.post('lists', {title})
  }

  getTask(listId: string): Observable<any>{
    return this.webReqService.get(`lists/${listId}/tasks`);
  }

  createTask(title: string, listId: string){
    // we want to send a web request to create a Task
    return this.webReqService.post(`lists/${listId}/tasks`, {title})
  }

  complete(task: any){
    return this.webReqService.patch(`lists/${task._listId}/tasks/${task._id}`,{
      completed: !task.completed
    })
  }
}
