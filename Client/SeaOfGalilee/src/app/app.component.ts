import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { KineretComponent } from './Components/kineret/kineret.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, KineretComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SeaOfGalilee';
}
