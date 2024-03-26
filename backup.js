document.addEventListener("DOMContentLoaded", () => {
  const correctWords = new Set([
    "nyaata dhabe", "inni hate","isheen hatte","bakka kana", "good","nama lubbuu", "qaama lubbuu", "kanfalee,", "du'a", "injifateera!"
  ]);

  const checkSpelling = () => {
    const textArea = document.getElementById("text-area");
    //
    const userText = textArea.value.trim().toLowerCase();

    const words = userText.split(/\s+/);
    const misspelledWords = new Set();
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = ""; // Reset the result div

    const normalizeWord = (word) => {
      // Remove leading and trailing apostrophes and non-alphanumeric characters if present
      if (word.startsWith("'")) {
        word = word.slice(1);
      }
      if (word.endsWith("'")) {
        word = word.slice(0, -1);
      }
  
      
      // Remove all non-alphanumeric characters
      word = word.replace(/[^a-zA-Z0-9']/g, '');

      return word;
    };

    const normalizedWords = words.map(word => normalizeWord(word));
    const lowercaseCorrectWords = new Set([...correctWords].map(word => word.toLowerCase()));

    for (let i = 0; i < normalizedWords.length; i++) {
      const word = normalizedWords[i];
      
      if (!lowercaseCorrectWords.has(word)) {
        let isWordMatched = false;
        
        const twoWordSequence = normalizedWords.slice(i, i + 2).join(' ');
        if (lowercaseCorrectWords.has(twoWordSequence)) {
          isWordMatched = true;
          i++; // Skip to the next word
        }

        if (!isWordMatched) {
          misspelledWords.add(word);
        }
      }
    }

    if (misspelledWords.size === 0) {
      resultDiv.innerHTML = "Sirnaan Qubeeffameera!";
    } else {
      resultDiv.innerHTML = "Dhiifama jechoonni Sirnaan Hin qubeeffamne warreen kana:<br>";
      misspelledWords.forEach(word => {
        resultDiv.innerHTML += "- " + word + "<br>";
      });
    }

    if (userText.includes("hate")) {
      resultDiv.innerHTML += "<br>" + "Akeekkachiisa: jechi :-Hate jedhu saala dhiira ibsuu qofaaf galuu danda'a<br>yoo saala dubaraa ibsuu barbaada ta'e (Hatte) itti jijjiiru dandeessa";
    }
    
    if (userText.includes("keebeekii")) {
      resultDiv.innerHTML += "<br>" + "Intala baay'ee jaalladhu";
    }

    if (userText.includes("hatte")) {
      resultDiv.innerHTML += "<br>Akeekkachiisa: jechi :-Hatte jedhu saala dubaraa ibsuuf qofaaf galuu danda'a<br>yoo saala dhiiraa ibsuu barbaadeetu ta'e (hate) itti jijjiiru dandeessa";
    }

    if (userText.includes("argate")) {
      resultDiv.innerHTML += "<br>Akeekkachiisa: jechi :-argate jedhu saala dhiira ibsuu qofaaf galuu danda'a<br>yoo saala dubaraa ibsuu barbaada ta'e Argatte itti jijjiiru dandeessa";
    }
  };

  const textArea = document.getElementById("text-area");
  const checkButton = document.getElementById("check-button");

  textArea.addEventListener("input", () => {
    if (textArea.value.trim() !== "") {
      checkButton.disabled = false;
    } else {
      checkButton.disabled = true;
    }
  });

  checkButton.addEventListener("click", checkSpelling);
});
