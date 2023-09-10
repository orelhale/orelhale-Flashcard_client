import { Component } from '@angular/core';
import { Packet, PacketService } from '../../services/packet.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { PacketConfigComponent } from '../packet-config/packet-config.component';

@Component({
  selector: 'app-packet',
  templateUrl: './packets.component.html',
  styleUrls: ['./packets.component.scss']
})
export class PacketsComponent {
  packetList: Packet[] = [];
  selectPacket?: Packet;
  typePage: string = "packet";
  tableData: Array<any> | any;
  tableTemplate: Array<object> = [{ title: "Name", key: "name" }, { title: "Card num", key: "childLength" }, { title: "", key: ":" }, { title: "$child", key: "" }]
  dialogConfig = new MatDialogConfig();

  constructor(
    private packetService: PacketService,
    private router: Router,
    private matDialog: MatDialog,
  ) { }



  ngOnInit() {
    this.packetService.getPackets().subscribe((data: any) => {
      this.packetList = data
      this.tableData = this.packetList

      console.log("packetList == ",this.packetList);
    })
  }


  navigator(param: any) {
    let path = param ? ["/packet", param] : ["/packet"]
    this.router.navigate(path)
  }


  async eventTavle(obj: { type: string, data: any }) {
    if (obj.type == "navigator") 
      return this.navigator(obj.data.id)
    
    if (obj.type == "edit") 
      return this.add(obj.data)

    if (obj.type == "delete") 
      return this.packetService.deletePacket(obj.data)
  }


  add(data?: any) {
    this.matDialog.open(PacketConfigComponent, { data: { packet: data } })
  }

}
