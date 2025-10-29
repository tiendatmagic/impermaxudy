import { Component } from '@angular/core';
import { AppService } from '../../services/app.service';
import { Web3Service } from '../../services/web3.service';


@Component({
  selector: 'app-admin',
  standalone: false,
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  chooseTab = 1;
  addHistory = { address: '', amount: '', chainId: '0x1' };
  addReward = { address: '', amount: '', chainId: '0x1' };
  isDisabled: boolean = false;
  getAddress: string = ''
  constructor(private appService: AppService, private web3Service: Web3Service) {
    this.web3Service.account$.subscribe((data: any) => {
      this.getAddress = data;
    })
  }

  save() {
    if (this.isDisabled) return;
    this.isDisabled = true;
    let data;
    if (this.chooseTab === 1) {
      data = { tab: 'addHistory', ...this.addHistory, addressAdmin: this.getAddress };
    } else {
      data = { tab: 'addReward', ...this.addReward, addressAdmin: this.getAddress };
    }

    if (!data.address || !data.amount || !data.chainId) {
      this.web3Service.showModal('Error', 'Invalid input', 'error');
      return;
    }

    this.appService.postAdmin(data).subscribe((data: any) => {
      this.web3Service.showModal('Success', 'Create success', 'success');
      this.isDisabled = false;
    },
      (error: any) => {
        this.web3Service.showModal('Error', error.error.message, 'error');
        this.isDisabled = false;
      }
    );
  }
}
