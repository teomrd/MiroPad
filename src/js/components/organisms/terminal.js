import getCaretCoordinates from "textarea-caret";
import storage from "../../utils/localstorage";
import select from "../../utils/dom";
import commander from "./commander/commander";
import { getNote, getTitle } from "./noteManager/noteManager";
import { div } from "../atoms/div/div";
import { command } from "../molecules/commands/command";

const isLastCharacterInTheWord = (text, characterIndex) =>
  text[characterIndex] === undefined || text[characterIndex].trim() === "";

const placeSuggestion = (textEl) => {
  const coords = getCaretCoordinates(textEl, textEl.selectionEnd);
  const { top, left } = coords;
  select(".suggestion").el.style.top = `${top}px`;
  select(".suggestion").el.style.left = `${left}px`;
};

const getCurrentlyTypingWord = (text, cursorIndexPosition) => {
  let word = "";
  let currentIndex = cursorIndexPosition - 1;
  do {
    const character = text[currentIndex] || "";
    currentIndex = character.trim() === "" ? -1 : currentIndex - 1;
    word = character.trim() !== "" ? `${character}${word}` : word;
  } while (currentIndex >= 0);
  return word;
};

const getPredictions = (word) => {
  const sanitizedWord = word.replace(/[\r\n\t]+/g, "").toLowerCase();
  const dictionary = storage.getDictionary();

  return dictionary.filter((word) => word.startsWith(sanitizedWord));
};

export const terminal = (() => {
  const initState = {
    matches: [],
    currentWord: null,
    prediction: null,
    options: {
      selected: 0,
      length: 0,
    },
  };
  let state = initState;
  return {
    el: select(".terminal"),
    setState: function (newState) {
      state = {
        ...state,
        ...newState,
      };
      return state;
    },
    resetState: function () {
      terminal.setState(initState);
    },
    selectOption: function (e, direction) {
      const currentlySelected = state.options.selected;
      const lastOption = state.options.length - 1;
      const isLastOption = currentlySelected === lastOption;
      const isFirstOption = currentlySelected === 0;
      const isDown = direction === "down";

      const lastOptionChoice = isLastOption ? 0 : currentlySelected + 1;
      const firstOptionChoice = isFirstOption
        ? lastOption
        : currentlySelected - 1;
      const indexToSelect = isDown ? lastOptionChoice : firstOptionChoice;

      state.options = {
        ...state.options,
        selected: indexToSelect,
      };

      terminal.setState({
        prediction: state.matches[state.options.selected],
      });
      terminal.renderInlineSuggestion();
      terminal.renderOptions();
    },
    acceptCompletion: () => {
      const { prediction, currentWord } = state;
      if (prediction) {
        const completion = prediction.replace(currentWord.toLowerCase(), "");
        if (completion) {
          select(".terminal").insertAtCaret(`${completion} `);
        } else {
          select(".terminal").insertAtCaret("  ");
        }
        select(".suggestion").hide();
        terminal.resetState();
      }
    },
    renderInlineSuggestion: () => {
      const { prediction, currentWord } = state;

      const inlineSuggestion = div({
        content: `${prediction.slice(currentWord.length)}`,
      });
      inlineSuggestion.setAttribute("id", "inlineSuggestion");
      select(".suggestion").show().html(inlineSuggestion);
    },
    renderOptions: () => {
      const optionsUl = select(".suggestion .options");
      if (optionsUl && optionsUl.el) optionsUl.el.remove();

      const selectedIndex = state.options.selected;
      const options = state.matches.map((word, i) =>
        command(
          {
            title: div({ content: word }),
          },
          i === selectedIndex
        )
      );
      const optionList = document.createElement("ul");
      optionList.classList.add("options");
      optionList.classList.add("frost");
      options.forEach((el) => optionList.append(el));

      select(".suggestion").el.append(optionList);
    },
    onFocus: () => {
      commander.hide();
      select(".note-info").hide();
    },
    onInput: (e) => {
      const cursorIndexPosition = e.target.selectionEnd;
      const fullText = terminal.el.getValue();

      const charTyped = fullText[cursorIndexPosition - 1];
      if (e.inputType === "deleteContentBackward" || charTyped === " ") {
        terminal.setState({
          prediction: initState.prediction,
          currentWord: initState.currentWord,
        });
        select(".suggestion").hide();
      }

      if (
        e.inputType === "insertText" &&
        isLastCharacterInTheWord(fullText, cursorIndexPosition)
      ) {
        placeSuggestion(e.target);
        const word = getCurrentlyTypingWord(fullText, cursorIndexPosition);
        const matches = getPredictions(word);

        const [firstMatch] = matches;
        const prediction = firstMatch || "";

        terminal.setState({
          prediction,
          currentWord: word,
          matches,
          options: {
            selected: 0,
            length: matches.length,
          },
        });
        if (state.currentWord.length > 2 && state.prediction) {
          terminal.renderInlineSuggestion();
          terminal.renderOptions();
        } else {
          select(".suggestion").hide();
        }
      }
    },
    onArrowDown: (e) => {
      if (state.matches.length > 0) {
        e.preventDefault();
        terminal.selectOption(e, "down");
      }
    },
    onArrowUp: (e) => {
      if (state.matches.length > 0) {
        e.preventDefault();
        terminal.selectOption(e, "up");
      }
    },
    onEnter: (e) => {
      if (state.matches.length > 0) {
        e.preventDefault();
        terminal.acceptCompletion();
      }
    },
    onTab: (e) => {
      e.preventDefault();
      terminal.acceptCompletion();
    },
    onKeyDown: (e) => {
      // enter
      if (e.keyCode === 13) {
        terminal.onEnter(e);
      }
      // arrow down
      if (e.keyCode === 40) {
        terminal.onArrowDown(e);
      }

      // arrow up
      if (e.keyCode === 38) {
        terminal.onArrowUp(e);
      }

      if (e.keyCode === 9) {
        terminal.onTab(e);
      }

      if (e.keyCode === 32) {
        terminal.setState({
          prediction: "",
        });
      }
    },
    onKeyUp: (e) => {
      const currentlySavedNote = getNote();
      const title = getTitle(e.target.value);
      select(".title h3").html(title);

      const { text = "" } = currentlySavedNote || {};
      const isNoteUnSaved = terminal.el.getValue() !== text;
      // unsaved state UI indication
      if (currentlySavedNote) {
        if (isNoteUnSaved) {
          select("#save").addClass("unsaved");
          select("#logo").addClass("unsaved");
        } else {
          select("#save").removeClass("unsaved");
          select("#logo").removeClass("unsaved");
        }
      }
    },
    init: function () {
      select(".suggestion").listen("click", terminal.acceptCompletion);
      this.el
        .listen("focus", this.onFocus)
        .listen("input", this.onInput)
        .listen("keydown", this.onKeyDown)
        .listen("keyup", this.onKeyUp);
    },
  };
})();
