export default class Character {
  constructor(name, type) {
    const typeList = {
      Bowman: { attack: 25, defence: 25 },
      Swordsman: { attack: 40, defence: 10 },
      Magician: { attack: 10, defence: 40 },
      Undead: { attack: 25, defence: 25 },
      Zombie: { attack: 40, defence: 10 },
      Daemon: { attack: 10, defence: 40 },
    };

    if (name.length <= 2 || name.length >= 10) {
      throw new Error("Имя должно быть от 2 до 10 символов");
    }

    if (!Object.keys(typeList).includes(type)) {
      throw new Error("Недопустимый тип персонажа");
    }
    this.name = name;
    this.type = type;
    this.health = 100;
    this.level = 1;
    this.attack = typeList[type].attack
    this.defence = typeList[type].defence
  }

  levelUp() {
    if (this.health > 0) {
      this.level += 1;
      this.attack *= 1.2;
      this.defence *= 1.2;
      this.health = 100;
    } else {
      throw new Error("Нельзя повысить левел умершего");
    }
  }

  damage(points) {
    this.health = Math.max(0, this.health - points * (1 - this.defence / 100));
  }
}
