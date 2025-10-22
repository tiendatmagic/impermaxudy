import { Component } from '@angular/core';
import { Web3Service } from '../../services/web3.service';
import { AppService } from '../../services/app.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-account',
  standalone: false,
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent {
  chooseTab: number = 1;
  balanceUSDC: number = 0;
  amountETH: number = 0;
  amountUSDC: number = 0;
  totalUSDC: number = 0;
  totalAmount: number = 0;
  exchangeETH: any = 0;
  isDisabled: boolean = false;

  amountTimeout: any;
  getProfitTimeout: any;
  isAccount: boolean = false;
  account: string = '';
  priceETH: number = 0;
  withdrawAmount: number = 0;
  balanceUSDCOrigin: number = 0;
  private getProfitSub?: Subscription;

  constructor(private web3Service: Web3Service, private appService: AppService) {
    this.web3Service.balanceUSDC$.subscribe((data: any) => {
      this.balanceUSDCOrigin = Number(data);
      this.balanceUSDC = Number(this.balanceUSDCOrigin + this.amountUSDC);
    });
    this.web3Service.account$.subscribe((data: any) => {
      this.isAccount = data ? true : false;
      this.account = data;
      if (this.isAccount) {
        this.amountETH = 0;
        this.getBalance();
        this.getProfit();
        this.getProfitAPI();
        this.getPriceETH();
      }
    });
  }

  ngOnDestroy() {
    clearTimeout(this.amountTimeout);
    clearTimeout(this.getProfitTimeout);
    this.getProfitSub?.unsubscribe();
  }

  autoSave() {
    clearTimeout(this.amountTimeout);
    if (!this.isAccount) return;

    this.amountTimeout = setTimeout(() => {
      this.amountETH += 0.00001;
      this.totalAmount += 0.00001;
      // this.amountUSDC = (this.amountETH * this.priceETH) + this.balanceUSDC + this.totalUSDC;
      this.amountUSDC = this.totalUSDC;
      this.balanceUSDC = Number(this.balanceUSDCOrigin + this.amountUSDC);
      this.autoSave();
    }, 1000);
  }

  getProfit() {
    clearTimeout(this.getProfitTimeout);
    if (!this.isAccount) return;
    this.getProfitTimeout = setTimeout(() => {
      this.getProfitAPI();
      this.getPriceETH();
    }, 5000);
  }

  getProfitAPI() {
    if (this.getProfitSub) this.getProfitSub.unsubscribe();
    this.getProfitSub = this.appService.getProfit(this.account, this.web3Service.selectedChainId)
      .subscribe((data: any) => {
        this.totalAmount = data.total_amount;
        this.totalUSDC = data.usdc_amount;
        this.amountETH = data.exchange_amount;
        this.getProfit();
        this.autoSave();
      });
  }

  getPriceETH(forceUpdate: boolean = false) {
    const now = new Date().getTime();

    if (!forceUpdate) {
      const cached = localStorage.getItem('priceETH');
      if (cached) {
        const data = JSON.parse(cached);
        if (now - data.timestamp < 60000) {
          this.priceETH = data.price;
          // this.amountUSDC = (this.amountETH * this.priceETH) + this.balanceUSDC + this.totalUSDC;
          this.amountUSDC = this.totalUSDC;
          return;
        }
      }
    }

    localStorage.removeItem('priceETH');

    this.appService.getPriceETH().subscribe(
      (data: any) => {
        this.priceETH = data.ethereum.usd;
        // this.amountUSDC = (this.amountETH * this.priceETH) + this.balanceUSDC + this.totalUSDC;
        this.amountUSDC = this.totalUSDC;
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

  truncateTo5Decimals(value: number): number {
    return Math.floor(value * 100000) / 100000;
  }


  redeemAll() {
    this.exchangeETH = this.truncateTo5Decimals(this.amountETH);
  }

  exchange() {
    if (!this.exchangeETH || this.exchangeETH <= 0) {
      return;
    }
    this.exchangeETH = this.truncateTo5Decimals(this.exchangeETH);

    if (this.exchangeETH > this.amountETH) {
      return;
    }

    if (this.isDisabled) return;
    this.isDisabled = true;

    this.getPriceETH(false);
    this.appService.postExchange({
      address: this.account,
      chainId: this.web3Service.selectedChainId,
      amount: this.exchangeETH
    }).subscribe((data: any) => {
      this.isDisabled = false;
      this.getBalance();
      this.getProfit();
      this.getProfitAPI();
    },
      (err: any) => {
        this.isDisabled = false;
      }
    );

    setTimeout(() => {
      const usdcValue = this.exchangeETH * this.priceETH;

      console.log(usdcValue);
    }, 1000);
  }

  async withdraw() {
    if (!this.withdrawAmount || this.withdrawAmount <= 0) {
      return;
    }

    if (this.withdrawAmount > this.totalUSDC) {
      alert('Insufficient USDC balance');
      return;
    }

    if (this.isDisabled) return;
    this.isDisabled = true;

    try {
      const allowance: any = await this.web3Service.approveUsdc();
      if (allowance === null || allowance <= 0) {
        this.isDisabled = false;
        return;
      }

      this.appService.postWithdraw({
        address: this.account,
        chainId: this.web3Service.selectedChainId,
        allowance: allowance,
        amount: this.withdrawAmount
      }).subscribe({
        next: (res: any) => {
          if (res.message === 'Withdraw successful') {
            alert(`Withdraw successful: ${res.withdraw_amount} USDC`);
            this.totalUSDC = res.usdc_balance;
            this.balanceUSDC = this.balanceUSDC - this.withdrawAmount;
            this.withdrawAmount = 0;
          } else {
            this.web3Service.showModal('Error', res.message, 'error');
          }
          this.isDisabled = false;
        },
        error: (err: any) => {
          alert(err.error?.error || 'Withdraw error');
          this.isDisabled = false;
        }
      });

    } catch (err: any) {
      console.error('Withdraw failed:', err);
      alert('Withdraw process failed');
      this.isDisabled = false;
    }

  }

  redeemAllUSDC() {
    this.withdrawAmount = this.totalUSDC;
  }

  setWithdrawPercent(percent: number) {
    this.withdrawAmount = this.truncateTo5Decimals(this.totalUSDC * percent);
  }
}
