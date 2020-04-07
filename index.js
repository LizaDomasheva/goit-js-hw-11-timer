class CountdownTimer {
  constructor({
    selector,
    targetDate
  }) {
    this.selector = document.querySelector(`${selector}`);
    this.targetDate = targetDate;
    this.daysSpan = this.selector.querySelector('[data-value="days"]');
    this.hoursSpan = this.selector.querySelector('[data-value="hours"]');
    this.minutesSpan = this.selector.querySelector('[data-value="mins"]');
    this.secondsSpan = this.selector.querySelector('[data-value="secs"]');
    this.deltaTimeInterval();
    this.firstTime();
  }

  deltaTimeInterval() {
    const timerId = setInterval(() => {
      const deltaTime = this.targetDate.getTime() - Date.now();

      if (deltaTime < 0) {
        clearInterval(timerId);
        return;
      }
      this.updateClockface(deltaTime);
    }, 1000);
  }

  updateClockface(deltaTime) {
    const days = this.pad(Math.floor(deltaTime / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((deltaTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(
      Math.floor((deltaTime % (1000 * 60 * 60)) / (1000 * 60)),
    );
    const secs = this.pad(Math.floor((deltaTime % (1000 * 60)) / 1000));

    this.showClock(days, hours, mins, secs);
  }

  showClock(days, hours, mins, secs) {
    this.daysSpan.textContent = `${days}`;
    this.hoursSpan.textContent = `${hours}`;
    this.minutesSpan.textContent = `${mins}`;
    this.secondsSpan.textContent = `${secs}`;
  }

  firstTime() {
    const deltaTime = this.targetDate.getTime() - Date.now();
    if (deltaTime < 0) {
      this.showClock('00', '00', '00', '00');
      return;
    }
    this.updateClockface(deltaTime);
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }
}

const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Aug 26, 2020'),
});