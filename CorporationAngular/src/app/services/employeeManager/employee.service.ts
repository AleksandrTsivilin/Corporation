import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeInfo } from 'src/app/interfaces/employee/employeeInfo';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private readonly client:HttpClient) { }

  getEmployeesNonUser(){
    const urlGetEmployees="https://localhost:5001/api/Employee/nonUser";
    return this.client.get<EmployeeInfo[]>(urlGetEmployees);
  }
}
