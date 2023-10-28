import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(private http: HttpClient) { }


  ngOnInit(): void {
    const listElement = document.getElementById('list');
    const audioElement = document.getElementById('audio') as HTMLAudioElement;

    if (listElement && audioElement) {
      listElement.addEventListener('click', (e: Event) => {
        e.preventDefault();

        const elm = e.target as HTMLElement;

        const sourceElement = document.getElementById('audioSource') as HTMLSourceElement;
        const sourceValue = elm.getAttribute('data-value');

        if (sourceElement && sourceValue) {
          sourceElement.src = sourceValue;
          audioElement.load(); // call this to just preload the audio without playing
          audioElement.play(); // call this to play the song right away
        }
      });
    }

    const textMapping: { [key: string]: string } = {
      "spell_check_1": "environment",
      "spell_check_2": "garden"
    };

    document.addEventListener("DOMContentLoaded", () => {
      const buttons: NodeListOf<HTMLButtonElement> = document.querySelectorAll("button[data-value]");

        buttons.forEach((button: HTMLButtonElement) => {
            const textValue = button.getAttribute("data-value");
            if (textValue && textMapping[textValue]) {
                const mappedValue = textMapping[textValue];
                const url = `https://ld2xonb6tb.execute-api.ap-southeast-2.amazonaws.com/default/mypolly?text=${mappedValue}`;
                button.setAttribute("data-value", url);
            }
        });

        const checkButton = document.getElementById('checkButton');
        const inputField = document.getElementById('inputField') as HTMLInputElement;
        const resultElement = document.getElementById('result');

        if (checkButton && inputField && resultElement) {
            checkButton.addEventListener('click', () => {
                const inputValue = inputField.value.toLowerCase();
                if (textMapping['spell_check_1'] === inputValue || textMapping['spell_check_2'] === inputValue) {
                    resultElement.textContent = 'Spelling is correct';
                    inputField.classList.add('correct'); // Add the 'correct' class to the input field
                    checkButton.style.backgroundColor = '#33ca7f';
                } else {
                    resultElement.textContent = 'Spelling is wrong';
                    inputField.classList.remove('correct'); // Remove the 'correct' class from the input field
                    checkButton.style.backgroundColor = '#e71d36';
                }
            });
        }
    });


  }

}
