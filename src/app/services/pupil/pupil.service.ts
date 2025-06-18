import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class PupilService {
  constructor(private api: ApiService) {

  }
  getAllPupils() {
    return this.api.get('pupil')
  }
  createPupil(pupilData: any) {
    return this.api.post('pupil', pupilData)
  }
  deletePupil(id: any) {
    debugger
    return this.api.delete(`pupil/${id}`)
  }
}
