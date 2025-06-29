export class Life {
  constructor(name, hp, mp) {
    this.name = name;
    this.hp = hp;
    this.mp = mp;
  }
}

export class Player extends Life {
  constructor(){
    super('Xiaoming', 100, 100);
  }
}
