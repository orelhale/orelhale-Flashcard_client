import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { ActivatedRoute, Event, Router } from '@angular/router';
import { CardService } from 'src/app/services/card.service';
import { PacketService } from 'src/app/services/packet.service';
import { Card, Packet } from 'src/app/services/packet.service';
import { CardConfigComponent } from '../card-config/card-config.component';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent {
  selectPacket: any;
  carsd: Card[] = []
  tableTemplate = [{ title: "Question", key: "question" }, { title: "Answer", key: "answer" }, { title: "Create at", key: "createAt" }, { title: "$child", key: "" }]
  tableData: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cardService: CardService,
    private matDialog: MatDialog,
  ) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id')
    // let packet = this.packetService.getPacketById2(id!)
    // let packet = this.packetService.getPacketById2(id!)

    if (!id) {
      return this.navigator()
    }

    this.cardService.getPacket(id!).subscribe(
      (packet: any) => {
        if (!packet) {
          return this.navigator()
        }
        this.selectPacket = packet
        // console.log("this.selectPacket == ",this.selectPacket);
        
        this.tableData = this.selectPacket.cards
        // console.log("this.selectPacket == ",this.tableData);
        // this.selectPacket.[cardList] = cardsthrowError
        // this.tableData = this.selectPacket.cardList
      },
      (err) => console.log("err == ", err)
    )
  }


  navigator(param?: any) {
    let path = ["/packet"]
    this.router.navigate(path)
  }


  // initComponent() {
  //   let id = this.activatedRoute.snapshot.paramMap.get('id')
  //   this.initPacketList()
  // }


  add(data?: any) {
    this.matDialog.open(CardConfigComponent, { data: { card: data, packet: this.selectPacket } })
  }

  eventTable(obj: { type: string, data: any }) {
    if (obj.type == "edit") {
      this.matDialog.open(CardConfigComponent, { data: { card: obj.data, packet: this.selectPacket } })
    } else if (obj.type == "delete") {
      this.deleteCard(obj.data, this.selectPacket)
    }
  }


  deleteCard(card: Card, packet: Packet) {
    let indexPacket = this.selectPacket.cards.indexOf(card)
    this.selectPacket.cards.splice(indexPacket, 1)

    this.cardService.deleteCard(card.id + "").subscribe(
      () => {
        // let index = this.selectPacket.cards.indexOf(card)
        // this.selectPacket.cards.splice(index, 1)
      },
      () => this.selectPacket.cards.splice(indexPacket, 0, card)
    )
  }



}
