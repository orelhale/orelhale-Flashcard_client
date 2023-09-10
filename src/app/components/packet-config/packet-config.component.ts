import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject } from '@angular/core';
import { Packet, PacketService } from 'src/app/services/packet.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-packet-config',
  templateUrl: './packet-config.component.html',
  styleUrls: ['./packet-config.component.scss'],
})
export class PacketConfigComponent {

  formConfig: FormGroup<any>;
  packet?: Packet;


  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private formBuilder: FormBuilder,
    private packetService: PacketService,
    private matDialog: MatDialog,
  ) { }


  ngOnInit() {
    console.log("packet-config data == ", this.data);

    this.packet = this.data.packet

    this.formConfig = this.formBuilder.group({
      name: [this.packet?.name || 'Packet ', Validators.required]
    })
  }


  async onClick() {
    if (!this.formConfig.valid) {
      console.log("this.formConfig.controls.name.valid == ", this.formConfig.errors);
      return alert("There is error on filds")
    }

    let objPacket: any = {
      name: this.formConfig.value.name
    }

    if (this.packet) {
      this.updatePacket(objPacket)
    } else {
      this.createPacket(objPacket)
    }

  }


  clossPopup() {
    this.matDialog.closeAll()
  }


  clickBackGroundPopup(e: Event) {
    this.matDialog.closeAll()
  }


  stopPropagation(e: Event) {
    e.stopPropagation()
  }


  updatePacket(objPacket: any) {
    this.packetService.updatePacket(objPacket, this.packet!).subscribe(() => this.clossPopup())
  }


  createPacket(objPacket: any) {
    console.log("objPacket == ", objPacket);

    this.packetService.craetePacket(objPacket).subscribe(() => {

      this.clossPopup()
    })
  }
}
