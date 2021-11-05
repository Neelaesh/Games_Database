import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/models/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

  gameRating  = 0;
  gameId!  : string;
  game = {} as Game
  routeSub!: Subscription;
  gameSub!: Subscription;

  constructor(private activatedRoute  : ActivatedRoute,
    private httpService : HttpService) { 
      this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
        this.gameId = params['id'];
        console.log("ID ",this.gameId);
      });
      this.getGameDetails(this.gameId);
    }

  ngOnInit(): void {
  }

  getGameDetails(id : string){
    this.gameSub  = this.httpService.getGameDetails(id)
    .subscribe((gameResp  : Game)=>{
      this.game = gameResp;
      setTimeout(()=>{
        this.gameRating = gameResp.metacritic;
      },1000);
    });
  }

  getColor(value: number):string{
    if(value  >= 75){
      return "#5ee432";
    }
    else if(value >= 50){
      return "#fffa450";
    }
    else if(value >= 30){
      return "#f7aa38";
    }
    else{
      return "#ef4655";
    }
  }

  ngOnDestroy(){
    if(this.routeSub){
      this.routeSub.unsubscribe();
    }
    if(this.gameSub){
      this.gameSub.unsubscribe();
    }
  }

}
