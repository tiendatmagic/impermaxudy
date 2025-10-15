import { Component } from '@angular/core';

@Component({
  selector: 'app-reward-history',
  standalone: false,
  templateUrl: './reward-history.component.html',
  styleUrl: './reward-history.component.scss'
})
export class RewardHistoryComponent {
  chooseTab: number = 1;
}
