export class Life {
  constructor(name) {
    this.name = name;
  }
}

export class Player extends Life {
  constructor(name, knowledge, reflex, thinking, stamina){
    super("小明");
    this.knowledge = knowledge;
    this.reflex = reflex;
    this.thinking = thinking;
    this.stamina = stamina;
  }
}

export class Enemy extends Life {
  constructor(name, difficulty, limit, skill, content){
    super(name);
    this.difficulty = difficulty;
    this.limit = limit;
    this.skill = skill;
    this.content = content;
  }
}
