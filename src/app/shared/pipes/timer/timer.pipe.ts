import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timer'
})
export class TimerPipe implements PipeTransform {

  transform(startTime: Date, answerDate: Date): number {
    const currentTime = new Date();
    const elapsedMilliseconds = currentTime.getTime() - startTime.getTime();
    const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
    return elapsedSeconds;
  }

}
