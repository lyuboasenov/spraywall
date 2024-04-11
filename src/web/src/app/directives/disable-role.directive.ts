import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[appDisableRole]'
})
export class DisableRoleDirective {

  @Input() disableForRole: string | undefined;

  constructor(private authService: AuthService,
    private renderer: Renderer2,
    public element: ElementRef) { }

  async ngAfterViewInit() {
    if (this.disableForRole && (!this.authService.user.value || this.authService.user.value.hasPermission(this.disableForRole))) {
      this.renderer.setStyle(this.element.nativeElement, 'pointer-events', 'none');
      this.renderer.setStyle(this.element.nativeElement, 'opacity', 0.4);
    }
  }
}
