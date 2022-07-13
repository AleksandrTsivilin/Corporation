import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Tab, TabRouter } from 'src/app/interfaces/roleselector/tab';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { TabService } from 'src/app/services/tab.service';


@Component({
  selector: 'app-service-tabs',
  templateUrl: './service-tabs.component.html',
  styleUrls: ['./service-tabs.component.scss']
})
export class ServiceTabsComponent implements OnInit{

  tabs:TabRouter[]=[];


  constructor(private readonly tabService:TabService) { }
 
  ngOnInit(): void {

    this.tabService.tabs$.subscribe(tabs=>{
      this.tabs = tabs;
    })
  }

  remove(index:number){
    this.tabService.remove(index);
  }
}
