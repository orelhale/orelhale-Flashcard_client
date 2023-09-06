import { Component, Input } from "@angular/core";


@Component({
   selector: 'zippy',
   template: `
      <style>
         .parent{
            box-sizing: border-box;
            display: inline-block;
            min-width: 100px;
            background: white;
         }
         .parent:hover{
            .drawer{
               display: block;
            }
            .arrow{
               transform:rotate(0deg);
            }
         }
         .zippy{
            padding: 10px 15px;
            border: 1px #f0f0f0 solid;
            // width: 300px;
         }
         .arrow{
            float: right;
            margin-left: 5px;
            transform:rotate(180deg);
         }
         .drawer{
            display: none;
            position: absolute;
            background-color: white;
            min-width: 100px;
            align-items: center;
            z-index: 1;
         } 
      </style>

      <div class="parent">
         <div class="zippy g-hover-g">
            <span>{{title}}</span>
            <span class="arrow">^</span>
         </div>
         <div class="drawer">
            <ng-content ></ng-content> 
         </div>
      </div>
      `
})
export class Zippy {
   @Input("title") title: string;
}