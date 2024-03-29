import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Tab, TabRouter } from 'src/app/interfaces/roleselector/tab';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { TabService } from 'src/app/services/tab.service';


@Component({
  selector: 'app-service-tabs',
  templateUrl: './service-tabs.component.html',
  styleUrls: ['./service-tabs.component.scss']
})
export class ServiceTabsComponent implements OnInit, OnDestroy{

  tabs:TabRouter[]=[];

  private routerSubscription = new Subscription();

  constructor(
    private readonly tabService:TabService,
    private readonly router:Router
    ) { 
      
      this.routerSubscription =  this.router.events.subscribe(event=>{
        if (event instanceof NavigationEnd){

          tabService.prevRouter = tabService.currRouter;
          tabService.currRouter = event.url;
        }
      })
    }  
 
  ngOnInit(): void {
    this.tabService.tabs$.subscribe(tabs=>{
      this.tabs = tabs;
    })
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

  remove(title:string){
    this.tabService.remove(title);
  }
}
