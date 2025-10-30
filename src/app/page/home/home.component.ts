import { Component } from '@angular/core';
import { Web3Service } from '../../services/web3.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { WelcomeModalComponent } from '../../modal/welcome-modal/welcome-modal.component';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  isConnected: boolean = false;
  constructor(private web3Service: Web3Service, private route: Router, private matDialog: MatDialog) {
    this.web3Service.isConnected$.subscribe((data: any) => {
      this.isConnected = data;
    })
  }
  ngOnInit() {

  }

  connectWallet() {
    this.route.navigate(['account']);
    this.web3Service.connectWallet();
  }


  openWelcomeModal() {
    this.matDialog.open(WelcomeModalComponent,
      {
        width: '400px',
        height: 'auto',
      }
    );
  }

}
