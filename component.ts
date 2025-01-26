import { Component, VERSION, HostListener } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isDragging = false;
  startX = 0;
  currentX = 0; // Slider'ın mevcut pozisyonu
  thumbWidth = 120; // Slider'ın genişliği
  containerWidth = 300; // Slider alanının genişliği

  onStartDrag(event: MouseEvent | TouchEvent): void {
    event.preventDefault();
    this.isDragging = true;
    this.startX = 'touches' in event ? event.touches[0].clientX : event.clientX;
  }

  @HostListener('document:mousemove', ['$event'])
  @HostListener('document:touchmove', ['$event'])
  onDrag(event: MouseEvent | TouchEvent): void {
    if (!this.isDragging) return;

    const clientX =
      'touches' in event ? event.touches[0].clientX : event.clientX;
    this.currentX = Math.min(
      Math.max(clientX - this.startX, 0),
      this.containerWidth - this.thumbWidth
    );
  }

  @HostListener('document:mouseup')
  @HostListener('document:touchend')
  onStopDrag(): void {
    if (
      this.isDragging &&
      this.currentX >= this.containerWidth - this.thumbWidth
    ) {
      alert('Unlocked!');
    }
    this.isDragging = false;
    this.currentX = 0;
  }

  getThumbStyle() {
    return {
      transform: `translateX(${this.currentX}px)`,
    };
  }
}
