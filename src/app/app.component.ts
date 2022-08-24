import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'voteaqui';

  abrirAmazon(): void {
    window.open('http://www.amazoninf.com.br', '_blank');
  }
}
