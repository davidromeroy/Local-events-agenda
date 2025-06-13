import { FavoritesProvider } from '../../providers/favorites/favorites';
import { Component,  ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { Geolocation } from '@ionic-native/geolocation';
import { SocialSharing } from '@ionic-native/social-sharing';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
// import { EmailComposer } from '@ionic-native/email-composer';
import * as moment from 'moment';

/**
 * Generated class for the PokemonDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google;

@IonicPage()
@Component({
  selector: 'page-local-event-details',
  templateUrl: 'local-event-details.html',
})
export class LocalEventDetailsPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  directionsService: any;
  directionsDisplay: any;

  event: any = null;
  isFavorite = false;
  mapUrl: any;
  videoHTML: SafeHtml;
  selectedExtraType: string = ''; // valores posibles: 'map', 'video'

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    // private emailComposer: EmailComposer,
    private favoritesProvider: FavoritesProvider,
    private sanitizer: DomSanitizer,
    // private geolocation: Geolocation,
    private socialSharing: SocialSharing
  ) {}

  async ionViewDidLoad() {
    try {
      this.event = this.navParams.get('event'); // Assuming the API returns an array, we take the first element
      try {
        const isFavorite: boolean = await this.favoritesProvider.isFavorite(this.event);
        this.event.isFavorite = isFavorite;
      } catch (err) {
        this.event.isFavorite = false;
        console.log('No se pudo determinar si es favorito, se asigna false:', err);
      }

      this.isFavorite = this.event.isFavorite;
      // Sanitiza el embed de YouTube si existe
      if (this.event.youtube) {
        this.videoHTML = this.sanitizer.bypassSecurityTrustHtml(this.event.youtube);
      } else {
        this.videoHTML = null;
      }
      // this.loadMapAndRoute();
    } catch (error) {
      console.error('Error al cargar detalles', error);
    }
  }

  // shareEventByEmail() {
  //   const email = {
  //     to: 'daroyane@espol.edu.ec',
  //     subject: 'I love this one: ' + this.event.title,
  //     body: 'Can you remember the opening?<br><br>\"' + this.event.title + '\"',
  //     isHtml: true
  //   };

  //   this.emailComposer.isAvailable().then((available: boolean) => {
  //     if (available) {
  //       console.log('✔️ EmailComposer está disponible');
  //     } else {
  //       console.warn('❌ EmailComposer NO está disponible');
  //     }
  //   }).catch(err => {
  //     console.error('❌ Error verificando EmailComposer:', err);
  //   });
  //   this.emailComposer.open(email);
  // }

  getDurationInMinutes(event: any): number {
    const start = moment(event.event_start, "DD/MM/YYYY h:mm a");
    const end = moment(event.event_end, "DD/MM/YYYY h:mm a");
    
    if (!start.isValid() || !end.isValid()) {
      console.warn("Fechas inválidas para evento:", event);
      return 0;
    }
    
    return end.diff(start, 'minutes');
  }
  
  shareEvent() {
    const title = this.event.title || 'Evento sin título';
    const description = this.event.description || '';
    const image = this.event.destacada[0] || null; // URL o base64
    const url = this.event.youtube || ''; // Si tienes una landing de evento

    this.socialSharing.share(description, title, image, url)
      .then(() => {
        console.log('Compartido exitosamente');
      })
      .catch((error) => {
        console.error('Error al compartir:', error);
      });
  }

  toggleFavorite(){
    this.favoritesProvider.isFavorite(this.event).then(isFav => {
      if (isFav) {
        this.favoritesProvider.removeFavorite(this.event).then(() => {
          this.event.isFavorite = false;
          this.isFavorite = false;
        });
      } else {
        this.favoritesProvider.addFavorite(this.event).then(() => {
          this.event.isFavorite = true;
          this.isFavorite = true;
        });
      };      
    }).catch(error => {
      console.error('Error toggling favorite', error);
    });
  }

  onSegmentChanged(value: string) {
    if (value === 'mapa') {
      setTimeout(() => this.loadMap(), 100);
    }
  }

  loadMap() {;
  /////////////////////
  const lat = this.event.latitude;
  const lng = this.event.longitude;
  const rawUrl = `https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
  
  this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(rawUrl);
  console.log(this.mapUrl)
  /////////////////////

  // if ( !this.event.latitude || !this.event.longitude) {
  //   console.error('No hay coordenadas válidas para mostrar el mapa.');
  //   return;
  // }

  // let latLng = new google.maps.LatLng(this.event.latitude, this.event.longitude);

  //   let mapOptions = {
  //     center: latLng,
  //     zoom: 15,
  //     mapTypeId: google.maps.MapTypeId.ROADMAP
  //   };

  //   this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

  //   let marker = new google.maps.Marker({
  //     map: this.map,
  //     position: latLng,
  //     title: 'Ubicación desde API'
  //   });
  //   console.log(marker);
  }

  // async loadMapAndRoute() {
  //   // Coordenadas del evento desde la API
  //   const eventLat = this.event.latitude;
  //   const eventLng = this.event.longitude;

  //   try {
  //     // Obtiene ubicación actual del usuario
  //     const position = await this.geolocation.getCurrentPosition();
  //     const currentLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  //     const eventLatLng = new google.maps.LatLng(eventLat, eventLng);

  //     // Inicializa el mapa
  //     const mapOptions = {
  //       center: currentLatLng,
  //       zoom: 14,
  //       mapTypeId: google.maps.MapTypeId.ROADMAP
  //     };

  //     this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

  //     // Inicializa servicios de direcciones
  //     this.directionsService = new google.maps.DirectionsService();
  //     this.directionsDisplay = new google.maps.DirectionsRenderer();
  //     this.directionsDisplay.setMap(this.map);

  //     // Solicita la ruta
  //     this.directionsService.route({
  //       origin: currentLatLng,
  //       destination: eventLatLng,
  //       travelMode: google.maps.TravelMode.DRIVING
  //     }, (result, status) => {
  //       if (status === google.maps.DirectionsStatus.OK) {
  //         this.directionsDisplay.setDirections(result);
  //       } else {
  //         console.error('No se pudo calcular la ruta:', status);
  //       }
  //     });

  //   } catch (err) {
  //     console.error('Error obteniendo ubicación:', err);
  //   }
  // }

}
