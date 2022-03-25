import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-container',
  template: `
    <div class="container py-3" [id]="containerId">
      <ng-content></ng-content>
    </div>
  `,
})
export class ContainerComponent {
  @Input() containerId: string;
}
