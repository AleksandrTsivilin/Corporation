import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, NgForm } from '@angular/forms';
import { UserInfo } from 'src/app/interfaces/userInfo';
import { EditUser} from 'src/app/interfaces/editUser';






@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  

  @Input () editUser:EditUser={
    id:null,
    roles:null
  }

  @Output() updateUser=new EventEmitter();

  userAvaiables:FormGroup;
  permissionsForm:FormGroup;
  counter:number=0;
  

  

  constructor(private readonly formBuilder:FormBuilder) { 

    
    this.permissionsForm=this.formBuilder.group({
      permissionsAction:this.formBuilder.array([])
    })

    let per=["per 1","per 2"]
    for (let i=0;i<per.length;i++){
      this.permissionsAction.push(this.createPermissionsAction(per[i]));
    }
    
    
    this.userAvaiables=this.formBuilder.group({
      avaiables:this.formBuilder.array([])
    })

    this.avaiables.push(this.createAvaiables("role 1",this.permissionsAction))
  }

  get avaiables():FormArray{
    return <FormArray> this.userAvaiables.get('avaiables');
  }

  get permissionsAction():FormArray{
    return <FormArray> this.permissionsForm.get('permissionsAction');
  }

  createPermissionsAction(title:string):FormGroup{
    return this.formBuilder.group({
      title:[title],
      selected:[false]
    })
  }

  createAvaiables(title:string,permissionsAction:FormArray):FormGroup{
    return this.formBuilder.group({
      title:[title],
      permissions:[permissionsAction]
    })
  }

  onSubmit(){
    console.log(this.avaiables.length)
    for (let i =0 ; i<this.avaiables.length; i++){
      console.log(this.userAvaiables.value.avaiables[i].title)
    }
    
  }

  addRole(){
    let a=this.createPermissionsAction("per");
    let aa=this.formBuilder.array([]);
    aa.push(this.createPermissionsAction("per 2"))
    this.avaiables.push(this.createAvaiables(`role new ${this.counter++}`  ,this.permissionsAction))
  }
  
  

  ngOnInit(): void {
  }

  

  

  
  
  

}
