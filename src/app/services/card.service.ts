import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Card } from './packet.service';
import { Observable, Subscriber, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService extends DataService {
  cards: Card[] = [];
  cardsAsObj: any;
  // observableCard: Observable<any>=new Observable;
  observableCard: Observable<any>;
  subscriber = new Subscriber();

  constructor(httpClient: HttpClient) {
    super("cards", httpClient)
  }


  initializingCard(cards: Card[]) {
    let obj: any = {}
    if (cards.length) {
      cards.forEach((card) => {
        if (!obj[card.packetId]) {
          obj[card.packetId] = []
        }
        obj[card.packetId].push(card)
      })
    }
    return obj
  }


  createCard(obj: Card) {
    return this.create(obj)
  }

  deleteCard(id: string) {
    return this.delete(id)
  }

  updateCard(obj: any, id: string) {
    console.log("obj == ",obj);
    console.log("id == ",id);
    
    return this.updata(obj, id)
  }

  getCardsByPacketId(id: string) {
    if (this.cardsAsObj) {
      return new Observable((obs) => obs.next(this.cardsAsObj[id]))
    } else {
      return this.getAll().pipe(
        map(data => {
          this.cards = data
          this.cardsAsObj = this.initializingCard(this.cards)
          console.log("this.cards == ", this.cards);

          return this.cardsAsObj[id] || []
        }),
        catchError((err) => throwError(err))
      )
    }
  }

}
        // this.cardsAsObj = this.initializingCard(data)
