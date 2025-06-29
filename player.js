export class Life {
  constructor(name) {
    this.name = name;
  }
}

export class Player extends Life {
  constructor(){
    super("小明");
  }
}

export class Enemy extends Life {
  constructor(name, ){
    super(name);
  }
}
