import { Component, OnInit } from '@angular/core';
import { TabService } from 'src/app/services/tab.service';

@Component({
  selector: 'app-personal-user-data',
  templateUrl: './personal-user-data.component.html',
  styleUrls: ['./personal-user-data.component.scss']
})
export class PersonalUserDataComponent implements OnInit {

  constructor(private readonly tabService:TabService) { 

      tabService.addedTab({
        title: 'personal data',
        router: "/services/personal_data",
        additional: "",
        key: undefined
      })
   }

  ngOnInit(): void {
  }

}
