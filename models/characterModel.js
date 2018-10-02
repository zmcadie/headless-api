import mongoose from 'mongoose'
const Schema = mongoose.Schema
const characterModel = new Schema({
  base: {
    name: String,
    details: {
      class: String,
      level: Number,
      background: String,
      player: String,
      race: String,
      alignment: String,
      xp: Number
    }
  },
  stats: {
    abilities: {
      str: Number,
      dex: Number,
      con: Number,
      int: Number,
      wis: Number,
      cha: Number
    },
    saves: {
      str: { proficient: Boolean, bonus: Number },
      dex: { proficient: Boolean, bonus: Number },
      con: { proficient: Boolean, bonus: Number },
      int: { proficient: Boolean, bonus: Number },
      wis: { proficient: Boolean, bonus: Number },
      cha: { proficient: Boolean, bonus: Number }
    },
    skills: {
        acrobatics: { proficient: Boolean, bonus: Number },
        animalHandling: { proficient: Boolean, bonus: Number },
        arcana: { proficient: Boolean, bonus: Number },
        athletics: { proficient: Boolean, bonus: Number },
        deception: { proficient: Boolean, bonus: Number },
        history: { proficient: Boolean, bonus: Number },
        insight: { proficient: Boolean, bonus: Number },
        intimidation: { proficient: Boolean, bonus: Number },
        investigation: { proficient: Boolean, bonus: Number },
        medicine: { proficient: Boolean, bonus: Number },
        nature: { proficient: Boolean, bonus: Number },
        perception: { proficient: Boolean, bonus: Number },
        performance: { proficient: Boolean, bonus: Number },
        persuasion: { proficient: Boolean, bonus: Number },
        religion: { proficient: Boolean, bonus: Number },
        sleightOfHand: { proficient: Boolean, bonus: Number },
        stealth: { proficient: Boolean, bonus: Number },
        survival: { proficient: Boolean, bonus: Number }
    },
    inspiration: Boolean,
    proficiency: Number,
    passivePerception: Number
  },
  combat: {
    initiative: Number,
    ac: Number,
    speed: Number,
    health: {
      hp: {
        max: Number,
        current: Number,
        temporary: Number
      },
      hd: {
        total: String,
        used: String
      },
      deathSaves: {
        success: Number,
        failure: Number
      }
    },
    attacks: [{ name: String, bonus: String, damage: String, damageType: String }]
  },
  gear: {
    equipment: [String],
    gold: {
      cp: Number,
      sp: Number,
      gp: Number,
      pp: Number
    },
    treasure: [String]
  },
  info: {
    description: {
      age: String,
      height: String,
      weight: String,
      eyes: String,
      skin: String,
      hair: String
    },
    characteristics: {
      traits: [String],
      ideals: [String],
      bonds: [String],
      flaws: [String]
    },
    proficiencies: [String],
    languages: [String],
    features: [String],
    allies: [String]
  },
  magic: {
    spellcasting: {
      class: String,
      ability: String,
      dc: Number,
      bonus: Number
    },
    spells: {
      0: { spells: [String] },
      1: { slots: { total: Number, used: Number }, spells: [{ name: String, prepared: Boolean }] },
      2: { slots: { total: Number, used: Number }, spells: [{ name: String, prepared: Boolean }] },
      3: { slots: { total: Number, used: Number }, spells: [{ name: String, prepared: Boolean }] },
      4: { slots: { total: Number, used: Number }, spells: [{ name: String, prepared: Boolean }] },
      5: { slots: { total: Number, used: Number }, spells: [{ name: String, prepared: Boolean }] },
      6: { slots: { total: Number, used: Number }, spells: [{ name: String, prepared: Boolean }] },
      7: { slots: { total: Number, used: Number }, spells: [{ name: String, prepared: Boolean }] },
      8: { slots: { total: Number, used: Number }, spells: [{ name: String, prepared: Boolean }] },
      9: { slots: { total: Number, used: Number }, spells: [{ name: String, prepared: Boolean }] }
    }
  }
})
export default mongoose.model('characters', characterModel)