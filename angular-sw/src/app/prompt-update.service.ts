import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Injectable()
export class PromptUpdateService {

  constructor(updates: SwUpdate) {
    updates.available.subscribe(event => {
      if (confirm("Do you wan to update application?")) {
        // updates.activateUpdate().then(() => document.location.reload());
        updates.activateUpdate().then(() => {
          alert("check console");
          console.log("going to reload tab");
          document.location.reload()
        });
      }
    });
  }
}