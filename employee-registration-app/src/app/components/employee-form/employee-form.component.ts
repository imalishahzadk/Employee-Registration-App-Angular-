import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;
  editMode: boolean = false; // Tracks whether the form is in edit mode
  employeeId: number | null = null; // Stores the ID of the employee being edited

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Initializing the form with default values and validation rules
    this.employeeForm = this.fb.group({
      roleId: [0, Validators.required],
      userName: ['', Validators.required],
      empCode: ['', Validators.required],
      empId: [0, Validators.required],
      empName: ['', Validators.required],
      empEmailId: ['', [Validators.required, Validators.email]],
      empDesignationId: [0, Validators.required],
      empContactNo: ['', Validators.required],
      empAltContactNo: [''],
      empPersonalEmailId: [''],
      empExpTotalYear: [0],
      empExpTotalMonth: [0],
      empCity: ['', Validators.required],
      empState: ['', Validators.required],
      empPinCode: ['', Validators.required],
      empAddress: ['', Validators.required],
      empPerCity: [''],
      empPerState: [''],
      empPerPinCode: [''],
      empPerAddress: [''],
      password: ['', Validators.required],
      ErpEmployeeSkills: this.fb.array([]), // Form array for skills
      ErmEmpExperiences: this.fb.array([]), // Form array for experiences
    });
  }

  ngOnInit(): void {
    // Check if the component is in edit mode by checking the route parameters
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.employeeId = +id; // Convert the id to a number
        this.editMode = true; // Enable edit mode
        // Fetch the employee details using the ID and populate the form
        this.employeeService.getEmployeeById(this.employeeId).subscribe(
          (employee) => {
            if (employee) {
              this.populateForm(employee); // Populate the form with existing data
            } else {
              console.error('Employee not found');
            }
          },
          (error) => {
            console.error('Error fetching employee data', error);
          }
        );
      }
    });
  }

  // Handles form submission for both add and edit operations
  onSubmit() {
    if (this.employeeForm.valid) {
      if (this.editMode && this.employeeId !== null) {
        // Log the URL and data before making the update request
        console.log(`Updating employee at URL: /employees/${this.employeeId}`);
        console.log('Employee Data:', this.employeeForm.value);

        this.employeeService
          .updateEmployee(this.employeeId, this.employeeForm.value)
          .subscribe(
            () => {
              alert('Employee updated successfully!');
              this.router.navigate(['/']); // Redirect to the employee list after update
            },
            (error) => {
              console.error('Error updating employee', error); // Log the exact error
            }
          );
      } else {
        // Log the URL and data before making the add request
        console.log('Adding new employee with data:', this.employeeForm.value);

        this.employeeService.addEmployee(this.employeeForm.value).subscribe(
          () => {
            alert('Employee added successfully!');
            this.router.navigate(['/']); // Redirect to the employee list after adding
          },
          (error) => {
            console.error('Error adding employee', error);
          }
        );
      }
    }
  }

  // Populates the form with the employee data when in edit mode
  populateForm(employee: any) {
    this.employeeForm.patchValue({
      roleId: employee.roleId,
      userName: employee.userName,
      empCode: employee.empCode,
      empId: employee.empId,
      empName: employee.empName,
      empEmailId: employee.empEmailId,
      empDesignationId: employee.empDesignationId,
      empContactNo: employee.empContactNo,
      empAltContactNo: employee.empAltContactNo,
      empPersonalEmailId: employee.empPersonalEmailId,
      empExpTotalYear: employee.empExpTotalYear,
      empExpTotalMonth: employee.empExpTotalMonth,
      empCity: employee.empCity,
      empState: employee.empState,
      empPinCode: employee.empPinCode,
      empAddress: employee.empAddress,
      empPerCity: employee.empPerCity,
      empPerState: employee.empPerState,
      empPerPinCode: employee.empPerPinCode,
      empPerAddress: employee.empPerAddress,
      password: employee.password,
    });
    this.setSkills(employee.ErpEmployeeSkills || []);
    this.setExperiences(employee.ErmEmpExperiences || []);
  }

  // Sets the skills form array with existing skills data
  setSkills(skills: any[]) {
    const skillsFGs = skills.map((skill) => this.fb.group(skill));
    const skillsFormArray = this.fb.array(skillsFGs);
    this.employeeForm.setControl('ErpEmployeeSkills', skillsFormArray);
  }

  // Sets the experiences form array with existing experiences data
  setExperiences(experiences: any[]) {
    const experiencesFGs = experiences.map((exp) => this.fb.group(exp));
    const experiencesFormArray = this.fb.array(experiencesFGs);
    this.employeeForm.setControl('ErmEmpExperiences', experiencesFormArray);
  }

  // Getter for the skills form array
  get skills(): FormArray {
    return this.employeeForm.get('ErpEmployeeSkills') as FormArray;
  }

  // Getter for the experiences form array
  get experiences(): FormArray {
    return this.employeeForm.get('ErmEmpExperiences') as FormArray;
  }

  // Adds a new skill to the form array
  addSkill() {
    const skill = this.fb.group({
      empSkillId: [0],
      empId: [0],
      skill: [''],
      totalYearExp: [0],
      lastVersionUsed: [''],
    });
    this.skills.push(skill);
  }

  // Removes a skill from the form array by index
  removeSkill(index: number) {
    this.skills.removeAt(index);
  }

  // Adds a new experience to the form array
  addExperience() {
    const experience = this.fb.group({
      empExpId: [0],
      empId: [0],
      companyName: [''],
      startDate: [''],
      endDate: [''],
      designation: [''],
      projectsWorkedOn: [''],
    });
    this.experiences.push(experience);
  }

  // Removes an experience from the form array by index
  removeExperience(index: number) {
    this.experiences.removeAt(index);
  }
}
