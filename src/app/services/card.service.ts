import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Card } from './packet.service';
import { BehaviorSubject, Observable, Subscriber, catchError, throwError } from 'rxjs';
import { PacketAndCardService } from './packet-and-card.service';

@Injectable({
  providedIn: 'root'
})
export class CardService extends DataService {
  
  packetOfCard = new BehaviorSubject([]);
  packet: any;
  observableCard: Observable<any>;
  subscriber = new Subscriber();

  constructor(
    httpClient: HttpClient,
    private packetAndCardService: PacketAndCardService,
  ) {
    super("cards", httpClient)
  }

  createCard(obj: Card) {
    return this.create(obj)
  }

  deleteCard(id: string) {
    return this.delete(id)
  }

  updateCard(obj: any, card: any) {
    let tempCard = { ...card }
    card.question = obj.question
    card.answer = obj.answer

    return this.updata(obj, card.id).pipe(
      catchError((err) => {
        card.question = tempCard.question
        card.answer = tempCard.answer
        return throwError(err)
      })
    )
  }

  init(id: string) {
    this.packetAndCardService.objPacketAndCard.subscribe((list: any) => {
      this.packet = list[id]
      this.packetOfCard.next(list[id])
    })
  }

  getPacket(id: string) {
    this.init(id)
    return this.packetOfCard
  }
}
