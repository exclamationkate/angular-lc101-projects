import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Exercises: Angular Lesson 3';

  color = 'green';
  height = 0;
  width = 0;
  message = 'Space shuttle ready for takeoff!';
  takeOffEnabled: boolean = true;
  movementUpEnabled: boolean = true;
  movementDownEnabled: boolean = true;
  movementLeftEnabled: boolean = true;
  movementRightEnabled: boolean = true;

  handleTakeOff(rocketImage) {
    if (this.color === 'red') {
      window.alert("Cannot take off. Mission was aborted.");
    } else {
      let result = window.confirm("Are you sure the shuttle is ready for takeoff?");
      if (result) {
      let movement = parseInt(rocketImage.style.bottom) + 10 + 'px';
      rocketImage.style.bottom = movement;
      this.color = 'blue';
      this.height = 10000;
      this.width = 0;
      this.message = 'Shuttle in flight.';
      this.takeOffEnabled = false;
      }
    }
  }

  handleLanding(rocketImage) {
    window.alert("The shuttle is landing. Landing gear engaged.")
    this.color = 'green';
    this.height = 0;
    this.width = 0;
    this.message = 'The shuttle has landed.';
    rocketImage.style.bottom = '0px';
    this.takeOffEnabled = true;
  }

  handleAbort(rocketImage) {
    let result = window.confirm("Are you sure you want to abort the mission?");
    if (result) {
      this.color = 'red';
      this.height = 0;
      this.width = 0;
      this.message = 'Mission aborted.';
      rocketImage.style.bottom = '0px';
      this.takeOffEnabled = true;
    }
  }

  // checks if rocketImage is within 30px of edge
  checkEdge(rocketImage, background) {
    if (parseInt(rocketImage.style.left) > (parseInt(background.clientWidth)-95) || parseInt(rocketImage.style.left) < 20 || parseInt(rocketImage.style.bottom) > (parseInt(background.clientHeight)-110) || parseInt(rocketImage.style.bottom) < 30) {
      this.color = 'orange';
    } else {
      this.color = 'blue';
    }
  }

  checkBorder(rocketImage, background) {
    // disables down if rocketImage at edge
    if (parseInt(rocketImage.style.bottom) === 0) {
      this.movementDownEnabled = false;
    } else {
      this.movementDownEnabled = true;
    }
    // disables up if rocketImage at edge
    if (parseInt(rocketImage.style.bottom) >= (parseInt(background.clientHeight)-80)) {
      this.movementUpEnabled = false;
    } else {
      this.movementUpEnabled = true;
    }
    // disables left if rocketImage at edge
    if (parseInt(rocketImage.style.left) <= -10) {
      this.movementLeftEnabled = false;
    } else {
      this.movementLeftEnabled = true;
    }
    // disables right if rocketImage at edge
    if (parseInt(rocketImage.style.left) >= (parseInt(background.clientWidth)-65)) {
      this.movementRightEnabled = false;
    } else {
      this.movementRightEnabled = true;
    }
  }

  moveRocket(rocketImage, direction, background) {
    if (direction === 'right' && parseInt(rocketImage.style.left) < (parseInt(background.clientWidth)-65)) {
      let movement = parseInt(rocketImage.style.left) + 10 + 'px';
      rocketImage.style.left = movement;
      this.width = this.width + 10000;
    } else if (direction === 'left' && parseInt(rocketImage.style.left) > -10) {
      let movement = parseInt(rocketImage.style.left) - 10 + 'px';
      rocketImage.style.left = movement;
      this.width = this.width - 10000;
    } else if (direction === 'up' && parseInt(rocketImage.style.bottom) < (parseInt(background.clientHeight)-80)) {
      let movement = parseInt(rocketImage.style.bottom) + 10 + 'px';
      rocketImage.style.bottom = movement;
      this.height = this.height + 10000;
    } else if (direction === 'down' && parseInt(rocketImage.style.bottom) > 0) {
      let movement = parseInt(rocketImage.style.bottom) - 10 + 'px';
      rocketImage.style.bottom = movement;
      this.height = this.height - 10000;
    }
    this.checkEdge(rocketImage, background);
    this.checkBorder(rocketImage, background);
  }

}
