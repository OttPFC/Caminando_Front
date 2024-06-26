import { AfterViewInit, Component, OnInit } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { IRegisterUser } from '../interfaces/register-user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  

  users: IRegisterUser[] = []

  constructor(private usrSvc: UserService){}

  

}
