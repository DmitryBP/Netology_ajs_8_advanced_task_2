export default class Settings {
  constructor() {
    this.defaultSettings = new Map([
      ["theme", "dark"],
      ["music", "trance"],
      ["difficulty", "easy"],
    ]);

    this.userSettings = new Map();
    this.allSettings = {
      theme: ["light", "gray"],
      music: ["pop", "rock", "chillout", "off"],
      difficulty: ["normal", "hard", "nightmare"],
    };
  }

  changeSettings(title, value) {
    if (!this.allSettings[title].includes(value)) {
      throw new Error(`Не допустимое значение для настройки ${title}`);
    }
    this.userSettings.set(title, value);
  }

  get settings() {
    this.resSettings = new Map(this.defaultSettings);
    this.userSettings.forEach((value, key) => {
      this.resSettings.set(key, value)
    })
    return this.resSettings;
  }
}
