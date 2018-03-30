import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { url_api } from '../../environments/environment';
import { LoginResponse } from '../interfaces/login-response';
import { Artiste } from '../interfaces/artiste';

@Injectable()
export class ArtistesService {

  constructor(private http: HttpClient) { }

  getArtistes() {
    return this.http.get<Artiste[]>(`${url_api}/artistes`);
  }

  deleteArtiste(id) {
    const accessToken = localStorage.getItem('accessToken');
    return this.http.delete(`${url_api}/artistes/${id}?access_token=${accessToken}`);
  }

  ajouterArtiste(nom, style, description, photo, lien) {
    const accessToken = localStorage.getItem('accessToken');
    return this.http.post<Artiste>(`${url_api}/artistes?access_token=${accessToken}`, {
      nom: nom,
      styleMusical: style,
      description: description,
      photo: photo,
      lien: lien
    });
  }

  modifierArtiste(id, nom, style, description, photo, lien) {
    const accessToken = localStorage.getItem('accessToken');
    let json = {};
    if(nom) {
      json['nom'] = nom;
    }
    if(style) {
      json['styleMusical'] = style;
    }
    if(description) {
      json['description'] = description;
    }
    if(photo) {
      json['photo'] = photo;
    }
    if(lien) {
      json['lien'] = lien;
    }
    return this.http.patch<Artiste>(`${url_api}/artistes/${id}?access_token=${accessToken}`, json);
  }

}
