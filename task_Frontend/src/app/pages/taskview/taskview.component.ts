import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-taskview',
  templateUrl: './taskview.component.html',
  styleUrls: ['./taskview.component.scss']
})
export class TaskviewComponent implements OnInit {
  lists: any[] = [];
  tasks: any[] = [];
  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute
  ) { 
    
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
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

}
