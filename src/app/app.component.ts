import {Component} from '@angular/core';
import {DirectiveComponent} from './directive/directive.component';

@Component({
  selector: 'app-root',
  imports: [
    DirectiveComponent
  ],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'nested-reorder';
}
