import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  

@Injectable({
  providedIn: 'root'
})
export class SpeechApiService {
  textToSpeak: string = '';
  apiUrl: string = 'https://ld2xonb6tb.execute-api.ap-southeast-2.amazonaws.com/default/mypolly';
  audioSrc: string = '';

  constructor(private http: HttpClient) { }

  speakText() {
    const textParam = encodeURIComponent(this.textToSpeak);
    const fullApiUrl = `${this.apiUrl}?text=${textParam}`;

    // Update the audio source
    this.audioSrc = fullApiUrl;

    // Make an HTTP GET request to the API (if necessary)
    this.http.get(fullApiUrl).subscribe((response) => {
      // Handle the response from the API as needed
      console.log('API Response:', response);
    });

    this.http.get(fullApiUrl).subscribe((response) => {
      console.log('API Response:', response);
    
      // Update the audio source
      this.audioSrc = fullApiUrl;
    });
    
  }
}
