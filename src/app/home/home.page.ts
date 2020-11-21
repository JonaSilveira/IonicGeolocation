import { Component, OnInit } from '@angular/core';
import { Feature, MapboxService } from './mapbox.service';  
import * as mapboxgl from 'mapbox-gl'; 
import {environment} from '../../environments/environment' 
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = -22.815831
  lng = -43.3858357 
  constructor(private mapBoxService: MapboxService) {} 
  ngOnInit(){ 
    (mapboxgl as any).accessToken = environment.mapbox.accessTolken;
    this.map  = new mapboxgl.Map({
      container:'map',
      style:this.style,
      zoom: 15, 
      center:[this.lng, this.lat], 
    })
    var geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
      enableHighAccuracy: true
      },
      trackUserLocation: true
      });
    this.map.addControl(new mapboxgl.NavigationControl())
    this.map.addControl(geolocate)
  }

  addresses: Feature[];
  selectedAddress = null;
  displayMap(){
    (mapboxgl as any).accessToken = environment.mapbox.accessTolken;
    this.map  = new mapboxgl.Map({
      container:'map',
      style:this.style,
      zoom: 10,
      center:[this.lng, this.lat], 
    })
    var geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
      enableHighAccuracy: true
      },
      trackUserLocation: true
      });
    this.map.addControl(new mapboxgl.NavigationControl())
  }
  search(event: any) {
    const searchTerm = event.target.value.toLowerCase(); 
    if (searchTerm && searchTerm.length > 0) { 
      this.mapBoxService
        .search_word(searchTerm)
        .subscribe(data => this.addresses = data.features);
        console.log(this.addresses)
      } else {
        this.addresses = [];
      }
  }

  onSelect(address) {
    this.setLagLong(address.center)
    this.selectedAddress = address;
    this.addresses = [];
  }

  
  setLagLong(ll: number[]){
    console.log(ll)
    this.lat = ll[1]
    this.lng = ll[0]
    this.displayMap()
  }


}
