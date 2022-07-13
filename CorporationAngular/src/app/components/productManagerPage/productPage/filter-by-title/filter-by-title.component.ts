import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-filter-by-title',
  templateUrl: './filter-by-title.component.html',
  styleUrls: ['./filter-by-title.component.scss']
})
export class FilterByTitleComponent implements OnInit, OnDestroy {

  
  @Input() search:string="";
  @Input() isComplitedSearch:boolean=true;
  @Output() filterRefreshProducts=new EventEmitter<string>();
  @Output() filterCurrentProducts = new EventEmitter<string>();
  

  private search$=new BehaviorSubject<string>("");
  private prevSearch:string=""
  
  constructor() { }
  ngOnDestroy(): void {
    console.log('onDestroy');
  }

  ngOnInit(): void {
    console.log('onInit filter by title')
    this.prevSearch=this.search;
    this.search$.next(this.search)
    this.setSearchLis();
  }

  startSearch(){
    this.search$.next(this.search);
  }

  isEmptySearch():boolean{
    return this.search.length==0;
  }

  clearSearch(){
    this.search="";
    this.search$.next(this.search);
  }

  private setSearchLis(){
    this.search$.pipe(
      
      debounceTime(1000))
      .subscribe(stringResearch=>{
        this.isContinueSearch()
          ? this.filterCurrentProducts.emit(stringResearch)
          : this.filterRefreshProducts.emit(stringResearch)

        this.prevSearch=this.search
      });
  }

  private isContinueSearch(){
    return this.search.startsWith(this.prevSearch)
      ? true
      : false;
  }

}
