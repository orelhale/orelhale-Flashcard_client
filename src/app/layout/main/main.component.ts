import { Component } from '@angular/core';
import { CardService } from 'src/app/services/card.service';
import { PacketService } from 'src/app/services/packet.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  constructor(
    private packetService: PacketService,
    private cardService: CardService,
  ){
    this.packetService
    this.cardService
  }
}
