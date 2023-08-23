const CodingButton = document.querySelector(".topic__btns .crimes__btn")
const InterviewButton = document.querySelector(".topic__btns .family__btn");
const LogicButton = document.querySelector(".topic__btns .vechiles__btn")
const SpaceButton = document.querySelector(".topic__btns .countries__btn")
const RuleBox = document.querySelector(".rule__box")
const ExitButton = RuleBox.querySelector(".buttons .exit")
const ContinueButton = RuleBox.querySelector(".buttons .continue")
const QuizBox = document.querySelector(".quiz__box")
const TimeCounter = QuizBox.querySelector(".timer .timer__sec")
const CodingOptionList = document.querySelector(".options");
const InterviewOptionList = document.querySelector(".options");
const LogicOptionList = document.querySelector(".options");
const SpaceOptionList = document.querySelector(".options")
const CodingNextButton = document.querySelector(".next__btn")
const InterviewNextButton = document.querySelector(".next__btn");
const LogicNextButton = document.querySelector(".next__btn")
const SpaceNextButton = document.querySelector(".next__btn")
const ResultBox = document.querySelector(".result__box")
const RestartQuiz = ResultBox.querySelector(".result__box__buttons .result__box__restart")
const QuitQuiz = ResultBox.querySelector(".result__box__buttons .result__box__exit")

let QuestionCount = 0
let QuestionNumb = 1
let Counter
let TimeValue = 30
let UserScore = 0
let TickIcon = '<div class="icon tick"><i class="uil uil-check-circle"></i></div>'
let CrossIcon = '<div class="icon tick"><i class="uil uil-times-circle"></i></div>'

function ShowResultBox() {
    const ScoreIcon = ResultBox.querySelector(".icon")
    const ScoreText = ResultBox.querySelector(".score")
    if(UserScore == 0) {
        let ScoreTag =
          "<span>Bruh :/ , You got <p>" +
          UserScore +
          "</p> out of <p>" +
          CodingQuestions.length +
          "</p> Study more. fr.</span>";
        ScoreText.innerHTML = ScoreTag
        let ScoreIconTag = '<i class="uil uil-annoyed-alt"></i>'
        ScoreIcon.innerHTML = ScoreIconTag
    }
    else if(UserScore == 1 || UserScore == 2) {
        let ScoreTag =
          "<span>You can do better! , You got <p>" +
          UserScore +
          "</p> out of <p>" +
          CodingQuestions.length +
          "</p> .</span>";
        ScoreText.innerHTML = ScoreTag
        let ScoreIconTag = '<i class="uil uil-annoyed"></i>'
        ScoreIcon.innerHTML = ScoreIconTag
    }
    else if(UserScore == 3 || UserScore == 4) {
        let ScoreTag =
          "<span>Good job! , You got <p>" +
          UserScore +
          "</p> out of <p>" +
          CodingQuestions.length +
          "</p> .</span>";
        ScoreText.innerHTML = ScoreTag
        let ScoreIconTag = '<i class="uil uil-smile-squint-wink"></i>'
        ScoreIcon.innerHTML = ScoreIconTag
    }
    else if (UserScore == 5) {
        let ScoreTag =
          "<span>Booyah! , You got <p>" +
          UserScore +
          "</p> out of <p>" +
          CodingQuestions.length +
          "</p> .</span>";
        ScoreText.innerHTML = ScoreTag
        let ScoreIconTag = '<i class="uil uil-grin"></i>'
        ScoreIcon.innerHTML = ScoreIconTag
    }
}

function StartTimer(Time) {
    Counter = setInterval(Timer, 1000)
    function Timer() {
        TimeCounter.textContent = Time
        Time--
        if(Time < 9) {
            let AddZero = TimeCounter.textContent
            TimeCounter.textContent = "0" + AddZero
        }
        if(Time < 0) {
            clearInterval(Counter)
            TimeCounter.textContent = "00"

            let CrimeCorrectAnswer = CodingQuestions[QuestionCount].answer;
            let CrimeAllOptions = CodingOptionList.children.length;

            for (let i = 0; i < CrimeAllOptions; i++) {
                if (
                  CodingOptionList.children[i].textContent == CrimeCorrectAnswer
                ) {
                  CodingOptionList.children[i].setAttribute(
                    "class",
                    "option correct"
                  );
                  CodingOptionList.children[i].insertAdjacentHTML(
                    "BeforeEnd",
                    TickIcon
                  );
                }
            }
            for (let i = 0; i < CrimeAllOptions; i++) {
                CodingOptionList.children[i].classList.add("disabled");
            }
            CodingNextButton.style.display = "block";
        }
    }
}

CodingButton.onclick = () => {
    RuleBox.classList.add("activeRule")
    ShowCodingQuestions(0);
    CodingNextButton.onclick = () => {
      if (QuestionCount < CodingQuestions.length - 1) {
        QuestionCount++;
        ShowCodingQuestions(QuestionCount);
        QuestionNumb++;
        CrimeQuestionCounter(QuestionNumb);
        clearInterval(Counter);
        StartTimer(TimeValue);
        CodingNextButton.style.display = "none";
      } else {
        console.log("Questions Completed!!");
        CrimeShowResultBox();
      }
    };
}

function CrimeQuestionCounter(index) {
    const QuestionCounter = QuizBox.querySelector(".total__questions")    
    let TotalQuestionTag =
      "<span><p>" +
      index +
      "</p>of<p>" +
      CodingQuestions.length +
      "</p>Questions</span>";
    QuestionCounter.innerHTML = TotalQuestionTag
}

function ShowCodingQuestions(index) {
  const CrimesQuestionText = document.querySelector(".que__text");
  let CrimeQuestionTag =
    "<span>" +
    CodingQuestions[index].numb +
    ". " +
    CodingQuestions[index].question +
    "</span>";
  let CrimeOptionTag =
    '<div class="option"><span>' +
    CodingQuestions[index].options[0] +
    "</span></div>" +
    '<div class="option"><span>' +
    CodingQuestions[index].options[1] +
    "</span></div>" +
    '<div class="option"><span>' +
    CodingQuestions[index].options[2] +
    "</span></div>" +
    '<div class="option"><span>' +
    CodingQuestions[index].options[3] +
    "</span></div>";
  CrimesQuestionText.innerHTML = CrimeQuestionTag;
  CodingOptionList.innerHTML = CrimeOptionTag;
  const CrimeOption = CodingOptionList.querySelectorAll(".option");
  for (let i = 0; i < CrimeOption.length; i++) {
    CrimeOption[i].setAttribute("onclick", "CrimeOptionSelected(this)");
  }
}

function CrimeOptionSelected(answer) {
    clearInterval(Counter)
    let CrimeUserAnswer = answer.textContent
    let CrimeCorrectAnswer = CodingQuestions[QuestionCount].answer;
    let CrimeAllOptions = CodingOptionList.children.length;
    if(CrimeUserAnswer == CrimeCorrectAnswer) {
        UserScore += 1
        console.log(UserScore)
        answer.classList.add("correct")
        console.log("Correct!")
        answer.insertAdjacentHTML("BeforeEnd", TickIcon)
    } else {
        answer.classList.add("incorrect")
        console.log("Incorrect!")
        answer.insertAdjacentHTML("BeforeEnd", CrossIcon)

        for (let i = 0; i < CrimeAllOptions; i++) {
            if (
              CodingOptionList.children[i].textContent == CrimeCorrectAnswer
            ) {
              CodingOptionList.children[i].setAttribute(
                "class",
                "option correct"
              );
              CodingOptionList.children[i].insertAdjacentHTML(
                "BeforeEnd",
                TickIcon
              );
            }
        }
    }
    for (let i = 0; i < CrimeAllOptions; i++) {
        CodingOptionList.children[i].classList.add("disabled");
    }
    CodingNextButton.style.display = "block";
}

function CrimeShowResultBox() {
    RuleBox.classList.remove("activeRule")
    QuizBox.classList.remove("activeQuiz")
    ResultBox.classList.add("activeResult")
    ShowResultBox()
}

InterviewButton.onclick = () => {
    RuleBox.classList.add("activeRule")
    ShowInterviewQuestions(0);
    InterviewNextButton.onclick = () => {
      if (QuestionCount < InterviewQuestions.length - 1) {
        QuestionCount++;
        ShowInterviewQuestions(QuestionCount);
        QuestionNumb++;
        FamilyQuestionCounter(QuestionNumb);
        clearInterval(Counter);
        FamilyStartTimer(TimeValue);
        InterviewNextButton.style.display = "none";
      } else {
        console.log("Questions Completed!!!");
        FamilyShowResultBox();
      }
    };
}

function FamilyStartTimer(Time) {
    Counter = setInterval(Timer, 1000)
    function Timer() {
        TimeCounter.textContent = Time
        Time--
        if(Time < 9) {
            let AddZero = TimeCounter.textContent
            TimeCounter.textContent = "0" + AddZero
        }
        if(Time < 0) {
            clearInterval(Counter)
            TimeCounter.textContent = "00"

            let FamilyCorrectAnswer = InterviewQuestions[QuestionCount].answer;
            let FamilyAllOptions = InterviewOptionList.children.length;

            for (let i = 0; i < FamilyAllOptions; i++) {
                if (
                  InterviewOptionList.children[i].textContent ==
                  FamilyCorrectAnswer
                ) {
                  InterviewOptionList.children[i].setAttribute(
                    "class",
                    "option correct"
                  );
                  InterviewOptionList.children[i].insertAdjacentHTML(
                    "BeforeEnd",
                    TickIcon
                  );
                }
            }
            for (let i = 0; i < FamilyAllOptions; i++) {
                InterviewOptionList.children[i].classList.add("disabled");
            }
            InterviewNextButton.style.display = "block";
        }
    }
}

function FamilyQuestionCounter(index) {
    const QuestionCounter = QuizBox.querySelector(".total__questions")    
    let TotalQuestionTag =
      "<span><p>" +
      index +
      "</p>of<p>" +
      InterviewQuestions.length +
      "</p>Questions</span>";
    QuestionCounter.innerHTML = TotalQuestionTag
}

function ShowInterviewQuestions(index) {
  const FamilyQuestionText = document.querySelector(".que__text");
  let FamilyQuestionTag =
    "<span>" +
    InterviewQuestions[index].numb +
    ". " +
    InterviewQuestions[index].question +
    "</span>";
  let FamilyOptionTag =
    '<div class="option">' +
    InterviewQuestions[index].options[0] +
    "<span></span></div>" +
    '<div class="option">' +
    InterviewQuestions[index].options[1] +
    "<span></span></div>" +
    '<div class="option">' +
    InterviewQuestions[index].options[2] +
    "<span></span></div>" +
    '<div class="option">' +
    InterviewQuestions[index].options[3] +
    "<span></span></div>";
  FamilyQuestionText.innerHTML = FamilyQuestionTag;
  InterviewOptionList.innerHTML = FamilyOptionTag;
  const FamilyOption = InterviewOptionList.querySelectorAll(".option");
  for (let i = 0; i < FamilyOption.length; i++) {
    FamilyOption[i].setAttribute("onclick", "FamilyOptionSelected(this)");
  }
}

function FamilyOptionSelected(answer) {
    clearInterval(Counter)
    let FamilyUserAnswer = answer.textContent
    let FamilyCorrectAnswer = InterviewQuestions[QuestionCount].answer;
    let FamilyAllOptions = InterviewOptionList.children.length;
    if(FamilyUserAnswer == FamilyCorrectAnswer) {
        UserScore += 1
        answer.classList.add("correct")
        console.log("Correct!")
        answer.insertAdjacentHTML("BeforeEnd", TickIcon)
    } else {
        answer.classList.add("incorrect")
        console.log("Incorrect!")
        answer.insertAdjacentHTML("BeforeEnd", CrossIcon)

        for (let i = 0; i < FamilyAllOptions; i++) {
            if (
              InterviewOptionList.children[i].textContent == FamilyCorrectAnswer
            ) {
              InterviewOptionList.children[i].setAttribute(
                "class",
                "option correct"
              );
              InterviewOptionList.children[i].insertAdjacentHTML(
                "BeforeEnd",
                TickIcon
              );
            }
        }
    }
    for (let i = 0; i < FamilyAllOptions; i++) {
        InterviewOptionList.children[i].classList.add("disabled");
    }
    InterviewNextButton.style.display = "block";
}

function FamilyShowResultBox() {
    RuleBox.classList.remove("activeRule")
    QuizBox.classList.remove("activeQuiz")
    ResultBox.classList.add("activeResult")
    ShowResultBox()
}

LogicButton.onclick = () => {
    RuleBox.classList.add("activeRule")
    ShowLogicQuestions(0);
    const LogicNextButton = document.querySelector(".next__btn");
    LogicNextButton.onclick = () => {
      if (QuestionCount < CodingQuestions.length - 1) {
        QuestionCount++;
        ShowLogicQuestions(QuestionCount);
        QuestionNumb++;
        VechileQuestionCounter(QuestionNumb);
        clearInterval(Counter);
        VechileStartTimer(TimeValue);
        LogicNextButton.style.display = "none";
      } else {
        console.log("Questions Completed!!!");
        VechileShowResultBox();
      }
    };
}

function VechileStartTimer(Time) {
    Counter = setInterval(Timer, 1000)
    function Timer() {
        TimeCounter.textContent = Time
        Time--
        if(Time < 9) {
            let AddZero = TimeCounter.textContent
            TimeCounter.textContent = "0" + AddZero
        }
        if(Time < 0) {
            clearInterval(Counter)
            TimeCounter.textContent = "00"

            let VechileCorrectAnswer = LogicQuestions[QuestionCount].answer;
            let VechileAllOptions = LogicOptionList.children.length;

            for (let i = 0; i < VechileAllOptions; i++) {
                if (
                  LogicOptionList.children[i].textContent ==
                  VechileCorrectAnswer
                ) {
                  LogicOptionList.children[i].setAttribute(
                    "class",
                    "option correct"
                  );
                  LogicOptionList.children[i].insertAdjacentHTML(
                    "BeforeEnd",
                    TickIcon
                  );
                }
            }
            for (let i = 0; i < VechileAllOptions; i++) {
                LogicOptionList.children[i].classList.add("disabled");
            }
            LogicNextButton.style.display = "block";
        }
    }
}

function VechileQuestionCounter(index) {
    const QuestionCounter = QuizBox.querySelector(".total__questions")    
    let TotalQuestionTag =
      "<span><p>" +
      index +
      "</p>of<p>" +
      LogicQuestions.length +
      "</p>Questions</span>";
    QuestionCounter.innerHTML = TotalQuestionTag
}

function ShowLogicQuestions(index) {
  const VechileQuestionText = document.querySelector(".que__text");
  let VechileQuestionTag =
    "<span>" +
    LogicQuestions[index].numb +
    ". " +
    LogicQuestions[index].question +
    "</span>";
  let VechileOptionTag =
    '<div class="option">' +
    LogicQuestions[index].options[0] +
    "<span></span></div>" +
    '<div class="option">' +
    LogicQuestions[index].options[1] +
    "<span></span></div>" +
    '<div class="option">' +
    LogicQuestions[index].options[2] +
    "<span></span></div>" +
    '<div class="option">' +
    LogicQuestions[index].options[3] +
    "<span></span></div>";
  VechileQuestionText.innerHTML = VechileQuestionTag;
  LogicOptionList.innerHTML = VechileOptionTag;
  const VechileOption = LogicOptionList.querySelectorAll(".option");
  for (let i = 0; i < VechileOption.length; i++) {
    VechileOption[i].setAttribute("onclick", "VechileOptionSelected(this)");
  }
}

function VechileOptionSelected(answer) {
    clearInterval(Counter)
    let VechileUserAnswer = answer.textContent
    let VechileCorrectAnswer = LogicQuestions[QuestionCount].answer;
    let VechileAllOptions = LogicOptionList.children.length;
    if(VechileUserAnswer == VechileCorrectAnswer) {
        UserScore += 1
        answer.classList.add("correct")
        console.log("Correct!")
        answer.insertAdjacentHTML("BeforeEnd", TickIcon)
    } else {
        answer.classList.add("incorrect")
        console.log("Incorrect!")
        answer.insertAdjacentHTML("BeforeEnd", CrossIcon)

        for (let i = 0; i < VechileAllOptions; i++) {
            if (
              LogicOptionList.children[i].textContent == VechileCorrectAnswer
            ) {
              LogicOptionList.children[i].setAttribute(
                "class",
                "option correct"
              );
              LogicOptionList.children[i].insertAdjacentHTML(
                "BeforeEnd",
                TickIcon
              );
            }
        }
    }
    for (let i = 0; i < VechileAllOptions; i++) {
        LogicOptionList.children[i].classList.add("disabled");
    }
    LogicNextButton.style.display = "block";
}

function VechileShowResultBox() {
    RuleBox.classList.remove("activeRule")
    QuizBox.classList.remove("activeQuiz")
    ResultBox.classList.add("activeResult")
    ShowResultBox()
}

SpaceButton.onclick = () => {
    RuleBox.classList.add("activeRule")
    ShowSpaceQuestions(0);
    const SpaceNextButton = document.querySelector(".next__btn");
    SpaceNextButton.onclick = () => {
      if (QuestionCount < SpaceQuestions.length - 1) {
        QuestionCount++;
        ShowSpaceQuestions(QuestionCount);
        QuestionNumb++;
        CountryQuestionCounter(QuestionNumb);
        clearInterval(Counter);
        CountryStartTimer(TimeValue);
        SpaceNextButton.style.display = "none";
      } else {
        console.log("Questions Completed!!!");
        CountryShowResultBox();
      }
    };
}

function CountryStartTimer(Time) {
    Counter = setInterval(Timer, 1000)
    function Timer() {
        TimeCounter.textContent = Time
        Time--
        if(Time < 9) {
            let AddZero = TimeCounter.textContent
            TimeCounter.textContent = "0" + AddZero
        }
        if(Time < 0) {
            clearInterval(Counter)
            TimeCounter.textContent = "00"

            let CountriesCorrectAnswer = SpaceQuestions[QuestionCount].answer;
            let CountriesAllOptions = SpaceOptionList.children.length;

            for (let i = 0; i < CountriesAllOptions; i++) {
                if (
                  SpaceOptionList.children[i].textContent ==
                  CountriesCorrectAnswer
                ) {
                  SpaceOptionList.children[i].setAttribute(
                    "class",
                    "option correct"
                  );
                  SpaceOptionList.children[i].insertAdjacentHTML(
                    "BeforeEnd",
                    TickIcon
                  );
                }
            }
            for (let i = 0; i < CountriesAllOptions; i++) {
                SpaceOptionList.children[i].classList.add("disabled");
            }
            SpaceNextButton.style.display = "block";
        }
    }
}

function CountryQuestionCounter(index) {
    const QuestionCounter = QuizBox.querySelector(".total__questions")    
    let TotalQuestionTag =
      "<span><p>" +
      index +
      "</p>of<p>" +
      SpaceQuestions.length +
      "</p>Questions</span>";
    QuestionCounter.innerHTML = TotalQuestionTag
}

function ShowSpaceQuestions(index) {
  const CountriesQuestionText = document.querySelector(".que__text");
  let CountriesQuestionTag =
    "<span>" +
    SpaceQuestions[index].numb +
    ". " +
    SpaceQuestions[index].question +
    "</span>";
  let CountriesOptionTag =
    '<div class="option">' +
    SpaceQuestions[index].options[0] +
    "<span></span></div>" +
    '<div class="option">' +
    SpaceQuestions[index].options[1] +
    "<span></span></div>" +
    '<div class="option">' +
    SpaceQuestions[index].options[2] +
    "<span></span></div>" +
    '<div class="option">' +
    SpaceQuestions[index].options[3] +
    "<span></span></div>";
  CountriesQuestionText.innerHTML = CountriesQuestionTag;
  SpaceOptionList.innerHTML = CountriesOptionTag;
  const CountriesOption = SpaceOptionList.querySelectorAll(".option");
  for (let i = 0; i < CountriesOption.length; i++) {
    CountriesOption[i].setAttribute("onclick", "CountriesOptionSelected(this)");
  }
}

function CountriesOptionSelected(answer) {
    clearInterval(Counter)
    let CountriesUserAnswer = answer.textContent
    let CountriesCorrectAnswer = SpaceQuestions[QuestionCount].answer;
    let CountriesAllOptions = SpaceOptionList.children.length;
    if(CountriesUserAnswer == CountriesCorrectAnswer) {
        UserScore += 1
        answer.classList.add("correct")
        console.log("Correct!")
        answer.insertAdjacentHTML("BeforeEnd", TickIcon)
    } else {
        answer.classList.add("incorrect")
        console.log("Incorrect!")
        answer.insertAdjacentHTML("BeforeEnd", CrossIcon)

        for (let i = 0; i < CountriesAllOptions; i++) {
            if (
              SpaceOptionList.children[i].textContent == CountriesCorrectAnswer
            ) {
              SpaceOptionList.children[i].setAttribute(
                "class",
                "option correct"
              );
              SpaceOptionList.children[i].insertAdjacentHTML(
                "BeforeEnd",
                TickIcon
              );
            }
        }
    }
    for (let i = 0; i < CountriesAllOptions; i++) {
        SpaceOptionList.children[i].classList.add("disabled");
    }
    SpaceNextButton.style.display = "block";
}

function CountryShowResultBox() {
    RuleBox.classList.remove("activeRule")
    QuizBox.classList.remove("activeQuiz")
    ResultBox.classList.add("activeResult")
    ShowResultBox()
}

ExitButton.onclick = () => {
    RuleBox.classList.remove("activeRule")
}

ContinueButton.onclick = () => {
    RuleBox.classList.remove("activeRule")
    QuizBox.classList.add("activeQuiz")
    StartTimer(TimeValue)
}

RestartQuiz.onclick = () => {
    window.location.reload()
}

QuitQuiz.onclick = () => {
    window.location.reload()
}