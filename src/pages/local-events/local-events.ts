import { FavoritesProvider } from '../../providers/favorites/favorites';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

/**
 * Generated class for the LocalEventsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-local-events',
  templateUrl: 'local-events.html',
})
export class LocalEventsPage {

  events: any[] = [];
  filteredEvents: any[] = [];
  orderAsc: boolean = true;
  showFavorites: boolean = false;
  dateFrom: string; // ISO string del ion-datetime
  dateTo: string;
  selectedDuration: string = 'all'; // Valor inicial por defecto
  selectedDateFilter: string = 'all';
  selectedFilterType: string = ''; // 'rango', 'duracion', 'relativa'
  durationOptions = [
    { label: 'Todos', value: 'all' },
    { label: '<30 min', value: 'short' },
    { label: '30–60 min', value: 'medium' },
    { label: '>60 min', value: 'long' },
  ];

  dateOptions = [
    { label: 'Todos', value: 'all' },
    { label: 'Hoy', value: 'today' },
    { label: '+7 días', value: 'next7' },
    { label: 'Este mes', value: 'thisMonth' },
    { label: 'Próx. mes', value: 'nextMonth' },
    { label: 'Este año', value: 'thisYear' },
  ];
    
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public loadingCtrl: LoadingController,
    private http: HttpClient,
    private favoritesProvider: FavoritesProvider
    ) {
  }

  // Usando async/await
  async ionViewDidLoad() {
    this.loadLocalEvents();
  }

  async loadLocalEvents() {
    const loader = this.loadingCtrl.create({
      content: 'Cargando eventos...',
      spinner: 'crescent', // o 'bubbles', 'dots', etc.
    });    
    await loader.present();    
    try {
      const data: any = await this.http.get('http://localhost:8080/wordpress/wp-json/delportal/v1/events').toPromise();
      this.events = data;
      // Verificar si es favorito
      for (const event of this.events) {
        try  {
          const isFavorite: boolean = await this.favoritesProvider.isFavorite(event);
          event.isFavorite = isFavorite; 

         } catch (err) {
          event.isFavorite = false;
          console.error('No se pudo determinar si es favorito, se asigna false:', err);
        }
      }
    this.events.sort((a, b) => {
      const dateA = moment(a.event_start, 'DD/MM/YYYY h:mm a').toDate();
      const dateB = moment(b.event_start, 'DD/MM/YYYY h:mm a').toDate();
      return dateA.getTime() - dateB.getTime(); // ascendente
    });

    this.filteredEvents = [...this.events];
    loader.dismiss(); // 🔥 Importante: cerrar el loading al terminar

    } catch (err) {
      console.error('Error cargando eventos locales:', err);
      loader.dismiss(); // también cerrar en caso de error
    }
    finally {
      // 👇 Solo intenta dismiss si está aún activo
      try {
        await loader.dismiss();
      } catch (e) {
        console.warn('Loader ya estaba cerrado:', e);
      }
    }
  }

  selectDuration(val: string) {
    this.selectedDateFilter = 'all';
    this.showFavorites = false;
    this.filteredEventsByDuration(this.selectedDuration);
  }

  selectDate(val: string) {
    this.selectedDuration = 'all';
    this.showFavorites = false;
    this.selectedDateFilter = (this.selectedDateFilter === val) ? 'all' : val;
    this.filterUpcomingEventsByDate(this.selectedDateFilter);
  }

  sortByDate(order: 'asc' | 'desc') { 
    this.filteredEvents.sort((a, b) => {
      const dateA = moment(a.event_start, 'DD/MM/YYYY h:mm a').valueOf();
      const dateB = moment(b.event_start, 'DD/MM/YYYY h:mm a').valueOf();
      return order === 'asc' ? dateA - dateB : dateB - dateA;
    });
  }

  getDurationInMinutes(event: any): number {
    const start = moment(event.event_start, "DD/MM/YYYY h:mm a");
    const end = moment(event.event_end, "DD/MM/YYYY h:mm a");    
    if (!start.isValid() || !end.isValid()) {
      console.warn("Fechas inválidas para evento:", event);
      return 0;
    }
    return end.diff(start, 'minutes');
  } 

  filterByDateRange() {
    console.log(this.dateFrom);
    const startDate = moment(this.dateFrom, 'YYYY-MM-DD').startOf('day');
    const endDate = moment(this.dateTo, 'YYYY-MM-DD').endOf('day');
    console.log(startDate);
    this.filteredEvents = this.events.filter(event => {
      const eventDate = moment(event.event_start, 'DD/MM/YYYY h:mm a'); // incluye hora      console.log(event.title);
      console.log('API: ', event.event_start);
      console.log('MOMENT: ',eventDate);
      console.log(eventDate.isBetween(startDate, endDate, undefined, '[]'));
      return eventDate.isBetween(startDate, endDate, undefined, '[]'); // [] incluye los extremos
    });
    this.sortByDate(this.orderAsc ? 'asc' : 'desc');
  }

  filterByFavorites() {  
    this.showFavorites = !this.showFavorites;
    this.filteredEvents = this.showFavorites
      ? this.events.filter(event => event.isFavorite)
      : this.events;
    this.selectedDuration = 'all';
    this.selectedDateFilter = 'all';
  }

  filteredEventsByDuration(category: string) {
    this.filteredEvents = this.events.filter(e => {
      const duration = this.getDurationInMinutes(e);
      switch (category) {
        case 'short':
          return duration < 30;
        case 'medium':
          return duration >= 30 && duration <= 60;
        case 'long':
          return duration > 60;
        default:
          return true;
      }
    });
  }

  filterUpcomingEventsByDate(range: string) {
    const now = moment();
    this.filteredEvents = this.events.filter(event => {
      const eventDate = moment(event.event_start, 'DD/MM/YYYY h:mm a'); // Ajusta el formato según lo que recibes
      switch (range) {
        case 'today':
          console.log('hola')
          return eventDate.isSame(now, 'day');
        case 'next7':
          return eventDate.isBetween(now, moment().add(7, 'days'), undefined, '[]');
        case 'thisMonth':
          const startOfMonth = moment().startOf('month');
          const endOfMonth = moment().endOf('month');
          return eventDate.isBetween(startOfMonth, endOfMonth, undefined, '[]');
        case 'nextMonth':
          const startOfNextMonth = moment().add(1, 'month').startOf('month');
          const endOfNextMonth = moment().add(1, 'month').endOf('month');
          return eventDate.isBetween(startOfNextMonth, endOfNextMonth, undefined, '[]');
        case 'thisYear':
          return eventDate.isSame(now, 'year');
        default:
          return true;
      }
    });
  }

  applyDateFilter() {
    if (this.dateFrom && this.dateTo) {
      this.filterByDateRange();
    } else {
      this.filteredEvents = this.events;
      this.sortByDate(this.orderAsc ? 'asc' : 'desc');
      return this.filteredEvents;// mostrar todos si no hay filtro
    }
  }

  toggleSortOrder() {
    this.orderAsc = !this.orderAsc;
    const order = this.orderAsc ? 'asc' : 'desc';
    this.sortByDate(order);
  }

  openDetails(event) {
    this.navCtrl.push('LocalEventDetailsPage', { event: event });
  }

  cleanFields(){
    this.dateFrom= ""; 
    this.dateTo= "";
    this.showFavorites = false;
    this.filteredEvents = this.events;
    this.sortByDate(this.orderAsc ? 'asc' : 'desc');
    this.selectedDuration = 'all';
    this.selectedDateFilter = 'all';
    this.selectedFilterType = ''; // 'rango', 'duracion', 'relativa'

  }  
}