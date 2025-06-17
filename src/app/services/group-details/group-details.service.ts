import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupDetailsService {

  constructor(private api: ApiService) { }
  getAllPupil() {
    return this.api.get('pupil')
  }
  addPupilToClass(pupilData: any) {
    return this.api.post('class/add-Pupil', pupilData)
  }
  getUnassignedPupilOptions() {
    return this.getAllPupil().pipe(
      map((pupils: any) => {
        const unassigned = pupils.filter((p:any) => p.class_id === null);
        const options = unassigned.map((p:any) => ({
          label: `${p.first_name} ${p.last_name}`,
          value: p.id
        }));
        return { unassignedPupils: unassigned, options };
      })
    );
  }


}
