import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private api: ApiService) { }
  getAllTeachers() {
    return this.api.get('teacher')
  }
  createTeacher(teacherData: any) {
    return this.api.post('teacher', teacherData)
  }
}
