export interface Skill {
  empSkillId: number;
  empId: number;
  skill: string;
  totalYearExp: number;
  lastVersionUsed: string;
}

export interface Experience {
  empExpId: number;
  empId: number;
  companyName: string;
  startDate: string;
  endDate: string;
  designation: string;
  projectsWorkedOn: string;
}

export interface Employee {
  roleId: number;
  userName: string;
  empCode: string;
  empId: number;
  empName: string;
  empEmailId: string;
  empDesignationId: number;
  empContactNo: string;
  empAltContactNo: string;
  empPersonalEmailId: string;
  empExpTotalYear: number;
  empExpTotalMonth: number;
  empCity: string;
  empState: string;
  empPinCode: string;
  empAddress: string;
  empPerCity: string;
  empPerState: string;
  empPerPinCode: string;
  empPerAddress: string;
  password: string;
  ErpEmployeeSkills: Skill[];
  ErmEmpExperiences: Experience[];
}
