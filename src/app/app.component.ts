import { Component } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { WelcomeModalComponent } from './modal/welcome-modal/welcome-modal.component';
import { AppService } from './services/app.service';
import { Web3Service } from './services/web3.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular_web3';

  constructor(public translate: TranslateService, private matDialog: MatDialog, private appService: AppService, private web3Service: Web3Service) { }
  ngOnInit(): void {
    var lang = localStorage.getItem('event-ticket-lang');

    if (lang) {
      this.translate.use(lang);
    }
    else {
      this.translate.use('en');
    }

    initFlowbite();

    this.matDialog.open(WelcomeModalComponent,
      {
        width: '400px',
        height: 'auto',
      }
    );
  }
}
