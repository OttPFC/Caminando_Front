import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  constructor() { }

  private apiUrl = environment.toDoUrl;
}
