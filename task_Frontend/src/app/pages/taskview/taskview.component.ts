import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-taskview',
  templateUrl: './taskview.component.html',
  styleUrls: ['./taskview.component.scss']
})
export class TaskviewComponent implements OnInit {

  constructor(
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
  }

  createNewList(){
    console.log('click a create New function')
    this.taskService.createList('Testing').subscribe((response: any) => {
      console.log('response a post result: ',response)
    })
  }

}
