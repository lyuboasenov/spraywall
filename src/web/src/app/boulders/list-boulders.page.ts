import { Component } from '@angular/core';
import { BouldersService } from '../services/boulders.service';
import { Boulder } from '../models/boulder';

@Component({
  selector: 'app-list-boulders',
  templateUrl: './list-boulders.page.html',
  styleUrls: ['./list-boulders.page.scss'],
})
export class ListBouldersPage {
  public boulders: Boulder[] = [];
  public selectedBoulder?: Boulder;

  constructor(private bouldersService: BouldersService) {
    this.bouldersService.getAll().then((boulders: Boulder[]) => {
      this.boulders = boulders;
    });
  }

  onSelect(b: Boulder) {
    this.selectedBoulder = b;
  }
}
