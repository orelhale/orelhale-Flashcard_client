import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { Card, Packet, PacketService } from 'src/app/services/packet.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-card-config',
  templateUrl: './card-config.component.html',
  styleUrls: ['./card-config.component.scss']
})
export class CardConfigComponent {

  packet: Packet;
  fildInput: FormGroup<any>;
  filds = ["question", "answer"]
  card: any;

  constructor(
    private formBuilder: FormBuilder,
    private packetService: PacketService,
    private cardService: CardService,
    @Inject(MAT_DIALOG_DATA) private dialogData: { card: any, packet: Packet },
    private matDialog: MatDialog
  ) { }

  ngOnInit() {
    console.log("dialogData == ", this.dialogData);
    this.card = this.dialogData.card
    this.packet = this.dialogData.packet

    if (!this.packet) {
      alert("packet is missung")
      return this.clossPopup()
    }

    this.fildInput = this.formBuilder.group({
      question: [(this.card && this.card['question']) || "", Validators.required],
      answer: [(this.card && this.card['answer']) || ""],
      // answer: [obj['answer'] || "", Validators.required]
    })
  }


  onSubmit(event: Event) {
    // event.preventDefault()
    if (!this.fildInput.valid) {
      console.log("this.fildInput.valid == ", this.fildInput.valid);
      console.log("this.fildInput.valid == ", this.fildInput);
      return
    }
    let obj = { ...this.fildInput.value }

    if (this.card) {
      this.updateCard(obj)
    } else {
      this.craeteCard(obj)
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

  craeteCard(obj: any) {
    obj.packetId = this.packet.id
    console.log(this.packet);
    
    if (this.packet.cardList) {
      this.packet.cardList?.splice(0, 0, obj)
    } else {
      this.packet.cardList = [obj]
    }

    this.packet.childLength = this.packet.cardList.length

    this.cardService.createCard(obj).subscribe(
      (newData: any) => {
        obj.id = newData.id
        obj.createAt = newData.createAt
        this.clossPopup()
      },
      () => {
        this.packet.cardList!.splice(0, 1)
        this.packet.childLength = this.packet.cardList?.length
      }
    )
  }

  updateCard(obj: any) {
    let tempCard = { ...this.card }
    this.card.question = obj.question
    this.card.answer = obj.answer

    this.cardService.updateCard(obj, this.card.id).subscribe(
      () => this.clossPopup(),
      (err) => {
        this.card.question = tempCard.question
        this.card.answer = tempCard.answer
      }
    )
  }


}
