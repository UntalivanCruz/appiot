import { Component } from '@angular/core';
import { WebsocketService } from 'src/app/service/websocket.service';
import { Subject } from 'rxjs';

interface aws {
  AC1_ON: number,
  AC2_ON: number,
  CMD_OFF_AC1: number,
  CMD_OFF_AC2: number,
  CMD_ON_AC1: number,
  CMD_ON_AC2: number,
  DISPARO_AC1: number,
  DISPARO_AC2: number,
  fecha: number,
  id: number
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  destroyed = new Subject<void>();
  dataAWS:aws;

  constructor(private webSocketService: WebsocketService) { 
    this.dataAWS={
      AC1_ON: 0,
      AC2_ON: 0,
      CMD_OFF_AC1: 0,
      CMD_OFF_AC2: 0,
      CMD_ON_AC1: 0,
      CMD_ON_AC2: 0,
      DISPARO_AC1: 0,
      DISPARO_AC2: 0,
      fecha: 0,
      id: 0
    }
  }

  ngOnInit() {
    this.webSocketService.getData();
    this.webSocketService.webSocket.subscribe(data => {
      if (Array.isArray(data.Items)){
      this.dataAWS = data.Items[0]
      console.log(this.dataAWS)
      this.webSocketService.interval = setInterval(() => {
       this.webSocketService.getData();
      }, 4000);
    }
    })
  }

  ngOnDestroy() {
    this.webSocketService.destroySubscribe();
    this.destroyed.next();
    this.destroyed.complete();
  }
}
