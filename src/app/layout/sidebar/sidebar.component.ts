import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  buttonsList: Array<any> = []

  constructor(private router: Router) {

  }

  ngOnInit() {
    this.buttonsList = [
      { title: "Packet list", path: ["packet"] },
      { title: "Packet list2", path: ["packet2"] },
    ]
  }

  navigator(path: string) {
    this.router.navigate([""+path])
  }
}
