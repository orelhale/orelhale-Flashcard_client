import { Injectable, EventEmitter } from '@angular/core';
import fakePacketList from "./fakePacketList.json"
import fakeCardList from "./fakeCardList.json"
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, catchError, map, of, throwError, BehaviorSubject } from 'rxjs';
import { DataService } from './data.service';


@Injectable({
	providedIn: 'root'
})
export class PacketService extends DataService {

	private fackPacketList: Packet[] = [];
	private fackCardList: Card[] = [];


	public packetList: Packet[] = [];
	private packetListAsObj: any;

	public subjectPacketList: any = new BehaviorSubject([])
	public subjectPacketListAsObj: any = new BehaviorSubject([])

	serverUrl: string = "http://localhost:3000"

	constructor(httpClient: HttpClient) {
		super("packets", httpClient)
		this.fackPacketList = fakePacketList || []
		this.fackCardList = fakeCardList || []
		this.intialzeService().subscribe(data=>console.log("Packets == ",data))
	}


	craetePacket(packet: Packet) {
		this.packetList.splice(0, 0, packet)

		return this.create(packet).pipe(
			map((data: any) => {
				packet.id = data.id
				packet.childLength = 0
				packet.createAt = data.createAt
				this.packetListAsObj[packet.id] = packet
				return data
			}),
			catchError(err => {
				this.packetList.splice(0, 0)
				return err
			})
		)
	}

	getPackets() {
		if (this.packetList.length) {
			return new Observable((e) => e.next(this.packetList))
		} else {
			return this.intialzeService().pipe(map(() => this.packetList))
		}
	}


	getPacketById(id: string) {
		if (this.packetListAsObj) {
			return of(this.packetListAsObj["" + id])
		} else {
			return this.intialzeService().pipe(map(() => {
				return this.packetListAsObj["" + id]
			}))
		}
	}


	getPacketById2(id: string) {
		return (this.packetListAsObj && this.packetListAsObj["" + id]) || null
	}


	updatePacket(newData: any, packet: Packet) {
		let temp = packet.name;
		packet.name = newData.name;
		return this.updata(newData, (packet.id + "")).pipe(
			catchError((err: any) => {
				packet.name = temp;
				return err;
			})
		)
	}


	deletePacket(packet: Packet) {
		let index = this.packetList.indexOf(packet)
		this.packetList.splice(index, 1)

		return this.delete("" + packet.id).subscribe(
			() => console.log("packet " + packet.id + " is deleted"),
			(err) => this.packetList.splice(index, 0, packet)
		)
	}


	addPacketToListPacket(packet: Packet) {
		this.packetListAsObj[packet.id] = packet
		this.packetList.push(packet)
	}


	intialzeService() {
		return this.httpClient.get(this.Url + "/andcard").pipe(map((data: any) => {
			console.log("data == ", data);
			if (!this.packetListAsObj) {
				this.packetListAsObj = {}
			}

			this.packetList = data.map((packet: any) => {
				this.packetListAsObj[packet.id] = {
					name: packet.name,
					createAt: packet.createAt,
					id: packet.id,
					childLength: packet.cards?.length || 0
					// cardList: packet?.cards || [],
				}
				return { ...this.packetListAsObj[packet.id] }
			}) || [];
			this.subjectPacketList.next(this.packetList)
			this.subjectPacketListAsObj.next(this.packetListAsObj)
			console.log("this.packetList intialzeService == ", this.packetList);
			return data
		}))
	}

}


export interface Packet {
	name: String,
	createAt: number,
	id: number,
	cardList?: Array<Card>,
	childLength?: number,
}


export interface Card {
	question: String,
	answer: String,
	status: number,
	id: number,
	packetId: number,
	createAt: number,
}