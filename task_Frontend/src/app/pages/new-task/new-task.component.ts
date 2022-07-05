import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  createList(title: string){
    // this.taskService.createList(title).subscribe((response: any) => {
    //   console.log('response a post result: ',response)
    //   //Now we navigate to /list/response._id
    // })
  }

}
