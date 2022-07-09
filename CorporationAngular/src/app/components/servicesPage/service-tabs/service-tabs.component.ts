import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Tab, TabRouter } from 'src/app/interfaces/roleselector/tab';
import { TabService } from 'src/app/services/tab.service';


@Component({
  selector: 'app-service-tabs',
  templateUrl: './service-tabs.component.html',
  styleUrls: ['./service-tabs.component.scss']
})
export class ServiceTabsComponent implements OnInit {

  tabs:TabRouter[]=[];
  constructor(
    private readonly tabService:TabService,
    private readonly router:Router) { }


  

  ngOnInit(): void {

    this.tabService.addedTab
      .subscribe(added=>{
        console.log(added)
        console.log(this.tabs)
        if (added === null) return;

        if (this.isHasTab(added)) {
          console.log('tab has been already')
          return;
        }
        
        this.tabs.push(added);        
      })
  }


  remove(index:number){
    this.tabs.splice(index,1);    
    const length = this.tabs.length;

    if (length===0) {
      this.router.navigate(['/services']);
      return;
    }

    if (length===1){
      const nextRouter = this.tabs[0].router;
      this.router.navigate([nextRouter]);
      return;
    }

    if (index === length){
      const nextRouter = this.tabs[index-1].router;
      this.router.navigate([nextRouter]);
    }
    else{
      const nextRouter = this.tabs[index].router;
      this.router.navigate([nextRouter]);
    }
  }

  private isHasTab(newTab:TabRouter):boolean{    
    return this.tabs.map(tab=>tab.title).includes(newTab.title);
  }
}
