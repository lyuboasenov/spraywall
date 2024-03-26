import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-boulder',
  templateUrl: './boulder.page.html',
  styleUrls: ['./boulder.page.scss'],
})
export class BoulderPage implements OnInit {
  public id!: string;
  private activatedRoute = inject(ActivatedRoute);
  constructor() {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }
}
