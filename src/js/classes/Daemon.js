import Character from "./Character";

export default class Deamon extends Character {
  constructor(name) {
    super(name, 'Deamon');
    this.attack = 10;
    this.defence = 40;
  }
}