// import Character from "./Character";

export default class Team {
  constructor() {
    this.members = new Set();
  }
  add(member) {
    if (this.has(member)) {
      throw new Error("such cheracter already exists");
    } else {
      this.members.add(member);
    }
  }

  addAll(...members) {
    for (const member of members) {
      if (!this.has(member)) {
        this.members.add(member);
      }
    }
  }

  has(member) {
    return [...this.members].some((existingMember) => {
      return (
        existingMember.name === member.name &&
        existingMember.type === member.type
      );
    });
  }

  toArray() {
    return [...this.members];
  }
}
