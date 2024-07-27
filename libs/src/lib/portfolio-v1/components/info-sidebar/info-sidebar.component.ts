import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatChip} from "@angular/material/chips";
import {MatButton} from "@angular/material/button";

  export interface Skill{
    title:string,
    level:SkillLevel
  }
  export enum SkillLevel{
    ADVANCED="ADVANCED",
    INTERMEDIATE="INTERMEDIATE",
    BEGINNER="BEGINNER",
  }
@Component({
  selector: 'vi-info-sidebar',
  standalone: true,
  imports: [CommonModule, MatChip, MatButton],
  templateUrl: './info-sidebar.component.html',
  styleUrl: './info-sidebar.component.scss',
})
export class InfoSidebarComponent {
  info = {
    Email: 'kumarvishnu1619@gmail.com',
    Phone: '+91 8837634837',
    'Alternate-Phone': '+91 9785855892',
    Residence: 'Rajasthan',
    City: 'Pilani',
    Dob: '10/12/2002',
    Language: ['English', 'Hindi']
  }
  skills:Skill[]=[
    {title:'C',level:SkillLevel.INTERMEDIATE},
    {title:'C++',level:SkillLevel.INTERMEDIATE},
    {title:'Java',level:SkillLevel.INTERMEDIATE},
    {title:'Python',level:SkillLevel.INTERMEDIATE},
    {title:'MongoDB',level:SkillLevel.INTERMEDIATE},
    {title:'Sql',level:SkillLevel.INTERMEDIATE},
    {title:'Angular',level:SkillLevel.INTERMEDIATE},
    {title:'ReactJs',level:SkillLevel.INTERMEDIATE},
    {title:'Spring Boot',level:SkillLevel.INTERMEDIATE},
  ];

  protected readonly Array = Array;
}
