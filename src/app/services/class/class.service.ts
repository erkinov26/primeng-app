import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  constructor(private api: ApiService) { }

  getAllClasses() {
    return this.api.get('class');
  }

  createClass(classData: any) {
    return this.api.post('class/create', classData);
  }
  getOneClassData(id: any) {
    return this.api.get(`class/${id}`)
  }

  getCuratorOptionsAndMap(inputFields: any[]): Observable<{

    curatorMap: Record<string, string>,
    columnData: any[]
  }> {
    return this.getAllClasses().pipe(
      map((res: any) => {
        const curatorField = inputFields.find((f: any) => f.name === 'curator_id');
        if (curatorField) {
          curatorField.options = res.map((c: any) => ({
            label: c.teacher.username,
            value: c.teacher.id
          }));
        }

        const curatorMap = res.reduce((acc: Record<string, string>, c: any) => {
          acc[c._id] = `${c.first_name} ${c.last_name}`;
          return acc;
        }, {});
        const columnData = [
          { title: 'Class name', key: 'class_name' },
          {
            title: 'Curator',
            valueGetter: (row: any) => {
              const teacher = row.teacher;
              return teacher ? `${teacher.first_name} ${teacher.last_name}` : 'Unknown';
            }
          },
          {
            title: 'Number of pupils',
            valueGetter: (row: any) => row.pupils?.length ?? 0
          }
        ];

        return { curatorMap, columnData };
      })
    );
  }
}
