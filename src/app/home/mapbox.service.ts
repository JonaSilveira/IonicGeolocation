import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment'

export interface MapBoxOutPut{
  attribution: string;
  features: Feature[];
  query: [];
}

export interface Feature{
  place_name:string
}

@Injectable({
  providedIn: 'root'
})
export class MapboxService {

  constructor(private http: HttpClient) { }

   search_word(query:string){
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=pk.eyJ1Ijoiam9uYXNmZWFub3IiLCJhIjoiY2toZmttanpmMDhiMTJ5bWNmcTg4bmJwaCJ9.Q9AEva7kU8U7hyZ9AL2lwQ`
    return this.http.get<MapBoxOutPut>(url).pipe(
      map(res=> res )
    )
  }

}
