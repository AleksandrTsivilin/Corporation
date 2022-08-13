import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';



interface SearchResponce{
  criteria:string,
  isSameDirection:boolean
}
@Component({
  selector: 'app-search-string',
  templateUrl: './search-string.component.html',
  styleUrls: ['./search-string.component.scss']
})
export class SearchStringComponent implements OnInit {

  @Input() isComplited:boolean = true;
  @Input() search: string = "";
  @Input() delay: number = 500;

  @Output() newCriteria = new EventEmitter<SearchResponce>();

  isEmpty:boolean = false;
  private search$=new BehaviorSubject<string>("");
  private prevSearch:string=""


  constructor() { }

  ngOnInit(): void {
    this.prevSearch=this.search;

    this.isEmpty = this.checkEmpty();
    this.search$.next(this.search)
    this.setSearchLis();
  }

  start(){
    this.search$.next(this.search);
  }

  clear(){
    this.search="";
    this.search$.next(this.search);
  }

  private setSearchLis(){
    this.search$.pipe(      
      debounceTime(this.delay))
      .subscribe(newCriteria=>{
        
        this.isEmpty = this.checkEmpty();

        this.newCriteria.emit({
          criteria : newCriteria,
          isSameDirection:this.isContinue()});
        
        this.prevSearch=this.search
      });
  }

  private isContinue(){
    return this.search.startsWith(this.prevSearch);
  }

  private checkEmpty() : boolean {
    return this.search.length === 0;
  }


}
