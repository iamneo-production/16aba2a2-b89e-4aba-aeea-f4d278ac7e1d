import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-attribute',
  template: `
    <div class="flex flex-column">
      <h5>
        {{ key }}
        <small class="text-muted">{{ val }}</small>
      </h5>
    </div>
  `,
})
export class AttributeComponent {
  @Input() key: string;
  @Input() val: string;
}
