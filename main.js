const itSchool = {
    name: "Simple Online School",
    description: "Simple online school description",
    maxGroupCount: 5,
    maxStudentsCountPerGroup: 12,
    availableCourses: ["Front-end Basic", "Front-end Pro"],
    startedGroups: [],
    __callbacks: {},
  
    __supportedEventTypes: {
      GROUP_STARTED: "GROUP_STARTED",
      GROUP_ENDED: "GROUP_ENDED"
    },
  
    startLearningGroup(courseName, amountOfStudents) {
      if (this.availableCourses.includes(courseName)) {
        if (amountOfStudents <= this.maxStudentsCountPerGroup) {
          if (!this.startedGroups.some((startedGroup) => startedGroup.courseName === courseName)) {
            this.startedGroups.push({ courseName, amountOfStudents });
            this.dispatch(this.__supportedEventTypes.GROUP_STARTED, courseName);
          } else {
            console.log(`Group with ${courseName} course already started.`);
          }
        } else {
          console.log(`We not supperted ${amountOfStudents} amount of students.`);
        }
      } else {
        console.log(`Sorry, course ${courseName} not supported yet.`);
      }
    },
  
    endLearningGroup(courseName) {
      if (this.startedGroups.some((startedGroup) => startedGroup.courseName === courseName)) {
        this.startedGroups = this.startedGroups.filter((startedGroup) => startedGroup.courseName !== courseName);
        this.dispatch(this.__supportedEventTypes.GROUP_ENDED, courseName);
      } else {
        console.log(`You are trying to finish not existing learning group!`);
      }
    },
  
    on(eventName, callback) {
      if (eventName in this.__supportedEventTypes) this.__callbacks[eventName] = callback;
    },
  
    dispatch(eventName, data) {
      this.__callbacks[eventName] && this.__callbacks[eventName](data);
    }
  };
  
  itSchool.on(
    itSchool.__supportedEventTypes.GROUP_STARTED,
    (courseName) => console.log(`Started ${courseName} group! 🎉🎉🎉`),
  );
  
  itSchool.on(
    itSchool.__supportedEventTypes.GROUP_ENDED,
    (courseName) => console.log(`Group with ${courseName} course successfully finished! 🎓🎓🎓`),
  );
  
  itSchool.startLearningGroup("Front-end Pro", 10);
  itSchool.startLearningGroup("Front-end Basic", 13);
  itSchool.startLearningGroup("Python Basic", 6);
  
  itSchool.endLearningGroup("Front-end Pro");
  itSchool.endLearningGroup("Python Basic");