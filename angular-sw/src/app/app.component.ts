import { Component } from '@angular/core';
import { LogUpdateService } from './log-update.service';
import { CheckForUpdateService } from './check-for-update.service';
import { PromptUpdateService } from './prompt-update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-sw';

  constructor(private log: LogUpdateService,
    private check: CheckForUpdateService,
    private prompt: PromptUpdateService) {}
}
