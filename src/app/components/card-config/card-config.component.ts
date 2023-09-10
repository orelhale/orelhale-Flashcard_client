import { Component, Inject } from '@angular/core';
import { Packet } from 'src/app/services/packet.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-card-config',
  templateUrl: './card-config.component.html',
  styleUrls: ['./card-config.component.scss']
})
export class CardConfigComponent {

  packet: any;
  fildInput: FormGroup<any>;
  filds = ["question", "answer"]
  card: any;

  constructor(
    private formBuilder: FormBuilder,
    private cardService: CardService,
    @Inject(MAT_DIALOG_DATA) private dialogData: { card: any, packet: Packet },
    private matDialog: MatDialog
  ) { }

  
  ngOnInit() {
    this.card = this.dialogData.card
    this.packet = this.dialogData.packet
    console.log("this.packet == ", this.packet);

    if (!this.packet) {
      alert("packet is missung")
      return this.clossPopup()
    }

    this.fildInput = this.formBuilder.group({
      question: [(this.card && this.card['question']) || "Question ", Validators.required],
      answer: [(this.card && this.card['answer']) || "Answer "],
    })
  }


  onSubmit() {
    if (!this.fildInput.valid) {
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


  clickBackGroundPopup() {
    this.matDialog.closeAll()
  }


  stopPropagation(e: Event) {
    e.stopPropagation()
  }


  craeteCard(obj: any) {
    obj.packetId = this.packet.id
    let cardArr = this.packet.cards

    cardArr.splice(0, 0, obj)

    this.cardService.createCard(obj).subscribe(
      (newData: any) => {
        obj.id = newData.id
        obj.createAt = newData.createAt
        this.packet.childLength++;
        this.clossPopup()
      },
      () => cardArr.splice(0, 1))
  }


  updateCard(obj: any) {
    this.cardService.updateCard(obj, this.card).subscribe(() => this.clossPopup())
  }

}
