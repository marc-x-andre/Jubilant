import { NgModule } from '@angular/core';
import { MatCardModule, MatDialogModule, MatListModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SocketIoConfig, SocketIoModule } from 'ng-socket-io';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { ChatComponent } from './chat/chat.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PlayComponent } from './play/play.component';
import { ChatService } from './service/chat.service';
import { PlayService } from './service/play.service';
import { StatsService } from './service/stats.service';
import { UserService } from './service/user.service';
import { ChatComponent } from './chat/chat.component';
import {HttpClientModule} from '@angular/common/http';

const config: SocketIoConfig = { url: 'http://10.10.73.244:5000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    HomeComponent,
    PlayComponent,
    ChatComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatListModule,
    MatDialogModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    HttpClientModule
  ],
  entryComponents: [],
  providers: [StatsService, UserService, PlayService, ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
