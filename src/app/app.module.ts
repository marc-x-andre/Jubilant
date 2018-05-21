import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule, MatDialogModule, MatListModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SocketIoConfig, SocketIoModule } from 'ng-socket-io';
import { ToastrModule } from 'ngx-toastr';
import { environment } from '../environments/environment.prod';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { AppStore } from './app.store';
import { ChatComponent } from './chat/chat.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PlayComponent } from './play/play.component';
import { AuthGuard } from './service/auth.service';
import { PlayService } from './service/play.service';
import { SocketService } from './service/socket.service';
import { UserService } from './service/user.service';

const config: SocketIoConfig = { url: environment.socket, options: {} };

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    PlayComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatListModule,
    MatDialogModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule
  ],
  entryComponents: [],
  providers: [SocketService, UserService, PlayService, AuthGuard, AppStore],
  bootstrap: [AppComponent]
})
export class AppModule { }
