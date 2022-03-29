import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <div class="card" style="width: 18rem; height: max-content" [id]="cardId">
      <img [src]="imgSrc" class="card-img-top" alt="poster url" />
      <div class="card-body d-flex flex-column align-items-center">
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class CardComponent {
  @Input() cardId: string;
  @Input() imgSrc: string;
}
