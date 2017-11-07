import {Injectable} from '@angular/core'

@Injectable()
export class ColorService {

  colors = [
    '#e67e22',
    '#d35400',
    '#f39c12',
    '#34495e',
    '#2980b9',
    '#16a085'
  ]

  constructor() {
  }

  getAllColors(): string[] {
    return this.colors
  }

  getColorFromName(name: string) {
    let colorIndex = 0
    for (let i = 0; i < name.length; i++) {
      colorIndex += name.charCodeAt(i)
    }
    colorIndex %= this.colors.length
    return this.colors[colorIndex]
  }

}
