import { Component } from '@angular/core';
import { Web3Service } from '../../services/web3.service';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-account',
  standalone: false,
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {
  chooseTab: number = 1;
  balanceUSDC: number = 0;
  amountETH: number = 0;
  amountUSDC: number = 0;
  totalAmount: number = 0;
  amountTimeout: any;
  getProfitTimeout: any;
  isAccount: boolean = false;
  account: string = '';
  priceETH: number = 0;
  constructor(private web3Service: Web3Service, private appService: AppService) {
    this.web3Service.balanceUSDC$.subscribe((data: any) => {
      this.balanceUSDC = data;
    })
    this.web3Service.account$.subscribe((data: any) => {
      this.isAccount = data ? true : false;
      this.account = data;
      if (this.isAccount) {
        this.amountETH = 0;
        this.getBalance();
        this.autoSave();
        this.getProfit();
        this.getProfitAPI();
        this.getPriceETH();
      }
    })

  }
  ngOnInit() {

  }

  ngOnDestroy() {
    clearTimeout(this.amountTimeout);
    clearTimeout(this.getProfitTimeout);
  }

  autoSave() {
    clearTimeout(this.amountTimeout);
    if (!this.isAccount) {
      return;
    }
    this.amountTimeout = setTimeout(() => {
      this.amountETH += 0.00001;
      this.totalAmount += 0.00001;
      this.amountUSDC = (this.amountETH * this.priceETH) + this.balanceUSDC;
      this.autoSave();
    }, 1000);
  }

  getProfit() {
    clearTimeout(this.getProfitTimeout);
    if (!this.isAccount) {
      return;
    }
    this.getProfitTimeout = setTimeout(() => {
      this.getProfitAPI();
      this.getPriceETH();
    }, 5000);
  }

  getProfitAPI() {
    this.appService.getProfit(this.account, this.web3Service.selectedChainId).subscribe((data: any) => {
      this.totalAmount = data.total_amount;
      this.amountETH = data.exchange_amount;
      this.getProfit();
    });
  }

  getPriceETH() {
    const cached = localStorage.getItem('priceETH');
    const now = new Date().getTime();

    if (cached) {
      const data = JSON.parse(cached);
      if (now - data.timestamp < 60000) {
        this.priceETH = data.price;
        this.amountUSDC = (this.amountETH * this.priceETH) + this.balanceUSDC;
        return;
      }
    }

    this.appService.getPriceETH().subscribe(
      (data: any) => {
        this.priceETH = data.ethereum.usd;
        this.amountUSDC = (this.amountETH * this.priceETH) + this.balanceUSDC;

        localStorage.setItem('priceETH', JSON.stringify({
          price: this.priceETH,
          timestamp: now
        }));
      }
    );
  }


  getBalance() {
    this.web3Service.getUsdcBalance();
  }
}
