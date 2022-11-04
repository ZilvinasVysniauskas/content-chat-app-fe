import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss']
})
export class BacklogComponent implements OnInit {

  Rest = 'asd';


  fn(x: string) {
    return parseInt(x);
  }



  ngOnInit(): void {

  }




}
