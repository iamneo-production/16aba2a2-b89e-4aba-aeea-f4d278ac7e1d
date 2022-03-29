import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AttributeComponent } from './attribute.component';
import { CardComponent } from './card.component';
import { ContainerComponent } from './container.component';

@NgModule({
  declarations: [CardComponent, ContainerComponent, AttributeComponent],
  providers: [CommonModule],
  exports: [CardComponent, ContainerComponent, AttributeComponent],
})
export class SharedComponentsModule {}
