import { loadGLTF } from "./loader.js";

const THREE = window.MINDAR.IMAGE.THREE;
const loader = document.getElementsByClassName("loader")[0];
const start_button = document.getElementsByClassName("start-button")[0];
const next_button = document.getElementsByClassName("next-button")[0];
const record_button = document.getElementsByClassName("record-button")[0];
const record_button_inner = document.getElementsByClassName(
  "record-button-inner"
)[0];
const dialogs_inner = document.getElementById("dialogs-inner");
const progress = document.getElementById("progress");
const progress_bar = document.getElementById("progress-bar");
const answers = document.getElementById("answers");
const question_answers = document.getElementsByClassName("answer");
const blocker = document.getElementsByClassName("blocker")[0];

function findGetParameter(parameterName) {
  let result = null,
    tmp = [];
  let items = location.search.substr(1).split("&");
  for (let index = 0; index < items.length; index++) {
    tmp = items[index].split("=");
    if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
  }
  return result;
}

//Variable Defines
let chapter = parseInt(findGetParameter("chapter"));

let introduction = null;

let activeQuestion = null;
let questionCounter = null;

if (Number.isNaN(chapter)) {
  chapter = 0;
}

const progress_bar_handler = (sound) => {
  const progress_handler = setInterval(() => {
    updateWidth();
  }, 100);

  function updateWidth() {
    if (sound.playing()) {
      const width = (sound.seek() / sound.duration()) * 100;
      progress_bar.style.width = width + "%";
    } else {
      clearInterval(progress_handler);
      progress_bar.style.width = "100%";
    }
  }
};

let dialogs = {
  0: {
    0: {
      dialog: "A goose decides to be cunning.",
      audio: "../assets/audio/dialogs/dialog-1.mp3",
    },
    1: {
      dialog: "He wants to get the cock's advice:",
      audio: "../assets/audio/dialogs/dialog-2.mp3",
    },
    2: {
      dialog: "Goose: I want to be cunning. What can I do?",
      audio: "../assets/audio/dialogs/dialog-3.mp3",
    },
    3: {
      dialog: "Cock: Have some lessons from the fox.",
      audio: "../assets/audio/dialogs/dialog-4.mp3",
    },
    4: {
      dialog: "Goose: Where is the fox?",
      audio: "../assets/audio/dialogs/dialog-5.mp3",
    },
    5: {
      dialog: "Cock: He's in the forest.",
      audio: "../assets/audio/dialogs/dialog-6.mp3",
    },
    6: {
      dialog: "The goose begins to walk to the forest.",
      audio: "../assets/audio/dialogs/dialog-7.mp3",
    },
    7: {
      dialog: "He meets the goat on the way:",
      audio: "../assets/audio/dialogs/dialog-8.mp3",
    },
  },
  1: {
    0: {
      dialog:
        'Good morning, goose, the goat says: "Hello, what is your destination?"',
      audio: "../assets/audio/dialogs/dialog-9.mp3",
    },
    1: {
      dialog: "Goose: I go the forest for a few lessons.",
      audio: "../assets/audio/dialogs/dialog-10.mp3",
    },
    2: {
      dialog: "Goat: What lessons?",
      audio: "../assets/audio/dialogs/dialog-11.mp3",
    },
    3: {
      dialog: "Goose: Some lessons of cunning.",
      audio: "../assets/audio/dialogs/dialog-12.mp3",
    },
    4: {
      dialog: "Goat: Who can teach you cunning?",
      audio: "../assets/audio/dialogs/dialog-13.mp3",
    },
    5: {
      dialog: "Goose: The Fox",
      audio: "../assets/audio/dialogs/dialog-14.mp3",
    },
    6: {
      dialog: "Goose: You must be crazy!",
      audio: "../assets/audio/dialogs/dialog-15.mp3",
    },
    7: {
      dialog: "The goose continues walking. He meets the donkey on the way.",
      audio: "../assets/audio/dialogs/dialog-16.mp3",
    },
    8: {
      dialog: 'The donkey: "Hello!"',
      audio: "../assets/audio/dialogs/dialog-17.mp3",
    },
  },
  2: {
    0: {
      dialog: "Good morning, goose. What's your destination?",
      audio: "../assets/audio/dialogs/dialog-18.mp3",
    },
    1: {
      dialog: "Goose: To the forest, for a few lessons.",
      audio: "../assets/audio/dialogs/dialog-19.mp3",
    },
    2: {
      dialog: "Donkey: What lessons?",
      audio: "../assets/audio/dialogs/dialog-20.mp3",
    },
    3: {
      dialog: "Goose: Some lessons of cunning.",
      audio: "../assets/audio/dialogs/dialog-12.mp3",
    },
    4: {
      dialog: "Donkey: Who is your teacher?",
      audio: "../assets/audio/dialogs/dialog-22.mp3",
    },
    5: {
      dialog: "Goose: The fox.",
      audio: "../assets/audio/dialogs/dialog-14.mp3",
    },
    6: {
      dialog: "Donkey: Oh my God!",
      audio: "../assets/audio/dialogs/dialog-24.mp3",
    },
    7: {
      dialog: "The goose walks into the forest.",
      audio: "../assets/audio/dialogs/dialog-25.mp3",
    },
    8: {
      dialog: "He finds the fox:",
      audio: "../assets/audio/dialogs/dialog-26.mp3",
    },
  },
  3: {
    0: {
      dialog: "Goose: Everybody talks about your cunning.",
      audio: "../assets/audio/dialogs/dialog-27.mp3",
    },
    1: {
      dialog: "Goose: Can you teach me a few lessons of cunning?",
      audio: "../assets/audio/dialogs/dialog-28.mp3",
    },
    2: {
      dialog: "Yes, the fox replies.",
      audio: "../assets/audio/dialogs/dialog-29.mp3",
    },
    3: {
      dialog: "Fox: I can teach you cunning. Now sit and listen!",
      audio: "../assets/audio/dialogs/dialog-30.mp3",
    },
    4: {
      dialog: 'Fox: The first rule: "Don\'t believe in every word."',
      audio: "../assets/audio/dialogs/dialog-31.mp3",
    },
    5: {
      dialog:
        "Fox: The second rule of cunning is to recognize the stupid creatures.",
      audio: "../assets/audio/dialogs/dialog-32.mp3",
    },
    6: {
      dialog:
        "But, the goose wonders, how do you recognize the stupid creatures?",
      audio: "../assets/audio/dialogs/dialog-33.mp3",
    },
    7: {
      dialog: "Fox: I can understand it from their eyes and speeches.",
      audio: "../assets/audio/dialogs/dialog-34.mp3",
    },
    8: {
      dialog: "Goose: Am I stupid?",
      audio: "../assets/audio/dialogs/dialog-35.mp3",
    },
    9: {
      dialog: "Fox: Let's try. Close your eyes now.",
      audio: "../assets/audio/dialogs/dialog-36.mp3",
    },
    10: {
      dialog: "The stupid goose close his eyes.",
      audio: "../assets/audio/dialogs/dialog-37.mp3",
    },
    11: {
      dialog: "The fox immediately attacks the goose and eats him.",
      audio: "../assets/audio/dialogs/dialog-38.mp3",
    },
    12: {
      dialog: "The lessons of cunning ends very quickly for the stupid goose.",
      audio: "../assets/audio/dialogs/dialog-39.mp3",
    },
  },
};

const call_dialog = (counter = 0) => {
  Howler.stop();
  const sound = new Howl({
    src: [dialogs[chapter][counter].audio],
    loop: false,
    autoplay: true,
    rate: 0.9,
    onload: function () {
      dialogs_inner.innerHTML = dialogs[chapter][counter].dialog;
    },
    onend: function () {
      if (typeof dialogs[chapter][counter + 1] !== "undefined") {
        call_dialog(counter + 1);
      } else if (typeof chapters[chapter + 1] !== "undefined") {
        next_button.style.display = "block";
      }
    },
  });

  sound.on("play", () => {
    progress_bar_handler(sound);
  });
};

let questions = {
  0: {
    question: 'Good morning, goose, the goat says: "Hello what is your ... ?"',
    answers: ["Name", "Destination"],
    correct_answer: 1,
    audio: "../assets/audio/questions/question-1.mp3",
    introduction: "../assets/audio/questions/name-or-destination.mp3",
  },
  1: {
    question: "How does the fox make the goose cunning?",
    answers: ["Close Your Eyes", "Raise Your Hand"],
    correct_answer: 0,
    audio: "../assets/audio/questions/question-2.mp3",
    introduction: "../assets/audio/questions/close-or-raise.mp3",
  },
  2: {
    question: "Which animal knows cunning very well?",
    answers: ["Fox", "Donkey"],
    correct_answer: 0,
    audio: "../assets/audio/questions/question-3.mp3",
    introduction: "../assets/audio/questions/fox-or-donkey.mp3",
  },
  3: {
    question:
      "What do the donkey say when they hear about the goose's decision?",
    answers: ["Oh My God!", "You Must Be Crazy"],
    correct_answer: 0,
    audio: "../assets/audio/questions/question-4.mp3",
    introduction: "../assets/audio/questions/god-or-crazy.mp3",
  },
  4: {
    question:
      "I can teach you cunning. Now sit and listen! The first rule: ...",
    answers: ["Recognize The Stupid Creatures", "Don't Believe In Every Word"],
    correct_answer: 1,
    audio: "../assets/audio/questions/question-5.mp3",
    introduction: "../assets/audio/questions/recognize-or-believe.mp3",
  },
};

const call_question = (counter = 0) => {
  answers.style.display = "none";
  Howler.stop();
  if (typeof questions[counter] !== "undefined") {
    const sound = new Howl({
      src: [questions[counter].audio],
      loop: false,
      autoplay: true,
      rate: 0.9,
      onload: function () {
        blocker.style.display = "none";
        dialogs_inner.innerHTML = questions[counter].question;
        activeQuestion = questions[counter];
        questionCounter = counter;
        next_button.style.display = "none";
        $(".answer").removeClass("wrong correct choose");
      },
      onend: function () {
        //Answers
        answers.style.display = "flex";

        //Questions
        question_answers[0].innerHTML = questions[counter].answers[0];
        question_answers[1].innerHTML = questions[counter].answers[1];

        //Recording is active - banner
        record_button.style.display = "block";

        introduction = new Howl({
          src: [questions[counter].introduction],
          loop: false,
          autoplay: true,
          rate: 0.9,
        });
      },
    });

    sound.on("play", () => {
      progress_bar_handler(sound);
    });
  }
};

const chapters = {
  0: {
    scene: "../assets/models/story scene 1/forest.gltf",
    target: "../assets/targets/targets.mind",
    title: "Chapter - 1",
    subtitle: "A goose decides to be cunning",
    event: call_dialog,
  },
  1: {
    scene: "../assets/models/story scene 2/forest.gltf",
    target: "../assets/targets/targets.mind",
    title: "Chapter - 2",
    subtitle: "Goose talking to goat",
    event: call_dialog,
  },
  2: {
    scene: "../assets/models/story scene 3/forest.gltf",
    target: "../assets/targets/targets.mind",
    title: "Chapter - 3",
    subtitle: "Goose talking to donkey",
    event: call_dialog,
  },
  3: {
    scene: "../assets/models/story scene 4/forest.gltf",
    target: "../assets/targets/targets.mind",
    title: "Chapter - 4",
    subtitle: "Goose learning cunning from fox",
    event: call_dialog,
  },
  4: {
    scene: "../assets/models/story scene 5/forest.gltf",
    target: "../assets/targets/targets.mind",
    title: "Question / Answer",
    subtitle: "Answer The Questions",
    event: call_question,
  },
};

const start = async () => {
  const not_recognized = await new Howl({
    src: ["../assets/audio/effects/not-recognized.mp3"],
    loop: false,
    rate: 0.9,
    onend: function () {
      introduction.play();
    },
  });

  const correct_effect = await new Howl({
    src: ["../assets/audio/effects/correct.mp3"],
    loop: false,
    rate: 0.9,
  });

  const wrong_effect = await new Howl({
    src: ["../assets/audio/effects/wrong.mp3"],
    loop: false,
    rate: 0.9,
  });

  const mindarThree = new window.MINDAR.IMAGE.MindARThree({
    container: document.getElementById("app"),
    imageTargetSrc: chapters[chapter].target,
    filterMinCF: 0.00005,
    filterBeta: 150,
    warmupTolerance: 30,
    missTolerance: 30,
    uiLoading: "no",
    uiScanning: "no",
  });

  const { renderer, scene, camera } = mindarThree;

  const light = new THREE.HemisphereLight(0xffa95c, 4);
  light.castShadow = true;
  scene.add(light);

  const anchor = mindarThree.addAnchor(0);

  let forest = await loadGLTF(chapters[chapter].scene);

  // let forest = await loadVRML("../assets/models/house.wrl");

  forest.scene.scale.set(0.1, 0.1, 0.1);
  forest.scene.position.set(0, 0, 0);
  forest.scene.rotation.x = 1.5;
  forest.scene.rotation.y = 1.18;

  anchor.group.add(forest.scene);

  const mixer = new THREE.AnimationMixer(forest.scene);
  const clips = forest.animations;

  clips.forEach(function (clip) {
    mixer.clipAction(clip).play();
  });

  const clock = new THREE.Clock();
  clock.autoStart = false;

  let pause = true;

  start_button.addEventListener("click", function () {
    dialogs_inner.style.display = "block";
    progress.style.display = "block";
    start_button.style.display = "none";
    if (typeof chapters[chapter]["event"] === "function") {
      chapters[chapter]["event"]();
    }
  });

  const result_answer = (answer) => {
    question_answers[activeQuestion["correct_answer"]].classList.add("correct");

    if (
      activeQuestion["answers"][activeQuestion["correct_answer"]] === answer
    ) {
      correct_effect.play();
    } else {
      question_answers[
        activeQuestion["correct_answer"] === 0 ? 1 : 0
      ].classList.add("wrong");
      wrong_effect.play();
    }

    if (typeof questions[questionCounter + 1] === "undefined") {
      next_button.innerHTML = "Finish The Demo";
      $(".next-button")
        .unbind()
        .on("click", function () {
          window.location.reload();
        });
    } else {
      next_button.innerHTML = "Next Question";
      $(".next-button")
        .unbind()
        .on("click", function () {
          call_question(questionCounter + 1);
        });
    }

    next_button.style.display = "block";
  };

  const select_answer = (i) => {
    blocker.style.display = "block";
    record_button.style.display = "none";
    question_answers[i].classList.add("choose");
    question_answers[i === 0 ? 1 : 0].classList.remove("choose");
    Howler.stop();

    result_answer(question_answers[i].innerHTML);
  };

  for (let i = 0; i < question_answers.length; i++) {
    question_answers[i].addEventListener("click", function () {
      select_answer(i);
    });
  }

  record_button.addEventListener("click", function (event) {
    event.stopPropagation();
    event.preventDefault();
    Howler.stop();
    if (record_button.classList.contains("breathing")) {
      record_button.classList.remove("breathing");
      audioRecorder.stop().then(() => {
        record_button_inner.innerHTML = " Goose is listening to you";
        const i = document.createElement("i");
        i.classList.add("fa-solid");
        i.classList.add("fa-spinner");
        i.classList.add("fa-spin");
        record_button_inner.prepend(i);

        const formData = new FormData();

        const audio_file = new File(audioRecorder.audioBlobs, "speech.wav", {
          type: "audio/wav; codecs=MS_PCM",
        });

        formData.append("question", JSON.stringify(activeQuestion));

        formData.append("file", audio_file);

        $.ajax({
          type: "POST",
          dataType: "json",
          contentType: false,
          processData: false,
          data: formData,
          url:
            window.location.protocol +
            "//" +
            window.location.hostname +
            ":" +
            window.location.port +
            "/api/audio",
          success: function (response) {
            const answer = JSON.parse(response);
            if (answer === false) {
              Howler.stop();
              not_recognized.play();

              not_recognized.onend = function () {
                activeQuestion;
              };
            } else {
              for (let i = 0; i < activeQuestion.answers.length; i++) {
                if (activeQuestion.answers[i] === answer) {
                  select_answer(i);
                }
              }
            }

            $(".record-button-inner").html(
              '<i class="fa-solid fa-microphone"></i> Answer The Question'
            );
          },
        });
      });
    } else {
      record_button.classList.add("breathing");
      if (audioRecorder) {
        audioRecorder.start();
      }
    }
  });

  $(next_button).on("click", function () {
    window.location.href =
      window.location.protocol +
      "//" +
      window.location.hostname +
      ":" +
      window.location.port +
      "?chapter=" +
      (chapter + 1);
  });

  anchor.onTargetLost = () => {
    pause = true;
    clock.stop();
  };

  anchor.onTargetFound = () => {
    pause = false;
    clock.start();
  };

  await mindarThree.start();

  renderer.setAnimationLoop(() => {
    if (!pause) {
      const delta = clock.getDelta() * 0.5;
      mixer.update(delta);
    }

    renderer.render(scene, camera);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  $(".loader-introduction").html(chapters[chapter].title);
  $(".loader-content").html(chapters[chapter].subtitle);
  start().then(function () {
    loader.style.display = "none";
  });
});
