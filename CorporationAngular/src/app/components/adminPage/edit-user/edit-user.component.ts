import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, NgForm } from '@angular/forms';
import { UserInfo } from 'src/app/interfaces/userInfo';
import { EditUser} from 'src/app/interfaces/editUser';
import { PermissionAction} from 'src/app/interfaces/editUser';
// interface Avaiables{
//   roles:RolesExample[]

// }

interface AvaiableUser{
  role:string | null,
  permissions:PermissionAction[] | null
}

// interface PermissionsAction{
//   permission:string,
//   isChecked:boolean
// }

// interface RolesExample{
//   title:string,
//   permissions:PermissionsExample[]
// }

// interface PermissionsExample{
//   title:string,
//   isChecked:boolean
// }

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

  // userAvaiables:FormGroup;
  // permissionsForm:FormGroup;
  // counter:number=0;
  
  //rolesExample:RolesExample[]=[];
  // avaiablesa:Avaiables={
  //   roles:[]
  // }

  avaiablesUser:AvaiableUser[]=[];
  allRoles:string[]=[];
  selectedRole:string="";
  

  constructor(private readonly formBuilder:FormBuilder) { 
    
    // this.rolesExample=[{
    //   title:"role 1",
    //   permissions:[
    //     {title:"per 1",isChecked:false},
    //     {title:"per 2",isChecked:false},
    // ]
    // }]

    this.allRoles=this.getAllRoles();

    
    // this.permissionsForm=this.formBuilder.group({
    //   permissionsAction:this.formBuilder.array([])
    // })

    // let per=["per 1","per 2"]
    // for (let i=0;i<per.length;i++){
    //   this.permissionsAction.push(this.createPermissionsAction(per[i]));
    // }
    
    
    // this.userAvaiables=this.formBuilder.group({
    //   avaiables:this.formBuilder.array([])
    // })

    // this.avaiables.push(this.createAvaiables("role 1",this.permissionsAction))
  }

  // get avaiables():FormArray{
  //   return <FormArray> this.userAvaiables.get('avaiables');
  // }

  // get permissionsAction():FormArray{
  //   return <FormArray> this.permissionsForm.get('permissionsAction');
  // }

  // createPermissionsAction(title:string):FormGroup{
  //   return this.formBuilder.group({
  //     title:[title],
  //     selected:[false]
  //   })
  // }

  // createAvaiables(title:string,permissionsAction:FormArray):FormGroup{
  //   return this.formBuilder.group({
  //     title:[title],
  //     permissions:[permissionsAction]
  //   })
  // }

  // onSubmit(){
  //   console.log(this.avaiables.length)
  //   for (let i =0 ; i<this.avaiables.length; i++){
  //     console.log(this.userAvaiables.value.avaiables[i].title)
  //   }
    
  // }

  // addRole(){
  //   let a=this.createPermissionsAction("per");
  //   let aa=this.formBuilder.array([]);
  //   aa.push(this.createPermissionsAction("per 2"))
  //   this.avaiables.push(this.createAvaiables(`role new ${this.counter++}`  ,this.permissionsAction))
  // }
  
  

  ngOnInit(): void {
    //console.log(this.editUser);
    if (this.editUser.roles!==null){
      for (let role of this.editUser.roles){
        //console.log(role.permissions);
        this.avaiablesUser.push({
          role:role.title,
          permissions:this.createPermissionsAction(role.permissions)
        })
      }
    }
    
    
  }

  createPermissionsAction(permissionsActionUser:PermissionAction[] | null):PermissionAction[]{
    let permissionsAction:PermissionAction[]=[];
    if (permissionsActionUser!==null){
      for (let permissionAction of permissionsActionUser){
        permissionsAction.push({title:permissionAction.title ,isSelected:permissionAction.isSelected});
      }
    }
    console.log(permissionsAction)
    return permissionsAction;
  }

  submitExample(){
    console.log("submitExample")
    console.log(this.avaiablesUser);
    this.updateUser.emit();
    //console.log(this.avaiablesa)
  }

  onSelectRole(event:any){
    this.selectedRole=event.target.value;
    console.log(this.selectedRole);
  }

  addRole(){
    // this.rolesExample.push({
    //   title:this.selectedRole,
    //   permissions:[
    //     {title:"per 1",isChecked:false},
    //     {title:"per 2",isChecked:false},
    //   ]
    // })

    let permissionsAction:PermissionAction[]=[];
    for (let permission of this.getAllPermissions()){
      permissionsAction.push({title:permission, isSelected:false})
    }
    this.avaiablesUser.push({role:this.selectedRole,permissions:permissionsAction})
  }

  removeRole(index:number){
    this.avaiablesUser.splice(index,1);
  }
  //template methods
  getAllRoles():string[]{
    return ["rol 1","rol 2","rol 3"]
  }  

  getAllPermissions():string[]{
    return ["per 1","per 2","per 3"]
  }

}
