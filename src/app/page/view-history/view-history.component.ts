import { Component } from '@angular/core';
import { Web3Service } from '../../services/web3.service';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-view-history',
  standalone: false,
  templateUrl: './view-history.component.html',
  styleUrl: './view-history.component.scss'
})
export class ViewHistoryComponent {
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

  ngOnInit() {

  }

  getHistory() {
    this.appService.getHistory(this.account, this.web3Service.selectedChainId).subscribe((data: any) => {
      this.data = data.data;
    })
  }
}
