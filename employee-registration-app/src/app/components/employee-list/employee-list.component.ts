import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        this.employees = data;
      },
      error: (err) => {
        console.error('Failed to load employees', err);
      },
    });
  }

  editEmployee(empId: number) {
    console.log(
      'Employee selected for edit:',
      this.employees.find((emp) => emp.empId === empId)
    );
    this.router.navigate(['/edit', empId]); // Navigate to the edit page with employee ID
  }

  deleteEmployee(empId: number) {
    this.employeeService.deleteEmployee(empId).subscribe({
      next: () => {
        this.loadEmployees(); // Refresh the list after deletion
      },
      error: (err) => {
        console.error('Failed to delete employee', err);
      },
    });
  }
}
