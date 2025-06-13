// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
// import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver'

const STORAGE_KEY = 'favoriteEvents';

/*
  Generated class for the FavoritesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FavoritesProvider {

  constructor(private storage: Storage) {
    console.log('Hello FavoritesProvider Provider');
  }


  getAllFavorites() {
    return this.storage.get(STORAGE_KEY);
  }

  addFavorite(item: any) {
    return this.storage.get(STORAGE_KEY).then((favorites: { [key: number]: any }) => {
      if (!favorites) {
        favorites = {};
      }
      favorites[item.id] = item;
      return this.storage.set(STORAGE_KEY, favorites);
    });
  }

  removeFavorite(item: any) {
    return this.storage.get(STORAGE_KEY).then((favorites: { [key: number]: any }) => {
      if (favorites && favorites[item.id]) {
        delete favorites[item.id];
        return this.storage.set(STORAGE_KEY, favorites);
      }
      return null;
    });
  }

  isFavorite(item: any) {
    return this.storage.get(STORAGE_KEY).then((favorites: { [key: number]: any }) => {      
      return !!(favorites && favorites[item.id]);
    });
  }

  clearFavorites() {
    return this.storage.remove(STORAGE_KEY).then(() => {
      console.log('Favorites cleared');
    }).catch(error => {
      console.error('Error clearing favorites', error);
    });
  }

  getFavoriteCount() {
    return this.storage.get(STORAGE_KEY).then((favorites: { [key: number]: any }) => {
      if (favorites) {
        return Object.keys(favorites).length;
      }
      return 0;
    });
  }

  getFavoriteById(id: number) {
    return this.storage.get(STORAGE_KEY).then((favorites: { [key: number]: any }) => {
      if (favorites && favorites[id]) {
        return favorites[id];
      }
      return null;
    });
  }
}
