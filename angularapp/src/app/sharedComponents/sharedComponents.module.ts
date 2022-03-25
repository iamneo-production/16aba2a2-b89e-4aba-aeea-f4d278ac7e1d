import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardComponent } from './card.component';
import { ContainerComponent } from './container.component';

@NgModule({
  declarations: [CardComponent, ContainerComponent],
  providers: [CommonModule],
  exports: [CardComponent, ContainerComponent],
})
export class SharedComponentsModule {}
