import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personal-user-data',
  templateUrl: './personal-user-data.component.html',
  styleUrls: ['./personal-user-data.component.scss']
})
export class PersonalUserDataComponent implements OnInit {

  constructor() { console.log('constr personal user data') }

  ngOnInit(): void {
  }

}
