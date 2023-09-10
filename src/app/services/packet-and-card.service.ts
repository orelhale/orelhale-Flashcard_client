import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacketAndCardService extends DataService {

  objPacketAndCard: any = new BehaviorSubject({})
  arrPacketAndCard: any = new BehaviorSubject([])

  constructor(httpClient: HttpClient) {
    super("packets/cards", httpClient)
    this.initData()
  }

  initData() {
    this.getAll().subscribe(data => {

      let obj: any = {}
      let arr: any = []

      arr = data.map(packet => {
        packet.cards = packet.cards || []
        packet['childLength'] = packet.cards.length
        obj[packet.id] = packet
        return packet
      })
      
      // console.log("obj == ", obj);
      // console.log("arr == ", arr);
      this.objPacketAndCard.next(obj)
      this.arrPacketAndCard.next(arr)
    })
  }


}
