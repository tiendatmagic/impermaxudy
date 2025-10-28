import { Component } from '@angular/core';
import { Web3Service } from '../../services/web3.service';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-history',
  standalone: false,
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent {
  chooseTab: number = 1;
  account: string = '';
  data: any = [];

  constructor(private web3Service: Web3Service, private appService: AppService) {
    this.web3Service.account$.subscribe((data: any) => {
      this.account = data;
      if (this.account) {
        this.getHistory();
      }
    })
  }

  getHistory() {
    this.appService.getAllHistory(this.account, this.web3Service.selectedChainId).subscribe((data: any) => {
      this.data = data;
    })
  }

}
