///<reference path="../../../../node_modules/@types/googlemaps/index.d.ts"/>

import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ElementRef, ViewChild, Renderer2 } from '@angular/core';

declare var google: any; // Declarar 'google' para evitar errores de TypeScript


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit, AfterViewInit {

  @ViewChild('divMap') divMap!: ElementRef;
  @ViewChild('inputPlaces') inputPlaces!: ElementRef;
  @ViewChild('inputCiudad') inputCiudad!: ElementRef;
  @ViewChild('inputProvincia') inputProvincia!: ElementRef;
  @ViewChild('inputRegion') inputRegion!: ElementRef;

  mapa!: google.maps.Map;
  markers: google.maps.Marker[];
  distancia!: string;
  formMapas!: FormGroup;

  constructor(private renderer: Renderer2) {
    this.markers = [];

    this.formMapas = new FormGroup({
      busqueda: new FormControl(''),
      direccion: new FormControl(''),
      referencia: new FormControl(''),
      ciudad: new FormControl(''),
      provincia: new FormControl(''),
      region: new FormControl('')
    });
  }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.loadGoogleMapsScript(() => {
      const cundinamarcaCoords = { lat: 4.867, lng: -74.05 }; // Coordenadas aproximadas de Cundinamarca
      this.cargarMapa(cundinamarcaCoords);
      this.cargarAutocomplete();
      this.cargarAutocompleteCiudades(this.inputCiudad.nativeElement, 'locality');
      this.cargarAutocompleteCiudades(this.inputProvincia.nativeElement, 'administrative_area_level_2');
      this.cargarAutocompleteCiudades(this.inputRegion.nativeElement, 'administrative_area_level_1');
    });
  }

  loadGoogleMapsScript(callback: () => void) {
    if (typeof document !== 'undefined') {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDTCCpzjRTfFRh-5VVW1La3I-lH-J-7qYU
&libraries=places,directions&callback=initializeMap`;
      script.async = true;
      script.defer = true;
      script.onload = callback;
      document.body.appendChild(script);
    }
  }

  onSubmit() {
    console.log("Datos del formulario: ", this.formMapas.value);
    this.buscarDireccion();
  }

  private cargarAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(this.renderer.selectRootElement(this.inputPlaces.nativeElement), {
      componentRestrictions: {
        country: ["CO"]
      },
      fields: ["address_components", "geometry", "place_id"],
      types: ["address"],
    });

    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place: any = autocomplete.getPlace();
      console.log("El place completo es:", place);

      this.mapa.setCenter(place.geometry.location);
      const marker = new google.maps.Marker({
        position: place.geometry.location
      });

      marker.setMap(this.mapa);
      this.llenarFormulario(place);
    });
  }

  private cargarAutocompleteCiudades(element: any, type: string) {
    const autocomplete = new google.maps.places.Autocomplete(element, {
      componentRestrictions: {
        country: ["CO"]
      },
      fields: ["address_components", "geometry", "place_id"],
      types: [type],
    });

    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place: any = autocomplete.getPlace();
      console.log(`El place completo para ${type} es:`, place);
      this.llenarFormulario(place);
    });
  }

  llenarFormulario(place: any) {
    console.log(place);
    const addressNameFormat: any = {
      'street_number': 'short_name',
      'route': 'long_name',
      'administrative_area_level_1': 'short_name',
      'administrative_area_level_2': 'short_name',
      'administrative_area_level_3': 'short_name',
      'country': 'long_name',
    };

    const getAddressComp = (type: any) => {
      for (const component of place.address_components) {
        if (component.types[0] === type) {
          return component[addressNameFormat[type]];
        }
      }
      return ' ';
    };

    const componentForm = {
      direccion: 'route',
      ciudad: "locality",
      provincia: 'administrative_area_level_2',
      region: 'administrative_area_level_1'
    };

    Object.entries(componentForm).forEach(entry => {
      const [key, value] = entry;
      this.formMapas.controls[key].setValue(getAddressComp(value));
    });

    this.formMapas.controls['direccion'].setValue(getAddressComp('route') + ' ' + getAddressComp('street_number'));
  }

  cargarMapa(coords: any): void {
    const opciones = {
      center: new google.maps.LatLng(4.6031, -74.2144), // Coordenadas del Bosque de Cundinamarca
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
  
    this.mapa = new google.maps.Map(this.renderer.selectRootElement(this.divMap.nativeElement), opciones);
  
    const markerPosition
    = new google.maps.Marker({
      position: this.mapa.getCenter(),
      title: "Ubicación inicial",
    });
  
    markerPosition.setMap(this.mapa);
    this.markers.push(markerPosition);
  
    google.maps.event.addListener(this.mapa, 'click', (evento: google.maps.MapMouseEvent) => {
      const marker = new google.maps.Marker({
        position: evento.latLng,
        animation: google.maps.Animation.DROP,
      });
      marker.setDraggable(true);
      marker.setMap(this.mapa);
  
      google.maps.event.addListener(marker, 'click', (event: google.maps.MouseEvent) => {
        marker.setMap(null);
      });
    });
  }
  

  buscarDireccion() {
    const direccion = this.formMapas.value.direccion + ', ' + this.formMapas.value.ciudad + ', ' + this.formMapas.value.provincia + ', ' + this.formMapas.value.region;
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ address: direccion }, (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
      if (status === 'OK' && results[0]) {
        this.mapa.setCenter(results[0].geometry.location);
        const marker = new google.maps.Marker({
          map: this.mapa,
          position: results[0].geometry.location
        });
        this.markers.push(marker);
      } else {
        console.error('Geocode was not successful for the following reason: ' + status);
      }
    });
    
  }

}
