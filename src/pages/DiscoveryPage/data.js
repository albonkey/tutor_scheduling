const mySessionStart = new Date();
mySessionStart.setHours(11);
mySessionStart.setMinutes(0);

const mySessionEnd = new Date();
mySessionEnd.setHours(12);
mySessionEnd.setMinutes(0);

export const courses = [
  {
    name: 'Carl Solli',
    subject: 'Math',
    level: 'Intermediate',
    nrOfLessons: 50,
    rating: 4,
    info: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Maecenas vitae eros egestas, sodales nunc eu, fermentum enim. Nunc a efficitur nibh.
      Integer cursus pulvinar erat, ut congue arcu ultrices a. Suspendisse pulvinar quam nisi,
      eget malesuada nulla porttitor ut.
      Nullam sit amet risus vitae eros lobortis tristique in quis nisi.`,
    schedule: [
      {
        id: 1,
        date: new Date(),
        available: true,
        time_start: mySessionStart,
        time_end: mySessionEnd
      }
    ]
  },{
    name: 'Ashkan',
    subject: 'Databases',
    level: 'Intermediate',
    nrOfLessons: 50,
    rating: 5,
    info: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Maecenas vitae eros egestas, sodales nunc eu, fermentum enim. Nunc a efficitur nibh.
      Integer cursus pulvinar erat, ut congue arcu ultrices a. Suspendisse pulvinar quam nisi,
      eget malesuada nulla porttitor ut.
      Nullam sit amet risus vitae eros lobortis tristique in quis nisi.`,
    schedule: [
      {
        id: 1,
        date: new Date(),
        available: true,
        time_start: mySessionStart,
        time_end: mySessionEnd
      },{
        id: 2,
        date: new Date(),
        available: true,
        time_start: mySessionStart,
        time_end: mySessionEnd
      },{
        id: 3,
        date: new Date(),
        available: true,
        time_start: mySessionStart,
        time_end: mySessionEnd
      },{
        id: 4,
        date: new Date(),
        available: true,
        time_start: mySessionStart,
        time_end: mySessionEnd
      },{
        id: 5,
        date: new Date(),
        available: true,
        time_start: mySessionStart,
        time_end: mySessionEnd
      },{
        id: 6,
        date: new Date(),
        available: true,
        time_start: mySessionStart,
        time_end: mySessionEnd
      },{
        id: 7,
        date: new Date(),
        available: true,
        time_start: mySessionStart,
        time_end: mySessionEnd
      },{
        id: 8,
        date: new Date(),
        available: true,
        time_start: mySessionStart,
        time_end: mySessionEnd
      },{
        id: 9,
        date: new Date(),
        available: true,
        time_start: mySessionStart,
        time_end: mySessionEnd
      }
    ]
  },{
    name: 'Aylin',
    subject: 'Machine Learning',
    level: 'Intermediate',
    nrOfLessons: 50,
    rating: 4.5,
    info: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Maecenas vitae eros egestas, sodales nunc eu, fermentum enim. Nunc a efficitur nibh.
      Integer cursus pulvinar erat, ut congue arcu ultrices a. Suspendisse pulvinar quam nisi,
      eget malesuada nulla porttitor ut.
      Nullam sit amet risus vitae eros lobortis tristique in quis nisi.`,
      schedule: [
        {
          id: 1,
          date: new Date(),
          available: true,
          time_start: mySessionStart,
          time_end: mySessionEnd
        }
      ]
  }
]
