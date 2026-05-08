export interface Track {
  id: number;
  title: string;
  author: string;
  album: string;
  duration: string;
  genre: string;
  year: number;
  track_file: string;
}

export const tracksApi: Track[] = [
  {
    id: 8,
    title: "Chase",
    author: "Alexander Nakarada",
    album: "Chase",
    duration: "3:25",
    genre: "Классическая музыка",
    year: 2005,
    track_file: "https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Alexander_Nakarada_-_Chase.mp3"
  },
  {
    id: 9,
    title: "Open Sea epic",
    author: "Frank Schroter",
    album: "Open Sea epic",
    duration: "2:45",
    genre: "Классическая музыка",
    year: 2019,
    track_file: "https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Frank_Schroter_-_Open_Sea_epic.mp3"
  },
  {
    id: 10,
    title: "Sneaky Snitch",
    author: "Kevin Macleod",
    album: "Sneaky Snitch",
    duration: "5:05",
    genre: "Классическая музыка",
    year: 2022,
    track_file: "https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Kevin_Macleod_-_Sneaky_Snitch.mp3"
  },
  {
    id: 11,
    title: "Secret Garden",
    author: "Mixkit",
    album: "Secret Garden",
    duration: "5:24",
    genre: "Классическая музыка",
    year: 1972,
    track_file: "https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Mixkit_-_Secret_Garden.mp3"
  },
  {
    id: 12,
    title: "A journey of successfull winners",
    author: "-",
    album: "-",
    duration: "4:15",
    genre: "Классическая музыка",
    year: 1985,
    track_file: "https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Musiclfiles_-_A_Journey_For_Successful_Winners.mp3"
  },
  {
    id: 13,
    title: "Epic Heroic Conquest",
    author: "-",
    album: "Epic Heroic Conquest",
    duration: "3:20",
    genre: "Классическая музыка",
    year: 1962,
    track_file: "https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Musiclfiles_-_Epic_Heroic_Conquest.mp3"
  },
  {
    id: 14,
    title: "The March OF The Final Battle",
    author: "-",
    album: "The March OF The Final Battle",
    duration: "3:26",
    genre: "Классическая музыка",
    year: 2011,
    track_file: "https://webdev-music-003b5b991590.herokuapp.com/media/music_files/musiclfiles_-_The_March_Of_The_Final_Battle.mp3"
  },
  {
    id: 15,
    title: "True Summer",
    author: "-",
    album: "True Summer",
    duration: "4:13",
    genre: "Классическая музыка",
    year: 2012,
    track_file: "https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Musiclfiles_-_True_Summer.mp3"
  },
  {
    id: 16,
    title: "Background Sensible",
    author: "Waltz Piano",
    album: "Background Sensible",
    duration: "2:15",
    genre: "Классическая музыка",
    year: 2003,
    track_file: "https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Waltz_Piano_-_Background_Sensible.mp3"
  },
  {
    id: 17,
    title: "Cinematic",
    author: "Winniethemoog",
    album: "Cinematic",
    duration: "3:26",
    genre: "Классическая музыка",
    year: 2004,
    track_file: "https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Winniethemoog_-_Cinematic.mp3"
  },
  {
    id: 18,
    title: "Kerfuffle",
    author: "AFM",
    album: "Kerfuffle",
    duration: "3:55",
    genre: "Электронная музыка",
    year: 2013,
    track_file: "https://webdev-music-003b5b991590.herokuapp.com/media/music_files/AFM_-_Kerfuffle.mp3"
  },
  {
    id: 19,
    title: "Dropin",
    author: "Bobby Marleni",
    album: "Defected Jamz Vol. 2",
    duration: "3:25",
    genre: "Электронная музыка",
    year: 2011,
    track_file: "https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Bobby_Marleni_-_Dropin.mp3"
  },
  {
    id: 20,
    title: "Rhythm Beds",
    author: "Brian Holtz",
    album: "Rhythm Beds",
    duration: "3:25",
    genre: "Электронная музыка",
    year: 2021,
    track_file: "https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Brian_Holtz_-_Rhythm_Beds.mp3"
  },
  {
    id: 21,
    title: "Trumpets in Your Ears",
    author: "Fanz",
    album: "Trumpets in Your Ears",
    duration: "2:45",
    genre: "Электронная музыка",
    year: 2013,
    track_file: "https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Fanz_-_Trumpets_in_Your_Ears.mp3"
  },
  {
    id: 22,
    title: "Bad Behaviors",
    author: "Luke",
    album: "Bad Behaviors",
    duration: "5:24",
    genre: "Электронная музыка",
    year: 2019,
    track_file: "https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Luke_-_Bad_Behaviors.mp3"
  },
  {
    id: 23,
    title: "Majesty",
    author: "Ryan Craig Martin",
    album: "Majesty",
    duration: "5:01",
    genre: "Электронная музыка",
    year: 2011,
    track_file: "https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Ryan_Craig_Martin_-_Majesty.mp3"
  },
  {
    id: 24,
    title: "Bounce",
    author: "Sascha Ende",
    album: "Bounce",
    duration: "3:25",
    genre: "Электронная музыка",
    year: 2022,
    track_file: "https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Sascha_Ende_-_bounce.mp3"
  },
  {
    id: 25,
    title: "Deadfro5h",
    author: "Starforsh",
    album: "Deadfro5h",
    duration: "3:25",
    genre: "Электронная музыка",
    year: 2022,
    track_file: "https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Starforsh_-_Deadfro5h.mp3"
  },
  {
    id: 26,
    title: "Insire",
    author: "Voisin",
    album: "Insire",
    duration: "4:18",
    genre: "Электронная музыка",
    year: 2019,
    track_file: "https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Voisin_-_Insire.mp3"
  },
  {
    id: 27,
    title: "Hangtime",
    author: "Wova",
    album: "Hangtime",
    duration: "5:06",
    genre: "Электронная музыка",
    year: 1991,
    track_file: "https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Wova_-_Hangtime.mp3"
  },
  {
    id: 28,
    title: "Carol Of The Bells",
    author: "Alexander Nakarada",
    album: "Carol Of The Bells",
    duration: "3:25",
    genre: "Рок музыка",
    year: 2022,
    track_file: "https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Alexander_Nakarada_-_Carol_Of_The_Bells.mp3"
  },
  {
    id: 29,
    title: "Feel Good Rock",
    author: "Audionautix",
    album: "FAST",
    duration: "5:12",
    genre: "Рок музыка",
    year: 2020,
    track_file: "https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Audionautix_-_Feel_Good_Rock.mp3"
  },
  {
    id: 30,
    title: "The World Waltz",
    author: "Kevin Macleodburn",
    album: "The Waltzer",
    duration: "5:05",
    genre: "Рок музыка",
    year: 2005,
    track_file: "https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Kevin_Macleodburn_-_The_World_Waltz.mp3"
  },
  {
    id: 31,
    title: "5 cents back",
    author: "MED",
    album: "5 cents back",
    duration: "5:45",
    genre: "Рок музыка",
    year: 2005,
    track_file: "https://webdev-music-003b5b991590.herokuapp.com/media/music_files/MED_-_5_Cents_Back.mp3"
  },
  {
    id: 32,
    title: "Essence2",
    author: "MED",
    album: "Essence2",
    duration: "3:25",
    genre: "Электронная музыка",
    year: 1920,
    track_file: "https://webdev-music-003b5b991590.herokuapp.com/media/music_files/MED_-_Essence2.mp3"
  },
  {
    id: 33,
    title: "Classical Metal Workout",
    author: "-",
    album: "Workout",
    duration: "4:06",
    genre: "Рок музыка",
    year: 1991,
    track_file: "https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Musiclfiles_-_Classical_Metal_Workout.mp3"
  },
  {
    id: 34,
    title: "Adrenelynne",
    author: "Tim Kulig",
    album: "Adrenelynne",
    duration: "4:45",
    genre: "Рок музыка",
    year: 2007,
    track_file: "https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Tim_Kulig_-_Adrenelynne.mp3"
  },
  {
    id: 35,
    title: "Hard Metal Intro",
    author: "Winniethemoog",
    album: "Hard Metal",
    duration: "4:15",
    genre: "Рок музыка",
    year: 1991,
    track_file: "https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Winniethemoog__-_Hard_Metal_Intro.mp3"
  },
  {
    id: 36,
    title: "Action Sport Breakbeat",
    author: "Winniethemoog",
    album: "Workout",
    duration: "3:54",
    genre: "Рок музыка",
    year: 1991,
    track_file: "https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Winniethemoog_-_Action_Sport_Breakbeat.mp3"
  }
];