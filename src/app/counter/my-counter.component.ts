import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as counterActions from './counter.actions';

@Component({
  selector: 'app-my-counter',
  templateUrl: './my-counter.component.html',
  styleUrls: ['./my-counter.component.css']
})
export class MyCounterComponent implements OnInit {
  count$: Observable<number>
  
  
  constructor(private store: Store<{ count: number }>) {
    this.count$ = store.select('count');
  }
 
  increment() {
    this.store.dispatch(counterActions.increment());
  }
 
  decrement() {
    this.store.dispatch(counterActions.decrement());
  }
 
  reset() {
    this.store.dispatch(counterActions.reset());
  }

  ngOnInit(): void {
  }

}
