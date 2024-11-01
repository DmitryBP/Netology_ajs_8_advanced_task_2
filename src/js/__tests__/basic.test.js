import Bowman from "../classes/Bowman";
import Character from "../classes/Character";
import ErrorRepository from "../classes/ErrorRepository";
import Phonecontrol from "../classes/Phonecontrol";
import Settings from "../classes/Settings";
import Team from "../classes/Team";
import Validator from "../classes/Validator";
import orderByProps from "../functions/orderByProps";
import showSpecialAttack from "../functions/showSpecialAttack";

describe("тесты персонажа", () => {
  test("Показатели должны изменяться правиль", () => {
    const hero = new Bowman("Dima");
    hero.levelUp();
    expect(hero.level).toBe(2);
    expect(hero.attack).toBe(25 * 1.2);
    expect(hero.defence).toBe(25 * 1.2);
    expect(hero.attack).toBe(25 * 1.2);
    expect(hero.health).toBe(100);
  });

  test("В имени должно быть больше 2-х знаков", () => {
    expect(() => new Character("D", "Bowman")).toThrow();
  });
  test("В имени должно не больше 10 знаков", () => {
    expect(() => new Character("Dimadimadim", "Bowman")).toThrow();
  });
  test("Тип героя должен соответствовать списку героев", () => {
    expect(() => new Character("Dima", "Bowman1")).toThrow();
  });
  test("Мертвому игроку нельзя повысить уровень", () => {
    expect(() => {
      const vasia = new Character("Vasia", "Bowman");
      vasia.health = 0;
      vasia.levelUp();
    }).toThrow();
  });
  test("Урон должен считается правильно", () => {
    const hero = new Bowman("Petr");
    hero.damage(10);
    expect(hero.health).toBe(92.5);
  });
  test("Значение здоровья при любом уроне не станет меньше нуля", () => {
    const vasia = new Character("Vasia", "Bowman");
    vasia.damage(200);
    expect(vasia.health).toBe(0);
  });
});

describe("Тесты функции сортировки массива", () => {
  test("функция должна сортировать объект правильно", () => {
    const obj = {
      name: "мечник",
      health: 10,
      level: 2,
      attack: 80,
      defence: 40,
    };
    expect(orderByProps(obj, ["name", "level"])).toEqual([
      { key: "name", value: "мечник" }, // порядок взят из массива с ключами
      { key: "level", value: 2 }, // порядок взят из массива с ключами
      { key: "attack", value: 80 }, // порядок по алфавиту (т.к. в массиве с ключами нет значения "attack")
      { key: "defence", value: 40 }, // порядок по алфавиту (т.к. в массиве с ключами нет значения "defence")
      { key: "health", value: 10 }, // порядок по алфавиту (т.к. в массиве с ключами нет значения "health")
    ]);
  });

  test("функция должна возращать массив специальных атак", () => {
    const obj = {
      name: "Лучник",
      type: "Bowman",
      health: 50,
      level: 3,
      attack: 40,
      defence: 10,
      special: [
        {
          id: 8,
          name: "Двойной выстрел",
          icon: "http://...",
          description: "Двойной выстрел наносит двойной урон",
        },
        {
          id: 9,
          name: "Нокаутирующий удар",
          icon: "http://...",
          // <- обратите внимание, описание "засекречено"
        },
      ],
    };

    expect(showSpecialAttack(obj)).toEqual([
      {
        id: 8,
        name: "Двойной выстрел",
        icon: "http://...",
        description: "Двойной выстрел наносит двойной урон",
      },
      {
        id: 9,
        name: "Нокаутирующий удар",
        icon: "http://...",
        description: "Описание недоступно",
      },
    ]);
  });
});

describe("Функция валидатор", () => {
  test("Допустимы только латинские буквы, символы тире -, подчёркивания _ и цифры (0-9)", () => {
    expect(Validator.validateUsername("di-m_7a")).toBe(true);
    expect(Validator.validateUsername("di@ma")).toBe(false);
    expect(Validator.validateUsername("Дima")).toBe(false);
  });
  test("Имя не должно содержать подряд более трёх цифр, а также начинаться и заканчиваться цифрами, символами подчёркивания или тире.", () => {
    expect(Validator.validateUsername("_dima")).toBe(false);
    expect(Validator.validateUsername("dima_")).toBe(false);
    expect(Validator.validateUsername("d1234ima")).toBe(false);
    expect(Validator.validateUsername("d123i_-m123a")).toBe(true);
  });
});

describe("Phones cleaner", () => {
  test("Номер должен приводиться к установленному формату", () => {
    expect(Phonecontrol.phoneClear("+7 960 000 00 00")).toBe("+79600000000");
    expect(Phonecontrol.phoneClear("+86 000 000 0000")).toBe("+860000000000");
  });
  test("8-ку меняет на +7", () => {
    expect(Phonecontrol.phoneClear("8 (927) 000-00-00")).toBe("+79270000000");
  });
});

describe("Team", () => {
  let team;
  let cheracter;

  beforeEach(() => {
    team = new Team();
    cheracter = new Character("Dima", "Bowman");
  });
  test("В команду нужно добавлять экземпляр класса Character", () => {
    team.add(cheracter);
    expect(team.toArray()).toContain(cheracter);
  });

  test("В команде не может быть 2х одинаковых персонажей", () => {
    expect(() => {
      const team = new Team();
      team.add(new Character("Dima", "Bowman"));
      team.add(new Character("Dima", "Bowman"));
    }).toThrow();
  });

  test("При добавлении нескольких членов команды дубли отсееваются", () => {
    team.addAll(
      new Character("Dima", "Bowman"),
      new Character("Dima", "Bowman"),
      new Character("Vasia", "Bowman")
    );
    expect(team.toArray().length).toBe(2);
  });
});

describe("Работа с ошибками", () => {
  let errorRepository;
  beforeEach(() => {
    errorRepository = new ErrorRepository();
    errorRepository.addError(100, "Кривые руки");
  });

  test("Ключ должен быть числом", () => {
    expect(() => {
      errorRepository.addError("notNomber", "someText");
    }).toThrow("Ключ должен быть числом");
  });

  test("Значение должно быть строкой", () => {
    expect(() => {
      errorRepository.addError(1, 1);
    }).toThrow("Значение должно быть строкой");
  }); // почему здесь expect принимат колбэк

  test("Метод translate возвращает текст ошибки по коду", () => {
    expect(errorRepository.translate(100)).toBe("Кривые руки");
  }); // а здесь просто инстанс

  test("Метод translate возвращает 'Unknown error' при получении отсутствующего кода", () => {
    expect(errorRepository.translate(101)).toBe("Unknown error");
  });
});

describe("Работа с настройками", () => {
  let settings;
  beforeEach(() => {
    settings = new Settings();
    settings.changeSettings('music', 'pop')
  });
  test('Map хранит дефолтные настройки', () => {
    expect(settings.defaultSettings.get('theme')).toBe('dark')
    expect(settings.defaultSettings.get('music')).toBe('trance')
    expect(settings.defaultSettings.get('difficulty')).toBe('easy')
  })
  test('Не допускается установка настроект не входящих в список настроек', () => {
    expect(()=>settings.changeSettings('themeXXX', 'light')).toThrow()
    expect(()=>settings.changeSettings('theme', 'lightXXX')).toThrow()
  })
  test('Map хранит пользовательские настройки', () => {
    expect(settings.userSettings.get('music')).toBe('pop')
  })
  test('Настройки можно менять', () => {
    settings.settings
    expect(settings.resSettings.get('music')).toBe('pop')
  })
});

