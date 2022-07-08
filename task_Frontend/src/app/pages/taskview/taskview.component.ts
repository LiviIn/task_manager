import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { List } from 'src/app/model.ts/list.model';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-taskview',
  templateUrl: './taskview.component.html',
  styleUrls: ['./taskview.component.scss']
})
export class TaskviewComponent implements OnInit {
  lists: List[] = [];
  tasks: any[] = [];
  listId: any;
  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private routeNav: Router
  ) { 
    
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.listId = params['listId'];
      if(params['listId']) {
        this.taskService.getTask(params['listId']).subscribe((tasks: any)=>{
          this.tasks = tasks;
          console.log(this.tasks)
        }) 
      }else{
        this.tasks = [undefined];
      }
    })

    this.taskService.getLists().subscribe((lists: any) =>{
      this.lists = lists; 
    })
  }

  onTaskClick(task: any){
    // we want to set the task to completed
    this.taskService.complete(task).subscribe((res)=>{
      // the task has been ste to completed successfully
      console.log('Completed successfully..!', )
      task.completed = !task.completed
    })
  }

}
