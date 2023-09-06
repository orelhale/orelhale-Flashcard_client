// import { Component } from '@angular/core';
// import { Packet, PacketService } from './../../servies/packet.service';
// import { ActivatedRoute } from '@angular/router';
// import { Location } from '@angular/common';
// import { Router } from '@angular/router';
// import { PopupService } from 'src/app/servies/popup.service';

// @Component({
//   selector: 'app-packet',
//   templateUrl: './packet.component.html',
//   styleUrls: ['./packet.component.scss']
// })
// export class PacketsComponent {
//   packetList: Packet[] = [];
//   selectPacket?: Packet;
//   typePage: string = "packet";
//   tableData: Array<any> | any;
//   tableTemplate: Array<object> = [{ title: "Name", key: "name" }, { title: "Card num", key: "childLength" }, { title: "", key: ":" }, { title: "$child", key: this.optionPacket }]

//   constructor(
//     private packetService: PacketService,
//     private popupService: PopupService,
//     private activatedRoute: ActivatedRoute,
//     private router: Router,
//   ) { }


//   ngOnInit() {
//     this.packetService.getPacketList2().then((data) => {
//       this.packetList = data
//       this.initComponent()
//     })
//   }


//   // ngOnInit1() {
//   //   this.packetList = this.packetService.getPacketList()
//   //   // console.log("this.packetList == ", this.packetList);
//   //   this.packetService.eventEmitter.subscribe((data) => {
//   //     this.packetList = data
//   //     this.initComponent()
//   //   })
//   //   this.initComponent()
//   // }



//   initComponent() {
//     let id = this.activatedRoute.snapshot.paramMap.get('id')

//     if (id) {
//       this.initCardList(id)
//     } else {
//       this.initPacketList()
//     }
//   }

//   navigator(param: any) {
//     let path = `/packet/${param || ""}`
//     this.router.navigate([path])
//   }

//   async eventTavle(obj: { type: string, data: any }) {
//     if (obj.type == "navigator") {
//       return this.navigator(obj.data.id)
//     }
//     if (obj.type == "edit") {
//       return this.popupService.setEventPopupData({ data: obj.data, type: this.typePage })
//     }
//     if (obj.type == "delete") {
//       if (this.typePage == 'packet') {
//         return this.packetService.apiDeletePacket(obj.data)
//       }
//       if (this.typePage == 'card') {
//         console.log("obj.data== ", obj);
//         this.tableData = await this.packetService.apiDeleteCard(obj.data)
//         return
//       }
//     }
//   }

//   initPacketList() {
//     // this.tableTemplate = [{ title: "Name", key: "name" }, { title: "Card num", key: "childLength" }, { title: "#", key: ":" },]
//     this.packetList.forEach(packet => {
//       packet.childLength = this.packetService.getPacketById("" + packet.id).childLength || 0
//     })
//     this.tableData = this.packetList
//   }


//   initCardList(id: string) {
//     this.typePage = "card"
//     this.tableTemplate = [{ title: "Question", key: "question" }, { title: "Answer", key: "answer" }, { title: "Create at", key: "createAt" }, { title: "$child", key: "" }]
//     // this.selectPacket = this.packetList.find(item =>(item.id + "") == id)
//     this.selectPacket = this.packetService.getPacketById(id)
//     // console.log("this.selectPacket == ",this.selectPacket);
//     if (this.selectPacket) {
//       this.tableData = this.selectPacket.cardList
//     } else {
//       this.tableData = null
//     }
//   }


//   add() {
//     if (this.selectPacket && this.typePage == "card")
//       this.popupService.setEventPopupData({ data: { packetId: this.selectPacket.id }, type: "card" })
//     else
//       this.popupService.setEventPopupData({ data: "", type: "packet" })
//   }


//   optionPacket(obj: any) {
//     console.log(obj);
//     let ppp = { ...obj }

//   }


//   onTest() {
//     this.packetService.apiGetPacketAndCard()
//   }
// }
